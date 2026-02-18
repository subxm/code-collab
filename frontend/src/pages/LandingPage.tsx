import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { TechStack } from '../components/landing/TechStack';
import { Testimonials } from '../components/landing/Testimonials';
import { CallToAction } from '../components/landing/CallToAction';
import { Footer } from '../components/landing/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TechStack />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};
