import React from 'react';
import { motion } from 'motion/react';
import { LEAF_IMAGE_ASSETS } from '../data/imageAssets';
import { fadeInUp, imageReveal } from '../utils/motion';

export const Story: React.FC = () => {
  return (
    <section id="story" className="w-full bg-[#1a1c1b] py-24 md:py-32 border-t border-b border-[#4c463c]/20 font-body-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Editorial Pull Statement */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <span className="font-label-caps text-xs text-[#bccaba] tracking-widest uppercase mb-3">
              Architectural Philosophy
            </span>
            
            <blockquote className="font-headline-md text-3xl sm:text-4xl lg:text-5xl font-serif text-[#e2e3e0] leading-snug">
              “An intentional retreat above the city floor, crafted for quiet focus and nocturnal cadence.”
            </blockquote>

            <p className="mt-6 font-body-md text-sm sm:text-base text-[#cfc5b7] font-light leading-relaxed">
              Designed as an interplay between deep mineral hues, tactile walnut timber, and plush peacock-teal velvets. Natural acoustic damping creates an intimate sanctuary where sound dissolves into soft whispers and pouring water.
            </p>

            {/* Spec Ledger */}
            <div className="mt-10 grid grid-cols-3 gap-4 pt-6 border-t border-[#4c463c]/30">
              <div>
                <span className="font-headline-sm text-2xl sm:text-3xl font-serif text-[#dac498] block">140+</span>
                <span className="font-label-caps text-[10px] sm:text-xs text-[#989083] uppercase tracking-wider block mt-1">Native Cultivars</span>
              </div>
              <div>
                <span className="font-headline-sm text-2xl sm:text-3xl font-serif text-[#dac498] block">48dB</span>
                <span className="font-label-caps text-[10px] sm:text-xs text-[#989083] uppercase tracking-wider block mt-1">Acoustic Floor</span>
              </div>
              <div>
                <span className="font-headline-sm text-2xl sm:text-3xl font-serif text-[#dac498] block">92°C</span>
                <span className="font-label-caps text-[10px] sm:text-xs text-[#989083] uppercase tracking-wider block mt-1">Precision Extraction</span>
              </div>
            </div>
          </motion.div>

          {/* Authentic Interior Photo (Image 19: Apothecary Bar & Velvet Seating) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={imageReveal}
            className="lg:col-span-7"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden border border-[#4c463c]/30 bg-[#1e201f] group">
              <img
                src={LEAF_IMAGE_ASSETS.indoor_lounge.url}
                alt={LEAF_IMAGE_ASSETS.indoor_lounge.alt}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1c1b]/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 right-4 bg-[#0d0f0e]/80 backdrop-blur-sm px-3 py-1.5 border border-[#4c463c]/30">
                <span className="font-label-caps text-[10px] text-[#bccaba] tracking-widest uppercase">
                  THE ATRIUM BAR
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

