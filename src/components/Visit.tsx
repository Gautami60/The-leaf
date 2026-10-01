import React from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

interface VisitProps {
  onOpenReservation: () => void;
}

export const Visit: React.FC<VisitProps> = ({ onOpenReservation }) => {
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=1st+Floor+E7+161+E-7+Arera+Colony+Bhopal';

  return (
    <section id="visit" className="relative py-28 md:py-36 bg-[#12100e] text-[#faf7f2] border-b border-[#2e2722]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Details Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.25em] text-[#7d8c79] font-mono font-medium">LOCATION & HOURS</span>
                <div className="h-[1px] w-12 bg-[#2e2722]" />
              </div>
              
              <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#faf7f2] leading-tight">
                “Your next favourite corner in <span className="italic text-[#eae3d2] font-serif">Bhopal.</span>”
              </h2>

              <p className="text-sm md:text-base text-[#c4bcae] font-manrope font-light leading-relaxed">
                Whether for quiet solo mornings, remote work, or evening dinner gatherings, our doors at <strong className="text-[#faf7f2] font-semibold">The Leaf.</strong> in Arera Colony are open daily.
              </p>
            </div>

            {/* Address & Hours Cards */}
            <div className="space-y-6 bg-[#1c1815] p-8 rounded-3xl border border-[#2e2722]">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#12100e] border border-[#2e2722] flex items-center justify-center shrink-0 text-[#7d8c79]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#7d8c79]">ADDRESS</span>
                  <p className="font-serif text-xl text-[#faf7f2] font-medium leading-snug">
                    1st Floor, E7/161, E-7, Arera Colony, Bhopal
                  </p>
                  <p className="text-xs text-[#c4bcae] font-manrope font-light">Madhya Pradesh 462016, India</p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-[#2e2722]/80" />

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#12100e] border border-[#2e2722] flex items-center justify-center shrink-0 text-[#7d8c79]">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#7d8c79]">OPENING HOURS</span>
                  <p className="font-serif text-xl text-[#eae3d2] font-medium">
                    11:00 AM – 11:30 PM
                  </p>
                  <p className="text-xs text-[#c4bcae] font-manrope font-light">Open Every Day (Monday – Sunday)</p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 py-4 px-6 bg-[#faf7f2] hover:bg-[#eae3d2] text-[#12100e] text-xs font-manrope font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#593e2b]" />
                <span>GET DIRECTIONS</span>
              </a>

              <a
                href="tel:+917554928899"
                className="group flex-1 py-4 px-6 bg-[#1c1815] hover:bg-[#2e2722] text-[#faf7f2] border border-[#2e2722] hover:border-[#7d8c79]/50 text-xs font-manrope font-bold uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#7d8c79]" />
                <span>CALL THE CAFE</span>
              </a>
            </div>

            {/* Reservation Prompt */}
            <div className="p-6 bg-[#7d8c79]/10 rounded-2xl border border-[#7d8c79]/30 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg text-[#faf7f2] font-medium">Planning a gathering?</h4>
                <p className="text-xs text-[#c4bcae] font-manrope">Reserve your favorite indoor booth or balcony table in advance.</p>
              </div>

              <button
                onClick={onOpenReservation}
                className="px-5 py-2.5 bg-[#7d8c79] hover:bg-[#9ea99b] text-[#12100e] text-xs uppercase font-manrope font-bold tracking-widest rounded-full transition-colors shrink-0 cursor-pointer"
              >
                Reserve Table
              </button>
            </div>

          </div>

          {/* Right Map Preview Column */}
          <div className="lg:col-span-6 relative">
            <div className="bg-[#1c1815] p-3 rounded-3xl border border-[#2e2722] shadow-2xl overflow-hidden">
              <div className="relative h-[440px] rounded-2xl overflow-hidden bg-[#12100e]">
                <iframe
                  title="The Leaf. Cafe Bhopal Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.425126830594!2d77.4338902!3d23.2275722!2m3!1f0!0f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c427027c73a0d%3A0x2964a781b0a8867a!2sArera%20Colony%2C%20Bhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-4 left-4 bg-[#12100e]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#2e2722] text-xs font-mono text-[#7d8c79]">
                  📍 Arera Colony, E-7, Bhopal
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
