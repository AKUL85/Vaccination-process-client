import React from 'react';
import HeroSection from '../component/HeroSection';
import FeatureHighlights from '../component/FeatureHighlights';
import TestimonialsSection from '../component/TestimonialsSection';



const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
     
        <HeroSection />
        <FeatureHighlights />
        <TestimonialsSection />
      
    </div>
  );
};

export default LandingPage;
