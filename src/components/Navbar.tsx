import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Calendar, MapPin, Clock, Settings } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenCms: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenCms,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Story', href: '#story' },
    { name: 'Menu', href: '#menu' },
    { name: "What's New", href: '#whats-new' },
    { name: 'Offers', href: '#offers' },
    { name: 'Visit', href: '#visit' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'bg-[#12100e]/92 backdrop-blur-md border-b border-[#2e2722]/80 py-4 shadow-2xl'
            : 'bg-gradient-to-b from-[#12100e]/90 via-[#12100e]/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo with Official Uploaded Logo Asset */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="group flex items-center gap-3 text-2xl md:text-3xl font-serif text-[#faf7f2] tracking-tight hover:opacity-95 transition-all"
          >
            <img
              src="/images/the_leaf_official_logo.png"
              alt="The Leaf. Official Logo"
              className="h-10 md:h-12 w-auto object-contain rounded-full shadow-md group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 border border-[#7d8c79]/30"
            />
            <span className="font-serif font-medium tracking-tight">The Leaf<span className="text-[#7d8c79]">.</span></span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-widest uppercase text-[#faf7f2]/80 font-manrope font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative py-1 transition-colors duration-300 hover:text-[#faf7f2] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#7d8c79] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            
            {/* CMS / Staff Portal Toggle */}
            <button
              onClick={onOpenCms}
              className="px-3.5 py-2 text-[11px] font-mono uppercase tracking-wider text-[#c4bcae] hover:text-[#faf7f2] bg-[#1c1815] border border-[#2e2722] hover:border-[#7d8c79]/50 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
              title="Open CMS / Content Manager"
            >
              <Settings className="w-3.5 h-3.5 text-[#7d8c79]" />
              <span>CMS Portal ⚙️</span>
            </button>

            {/* Reserve Table CTA */}
            <button
              onClick={onOpenReservation}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-manrope font-bold text-[#12100e] bg-[#faf7f2] hover:bg-[#eae3d2] rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#593e2b]" />
              <span>Reserve a Table</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={onOpenCms}
              className="p-2 text-[#7d8c79]"
              title="CMS Admin"
            >
              <Settings className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 text-[#faf7f2] hover:text-[#7d8c79] transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Fullscreen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#12100e]/98 backdrop-blur-xl flex flex-col justify-between px-8 pt-28 pb-12 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col space-y-6">
          <div className="text-xs uppercase tracking-widest text-[#7d8c79] font-mono">Navigation</div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-serif text-3xl text-[#faf7f2] hover:text-[#7d8c79] transition-colors"
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCms();
            }}
            className="text-left font-mono text-sm text-[#7d8c79] flex items-center gap-2 pt-4 border-t border-[#2e2722]"
          >
            <Settings className="w-4 h-4" />
            <span>Open Cafe CMS Manager ⚙️</span>
          </button>
        </div>

        <div className="space-y-6 pt-6 border-t border-[#2e2722]/80">
          <div className="space-y-2 text-xs text-[#c4bcae]">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#7d8c79]" />
              1st Floor, E7/161, E-7, Arera Colony, Bhopal
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7d8c79]" />
              Open Daily: 11:00 AM – 11:30 PM
            </p>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReservation();
            }}
            className="w-full py-3.5 text-xs uppercase tracking-widest font-manrope font-bold text-[#12100e] bg-[#faf7f2] active:bg-[#eae3d2] rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Calendar className="w-4 h-4 text-[#593e2b]" />
            Reserve a Table
          </button>
        </div>
      </div>
    </>
  );
};
