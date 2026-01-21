import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on window resize to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 sm:gap-2 md:gap-3 p-1.5 sm:p-2 md:p-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20 pointer-events-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:w-auto md:min-w-[600px] max-w-4xl">
        {/* Logo */}
        <Link to="/" className="pl-3 sm:pl-4 md:pl-5 pr-1.5 sm:pr-2 md:pr-3 text-base sm:text-lg font-medium tracking-tight text-white flex items-center gap-0.5 sm:gap-1 hover:opacity-80 transition-opacity whitespace-nowrap">
          <span className="font-serif italic text-lg sm:text-xl">⌘</span> <span className="hidden sm:inline">Delphi</span>
        </Link>

        {/* Separator */}
        <div className="w-px h-5 md:h-6 bg-white/10 mx-1 md:mx-2 hidden md:block" />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 px-2 md:px-3 flex-1 justify-center">
          <a
            href="#services"
            className="text-sm font-medium transition-colors duration-300 text-gray-400 hover:text-white relative group"
          >
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <Link
            to="/case-studies"
            className="text-sm font-medium transition-colors duration-300 text-gray-400 hover:text-white relative group"
          >
            Case Studies
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <a
            href="#about"
            className="text-sm font-medium transition-colors duration-300 text-gray-400 hover:text-white relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="ml-auto hidden md:block pr-2 md:pr-3">
          <a
            href="https://wa.me/919136239673?text=Hey%20I%20want%20to%20automate%20my%20workflow"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 group bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-500 hover:to-violet-500 hover:shadow-lg hover:shadow-purple-500/25 whitespace-nowrap"
          >
            Get started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="ml-auto md:hidden p-2 rounded-full hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-24 left-4 right-4 bg-dark-lighter rounded-2xl border border-white/10 p-6 shadow-2xl transition-all duration-300 ${isMobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0'
            }`}
        >
          <div className="flex flex-col gap-4">
            {/* Mobile Links */}
            <a
              href="#services"
              onClick={handleLinkClick}
              className="text-lg font-medium transition-colors duration-300 text-gray-400 hover:text-white py-3 px-4 rounded-lg hover:bg-white/5"
            >
              Services
            </a>
            <Link
              to="/case-studies"
              onClick={handleLinkClick}
              className="text-lg font-medium transition-colors duration-300 text-gray-400 hover:text-white py-3 px-4 rounded-lg hover:bg-white/5"
            >
              Case Studies
            </Link>
            <a
              href="#about"
              onClick={handleLinkClick}
              className="text-lg font-medium transition-colors duration-300 text-gray-400 hover:text-white py-3 px-4 rounded-lg hover:bg-white/5"
            >
              About
            </a>

            {/* Mobile CTA */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <a
                href="https://wa.me/919136239673?text=Hey%20I%20want%20to%20automate%20my%20workflow"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="w-full px-6 py-3 rounded-full text-base font-medium transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-500 hover:to-violet-500 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
