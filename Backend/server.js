import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import pg from 'pg';
import bcrypt from "bcrypt";
import passport from "passport";
import {Strategy} from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import  session  from "express-session";
import env from "dotenv";
import cookieParser from "cookie-parser";
import RedisStore from "connect-redis" ;
import { createClient } from "redis";

let redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
})
redisClient.connect().catch(console.error);
let redisStore = new RedisStore({
    client: redisClient,
    prefix: "my-app:",
})

const app = express();
const port = process.env.PORT || 5000;
const saltRounds = 10;
env.config()

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST || "localhost",
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})
db.connect()
app.use(session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: true
    },
}))
app.use(cookieParser());
app.use(cors({
    origin: 'https://mellifluous-kringle-12e9db.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

let ord = null;

app.get('/auth/google' ,passport.authenticate("google", {
    scope: ["profile"]
}))

app.get('/auth/google/callback', (req,res,next) => {
    passport.authenticate('google', (err,user) => {
        if (err) {
            return next(err)
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err)
            }
            req.session.save(() => {
                res.redirect(`https://mellifluous-kringle-12e9db.netlify.app/dashboard?userID=${encodeURIComponent(user.userid)}&username=${encodeURIComponent(user.username)}`);
        })
            })
            
    }) (req, res, next);
}) 

app.get('/Order', (req,res) => {
    const order = req.query.order;
    ord = order;
    res.redirect('/bookDetails')
})

app.get('/bookDetails', async (req, res) => {
    try {
        const id = req.query.id
        let books = null;
        switch (ord) {
            case "Recent":
                books = await db.query('SELECT * FROM bookdetails WHERE userid = $1 ORDER BY bookid DESC',[id]);
                break;
            case "Title":
                books = await db.query('SELECT * FROM bookdetails WHERE userid = $1 ORDER BY title ASC',[id]);
                break;
            case "Rating":
                books = await db.query('SELECT * FROM bookdetails WHERE userid = $1 ORDER BY rating DESC',[id]);
                break;
            default:
                break;
        }
        if (books && books.rows.length > 0) {
            res.json({val: books.rows});
        }
    }catch(e){
        console.log(e)
    }
})

app.get('/check', (req,res) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.json({valid: true,userID: req.user.userid, username: req.user.username})
    }else {
        res.json({valid: false});
    }
})

app.get('/delete', async (req,res) => {
    const id  = req.query.id;
    try {
        await db.query(`DELETE FROM bookdetails WHERE bookid = ${id}`);
        res.redirect('/bookDetails')
    } catch (error) {
        console.log(error);
    }
})

app.post('/Edit', async (req,res) =>  {
    const data = req.body;
    const time = new Date();
    try {
        await db.query(`UPDATE bookdetails SET title = $1, author=$2, isbn=$3, brief=$4, DOC=$5, rating=$6, summary=$7,updation=$8 WHERE bookid = ${data.bookID}`,[data.title, data.author, data.isbn, data.brief, data.DOC, data.rating, data.summary, time])
    } catch (error) {
        console.log(error);
    }
})

app.post('/Add', (req,res) => {
    const data = req.body;
    const time = new Date();
    try {
        db.query('INSERT INTO bookdetails (userid, title, author, isbn, brief, DOC, rating, summary, updation) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9) ',[ data.id,data.title, data.author, data.isbn, data.brief, data.DOC, data.rating, data.summary,time])
    } catch (error) {
        console.log(error)
    }
})

app.post('/login/data', (req, res, next) => {
    console.log('Received login request:', req.body); // Log request body
  
    passport.authenticate('local', (err, user, info) =>  {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.session.save(() => [
            res.json({message: "Authenticated" ,userID: user.userid ,username:user.username})
        ])
        
      });
    })(req, res, next);
  });

app.post('/signup/data', async (req, res) => {
    const signupData = req.body;
    const username = signupData.username;
    const password = signupData.pwd;
    try {
        const checkResult = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        if (checkResult.rows.length > 0) {
            const user = checkResult.rows[0]
            const storedHashedPassword = user.password;
            bcrypt.compare(password ,storedHashedPassword , (err, result) => {
                if (err) {
                    console.log("Error comparing passwords:", err);
                } else {
                    if (result) {
                        // redirect to Dashboard
                        req.logIn(user ,(err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({message: "Authenticated" ,userID: user.userid ,username:user.username})
                            }
                        })
                    } else {
                        res.json({message: "*Username already taken!!"})
                    }
                }
            });
        } else {
            bcrypt.hash(password, saltRounds, async(err, hash) => {
                if (err) {
                    console.log("Error hashing password:",err);
                } else {
                    const result = await db.query(
                        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
                        [username, hash]
                    )
                    const user  = result.rows[0];
                    req.logIn(user, (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.json({message: "Authenticated" ,userID: user.userid ,username:user.username})
                        }
                    })
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
})
passport.use(new Strategy({ usernameField: 'username', passwordField: 'pwd' },async function verify(username, pwd, cb) {
    try {
        const result = await db.query("SELECT * FROM users WHERE username = $1",[username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedHashedPassword = user.password;
            bcrypt.compare(pwd, storedHashedPassword, (err, result) => {
                if (err) {
                    cb(null,err);
                } else {
                    if (result) {
                        //redirect to Dashboard
                        return cb(null,user)
                    } else {
                        //incorrect password
                        return cb(null,false,{message: "*Incorrect password!!"})
                    }
                }
            });
        } else {
            //undefined user
            return cb(null, false, {message: "*Username not found!!"})
        }
    } catch (err) {
        return cb(err);
    }
}))

passport.use("google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://bookmanager-uwek.onrender.com/auth/google/callback",
    useProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
} , async (accessToken, refreshToken, profile, cb) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE username = $1",[profile.displayName])
        if (result.rows.length === 0) {
            const newUser = await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [profile.displayName, "google"])
            cb(null, newUser.rows[0])
        }
        else {
            cb(null, result.rows[0])
        }
    } catch (error) {
        console.log(error);
    }
}))

passport.serializeUser((user,cb) => {
    console.log("Serializing User:", user)
    cb(null,user)
})
passport.deserializeUser(async (user, cb) => {
    console.log("Deserializing User:", user);
    function getUserById(userid, callback) {
        const user = user[userid];
        if (user) {
          callback(null, user);
        } else {
          callback(new Error('User not found'));
        }
      }
      getUserById(user.userid, (err, user) => {
        cb(err, user);
      });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


