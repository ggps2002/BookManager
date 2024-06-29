import React, { useState } from "react";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter'; // Corrected from XIcon to TwitterIcon
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from '../../assets/logo.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [hover, setHovered] = useState({
        facebook: false,
        instagram: false,
        twitter: false,
        linkedin: false,
    });

    const handleMouseEnter = (icon) => {
        setHovered(prevState => ({ ...prevState, [icon]: true }));
    };

    const handleMouseLeave = (icon) => {
        setHovered(prevState => ({ ...prevState, [icon]: false }));
    };

    return (
        <>
            <footer>
                <div className=" w-full flex md:flex-row md:justify-between p-2 xs:flex-col xs:w-full xs:items-center xs:gap-[60px] md:gap-0">
                    <div className='lg:ml-[100px] md:ml-[60px] '>
                        <img src={logo} alt="Logo" className="w-[100px] h-[30px]" />
                    </div>
                    <div className="flex gap-7 lg:mr-[60px] md:mr-[40px]">
                        <div>
                            <a 
                                href="#" 
                                onMouseEnter={() => handleMouseEnter('facebook')} 
                                onMouseLeave={() => handleMouseLeave('facebook')}
                            >
                                <FacebookRoundedIcon style={{ color: hover.facebook ? "gray" : "black" }} />
                            </a>
                        </div>
                        <div>
                            <a 
                                href="#" 
                                onMouseEnter={() => handleMouseEnter('instagram')} 
                                onMouseLeave={() => handleMouseLeave('instagram')}
                            >
                                <InstagramIcon style={{ color: hover.instagram ? "gray" : "black" }} />
                            </a>
                        </div>
                        <div>
                            <a 
                                href="#" 
                                onMouseEnter={() => handleMouseEnter('twitter')} 
                                onMouseLeave={() => handleMouseLeave('twitter')}
                            >
                                <TwitterIcon style={{ color: hover.twitter ? "gray" : "black" }} />
                            </a>
                        </div>
                        <div>
                            <a 
                                href="#" 
                                onMouseEnter={() => handleMouseEnter('linkedin')} 
                                onMouseLeave={() => handleMouseLeave('linkedin')}
                            >
                                <LinkedInIcon style={{ color: hover.linkedin ? "gray" : "black" }} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="lg:ml-[100px] md:ml-[60px] xs:ml-[5px] sm:ml-[15px] md:mt-[60px] xs:mt-[30px] lg:mr-[60px] md:mr-[40px] sm:mr-[20px] xs:mr-[10px]">
                    <hr className="w-auto h-[2px] bg-black" />
                </div>
                <div className="mt-[40px] mb-[60px] lg:ml-[100px] md:ml-[60px] xs:ml-[5px] sm:ml-[15px] lg:mr-[60px] md:mr-[40px] sm:mr-[20px] xs:mr-[10px] text-center">
                    © {currentYear}. All rights reserved.
                </div>
            </footer>
        </>
    );
}

export default Footer;
