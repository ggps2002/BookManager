import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { motion } from "framer-motion";
import { textVariant } from '../../utils/motion';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../../index.css'


const Hero = () => {
    const [hovered, setHovered] = useState(false);
    const scroll = (section) => {
        section.current.scrollIntoView({ behavior: "smooth" })
    }
    return <>
        <section className={`relative w-full h-screen mx-auto p-2`}>
            <div className='max-w-full h-full flex items-center '>
                <motion.div initial="hidden" animate="show" variants={textVariant(0.5)} className='lg:w-[40.6%]  lg:ml-[100px] md:ml-[60px] md:w-[60%] sm:w-full  sm:ml-[15px] xs:w-full xs:ml-[5px]'>
                    <h1 className='font-black text-white-100 lg:text-[50px]  lg:leading-[4rem] md:text-[50px] md:leading-[4.2rem] mb-4 sm:text-[35px] sm:leading-[2.5rem] xs:text-[30px] xs:leading-[2rem]'>Track, Save, and Sort Your Reading</h1>
                    <p className='text-white-100 lg:text-lg md:text-lg sm:leading-5 xs:leading-5'>Welcome to our website! Here, you can easily keep track of the books you've read, save quick descriptions, and sort them based on your recent activity, preferences, or the book's title.</p>
                    <div className='mt-8'>
                        <motion.div initial="hidden" animate="show" variants={textVariant(1)} className='relative flex'>
                            <div>
                                <Link to="signup" smooth={true} duration={500}><a className='no-underline border-[2px] rounded-lg border-white text-white-100  hover:bg-white hover:text-black transition ease-in-out px-2 py-2 ' href="#">Sign Up</a></Link>
                            </div>
                            <div className='relative' >
                                <Link to="features" smooth={true} duration={500}>
                                    <a href="#" className={`ml-10 group relative no-underline ${hovered ? "text-orange-700":"text-white"} transition-all ease-in-out`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} >
                                        <span className='mr-0.6'>LEARN MORE</span>
                                        {/* <span class="mx-[13px] absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-[75.5%]"></span> */}
                                        <ArrowForwardIosIcon style={{ color: hovered? 'rgb(194 65 12)': "white", fontSize: 8 ,translate: "0 -1.2px" }} className={`
                                        
                                    `} />
                                    </a>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    </>
}

export default Hero;

// transform
// ${hovered ? 'fade-in-left' : 'fade-out-left'}