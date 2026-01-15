import React, { useRef, useEffect, useState } from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Founder {
  id: number;
  name: string;
  title: string;
  tagline: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const FounderCard: React.FC<{ founder: Founder; index: number }> = ({ founder, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Move glow to follow cursor
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    setIsHovered(false);
    
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          y: 80,
          rotateX: 10,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      className="relative group"
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div
        ref={cardRef}
        className="relative rounded-3xl overflow-hidden cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.9) 0%, rgba(10, 10, 15, 0.95) 100%)',
          border: '1px solid rgba(168, 85, 247, 0.15)',
        }}
      >
        {/* Animated glow that follows cursor */}
        <div
          ref={glowRef}
          className="absolute w-64 h-64 rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
            filter: 'blur(40px)',
            opacity: isHovered ? 1 : 0,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Border glow on hover */}
        <div
          className="absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(124, 58, 237, 0.1) 50%, rgba(192, 132, 252, 0.3) 100%)',
            opacity: isHovered ? 1 : 0,
            padding: '1px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMaskComposite: 'xor',
          }}
        />

        {/* Main Content */}
        <div className="relative p-6 sm:p-8" ref={contentRef}>
          {/* Image Section */}
          <div 
            ref={imageRef}
            className="relative mx-auto mb-6 overflow-hidden rounded-2xl"
            style={{
              transform: 'translateZ(30px)',
            }}
          >
            {/* Image container with aspect ratio */}
            <div className="relative aspect-[4/5] w-full max-w-[280px] mx-auto overflow-hidden rounded-2xl">
              {/* Animated border */}
              <div
                className="absolute inset-0 rounded-2xl z-10 pointer-events-none transition-opacity duration-500"
                style={{
                  background: `conic-gradient(from 0deg, #7c3aed, #a855f7, #c084fc, #7c3aed)`,
                  padding: '2px',
                  opacity: isHovered ? 1 : 0.3,
                  animation: isHovered ? 'spin 3s linear infinite' : 'none',
                }}
              >
                <div className="w-full h-full rounded-2xl bg-[#0a0a0f]" />
              </div>

              {/* Actual image */}
              <div className="absolute inset-[3px] rounded-xl overflow-hidden z-20">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
                  }}
                />
                
                {/* Overlay gradient */}
                <div 
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(180deg, transparent 40%, rgba(10, 10, 15, 0.9) 100%)',
                    opacity: isHovered ? 0.7 : 0.5,
                  }}
                />

                {/* Shine effect on hover */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, transparent 50%)',
                    opacity: isHovered ? 1 : 0,
                    animation: isHovered ? 'shine 1.5s ease-in-out infinite' : 'none',
                  }}
                />
              </div>
            </div>

            {/* Floating particles around image */}
            {isHovered && (
              <>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-purple-400"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animation: `float ${2 + Math.random()}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 0.5}s`,
                      opacity: 0.6,
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Text Content */}
          <div 
            className="text-center"
            style={{ transform: 'translateZ(20px)' }}
          >
            {/* Name with gradient */}
            <h3 
              className="text-2xl sm:text-3xl font-bold mb-2 transition-all duration-300"
              style={{
                background: isHovered 
                  ? 'linear-gradient(135deg, #ffffff 0%, #c084fc 50%, #a855f7 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {founder.name}
            </h3>

            {/* Title */}
            <p 
              className="text-purple-400 font-semibold text-sm mb-3 tracking-wide uppercase transition-all duration-300"
              style={{
                letterSpacing: isHovered ? '0.15em' : '0.1em',
              }}
            >
              {founder.title}
            </p>

            {/* One-liner */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto mb-6">
              {founder.tagline}
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-3">
              {founder.socials.linkedin && (
                <a
                  href={founder.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/social relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden"
                  style={{
                    background: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.15, duration: 0.3 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                  <Linkedin className="w-5 h-5 text-purple-400 group-hover/social:text-white relative z-10 transition-colors duration-300" />
                </a>
              )}
              {founder.socials.twitter && (
                <a
                  href={founder.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/social relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden"
                  style={{
                    background: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.15, duration: 0.3 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                  <Twitter className="w-5 h-5 text-purple-400 group-hover/social:text-white relative z-10 transition-colors duration-300" />
                </a>
              )}
              {founder.socials.github && (
                <a
                  href={founder.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/social relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden"
                  style={{
                    background: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.15, duration: 0.3 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                  <Github className="w-5 h-5 text-purple-400 group-hover/social:text-white relative z-10 transition-colors duration-300" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500"
          style={{
            background: isHovered 
              ? 'linear-gradient(90deg, transparent, #7c3aed, #a855f7, #c084fc, #a855f7, #7c3aed, transparent)'
              : 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.3), transparent)',
          }}
        />
      </div>
    </div>
  );
};

const Founders: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const founders: Founder[] = [
    {
      id: 1,
      name: 'Alex Chen',
      title: 'Co-Founder & CEO',
      tagline: 'Ex-Google engineer democratizing AI automation for businesses worldwide.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&fit=crop',
      socials: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
      },
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      title: 'Co-Founder & CTO',
      tagline: 'Ex-Meta tech lead building scalable infrastructure for the future.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&fit=crop',
      socials: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
      },
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[180px] opacity-15"
          style={{
            background: 'radial-gradient(circle, #7c3aed 0%, transparent 60%)',
            top: '-20%',
            left: '-20%',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
          style={{
            background: 'radial-gradient(circle, #a855f7 0%, transparent 60%)',
            bottom: '-10%',
            right: '-10%',
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            <span className="text-white">Meet the </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 50%, #c084fc 100%)',
              }}
            >
              Founders
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
            Industry veterans on a mission to revolutionize business automation.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {founders.map((founder, index) => (
            <FounderCard key={founder.id} founder={founder} index={index} />
          ))}
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-15px) scale(1.2); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Founders;
