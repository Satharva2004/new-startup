import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LifecycleStage {
    id: number;
    name: string;
    position: { x: number; y: number };
    items: string[];
    delay: number;
}

const lifecycleStages: LifecycleStage[] = [
    {
        id: 1,
        name: "DISCOVERY",
        position: { x: 0, y: 20 },
        items: ["Discover new product", "Receive seasonal promotion"],
        delay: 0
    },
    {
        id: 2,
        name: "CONSIDERATION",
        position: { x: 40, y: 15 },
        items: ["Revisit wishlist", "Ask about product"],
        delay: 0.2
    },
    {
        id: 3,
        name: "AWARENESS",
        position: { x: 75, y: 30 },
        items: ["Review loyalty offers", "Compare products"],
        delay: 0.4
    },
    {
        id: 4,
        name: "PURCHASE",
        position: { x: 70, y: 65 },
        items: ["Buy product", "Browse catalog"],
        delay: 0.6
    },
    {
        id: 5,
        name: "POST-PURCHASE",
        position: { x: 35, y: 65 },
        items: ["Send support query", "Track order"],
        delay: 0.8
    },
    {
        id: 6,
        name: "RE-ENGAGEMENT",
        position: { x: -5, y: 60 },
        items: ["Automated follow-ups recover 30% lost revenue opportunities", "Personalized messaging drives higher conversion rates"],
        delay: 1.0
    }
];

// Scroll distance multiplier - how many viewport heights to scroll through
const SCROLL_MULTIPLIER = 2;

