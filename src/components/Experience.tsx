import React from 'react';
import { LEAF_IMAGE_ASSETS } from '../data/imageAssets';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 md:py-36 bg-[#171411] text-[#faf7f2] border-b border-[#2e2722]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1815] border border-[#2e2722] text-[11px] font-mono uppercase tracking-[0.25em] text-[#7d8c79]">
            THE LEAF. EXPERIENCE
          </div>

          <h2 className="font-serif text-5xl md:text-7xl font-normal leading-tight text-[#faf7f2]">
            Come for the coffee.<br />
            <span className="italic text-[#eae3d2] font-serif">Stay for the atmosphere.</span>
          </h2>

          <p className="text-base md:text-lg text-[#c4bcae] font-serif italic max-w-xl mx-auto">
            “A serene space crafted with natural timber, warm sunlight, and an unhurried cadence in the heart of Arera Colony.”
          </p>
        </div>

        {/* Asymmetric Editorial Photo Composition featuring Real Photography */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Real Indoor Interior Lounge */}
          <div className="md:col-span-7 relative group">
            <div className="rounded-3xl overflow-hidden border border-[#2e2722] shadow-2xl">
              <img
                src={LEAF_IMAGE_ASSETS.interior_main.url}
                alt="Real indoor lounge of The Leaf. Cafe & Brew Bhopal"
                className="w-full h-[450px] md:h-[550px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-transparent to-transparent opacity-60" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 bg-[#1c1815]/90 backdrop-blur-md p-6 rounded-2xl border border-[#2e2722]">
              <span className="text-xs font-mono uppercase text-[#7d8c79] tracking-widest block mb-1">INDOOR MAIN LOUNGE & BAR</span>
              <p className="font-serif text-xl text-[#faf7f2]">Turquoise plush armchairs, green accent walls & coffee bar</p>
            </div>
          </div>

          {/* Real Balcony View */}
          <div className="md:col-span-5 relative group">
            <div className="rounded-3xl overflow-hidden border border-[#2e2722] shadow-2xl">
              <img
                src={LEAF_IMAGE_ASSETS.balcony_view.url}
                alt="Real outdoor balcony of The Leaf. Cafe & Brew Bhopal"
                className="w-full h-[450px] md:h-[550px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-transparent to-transparent opacity-60" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 bg-[#1c1815]/90 backdrop-blur-md p-6 rounded-2xl border border-[#2e2722]">
              <span className="text-xs font-mono uppercase text-[#7d8c79] tracking-widest block mb-1">OPEN-AIR LEAF BALCONY</span>
              <p className="font-serif text-xl text-[#eae3d2]">Lush green tree canopy, wooden tables & warm pendant lamps</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
