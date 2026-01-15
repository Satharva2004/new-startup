import React from 'react';
import { Linkedin, Twitter, Github, ArrowRight } from 'lucide-react';

const Founders: React.FC = () => {
  const founders = [
    {
      id: 1,
      name: 'Alex Chen',
      title: 'Co-Founder & CEO',
      bio: 'Former Google engineer with 10+ years building scalable systems. Passionate about democratizing AI technology.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&fit=crop',
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
      bio: 'Ex-Meta tech lead specializing in distributed systems. Building the infrastructure for tomorrow\'s applications.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&fit=crop',
      socials: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
      },
    },
  ];

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6">
        {/* Simple Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
            Meet Our <span className="text-purple-400">Founders</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Two industry veterans on a mission to revolutionize how businesses leverage technology.
          </p>
        </div>

        {/* Founders Cards - Simple Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((founder) => (
            <div
              key={founder.id}
              className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-8 flex flex-col items-center text-center"
            >
              {/* Image - Simple Rounded */}
              <div className="w-32 h-32 rounded-2xl overflow-hidden mb-6 border border-gray-800 shadow-lg">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {founder.name}
              </h3>
              <p className="text-purple-400 font-medium mb-4 text-sm">
                {founder.title}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                {founder.bio}
              </p>

              {/* Simple Social Links & Connect */}
              <div className="mt-auto w-full flex items-center justify-center gap-4">
                {founder.socials.linkedin && (
                  <a
                    href={founder.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {founder.socials.twitter && (
                  <a
                    href={founder.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {founder.socials.github && (
                  <a
                    href={founder.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - Simple Text Link */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Want to join our team?
          </p>
          <a
            href="#careers"
            className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
          >
            View Open Positions
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Founders;
