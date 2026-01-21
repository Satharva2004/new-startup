import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PinnedScrollSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const centerCardRef = useRef<HTMLDivElement>(null);
    const leftColumnRef = useRef<HTMLDivElement>(null);
    const rightColumnRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            // Only enable on desktop
            const isDesktop = window.matchMedia('(min-width: 768px)').matches;
            if (!isDesktop) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=150%', // Pin for 1.5 screen heights
                    pin: true,
                    scrub: 1, // Smooth scrubbing
                    // markers: true, // debug
                },
            });

            // Center Card Animation: Scale 0.9 -> 1, Opacity 0.8 -> 1
            tl.fromTo(
                centerCardRef.current,
                { scale: 0.9, opacity: 0.8 },
                { scale: 1, opacity: 1, ease: 'none' },
                0
            );

            // Left Column Animation: Move Up and Fade Out
            if (leftColumnRef.current) {
                const leftCards = leftColumnRef.current.children;
                tl.to(
                    leftCards,
                    {
                        yPercent: -100,
                        opacity: 0,
                        stagger: 0.1,
                        ease: 'none',
                    },
                    0
                );
            }

            // Right Column Animation: Move Down and Fade Out
            if (rightColumnRef.current) {
                const rightCards = rightColumnRef.current.children;
                tl.to(
                    rightCards,
                    {
                        yPercent: 100,
                        opacity: 0,
                        stagger: 0.1,
                        ease: 'none',
                    },
                    0
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const Card = ({ title, desc, index = 0, isMobile = false }: { title: string; desc: string; index?: number; isMobile?: boolean }) => {
        const cardContent = (
            <div className="relative h-[180px] sm:h-[200px] md:h-[220px] w-full overflow-hidden rounded-3xl p-[1px] mb-4 last:mb-0">
                <span className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1a1a1a_0%,#1a1a1a_45%,#a855f7_48%,#ffffff_50%,#a855f7_52%,#1a1a1a_55%,#1a1a1a_100%)] blur-lg opacity-80" />
                <span className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1a1a1a_0%,#1a1a1a_45%,#a855f7_48%,#ffffff_50%,#a855f7_52%,#1a1a1a_55%,#1a1a1a_100%)]" />
                <div className="relative h-full w-full rounded-3xl bg-[#0d0d0d] p-4 sm:p-5 md:p-6 flex flex-col justify-center backdrop-blur-3xl">
                    {/* Title Badge with Gradient */}
                    <div className="inline-flex items-center mb-2 sm:mb-3">
                        <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg text-white text-[10px] sm:text-xs font-bold shadow-lg shadow-purple-500/20 uppercase tracking-wider">
                            {title}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{desc}</p>
                </div>
            </div>
        );

        if (isMobile) {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    {cardContent}
                </motion.div>
            );
        }

        return cardContent;
    };

    const CenterCard = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className={`w-full ${isMobile ? 'h-[400px]' : 'md:w-2/5 md:h-[70vh]'} relative rounded-2xl overflow-hidden z-20 group`}>
            {/* Sleek Border with Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-transparent to-violet-500/20 p-[1px]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#050505]" />
            </div>

            {/* Subtle Mesh Gradient Background */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_40%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(124,58,237,0.1),transparent_40%)]" />
            </div>

            {/* Minimal Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            {/* Subtle Border Glow */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-purple-500/30 transition-colors duration-500" />

            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-14 z-40">
                {/* Top Badge */}
                <div className="flex justify-start">
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 backdrop-blur-xl rounded-full text-purple-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        Premium Solutions
                    </span>
                </div>

                {/* Bottom Content */}
                <div className="space-y-4 sm:space-y-6 md:space-y-8 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                    {/* Minimal Accent Line */}
                    <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full" />

                    <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[0.85]">
                            Elevate <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200">
                                Your Vision
                            </span>
                        </h2>

                        <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-md leading-relaxed font-normal pl-2 sm:pl-4 border-l border-purple-500/30">
                            We turn complex challenges into <span className="text-purple-300 font-semibold">elegant</span>, high-impact digital solutions that drive <span className="text-white font-semibold">real results</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Version */}
            <section className="relative w-full md:hidden bg-black overflow-hidden py-12 px-4">
                <div className="max-w-2xl mx-auto space-y-8">
                    {/* Center Card - Mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <CenterCard isMobile={true} />
                    </motion.div>

                    {/* Service Cards - Mobile */}
                    <div className="space-y-4">
                        <Card 
                            title="Strategy" 
                            desc="Data-driven insights to guide your digital transformation journey." 
                            index={0}
                            isMobile={true}
                        />
                        <Card 
                            title="Design" 
                            desc="Creating intuitive and beautiful user experiences that convert." 
                            index={1}
                            isMobile={true}
                        />
                        <Card 
                            title="Development" 
                            desc="Robust and scalable solution utilizing cutting-edge tech." 
                            index={2}
                            isMobile={true}
                        />
                        <Card 
                            title="Marketing" 
                            desc="Targeted campaigns that reach your audience effectively." 
                            index={3}
                            isMobile={true}
                        />
                        <Card 
                            title="Analytics" 
                            desc="Real-time data monitoring to optimize performance." 
                            index={4}
                            isMobile={true}
                        />
                        <Card 
                            title="Support" 
                            desc="24/7 dedicated support to ensure your success." 
                            index={5}
                            isMobile={true}
                        />
                    </div>
                </div>
            </section>

            {/* Desktop Version */}
            <section
                ref={containerRef}
                className="relative min-h-screen w-full hidden md:flex flex-row items-center justify-center gap-6 px-6 py-20 bg-black overflow-hidden"
            >
                {/* Left Column */}
                <div
                    ref={leftColumnRef}
                    className="w-1/4 flex flex-col gap-6 z-10"
                >
                    <Card title="Strategy" desc="Data-driven insights to guide your digital transformation journey." />
                    <Card title="Design" desc="Creating intuitive and beautiful user experiences that convert." />
                    <Card title="Development" desc="Robust and scalable solution utilizing cutting-edge tech." />
                </div>

                {/* Center Column (Hero) */}
                <div
                    ref={centerCardRef}
                    className="w-2/5 h-[70vh] relative rounded-2xl overflow-hidden z-20 group"
                >
                    <CenterCard />
                </div>

                {/* Right Column */}
                <div
                    ref={rightColumnRef}
                    className="w-1/4 flex flex-col gap-6 z-10"
                >
                    <Card title="Marketing" desc="Targeted campaigns that reach your audience effectively." />
                    <Card title="Analytics" desc="Real-time data monitoring to optimize performance." />
                    <Card title="Support" desc="24/7 dedicated support to ensure your success." />
                </div>
            </section>
        </>
    );
};

export default PinnedScrollSection;
