import React from 'react';
import { ArrowUp, Globe, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e0c0a] text-[#faf7f2] pt-20 pb-12 border-t border-[#2e2722]/80 font-manrope">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2e2722]/60">
          
          {/* Logo & Tagline */}
          <div className="md:col-span-5 space-y-6">
            <a href="#home" className="flex items-center gap-3 text-3xl font-serif tracking-tight group">
              <img
                src="/images/the_leaf_official_logo.png"
                alt="The Leaf. Logo"
                className="h-10 w-auto object-contain rounded-full border border-[#7d8c79]/30 group-hover:scale-105 transition-transform"
              />
              <span className="font-serif">The Leaf<span className="text-[#7d8c79]">.</span></span>
            </a>

            <p className="text-sm text-[#c4bcae] font-serif italic max-w-sm leading-relaxed">
              “A cozy corner in Arera Colony for slow mornings, long conversations and everything worth staying for.”
            </p>

            <div className="flex items-center gap-4 text-[#c4bcae]">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#1c1815] border border-[#2e2722] hover:text-[#7d8c79] hover:border-[#7d8c79]/50 transition-colors" aria-label="Instagram">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#1c1815] border border-[#2e2722] hover:text-[#7d8c79] hover:border-[#7d8c79]/50 transition-colors" aria-label="Social Share">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7d8c79]">EXPLORE</span>
            <ul className="space-y-2.5 text-xs uppercase tracking-widest text-[#c4bcae] font-mono">
              <li><a href="#story" className="hover:text-[#faf7f2] transition-colors">Our Story</a></li>
              <li><a href="#menu" className="hover:text-[#faf7f2] transition-colors">Signature Menu</a></li>
              <li><a href="#experience" className="hover:text-[#faf7f2] transition-colors">The Atmosphere</a></li>
              <li><a href="#visit" className="hover:text-[#faf7f2] transition-colors">Visit & Location</a></li>
            </ul>
          </div>

          {/* Location & Contact Info */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7d8c79]">FIND US</span>
            <div className="space-y-3 text-xs text-[#c4bcae]">
              <p className="leading-relaxed">
                <strong className="text-[#faf7f2] font-semibold block font-serif text-sm">The Leaf. – Cafe & Brew</strong>
                1st Floor, E7/161, E-7, Arera Colony,<br />
                Bhopal, Madhya Pradesh 462016
              </p>
              <p>
                <span className="text-[#7d8c79] font-mono">HOURS:</span> 11:00 AM – 11:30 PM (Daily)
              </p>
              <p>
                <span className="text-[#7d8c79] font-mono">TEL:</span> +91 755 492 8899
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#c4bcae]/60">
          <p>© {new Date().getFullYear()} The Leaf. – Cafe & Brew, Bhopal. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#faf7f2] transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#7d8c79]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
