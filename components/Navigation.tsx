import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center bg-transparent pointer-events-none">
      {/* Logo */}
      <div className="text-lg font-medium tracking-tight pointer-events-auto cursor-pointer flex items-center gap-1 text-white">
        <span className="font-serif italic text-xl mr-1">⌘</span> Delphi
      </div>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full pointer-events-auto border border-white/10">
        <div className="flex items-center gap-8">
          {['Use Cases', 'Discover', 'About'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium transition-colors duration-300 text-gray-400 hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pointer-events-auto">
        <button className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 group bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-500 hover:to-violet-500 hover:shadow-lg hover:shadow-purple-500/25">
          Get started now <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;