
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import FAQSection from '@/components/FAQSection';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <div className="py-12 flex justify-center">
          <Button 
            onClick={() => navigate('/process')}
            className="px-8 py-6 text-lg rounded-lg animate-pulse"
            size="lg"
          >
            Get Started Now
          </Button>
        </div>
        
        <Features />
        <HowItWorks />
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
