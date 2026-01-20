import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import LogoMarquee from '../components/LogoMarquee';
import LifecycleIntro from '../components/LifecycleIntro';
import MetaScroll from '../components/MetaScroll';
import PinnedScrollSection from '../components/PinnedScrollSection';
import Founders from '../components/Founders';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
    return (
        <>
            <Navigation />
            <main>
                <Hero />
                <LogoMarquee />
                <LifecycleIntro />
                <MetaScroll />
                <PinnedScrollSection />
                <Founders />
            </main>
            <Footer />
        </>
    );
};

export default HomePage;
