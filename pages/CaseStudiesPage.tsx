import React from 'react';
import Navigation from '../components/Navigation';
import CaseStudies from '../components/CaseStudies';
import Footer from '../components/Footer';

const CaseStudiesPage: React.FC = () => {
    return (
        <>
            <Navigation />
            <main className="pt-16 sm:pt-20">
                <CaseStudies />
            </main>
            <Footer />
        </>
    );
};

export default CaseStudiesPage;
