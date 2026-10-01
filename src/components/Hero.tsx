import React from 'react';
import { ArrowRight, Utensils, Sparkles } from 'lucide-react';
import { LEAF_IMAGE_ASSETS } from '../data/imageAssets';

interface HeroProps {
  onExploreMenu: () => void;
  onWhatsNew: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onWhatsNew }) => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#12100e]"
    >
      {/* Real Balcony Photography Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={LEAF_IMAGE_ASSETS.hero.url}
          alt="The Leaf. Outdoor balcony in Arera Colony, Bhopal"
          className="w-full h-full object-cover scale-105 brightness-[0.70] contrast-[1.05] duration-[25s] transition-transform"
        />
        {/* Subtle dark editorial overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-[#12100e]/45 to-[#12100e]/75 opacity-95" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#12100e]/20 to-[#12100e]/85" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center pt-28 pb-16 flex flex-col items-center">
        
        {/* Brand Accent */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#1c1815]/85 border border-[#2e2722] backdrop-blur-md mb-8 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#7d8c79] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#faf7f2] font-mono font-medium">
            THE LEAF · CAFE & BREW
          </span>
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c4bcae]/60 font-mono">SCROLL</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#7d8c79] to-transparent animate-pulse" />
      </div>
    </section>
  );
};
