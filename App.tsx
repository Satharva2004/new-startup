import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis();

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP Ticker Integration
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);

    // Disable lag smoothing to prevent jumpy scrolling
    gsap.ticker.lagSmoothing(0);

    // Global GSAP settings
    gsap.config({
      autoSleep: 60,
      force3D: true,
    });

    return () => {
      // Cleanup
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-900 selection:text-purple-100 overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
