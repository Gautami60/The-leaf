import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X, MapPin, Clock, Settings } from 'lucide-react';

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
    { name: 'THE VENUE', href: '#home' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'MENU', href: '#menu' },
    { name: 'ARCHIVE', href: '#whats-new' },
    { name: 'VISIT', href: '#visit' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#reservation') {
      onOpenReservation();
      return;
    }
    if (href === '#cms-portal') {
      onOpenCms();
      return;
    }
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
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0d0f0e]/95 backdrop-blur-md border-b border-[#4c463c]/40 py-3 shadow-2xl'
            : 'bg-[#0d0f0e]/85 backdrop-blur-md border-b border-[#4c463c]/30 py-4'
        }`}
      >
        <div className="h-16 max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Official Brand Lockup */}
          <div className="flex items-center gap-3">
            <img
              src="/images/the_leaf_official_logo.png"
              alt="The Leaf Café Emblem"
              className="h-8 w-auto object-contain opacity-90"
            />
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="font-headline-sm text-2xl font-serif text-[#e2e3e0] hover:text-[#dac498] transition-colors tracking-tight select-none"
            >
              THE LEAF.
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-label-caps text-xs tracking-[0.18em] uppercase text-[#cfc5b7]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-[#e2e3e0] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-[#dac498] text-[#dac498] font-label-caps text-[11px] uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#dac498] hover:text-[#3c2e0f] cursor-pointer"
            >
              RESERVE A TABLE
            </button>

            <button
              onClick={onOpenCms}
              className="w-8 h-8 rounded-full bg-[#dac498] hover:bg-[#b9a47a] text-[#3c2e0f] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
              title="CMS Admin / Portal"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>

            {/* Mobile Hamburger Trigger */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="p-1.5 text-[#e2e3e0] hover:text-[#dac498] transition-colors focus:outline-none cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Fullscreen Glass Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0d0f0e]/98 backdrop-blur-2xl flex flex-col justify-between px-8 pt-28 pb-12 lg:hidden"
          >
            <div className="flex flex-col space-y-6">
              <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-[#dac498]">
                NAVIGATION
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-headline-md text-3xl text-[#e2e3e0] hover:text-[#dac498] transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCms();
                }}
                className="text-left font-label-caps text-xs text-[#dac498] flex items-center gap-2 pt-4 border-t border-[#4c463c]/30"
              >
                <Settings className="w-4 h-4" />
                <span>OPEN CMS PORTAL ⚙️</span>
              </button>
            </div>

            <div className="space-y-6 pt-6 border-t border-[#4c463c]/30">
              <div className="space-y-2 text-xs text-[#cfc5b7] font-body-sm">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#dac498]" />
                  1st Floor, E7/161, Arera Colony, Bhopal
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#dac498]" />
                  Open Daily: 11:00 AM – 11:30 PM
                </p>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3.5 bg-[#dac498] text-[#3c2e0f] hover:bg-[#b9a47a] text-xs font-label-caps uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>RESERVE A TABLE</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