export const CustomerLifecycleSection = () => {
    const [visibleStages, setVisibleStages] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [smoothProgress, setSmoothProgress] = useState(0);
    const [isFixed, setIsFixed] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);

    // Continuously update smooth progress for buttery animations
    useEffect(() => {
        let animationId: number;
        const animate = () => {
            setSmoothProgress(prev => {
                const diff = scrollProgress - prev;
                if (Math.abs(diff) < 0.001) return scrollProgress;
                return prev + diff * 0.12;
            });
            animationId = requestAnimationFrame(animate);
        };
        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [scrollProgress]);

    // Update visible stages based on smooth progress
    useEffect(() => {
        const stagesToShow = Math.floor(smoothProgress * lifecycleStages.length * 1.2);
        const newVisibleStages = lifecycleStages
            .slice(0, Math.min(lifecycleStages.length, stagesToShow + 1))
            .map(stage => stage.id);
        setVisibleStages(newVisibleStages);
    }, [smoothProgress]);

    // Scroll-based progress calculation with fixed positioning control
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const scrollDistance = windowHeight * SCROLL_MULTIPLIER;

            // Before section - not yet in view
            if (rect.top > 0) {
                setIsFixed(false);
                setIsAtBottom(false);
                setScrollProgress(0);
                return;
            }

            // After section - scrolled past
            if (rect.bottom <= windowHeight) {
                setIsFixed(false);
                setIsAtBottom(true);
                setScrollProgress(1);
                return;
            }

            // In the section - calculate progress
            const scrolledIntoSection = -rect.top;
            const progress = Math.max(0, Math.min(1, scrolledIntoSection / scrollDistance));

            setIsFixed(true);
            setIsAtBottom(false);
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Calculate content position style
    const getContentStyle = (): React.CSSProperties => {
        if (isFixed) {
            return {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '100vh',
                zIndex: 10,
            };
        }

        if (isAtBottom) {
            return {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '100vh',
            };
        }

        return {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100vh',
        };
    };

    return (
        <>
            {/* Mobile: straight timeline - no pinning needed */}
            <section id="lifecycle" className="md:hidden bg-[#050505]">
                <div className="container mx-auto px-6 py-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Drive value across the customer lifecycle</h2>
                    <div className="relative pl-6">
                        <span className="absolute left-2 top-0 bottom-0 w-0.5 bg-purple-500/30" />
                        {lifecycleStages.map((stage, idx) => (
                            <motion.div
                                key={stage.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-20% 0px -10% 0px" }}
                                transition={{ duration: 0.5, delay: 0.05 * idx }}
                                className="relative mb-6 pr-6"
                            >
                                <span className="absolute -left-0.5 top-2 w-2 h-2 rounded-full bg-purple-500" />
                                <div className="bg-purple-500/10 backdrop-blur-sm rounded-xl shadow-md p-4 border border-purple-500/20">
                                    <div className="text-xs font-bold text-purple-400 mb-2">{stage.name}</div>
                                    <ul className="space-y-2">
                                        {stage.items.map((it, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                                                <span>{it}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Desktop/Tablet: Fixed scroll-driven animation */}
            <section
                id="lifecycle-desktop"
                ref={containerRef}
                className="hidden md:block relative bg-[#050505]"
                style={{
                    height: `${100 + (100 * SCROLL_MULTIPLIER)}vh`
                }}
            >
                {/* Content container - position controlled by JS */}
                <div
                    className="bg-[#050505]"
                    style={getContentStyle()}
                >
                    {/* Content wrapper - centered both vertically and horizontally */}
                    <div className="h-full flex items-center justify-center">
                        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            {/* Left Content - no entrance animation to prevent stutter */}
                            <div className="space-y-8 text-white">
                                <div className="space-y-4">
                                    <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                                        Drive value across the{" "}
                                        <span className="text-purple-400">customer lifecycle</span>
                                    </h2>

                                    <div className="space-y-4"
                                    >
                                        <div className="flex items-center justify-start gap-3 sm:gap-4 flex-wrap">
                                            <span className="inline-block px-4 py-1 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 text-base sm:text-xl font-bold">
                                                Each touchpoint
                                            </span>
                                            <span className="text-xl sm:text-2xl font-bold text-gray-500">=</span>
                                            <span className="inline-block px-4 py-1 rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30 text-base sm:text-xl font-bold">
                                                Revenue opportunity
                                            </span>
                                        </div>

                                        <p className="text-base sm:text-lg leading-relaxed text-gray-400 max-w-lg">
                                            At each stage, Business Messaging plays a pivotal role,
                                            unblocking cost savings and new revenue opportunities while
                                            emphasizing retention.
                                        </p>
                                    </div>
                                </div>

                            </div>


                            {/* Right Side - Infinity Loop Diagram */}
                            <div className="relative h-[420px] sm:h-[520px] lg:h-[600px] w-full">
                                {/* Infinity Loop Path */}
                                <svg
                                    className="absolute inset-0 w-full h-full"
                                    viewBox="0 0 400 300"
                                    style={{
                                        opacity: smoothProgress > 0 ? 1 : 0,
                                        transition: 'opacity 0.8s ease-out'
                                    }}
                                >
                                    <defs>
                                        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                                            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                                            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M 80 150 C 80 80 160 80 200 150 C 240 220 320 220 320 150 C 320 80 240 80 200 150 C 160 220 80 220 80 150"
                                        fill="none"
                                        stroke="url(#pathGradient)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        style={{
                                            strokeDasharray: 1000,
                                            strokeDashoffset: 1000 - (1000 * smoothProgress),
                                            transition: 'none' // Smooth progress handles this
                                        }}
                                    />
                                </svg>

                                {/* Lifecycle Stages */}
                                <AnimatePresence>
                                    {lifecycleStages.map((stage) => (
                                        visibleStages.includes(stage.id) && (
                                            <motion.div
                                                key={stage.id}
                                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{
                                                    duration: 0.5,
                                                    ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smoother feel
                                                }}
                                                className="absolute"
                                                style={{
                                                    left: `${stage.position.x}%`,
                                                    top: `${stage.position.y}%`,
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                            >
                                                {/* Stage Label */}
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1, duration: 0.4 }}
                                                    className="mb-3 sm:mb-4"
                                                >
                                                    <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-center">
                                                        <span className="text-xs sm:text-sm font-bold text-purple-300 whitespace-nowrap">
                                                            {stage.name}
                                                        </span>
                                                    </div>
                                                </motion.div>

                                                {/* Items Card */}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2, duration: 0.4 }}
                                                >
                                                    <div className="rounded-xl border bg-[#0a0a0a]/90 backdrop-blur-md shadow-xl shadow-purple-500/5 p-3 sm:p-3.5 max-w-[160px] sm:max-w-[180px] border-purple-500/20">
                                                        <ul className="space-y-1.5 sm:space-y-1.5">
                                                            {stage.items.map((item, index) => (
                                                                <motion.li
                                                                    key={index}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.25 + index * 0.08, duration: 0.3 }}
                                                                    className="flex items-start space-x-2 text-[11px] sm:text-xs"
                                                                >
                                                                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                                                                    <span className="text-gray-300">{item}</span>
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        )
                                    ))}
                                </AnimatePresence>

                                {/* Center Icon */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: visibleStages.length >= 3 ? 1 : 0,
                                        scale: visibleStages.length >= 3 ? 1 : 0
                                    }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                >
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default CustomerLifecycleSection;