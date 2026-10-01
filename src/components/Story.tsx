import React from 'react';
import { Coffee, Heart, Leaf } from 'lucide-react';
import { LEAF_IMAGE_ASSETS } from '../data/imageAssets';

export const Story: React.FC = () => {
  return (
    <section id="story" className="relative py-28 md:py-36 bg-[#12100e] text-[#faf7f2] overflow-hidden border-b border-[#2e2722]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-6">
          <Leaf className="w-4 h-4 text-[#7d8c79]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#7d8c79] font-mono font-medium">OUR STORY</span>
          <div className="h-[1px] w-12 bg-[#2e2722]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="font-serif text-4xl md:text-6xl text-[#faf7f2] font-normal leading-[1.15]">
              “Made for moments that <span className="italic text-[#eae3d2] font-serif">linger.</span>”
            </h2>

            <div className="space-y-6 text-[#c4bcae] text-base md:text-lg font-light leading-relaxed font-manrope">
              <p>
                Tucked away on the first floor in Arera Colony, <strong className="text-[#faf7f2] font-semibold">The Leaf.</strong> was built as an antidote to the hurry of modern life. We set out to create a serene sanctuary where time slows down, coffee is treated as an art form, and food is prepared with unhurried devotion.
              </p>

              <p>
                Whether you arrive for a quiet morning cold brew with sunlight filtering through the window, an intimate evening catching up with an old friend, or a solitary afternoon with your favorite book, every detail in our space—from our warm timber tables to our handpicked 100% Arabica beans—is designed to welcome you home.
              </p>
            </div>

            {/* Editorial Highlights */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#2e2722]/80">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#7d8c79]">
                  <Coffee className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest font-mono text-[#faf7f2]">Artisan Roasts</span>
                </div>
                <p className="text-xs text-[#c4bcae] font-manrope">Single-origin Arabica beans roasted with meticulous care.</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#7d8c79]">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest font-mono text-[#faf7f2]">Crafted Scratch</span>
                </div>
                <p className="text-xs text-[#c4bcae] font-manrope">Handcrafted sauces, fresh bakes & sourdough dishes daily.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Indoor Photograph of The Leaf */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-[#2e2722] group">
              <img
                src={LEAF_IMAGE_ASSETS.interior_main.url}
                alt={LEAF_IMAGE_ASSETS.interior_main.alt}
                className="w-full h-[420px] md:h-[520px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100e]/70 via-transparent to-transparent opacity-60" />
            </div>

            {/* Overlapping Badge */}
            <div className="hidden sm:flex absolute -bottom-8 -left-8 z-20 bg-[#1c1815] p-6 rounded-xl border border-[#2e2722] shadow-2xl max-w-xs items-center gap-4 backdrop-blur-md">
              <div className="w-12 h-12 rounded-full bg-[#7d8c79]/20 border border-[#7d8c79]/40 flex items-center justify-center shrink-0">
                <Leaf className="w-6 h-6 text-[#7d8c79]" />
              </div>
              <div>
                <p className="text-xs text-[#7d8c79] font-mono uppercase tracking-widest">REAL AMBIANCE</p>
                <p className="text-sm font-serif text-[#faf7f2] font-semibold">The Leaf. Indoor Lounge & Bar</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
