import React from 'react';

type GlowingCardProps = {
    children: React.ReactNode;
    className?: string;
};

const GlowingCard: React.FC<GlowingCardProps> = ({ children, className = '' }) => {
    return (
        <div className={`relative overflow-hidden p-[1px] ${className}`}>
            <span className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1a1a1a_0%,#1a1a1a_30%,#a855f7_40%,#ffffff_50%,#a855f7_60%,#1a1a1a_70%,#1a1a1a_100%)] blur-lg opacity-80" />
            <span className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1a1a1a_0%,#1a1a1a_30%,#a855f7_40%,#ffffff_50%,#a855f7_60%,#1a1a1a_70%,#1a1a1a_100%)]" />

            {/* Main Card Content Container */}
            <div
                className="relative h-full w-full bg-[#0d0d0d] backdrop-blur-sm"
                style={{
                    borderRadius: 'inherit'
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default GlowingCard;
