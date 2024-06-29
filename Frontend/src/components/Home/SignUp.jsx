import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideIn, textVariant } from "../../utils/motion";
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../../index.css'

const SignUp = () => {
    const [logIn, setLogIn] = useState(true)
    const [show, setShow] = useState({
        login: {
            Password: false,
        },
        signup: {
            confirmPassword: false,
            Password: false,
        }
    })
    const [details, setDetails] = useState({
        login: {
            username: "",
            pwd: "",
        },
        signup: {
            username: "",
            pwd: "",
            confirmPwd: "",
        }
    })
    const [callBackMessage, setCallBackMessage] = useState({
        loginMessage: "",
        signupMessage: "",
    })
    const toggleVisible = (event) => {
        const name = event.currentTarget.getAttribute('data-field');
        const on = event.currentTarget.getAttribute('data-type');
        console.log(event.currentTarget.getAttribute);
        // const on = event.currentTarget.getAttribute('data-type');
        setShow((prevShow) => {
            return {
                ...prevShow,
                [on]: {
                    ...prevShow[on],
                    [name]: !prevShow[on][name],
                },
            }
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        const field = e.currentTarget.getAttribute('field')
        console.log(name);
        console.log(field);
        console.log(value);
        setDetails((prev) => {
            return {
                ...prev,
                [field]: {
                    ...prev[field],
                    [name]: value
                }
            }
        })
    }
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch("http://localhost:5000/login/data", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details.login),
                credentials:'include'
            })
                .then(async response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json()
                    if (data.message === "Authenticated") {
                        window.location.href = `/dashboard?userID=${data.userID}&username=${encodeURIComponent(data.username)}`;
                    } else {
                        setCallBackMessage((prev) => {
                            return {
                                ...prev,
                                loginMessage: data.message
                            }
                        });
                    }
                    return response.json()
                })
                .then(details => {
                    console.log('Data receiced:', details);
                })
        } catch (error) {
            console.log(error);
        }

    }
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (details.signup.pwd != details.signup.confirmPwd) {
            setCallBackMessage((prev) => {
                return {
                    ...prev,
                    signupMessage: "Password and confirm password doesn't match!!",
                }
            })
        }
        else {
            try {
                await fetch("http://localhost:5000/signup/data", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(details.signup),
                    credentials: 'include',
                })
                    .then(async response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const data = await response.json()
                        if (data.message === "Authenticated") {
                            window.location.href = `/dashboard?userID=${data.userID}&username=${encodeURIComponent(data.username)}`;
                        } else {
                            setCallBackMessage((prev) => {
                                return {
                                    ...prev,
                                    signupMessage: data.message
                                }
                            })
                        }
                        return response.json()
                    })
                    .then(details => {
                        console.log('Data receiced:', details);
                    })
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    const handleGoogleSignin = async () => {
    window.open("http://localhost:5000/auth/google", '_self');    
};

    return (
        <>

            <div className=" lg:pt-[180px] xl:pt-[180px] xs:pt-[100px] md:pt-[50px] xlg:pt-[30px] h-[900px] max-w-full flex xl:flex-row xs:gap-5 lg:ml-[400px] md:ml-[60px] sm:ml-[15px] xs:ml-[5px] xs:flex-col lg:mt-[160px] md:mt-[120px] mx-auto p-1">
                <motion.div className="xlg:mt-[60px] relative z-40 " initial="hidden" whileInView="show" viewport={{ once: true }} variants={textVariant(0.5)}>
                    <div className='font-bold text-black lg:text-[50px]  lg:leading-[4.2rem] md:text-[50px] md:leading-[4.2rem] mb-4 sm:text-[40px] sm:leading-[2.6rem] xs:text-[30px] xs:leading-[2rem]'><h2 className="font-bold sm:text-[50px] xs:text-[30px]">Start Tracking Your Books Today</h2></div>
                    <div className="pb-10"><p>Sign up for an account and keep track of the books you read.</p></div>
                </motion.div>
                <motion.div className="mb-10 relative z-40 xlg:h-[80%] xl:h-[70%] xs:h-[65%]  xl:w-[50%] lg:p-10 xl:p-10 xl:pb-10 xs:p-4 xlg:pt-12 xlg:p-6 xlg:pb-[300px] xlg:mb-[250px] xl:mr-[90px] xlg:mr-[490px] lg:mr-[60px] md:mr-[50px] xs:w-full xlg:w-3/4 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl bg-orange-100" initial="hidden" whileInView="show" viewport={{ once: true }} variants={slideIn("right", "", 1, 1)}>
                    <div className="h-10 mb-8 overflow-hidden relative">
                        {/* <div className="font-medium text-3xl"><h3>{logIn ? "Login" : "Signup"}</h3></div> */}
                        <div className={`absolute left-1/2 font-medium text-3xl z-10  ${logIn ? "-translate-x-[60%]" : "-translate-x-[700%]"} transition-all duration-500 ease-in-out`}><h7>Login</h7></div>
                        <div className={`absolute left-1/2 font-medium text-3xl z-20 ${logIn ? "translate-x-[700%]" : "-translate-x-[60%]"} transition-all duration-500 ease-in-out`}><h7>Sign up</h7></div>
                    </div>
                    <div className="md:px-[5.6rem] xs:px-[30px] ">
                        <div className="w-full h-full  flex rounded-lg border-black border-2 cursor-pointer text-white relative bg-black ">
                            <div className={`absolute h-8 w-[50%] rounded-md bg-white ${!logIn ? "translate-x-[100%]" : "translate-x-0"} transition-all duration-700 ease-in-out `}></div>
                            <div className={`w-[50%] text-center h-8 align-middle rounded-lg `} onClick={() => setLogIn(true)}><h4 className="font-small text-lg">Login</h4></div>
                            <div className={`w-[50%] text-center h-8 align-middle rounded-lg`} onClick={() => setLogIn(false)}><h4 className="font-small text-lg">Sign Up</h4></div>
                        </div>
                    </div>
                    <div className="overflow-hidden relative xs:max-h-[500px] sm:max-h-[440px] xlg:[500px]">
                        <div className={`${logIn ? "" : "translate-x-[-100%]"} transition-all duration-500 ease-in-out`}>
                            <form onSubmit={handleLoginSubmit}>
                                <div className="w-full h-10 text-center md:px-[90px] mt-8 xs:px-[30px]">
                                    <input type="text" field="login" name="username" placeholder="Username or Email" className="w-full h-full indent-4 rounded-lg border border-black" onChange={handleChange} />
                                </div>
                                <div className="w-full h-10 text-center md:px-[90px] mt-3 xs:px-[30px] relative">
                                    <input
                                        type={show.login.Password ? "text" : "password"}
                                        name="pwd"
                                        field="login"
                                        placeholder="Password"
                                        className="w-full h-full indent-4 rounded-lg border border-black pr-10"
                                        onChange={handleChange}
                                        required
                                    />
                                    <div
                                        className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 md:right-[6.4rem] xs:right-[2.5rem]"
                                        data-field="Password"
                                        data-type="login"
                                        onClick={toggleVisible}
                                    >
                                        {show.login.Password ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </div>
                                    <p className={`text-red-500 text-left ${callBackMessage.loginMessage == "" && "hidden"} my-[0.0002px]`}>{callBackMessage.loginMessage}</p>
                                </div>
                                <div className="w-full mt-4 md:px-[90px] xs:px-[30px]">
                                    <a href="#" className="text-blue-700 no-underline">Forgot Password?</a>
                                </div>
                                <div className="w-full h-10 text-center md:px-[90px] mt-8 xs:px-[30px] align-middle">
                                    <button type="submit" className="w-full h-full rounded-lg bg-black text-white">Login</button>
                                </div>
                            </form>
                            <div className="w-full mt-9 md:px-[90px] xs:px-[30px] text-center">
                                <p>Don't have an account? <span href="#" className="text-blue-700 cursor-pointer" onClick={() => setLogIn(false)}>Signup now</span></p>
                            </div>
                            <div className={`translate-y-[-80%] ${logIn ? "translate-x-[200%]" : " translate-x-[100%] "} transition-all duration-500 ease-in-out`}>
                                <form onSubmit={handleSignupSubmit}>
                                    <div className="w-full h-10 text-center md:px-[90px] mt-8 xs:px-[30px]">
                                        <input type="text" field="signup" name="username" placeholder="Username or Email" className="w-full h-full indent-4 rounded-lg border border-black" required onChange={handleChange} />
                                    </div>
                                    <div className="w-full h-10 text-center md:px-[90px] mt-3 xs:px-[30px] relative">
                                        <input
                                            type={show.signup.Password ? "text" : "password"}
                                            name="pwd"
                                            field="signup"
                                            placeholder="Password"
                                            className="w-full h-full indent-4 rounded-lg border border-black pr-10"
                                            onChange={handleChange}
                                            required
                                        />
                                        <div
                                            className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 md:right-[6.4rem] xs:right-[2.5rem]"
                                            data-field="Password"
                                            data-type="signup"
                                            onClick={toggleVisible}
                                        >
                                            {show.signup.Password ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </div>
                                    </div>
                                    <div className="w-full h-10 text-center md:px-[90px] mt-3 xs:px-[30px] relative">
                                        <input
                                            type={show.signup.confirmPassword ? "text" : "password"}
                                            name="confirmPwd"
                                            field="signup"
                                            placeholder="Confirm Password"
                                            className="w-full h-full indent-4 rounded-lg border border-black pr-10"
                                            onChange={handleChange}
                                            required
                                        />
                                        <div
                                            className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 md:right-[6.4rem] xs:right-[2.5rem]"
                                            data-field="confirmPassword"
                                            data-type="signup"
                                            onClick={toggleVisible}
                                        >
                                            {show.signup.confirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </div>
                                        <p className={`text-red-500 text-left ${callBackMessage.signupMessage == "" && "hidden"}`}>{callBackMessage.signupMessage}</p>
                                    </div>
                                    <div className="w-full text-center mt-3">
                                        <p>or</p>
                                    </div>
                                    <div className="h-10 md:px-[90px] xs:px-[30px] mt-3">
                                        <a >
                                            <button type="button" className="w-full h-full rounded-lg bg-black text-white" onClick={handleGoogleSignin}>
                                                <div className=" h-full flex">
                                                    <div className="w-full h-full flex items-center justify-center gap-2">
                                                        <div><GoogleIcon fontSize="small" /></div>
                                                        <div><span>Sign up with Google</span></div>
                                                    </div>
                                                </div>
                                            </button>
                                        </a>
                                    </div>
                                    <div className="w-full h-10 text-center md:px-[90px] mt-8 xs:px-[30px] align-middle">
                                        <button type="submit" className="w-full h-full rounded-lg bg-black text-white">Sign up</button>
                                    </div>
                                </form>
                                <div className="w-full mt-9 md:px-[90px] xs:px-[30px] text-center">
                                    <p>Already have an account? <span href="#" className="text-blue-700 cursor-pointer" onClick={() => setLogIn(true)}>Login</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div className={`relative z-0 xs:hidden xlg:block`}>
                <div className=' absolute left-[-110%] lg:h-8 xs:h-4 xl:w-[70%]   -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[-100%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[-90%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[-80%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[-70%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance'></div>
                <div className=' absolute left-[-40%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[-50%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[-60%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[-30%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[-20%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full   -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[-10%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[10%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[20%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[30%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[40%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[50%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[60%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[70%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[80%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[90%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full-rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[100%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[110%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[120%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[130%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
                <div className=' absolute left-[140%] lg:h-8 xs:h-4 xl:w-[70%] xlg:w-full  -rotate-45 bg-orange-100 transform dance '></div>
            </div>
        </>
    )
}
export default SignUp;