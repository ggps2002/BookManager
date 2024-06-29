import React from 'react';
import logo from '../../assets/logo.png'

const Navbar = () => {
    return (
        <>
            <nav className='w-full flex justify-between items-center p-3 bg-orange-100'>
                <div className='lg:ml-[100px] md:ml-[60px] xs:ml-[5px] sm:ml-[15px]'>
                    <img src={logo} alt="" className='md:w-[100px] md:h-[30px] xs:w-[60px] xs:h-[20px]' />
                </div>
                {/* <div className='lg:flex xs:hidden'>
                    <Link to="signup" smooth={true} duration={500}><a className='border-[2px] border-black  hover:bg-black hover:text-white transition ease-in-out px-[6px] py-2 ' href="#">Sign Up</a></Link>
                    <Link to="signup" smooth={true} duration={500}><a className=' bg-black text-white px-[12px] py-2 ml-4 ' href="#">Login</a></Link>
                </div> */}
            </nav>
        </>
    );
}

export default Navbar;