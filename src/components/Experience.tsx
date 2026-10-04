import React from 'react';
import { motion } from 'motion/react';
import { LEAF_IMAGE_ASSETS } from '../data/imageAssets';
import { fadeInUp, imageReveal } from '../utils/motion';

export const Experience: React.FC = () => {
  const galleryAsset = LEAF_IMAGE_ASSETS.gallery_wall;

  return (
    <section id="experience" className="w-full bg-[#0d0f0e] py-24 md:py-32 font-body-md border-t border-[#4c463c]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#4c463c]/30 pb-3 mb-12">
          <span className="font-label-caps text-xs text-[#dac498] tracking-widest uppercase">
            01 / DISPATCHES & HARVEST
          </span>
          <span className="font-label-caps text-xs text-[#989083] uppercase tracking-wider">
            CURRENT CYCLE • AUTUMN
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Dominant Featured Story with Gallery Wall Photo */}
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={imageReveal}
            className="lg:col-span-7 flex flex-col group cursor-pointer"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden border border-[#4c463c]/30 bg-[#1e201f]">
              <img
                src={galleryAsset.url}
                alt={galleryAsset.alt}
                className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#0d0f0e] to-transparent pointer-events-none" />
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-3 font-label-caps text-xs text-[#bccaba] mb-2 tracking-wider uppercase">
                <span>OCTOBER 2024</span>
                <span>•</span>
                <span>CURATED BY STUDIO LEAF</span>
              </div>
              <h3 className="font-headline-md text-2xl sm:text-3xl font-serif text-[#e2e3e0] group-hover:text-[#dac498] transition-colors leading-tight">
                Monoliths & Pagodas: The Upper Gallery Installation
              </h3>
              <p className="mt-3 font-body-md text-sm sm:text-base text-[#cfc5b7] font-light leading-relaxed">
                Ten framed monochromatic captures documenting monastic structures and ancient geometry grace our transitional gallery corridor, lit exclusively by high-CRI 2700K brass directional lights.
              </p>
            </div>
          </motion.article>

          {/* Secondary Text-Only Editorial Stories */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Story 02 */}
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
              className="border-t border-[#4c463c]/30 pt-6 group cursor-pointer hover:border-[#dac498] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-xs text-[#dac498] uppercase tracking-widest">
                  COFFEE SELECTION
                </span>
                <span className="font-label-caps text-xs text-[#989083]">EDITION 02</span>
              </div>
              <h4 className="font-headline-sm text-xl font-serif text-[#e2e3e0] group-hover:text-[#dac498] transition-colors leading-tight">
                The Monsoon Harvest Geisha: 72hr Anaerobic Fermentation from Chikmagalur
              </h4>
              <p className="mt-2 font-body-sm text-xs sm:text-sm text-[#cfc5b7] font-light leading-relaxed">
                Tasting notes of white jasmine blossom, wild dried apricot, and caramelized bergamot. Micro-lot allocated exclusively to our inverted siphon extraction station.
              </p>
              <div className="mt-4 flex items-center gap-2 font-label-caps text-xs text-[#dac498] tracking-wider">
                <span>EXPLORE HARVEST</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </motion.article>

            {/* Story 03 */}
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
              className="border-t border-[#4c463c]/30 pt-6 group cursor-pointer hover:border-[#dac498] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-xs text-[#dac498] uppercase tracking-widest">
                  NOCTURNE SERIES
                </span>
                <span className="font-label-caps text-xs text-[#989083]">EDITION 03</span>
              </div>
              <h4 className="font-headline-sm text-xl font-serif text-[#e2e3e0] group-hover:text-[#dac498] transition-colors leading-tight">
                Balcony Twilight Acoustics: Ambient Lo-Fi Tape Sessions Every Thursday
              </h4>
              <p className="mt-2 font-body-sm text-xs sm:text-sm text-[#cfc5b7] font-light leading-relaxed">
                Reel-to-reel tape playback calibrated to match the descending dusk. Curated sonic warmth designed for reading, reflection, and quiet evening companionhood.
              </p>
              <div className="mt-4 flex items-center gap-2 font-label-caps text-xs text-[#dac498] tracking-wider">
                <span>VIEW SOUND ARCHIVE</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </motion.article>

            {/* Small Curatorial Note */}
            <div className="p-5 bg-[#1e201f] border border-[#4c463c]/20">
              <span className="font-label-caps text-xs text-[#bccaba] block mb-1 uppercase tracking-widest">
                BOTANICAL NOTICE
              </span>
              <p className="font-body-sm text-xs text-[#cfc5b7] font-light leading-relaxed">
                Our living balcony cultivars are tended organically without synthetic pesticides. Guests are invited to gently brush the mint and sage stems along the veranda perimeter.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

