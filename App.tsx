import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import MetaScroll from './components/MetaScroll';
import TechLab from './components/TechLab';
import Services from './components/Services';
import Founders from './components/Founders';
import gsap from 'gsap';

const App: React.FC = () => {
  useEffect(() => {
    // Global GSAP settings
    gsap.config({
      autoSleep: 60,
      force3D: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-900 selection:text-purple-100 overflow-hidden">
      <Navigation />
      <main>
        <Hero />
        <MetaScroll />
        <TechLab />
        {/* <Services /> */}
        <Founders />
      </main>
    </div>
  );
};

export default App;