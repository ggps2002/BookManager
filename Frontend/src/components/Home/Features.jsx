import React, { useState} from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../../utils/motion';
import DescriptionIcon from '@mui/icons-material/Description';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import { FeaturesText } from '../../constants/Features';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../../index.css'

const FeaturesCard = ({ index, img, head, para, href, refText }) => {
    const [hovered, setHovered] = useState(false);
    const handleImage = (img) => {
        if (img === "DescriptionIcon") {
            return <DescriptionIcon fontSize="large" />
        }
        else if (img === "SortIcon") {
            return <SortIcon fontSize='large' />
        }
        else if (img === "SearchIcon") {
            return <SearchIcon fontSize='large' />
        }
    }
    return (
        <motion.div className='mt-[60px] py-2 flex flex-col gap-6' initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeIn("right", "spring", 0.5 * index + 0.8, 0.75)}>
            <div className='max-w-full'>
                {handleImage(img)}
            </div>
            <div className='max-w-full'>
                <h3 className='font-medium text-2xl'>{head}</h3>
            </div>
            <div className='max-w-full'>
                <p>{para}</p>
            </div>
            <div className='max-w-full'>
                <Link to={refText == "Explore" ? "benefits" : "signup"} smooth={true} duration={500}><a href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className='no-underline'>
                    <span className='text-orange-700'>{refText}</span>
                    {/* <span class="mx-[13px] absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-[75.5%]"></span> */}
                    <ArrowForwardIosIcon
                        fontSize='small'
                        className={`transform ${hovered ? 'fade-in-left' : 'fade-out-left'}
                        
                    `} style={{color:"rgb(194 65 12)"}}/>
                </a>
                </Link>
            </div>
        </motion.div>
    )
}
const Features = () => {
    return (
        <>
            <motion.div className='pt-[100px] mr-[60px] lg:ml-[100px] md:ml-[60px] sm:ml-[15px] xs:ml-[5px]' initial="hidden" whileInView="show" viewport={{ once: true }} variants={textVariant(0.5)}>
                <h4 className=' font-bold text-black lg:text-[50px]  lg:leading-[3.5rem] md:text-[50px] md:leading-[3.5rem] mb-4 sm:text-[40px] sm:leading-[2.5rem] xs:text-[30px] xs:leading-[2rem]'>
                    Track and Organize Your Reading
                </h4>
            </motion.div>
            <div className='pb-[100px] mr-[60px] md:ml-[100px] sm:ml-[15px] xs:ml-[5px] flex gap-[100px] lg:flex-row md:flex-row sm:flex-col xs:flex-col'>
                {FeaturesText.map((feature, index) => (
                    <div><FeaturesCard key={feature.head} index={index} {...feature} /></div>
                ))}
            </div>
        </>
    )
}

export default Features;