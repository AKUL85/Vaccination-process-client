import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import lottieAnimation from '../assets/Covid Vaccination.json';
import AnimatedHeading from './AnimateHeading';

const HeroSection = () => (
  <motion.section
    id="home"
    className="pt-32 pb-20 bg-gradient-to-br from-white to-blue-50"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="container mx-auto px-6 lg:px-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
      
      {/* Left Text Content */}
      <motion.div
        className="lg:w-1/2 max-w-xl text-center lg:text-left"
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 drop-shadow-md">
          The Future of <span className="text-primary">Vaccination</span> Management.
        </h1> */}
        <AnimatedHeading></AnimatedHeading>
        <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
          VaxTrack simplifies the end-to-end process—from citizen registration to supply chain tracking—bringing efficiency and transparency to public health.
        </p>
        <div className="flex justify-center lg:justify-start gap-6">
          <Link 
            to="/auth" 
            className="btn btn-primary btn-lg shadow-xl text-white hover:scale-105 transform transition duration-300"
          >
            Get Started Now
          </Link>
          <a 
            href="#features" 
            className="btn btn-outline btn-primary btn-lg hover:bg-primary/20 transition duration-300"
          >
            Learn More
          </a>
        </div>
      </motion.div>
      
      {/* Right Animation Content */}
      <motion.div
        className="lg:w-5/12 max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="bg-primary/10 p-8 rounded-3xl shadow-2xl flex items-center justify-center">
          <Lottie 
            animationData={lottieAnimation} 
            loop={true} 
            style={{ width: '100%', height: '100%' }} 
            aria-label="Vaccination Animation"
          />
        </div>
      </motion.div>
    </div>
  </motion.section>
);

export default HeroSection;
