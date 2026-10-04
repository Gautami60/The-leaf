import React from 'react';
import { motion } from 'motion/react';
import { fadeInUp, imageReveal } from '../utils/motion';

interface VisitProps {
  onOpenReservation: () => void;
}

export const Visit: React.FC<VisitProps> = ({ onOpenReservation }) => {
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=1st+Floor+E7+161+E-7+Arera+Colony+Bhopal';

  return (
    <section id="visit" className="w-full bg-[#0d0f0e] py-24 md:py-32 font-body-md border-t border-[#4c463c]/20 text-[#e2e3e0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Address & Details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >
            <div>
              <span className="font-label-caps text-xs text-[#dac498] tracking-widest uppercase block mb-1">
                04 / PILGRIMAGE
              </span>
              <h2 className="font-headline-lg text-4xl sm:text-5xl font-serif text-[#e2e3e0]">
                Visit The Leaf.
              </h2>
            </div>

            <div className="space-y-6 border-t border-b border-[#4c463c]/20 py-8">
              <div>
                <span className="font-label-caps text-xs text-[#989083] uppercase tracking-wider block mb-1">
                  LOCATION
                </span>
                <p className="font-body-lg text-lg text-[#e2e3e0] font-medium">
                  1st Floor, E7/161, Arera Colony, Bhopal, MP 462016
                </p>
              </div>

              <div>
                <span className="font-label-caps text-xs text-[#989083] uppercase tracking-wider block mb-1">
                  SANCTUARY HOURS
                </span>
                <p className="font-body-md text-base text-[#e2e3e0]">
                  Tuesday — Sunday • 11:00 AM — 11:30 PM
                </p>
                <p className="font-body-sm text-xs text-[#bccaba] mt-1 font-light">
                  Open Daily for Coffee & Dining.
                </p>
              </div>

              <div>
                <span className="font-label-caps text-xs text-[#989083] uppercase tracking-wider block mb-1">
                  PARKING & ACCESS
                </span>
                <p className="font-body-sm text-xs sm:text-sm text-[#cfc5b7] font-light leading-relaxed">
                  Valet attendant stationed via Gate 03 Lane. Private stairwell entry adjacent to botanical foyer.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#dac498] text-[#dac498] font-label-caps text-xs uppercase tracking-wider hover:bg-[#dac498] hover:text-[#3c2e0f] transition-all cursor-pointer"
              >
                <span>GET DIRECTIONS VIA MAPS</span>
                <span className="material-symbols-outlined text-[16px]">near_me</span>
              </a>

              <button
                onClick={onOpenReservation}
                className="px-6 py-3 bg-[#1e201f] border border-[#4c463c]/40 text-[#e2e3e0] font-label-caps text-xs uppercase tracking-wider hover:border-[#dac498] hover:text-[#dac498] transition-all cursor-pointer"
              >
                Reserve Table
              </button>
            </div>
          </motion.div>

          {/* Right Column: Blueprint Graphic / Architectural Map */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={imageReveal}
            className="lg:col-span-7"
          >
            <div className="relative w-full aspect-[16/11] bg-[#1e201f] border border-[#4c463c]/30 p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
              
              {/* Blueprint Grid Background */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundSize: '32px 32px',
                  backgroundImage:
                    'linear-gradient(to right, #989083 1px, transparent 1px), linear-gradient(to bottom, #989083 1px, transparent 1px)',
                }}
              />

              {/* Blueprint Vector Floorplan Silhouette */}
              <svg
                className="absolute inset-0 w-full h-full text-[#4c463c]/40 pointer-events-none"
                fill="none"
                viewBox="0 0 800 550"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="60" y="60" width="680" height="430" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                <rect x="90" y="90" width="220" height="370" stroke="currentColor" strokeWidth="1.5" />
                <text x="105" y="120" fill="#989083" fontFamily="Manrope" fontSize="11" letterSpacing="2">
                  STARLIT VERANDA
                </text>
                
                <rect x="340" y="90" width="370" height="150" stroke="currentColor" strokeWidth="1.5" />
                <text x="355" y="120" fill="#989083" fontFamily="Manrope" fontSize="11" letterSpacing="2">
                  APOTHECARY EXTRACTION BAR
                </text>

                <rect x="340" y="270" width="370" height="190" stroke="currentColor" strokeWidth="1.5" />
                <text x="355" y="300" fill="#989083" fontFamily="Manrope" fontSize="11" letterSpacing="2">
                  VELVET ATRIUM SALON
                </text>

                <circle cx="700" cy="460" r="24" stroke="currentColor" strokeWidth="1" />
                <path d="M700 440 L700 480 M680 460 L720 460" stroke="currentColor" strokeWidth="1" />
                <text x="696" y="435" fill="#dac498" fontSize="11" fontWeight="bold">
                  N
                </text>
              </svg>

              {/* Floating Top Elements */}
              <div className="relative z-10 flex items-center justify-between font-label-caps">
                <div>
                  <span className="text-xs text-[#dac498] tracking-widest uppercase block">COORDINATES</span>
                  <span className="font-body-sm text-xs text-[#e2e3e0]">23.2185° N, 77.4343° E</span>
                </div>
                <div className="px-3 py-1 border border-[#4c463c]/50 bg-[#0d0f0e]/80 text-[#989083] text-[10px] uppercase">
                  FIRST FLOOR ATRIUM ELEVATION +4.2M
                </div>
              </div>

              {/* Floating Center Pin */}
              <div className="relative z-10 self-center text-center my-8">
                <div className="w-10 h-10 mx-auto rounded-full border border-[#dac498]/50 bg-[#dac498]/20 flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-[#dac498] rounded-full" />
                </div>
                <span className="font-label-caps text-xs text-[#e2e3e0] uppercase tracking-widest mt-2 block">
                  THE LEAF CANOPY
                </span>
              </div>

              {/* Floating Bottom Elements */}
              <div className="relative z-10 flex items-end justify-between border-t border-[#4c463c]/30 pt-3 font-label-caps text-xs">
                <span className="text-[#989083] uppercase tracking-wider">ARERA COLONY SECTOR E7 • BHOPAL</span>
                <span className="text-[#dac498] uppercase">SANCTUARY ACCESS PERMITTED</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};


