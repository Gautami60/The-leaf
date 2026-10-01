import React, { useState } from 'react';
import { ArrowRight, Utensils, Sparkles, Image as ImageIcon } from 'lucide-react';
import { LEAF_IMAGE_ASSETS } from '../data/imageAssets';

interface HeroProps {
  onExploreMenu: () => void;
  onWhatsNew: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onWhatsNew }) => {
  const [currentBg, setCurrentBg] = useState<'balcony' | 'interior'>('balcony');

  const bgUrl = currentBg === 'balcony'
    ? LEAF_IMAGE_ASSETS.hero.url
    : LEAF_IMAGE_ASSETS.interior_main.url;

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#12100e]"
    >
      {/* Real Photography Background (Authentic The Leaf Balcony & Interior) */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgUrl}
          alt="The Leaf. Cafe & Brew Real Atmosphere in Bhopal"
          className="w-full h-full object-cover brightness-[0.72] contrast-[1.05] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
        {/* Subtle dark editorial overlay to ensure pristine typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-[#12100e]/40 to-[#12100e]/75 opacity-95" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#12100e]/20 to-[#12100e]/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center pt-28 pb-16 flex flex-col items-center">
        
        {/* Real Cafe View Switcher Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#1c1815]/90 border border-[#2e2722] backdrop-blur-md mb-8 shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7d8c79] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#faf7f2] font-mono font-medium">
            THE LEAF · CAFE & BREW
          </span>
          <span className="h-3 w-[1px] bg-[#2e2722]" />
          
          {/* Quick Toggle between Real Balcony & Real Interior */}
          <button
            onClick={() => setCurrentBg(currentBg === 'balcony' ? 'interior' : 'balcony')}
            className="text-[10px] font-mono text-[#7d8c79] hover:text-[#eae3d2] uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
            title="Switch Real View"
          >
            <ImageIcon className="w-3 h-3" />
            <span>View {currentBg === 'balcony' ? 'Indoor Lounge ➔' : 'Balcony View ➔'}</span>
          </button>
        </div>

        {/* Big Cormorant Garamond Heading */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#faf7f2] font-normal leading-[1.08] mb-8 max-w-4xl">
          Good coffee.<br />
          <span className="italic font-serif text-[#eae3d2]">Good food.</span><br />
          Good company.
        </h1>

        {/* Supporting text */}
        <p className="text-base md:text-xl text-[#c4bcae] font-serif italic max-w-2xl leading-relaxed mb-12">
          A cozy corner in Arera Colony for slow mornings, long conversations and everything worth staying for.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 bg-[#faf7f2] hover:bg-[#eae3d2] text-[#12100e] text-xs font-manrope font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4 text-[#593e2b]" />
            <span>EXPLORE THE MENU</span>
          </button>

          <button
            onClick={onWhatsNew}
            className="w-full sm:w-auto group px-8 py-4 bg-[#1c1815]/90 hover:bg-[#2e2722] text-[#faf7f2] border border-[#2e2722] hover:border-[#7d8c79]/60 text-xs font-manrope font-bold uppercase tracking-widest rounded-full transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[#7d8c79]" />
            <span>WHAT'S NEW</span>
            <ArrowRight className="w-4 h-4 text-[#7d8c79] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Real Cafe View Label at Bottom */}
      <div className="absolute bottom-8 left-6 z-10 hidden md:flex items-center gap-2 text-[11px] font-mono text-[#c4bcae]/80 bg-[#12100e]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#2e2722]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7d8c79]" />
        <span>AUTHENTIC PHOTOGRAPH: {currentBg === 'balcony' ? 'Real 1st Floor Balcony, Arera Colony' : 'Real Main Indoor Lounge & Bar'}</span>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c4bcae]/60 font-mono">SCROLL</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#7d8c79] to-transparent animate-pulse" />
      </div>
    </section>
  );
};
