import React from 'react';

const LifecycleIntro: React.FC = () => {
    return (
        <section className="bg-[#050505] pt-12 sm:pt-16 md:pt-24 pb-4 md:pb-2">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                <div className="space-y-4 text-white w-full max-w-5xl mx-auto text-center">
                    <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight px-2">
                            Drive value across the{" "}
                            <span className="text-purple-400">customer lifecycle</span>
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap px-2">
                                <span className="inline-block px-3 sm:px-4 py-1 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 text-sm sm:text-base md:text-xl font-bold">
                                    Each touchpoint
                                </span>
                                <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500">=</span>
                                <span className="inline-block px-3 sm:px-4 py-1 rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30 text-sm sm:text-base md:text-xl font-bold">
                                    Revenue opportunity
                                </span>
                            </div>

                            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-400 max-w-2xl mx-auto px-2">
                                At each stage, Business Messaging plays a pivotal role,
                                unblocking cost savings and new revenue opportunities while
                                emphasizing retention.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LifecycleIntro;
