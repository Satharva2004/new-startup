import React, { useRef, useEffect } from 'react';
import { Linkedin, Twitter, Github, Brain, Code2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Founders: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const founders = [
    {
      id: 1,
      name: 'Alex Chen',
      title: 'Co-Founder & CEO',
      tagline: 'Building the future of automation',
      bio: 'Former Google engineer with 10+ years building scalable systems. Led teams that shipped products to 100M+ users. Now democratizing AI for businesses of all sizes.',
      image: '/img/jack-hunter-1L4E_lsIb9Q-unsplash.jpg',
      achievements: ['Ex-Google', '100M+ Users', '15+ Patents'],
      icon: Brain,
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
      tagline: 'Architecting tomorrow\'s infrastructure',
      bio: 'Ex-Meta tech lead specializing in distributed systems and ML infrastructure. Built systems processing 1B+ events daily. Passionate about elegant, scalable solutions.',
      image: '/img/federico-scarionati-EomurrCz3dk-unsplash.jpg',
      achievements: ['Ex-Meta', '1B+ Events/Day', 'Stanford CS'],
      icon: Code2,
      socials: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
      },
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

      // Card 1 - slide in from left
      gsap.fromTo(
        card1Ref.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card1Ref.current,
            start: 'top 80%',
          },
        }
      );

      // Card 2 - slide in from right
      gsap.fromTo(
        card2Ref.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: card2Ref.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-[#050505]"
    >
      {/* Minimal Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle mesh gradients */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(168,85,247,0.08),transparent_70%)]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,58,237,0.06),transparent_70%)]" />
        </div>

        {/* Minimal grid */}
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
        {/* Header Section */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 sm:mb-6">
            <span className="text-white">Meet the </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200">
              Visionaries
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal px-2">
            Two industry pioneers who left Big Tech to build something extraordinary.
            <br className="hidden sm:block" />
            Combined 20+ years of experience from Google, Meta, and Stanford.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 md:mb-20">
          {founders.map((founder, index) => {
            const cardRef = index === 0 ? card1Ref : card2Ref;
            const Icon = founder.icon;

            return (
              <div
                key={founder.id}
                ref={cardRef}
                className="group relative"
              >
                {/* Card with Full Background Image */}
                <div className="relative rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.01] h-[350px] sm:h-[400px] md:h-[450px]">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Dark Overlay Filter */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />

                  {/* Purple Accent Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-violet-900/20 opacity-60" />

                  {/* Border with gradient */}
                  <div className="absolute inset-0 rounded-2xl border border-purple-500/30 group-hover:border-purple-400/50 transition-colors duration-500" />

                  {/* Content - positioned at bottom */}
                  <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">


                    {/* Name & Title */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 tracking-tight drop-shadow-lg">
                        {founder.name}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-purple-300 drop-shadow-md">
                        {founder.title}
                      </p>
                    </div>

                    {/* Social Links - Show on Hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3">
                      <span className="text-[10px] sm:text-xs text-gray-300 font-medium drop-shadow-md">Connect:</span>
                      {founder.socials.linkedin && (
                        <a
                          href={founder.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white hover:text-white bg-black/40 hover:bg-purple-500/40 backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-purple-400/50 shadow-lg"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {founder.socials.twitter && (
                        <a
                          href={founder.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white hover:text-white bg-black/40 hover:bg-purple-500/40 backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-purple-400/50 shadow-lg"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {founder.socials.github && (
                        <a
                          href={founder.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white hover:text-white bg-black/40 hover:bg-purple-500/40 backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-purple-400/50 shadow-lg"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modern CTA Section */}
        <div className="mt-16 sm:mt-24 md:mt-32 max-w-4xl mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-transparent to-violet-500/20 p-[1px]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#050505]" />
            </div>

            {/* Subtle background */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.15),transparent_60%)]" />
            </div>

            {/* Border glow */}
            <div className="absolute inset-0 rounded-2xl border border-white/5" />

            {/* Content */}
            <div className="relative p-8 sm:p-12 md:p-16 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight tracking-tight">
                Let AI do the Work so<br className="hidden md:block" />
                you can Scale Faster
              </h2>

              <p className="text-gray-400 text-base sm:text-lg font-normal mb-6 sm:mb-8">
                Book a Call Today and Start Automating
              </p>

              <a
                href="https://wa.me/919136239673?text=Hey%20I%20want%20to%20automate%20my%20workflow"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                Book a free call
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founders;
