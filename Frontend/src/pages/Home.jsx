import React, { useEffect , useState} from 'react';
import { Element } from 'react-scroll';
import Navbar from "../components/Home/Navbar";
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import Benefits from '../components/Home/Benefits';
import SignUp from '../components/Home/SignUp';
import Footer from '../components/Home/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;
function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://bookmanager-uwek.onrender.com/check').then( res => {
        if (res.data.valid) {
          navigate(`/dashboard?userID=${encodeURIComponent(res.data.userID)}&username=${encodeURIComponent(res.data.username)}`)
        }
      }).catch( err => {console.log(err)})
    };

    fetchData();
    
    // No cleanup needed in this useEffect
  },[navigate]);
  return (
    <div >
      <Navbar />
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center relative">
        <div className="absolute inset-0 bg-black opacity-60 pointer-events-none"></div>
        <Hero />
      </div>
      <div className='bg-orange-50 overflow-hidden'>
        <Element name="features">
          <Features />
        </Element>
        <Element name="benefits">
          <Benefits />
        </Element>
        <Element name="signup" className='oveflow-hidden z-40 relative mt-[200px] md:ml-[60px] md:mr-6 lg:ml-[100px] xs:ml-2 xl:mt-[300px]'>
          <SignUp/>
        </Element>
        
        <div className='bg-orange-200 pt-10 overflow-hidden xs:mt-[70px] xlg:mt-[190px] xl:mt-0 z-40 relative'>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home
