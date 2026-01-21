import React, { useRef, useEffect } from 'react';
import { ArrowRight, TrendingUp, Users, Zap, Target } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
    id: number;
    title: string;
    client: string;
    industry: string;
    description: string;
    challenge: string;
    solution: string;
    results: {
        metric: string;
        value: string;
        icon: typeof TrendingUp;
    }[];
    image: string;
    tags: string[];
}

const CaseStudies: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const caseStudies: CaseStudy[] = [
        {
            id: 1,
            title: 'AI-Powered Customer Support',
            client: 'TechCorp Solutions',
            industry: 'SaaS',
            description: 'Revolutionized customer support with AI automation, reducing response times and increasing satisfaction.',
            challenge: 'TechCorp was struggling with long customer wait times and high support costs, leading to decreased customer satisfaction.',
            solution: 'Implemented an AI-powered chatbot and automated response system that handles 80% of customer inquiries instantly.',
            results: [
                { metric: 'Response Time', value: '85% Faster', icon: Zap },
                { metric: 'Customer Satisfaction', value: '+45%', icon: Users },
                { metric: 'Cost Reduction', value: '60%', icon: TrendingUp },
            ],
            image: '/img/jack-hunter-1L4E_lsIb9Q-unsplash.jpg',
            tags: ['AI Automation', 'Customer Support', 'Chatbot'],
        },
        {
            id: 2,
            title: 'Sales Process Automation',
            client: 'GrowthHub Inc',
            industry: 'E-commerce',
            description: 'Streamlined the entire sales funnel with intelligent automation, boosting conversions and revenue.',
            challenge: 'Manual lead qualification and follow-up processes were causing missed opportunities and slow conversion rates.',
            solution: 'Built a comprehensive automation system for lead scoring, nurturing, and sales pipeline management.',
            results: [
                { metric: 'Lead Conversion', value: '+120%', icon: Target },
                { metric: 'Sales Cycle', value: '40% Shorter', icon: Zap },
                { metric: 'Revenue Growth', value: '+300%', icon: TrendingUp },
            ],
            image: '/img/federico-scarionati-EomurrCz3dk-unsplash.jpg',
            tags: ['Sales Automation', 'CRM', 'Lead Generation'],
        },
        {
            id: 3,
            title: 'Marketing Campaign Optimizer',
            client: 'BrandVision Co',
            industry: 'Marketing',
            description: 'Automated multi-channel marketing campaigns with AI-driven optimization for maximum ROI.',
            challenge: 'Managing multiple marketing channels manually resulted in inconsistent messaging and poor campaign performance.',
            solution: 'Developed an AI system that automatically optimizes ad spend, content, and timing across all channels.',
            results: [
                { metric: 'ROI Increase', value: '+250%', icon: TrendingUp },
                { metric: 'Engagement', value: '+180%', icon: Users },
                { metric: 'Time Saved', value: '30hrs/week', icon: Zap },
            ],
            image: '/img/jack-hunter-1L4E_lsIb9Q-unsplash.jpg',
            tags: ['Marketing Automation', 'AI Optimization', 'Multi-Channel'],
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 85%',
                    },
                }
            );

            // 3D Flip Card Animations
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.fromTo(
                        card,
                        {
                            opacity: 0,
                            rotateY: -90,
                            x: -100,
                        },
                        {
                            opacity: 1,
                            rotateY: 0,
                            x: 0,
                            duration: 1.2,
                            delay: (index % 2) * 0.2,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 85%',
                                toggleActions: 'play none none none',
                            },
                        }
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-[#050505]"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orbs */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.1),transparent_70%)]" />
                    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(124,58,237,0.08),transparent_70%)]" />
                </div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
                        backgroundSize: '48px 48px',
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div ref={titleRef} className="text-center mb-12 sm:mb-16 md:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 sm:mb-6">
                        <span className="text-white">Success </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200">
                            Stories
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal px-2">
                        Real results from businesses that transformed their operations with AI automation.
                    </p>
                </div>

                {/* Case Studies Cards - Two Column Layout */}
                <div className="space-y-12 sm:space-y-16 md:space-y-24">
                    {/* Row 1: First two cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 perspective-1000">
                        {caseStudies.slice(0, 2).map((study, index) => (
                            <div
                                key={study.id}
                                ref={(el) => (cardsRef.current[index] = el)}
                                className="case-study-card"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Card Container */}
                                <div className="group relative h-[500px] sm:h-[550px] md:h-[600px] rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={study.image}
                                            alt={study.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Gradient Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-violet-900/30 opacity-60" />

                                    {/* Glass Border */}
                                    <div className="absolute inset-0 rounded-3xl border border-purple-500/20 group-hover:border-purple-400/40 transition-colors duration-500" />

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
                                        {/* Top Section */}
                                        <div>
                                            {/* Industry Badge */}
                                            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-black/60 backdrop-blur-md border border-purple-500/30 mb-3 sm:mb-4">
                                                {study.industry}
                                            </span>

                                            {/* Client */}
                                            <div className="text-purple-400 font-semibold mb-2 sm:mb-3 tracking-wide text-xs sm:text-sm uppercase">
                                                {study.client}
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-tight">
                                                {study.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                                                {study.description}
                                            </p>
                                        </div>

                                        {/* Bottom Section */}
                                        <div>
                                            {/* Results - 3 Column Grid */}
                                            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                                                {study.results.map((result, i) => {
                                                    const Icon = result.icon;
                                                    return (
                                                        <div
                                                            key={i}
                                                            className="relative rounded-xl p-2 sm:p-3 bg-black/40 backdrop-blur-md border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                                                        >
                                                            <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 mb-1 sm:mb-2" />
                                                            <div className="text-sm sm:text-base md:text-lg font-bold text-white mb-0.5 sm:mb-1">
                                                                {result.value}
                                                            </div>
                                                            <div className="text-[9px] sm:text-[10px] text-gray-400 leading-tight">
                                                                {result.metric}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {study.tags.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium text-purple-200 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Glow Effect on Hover */}
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Row 2: Third card centered or full row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 perspective-1000">
                        <div
                            ref={(el) => (cardsRef.current[2] = el)}
                            className="case-study-card lg:col-start-1"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Card Container */}
                            <div className="group relative h-[500px] sm:h-[550px] md:h-[600px] rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={caseStudies[2].image}
                                        alt={caseStudies[2].title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* Gradient Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-violet-900/30 opacity-60" />

                                {/* Glass Border */}
                                <div className="absolute inset-0 rounded-3xl border border-purple-500/20 group-hover:border-purple-400/40 transition-colors duration-500" />

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
                                    {/* Top Section */}
                                    <div>
                                        {/* Industry Badge */}
                                        <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-black/60 backdrop-blur-md border border-purple-500/30 mb-3 sm:mb-4">
                                            {caseStudies[2].industry}
                                        </span>

                                        {/* Client */}
                                        <div className="text-purple-400 font-semibold mb-2 sm:mb-3 tracking-wide text-xs sm:text-sm uppercase">
                                            {caseStudies[2].client}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-tight">
                                            {caseStudies[2].title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                                            {caseStudies[2].description}
                                        </p>
                                    </div>

                                    {/* Bottom Section */}
                                    <div>
                                        {/* Results - 3 Column Grid */}
                                        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                                            {caseStudies[2].results.map((result, i) => {
                                                const Icon = result.icon;
                                                return (
                                                    <div
                                                        key={i}
                                                        className="relative rounded-xl p-2 sm:p-3 bg-black/40 backdrop-blur-md border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                                                    >
                                                        <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 mb-1 sm:mb-2" />
                                                        <div className="text-sm sm:text-base md:text-lg font-bold text-white mb-0.5 sm:mb-1">
                                                            {result.value}
                                                        </div>
                                                        <div className="text-[9px] sm:text-[10px] text-gray-400 leading-tight">
                                                            {result.metric}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {caseStudies[2].tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium text-purple-200 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Glow Effect on Hover */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 sm:mt-24 md:mt-32 text-center px-4">
                    <div className="relative rounded-2xl overflow-hidden max-w-3xl mx-auto">
                        {/* Border */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-transparent to-violet-500/20 p-[1px]">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#050505]" />
                        </div>

                        {/* Background */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-40">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.15),transparent_60%)]" />
                        </div>

                        {/* Border glow */}
                        <div className="absolute inset-0 rounded-2xl border border-white/5" />

                        {/* Content */}
                        <div className="relative p-8 sm:p-12 md:p-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 leading-tight tracking-tight">
                                Ready to Write Your Success Story?
                            </h2>
                            <p className="text-gray-400 text-base sm:text-lg font-normal mb-6 sm:mb-8">
                                Let's discuss how AI automation can transform your business
                            </p>
                            <a
                                href="https://wa.me/919136239673?text=Hey%20I%20want%20to%20automate%20my%20workflow"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                            >
                                Start Your Project
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;
