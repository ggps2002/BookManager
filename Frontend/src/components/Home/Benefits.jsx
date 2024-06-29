import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../../utils/motion';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../../index.css'
import smilingPerson from '../../assets/smiling_person.jpg';

const Benefits = () => {
    const [hovered, setHovered] = useState(false);
    return (
        <>
            <section className='lg:mt-[190px] xlg:mt-[150px] md:mt-[120px] w-full h-full mx-auto p-2'>
                <div className='max-w-full h-full flex lg:ml-[100px] md:ml-[60px] sm:ml-[15px] xs:ml-[5px] '>
                    <div className='lg:gap-[90px] md:gap-[20px] flex md:flex-row xs:flex-col xs:gap-[40px]'>
                        <div className='w-[90%] h-full flex flex-col gap-7 justify-center'>
                            <motion.div className='text-[30px]' initial="hidden" whileInView="show" viewport={{once:true}} variants={textVariant(0.5)}>
                                <h2>Discover</h2>
                            </motion.div>
                            <motion.div className=' font-bold text-black lg:text-[50px]  lg:leading-[3.5rem] md:text-[50px] md:leading-[3.5rem] mb-4 sm:text-[40px] sm:leading-[2.5rem] xs:text-[30px] xs:leading-[2rem]' initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeIn("right","spring",1,1.5)}>
                                <h2 className='font-bold sm:text-[50px] xs:text-[30px]'>Organize and Explore Your Reading List</h2>
                            </motion.div>
                            <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeIn("right","spring",1,1.5)}>
                                <p>Are you tired of losing track of the books you've read? Our website is here to help! With our easy-to-use platform, you can organize your reading list, discover new books, and share reviews with your friends. Start exploring your literary journey today!</p>
                            </motion.div>
                            <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={textVariant(1.5)}>
                                <Link to="signup" smooth={true} duration={500}><a href="#" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className='no-underline'>
                                    <span className='text-orange-700'>Sign Up</span>
                                    {/* <span class="mx-[13px] absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-[75.5%]"></span> */}
                                    <ArrowForwardIosIcon
                                        fontSize='small'
                                        className={`transform ${hovered ? 'fade-in-left' : 'fade-out-left'}`}
                                        style={{color:"rgb(194 65 12)"}}
                                    />
                                </a></Link>
                            </motion.div>
                        </div>

                        
                        <div className='w-full h-full lg:mr-[60px] md:mr-0 flex items-center xl:items-start' >
                            <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={textVariant(3)}>
                                <img src={smilingPerson} alt="" className='md:h-[400px] md:w-[400px] lg:h-auto lg:w-auto'/>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Benefits;