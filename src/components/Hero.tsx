import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LEAF_IMAGE_ASSETS } from '../data/imageAssets';
import { EASE_CINEMATIC } from '../utils/motion';

interface HeroProps {
  onExploreMenu: () => void;
  onWhatsNew?: () => void;
  onOpenReservation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenReservation }) => {
  const [videoError, setVideoError] = useState(false);
  const fallbackAsset = LEAF_IMAGE_ASSETS.hero_balcony;

  const videoSrc =
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#0d0f0e] pt-20"
    >
      {/* Background Video / Subtle Dark Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover opacity-15 filter contrast-125"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={fallbackAsset.url}
            alt={fallbackAsset.alt}
            className="w-full h-full object-cover opacity-15 filter brightness-90 contrast-110"
            style={{ objectPosition: fallbackAsset.objectPosition || 'center 40%' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0e]/80 via-[#0d0f0e]/60 to-[#0d0f0e]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Typographic Column */}
          <div className="lg:col-span-6 flex flex-col justify-between z-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
                className="flex items-center gap-2 text-[#dac498] mb-6"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-[#dac498] animate-pulse" />
                <span className="font-label-caps text-xs uppercase tracking-widest text-[#dac498]">
                  Sanctuary • Nocturne Atrium
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE_CINEMATIC }}
                className="font-headline-lg text-4xl sm:text-6xl lg:text-7xl font-serif text-[#e2e3e0] leading-[1.05] tracking-tight"
              >
                Where evening light yields to unhurried conversation.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: EASE_CINEMATIC }}
                className="mt-6 font-body-lg text-base sm:text-lg text-[#cfc5b7] max-w-xl font-light leading-relaxed"
              >
                An architectural coffee sanctuary perched above the canopy in Arera Colony. Single-origin cold extractions, botanical infusions, and low-lit nocturnal solace.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE_CINEMATIC }}
              className="mt-12 pt-6 border-t border-[#4c463c]/30"
            >
              <p className="font-label-caps text-xs text-[#989083] tracking-widest mb-6 uppercase">
                E7/161 Arera Colony, Bhopal • Dusk till 11:30 PM • Single-Origin & Botanical Blends
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenReservation}
                  className="px-6 py-3 bg-[#dac498] text-[#3c2e0f] font-label-caps text-xs uppercase tracking-wider transition-all duration-300 hover:bg-[#121413] hover:text-[#dac498] border border-[#dac498] cursor-pointer"
                >
                  Reserve Balcony
                </button>

                <button
                  onClick={onExploreMenu}
                  className="px-6 py-3 bg-transparent border border-[#4c463c]/40 text-[#e2e3e0] font-label-caps text-xs uppercase tracking-wider hover:border-[#dac498] hover:text-[#dac498] transition-all duration-300 cursor-pointer"
                >
                  Discover The Evening
                </button>
              </div>
            </motion.div>
          </div>

          {/* Visual Column (Nocturnal Balcony Terrace Frame) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_CINEMATIC }}
            className="lg:col-span-6 relative mt-6 lg:mt-0"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#1e201f] border border-[#4c463c]/30 group">
              <img
                src={fallbackAsset.url}
                alt={fallbackAsset.alt}
                className="w-full h-full object-cover object-center filter saturate-90 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f0e] via-transparent to-transparent opacity-80 pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between border-t border-[#4c463c]/30 pt-3 bg-[#0d0f0e]/80 backdrop-blur-sm p-4">
                <div>
                  <span className="font-label-caps text-xs text-[#dac498] tracking-widest block uppercase">
                    THE BALCONY CANOPY
                  </span>
                  <span className="font-body-sm text-xs text-[#cfc5b7]">
                    Elevated botanical vista over Arera Colony
                  </span>
                </div>
                <span className="font-headline-sm text-2xl font-serif text-[#dac498]">01</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};



