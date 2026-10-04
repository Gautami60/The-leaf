import React from 'react';
import { REAL_REVIEWS } from '../data/cafeData';
import { Star } from 'lucide-react';

export const Reviews: React.FC = () => {
  return (
    <section className="w-full bg-[#1e201f] py-24 md:py-32 border-t border-[#4c463c]/20 font-body-md text-[#e2e3e0]">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-left">
        
        {/* Dominant Editorial Journal Quote */}
        <span className="font-headline-lg text-6xl sm:text-8xl text-[#dac498]/30 select-none block -mb-6 font-serif">
          “
        </span>
        <blockquote className="font-headline-lg text-3xl sm:text-4xl md:text-5xl font-serif text-[#e2e3e0] leading-snug">
          An evening that makes you forget you’re in the city. The interplay between starlit balcony foliage and warm interior timber makes time move differently.
        </blockquote>
        
        <div className="mt-8 flex items-center gap-4">
          <div className="w-8 h-px bg-[#dac498]" />
          <p className="font-label-caps text-xs text-[#dac498] uppercase tracking-widest font-semibold">
            Julian V. • Architectural Digest India • Verified Guest
          </p>
        </div>

        {/* Understated Secondary Quotes */}
        <div className="mt-16 pt-10 border-t border-[#4c463c]/30 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-2">
            <p className="font-body-md text-sm text-[#cfc5b7] font-light italic leading-relaxed">
              “The Kyoto cold drip is an art form in itself. Quietest corner in Bhopal for late-night writing and deep thinking.”
            </p>
            <span className="font-label-caps text-xs text-[#989083] block tracking-wider uppercase">
              — Rhea K., Fellow & Author
            </span>
          </div>
          
          <div className="space-y-2">
            <p className="font-body-md text-sm text-[#cfc5b7] font-light italic leading-relaxed">
              “Atmospheric lighting that genuinely respects the human conversation. The lantern-lit veranda is entirely unmatched.”
            </p>
            <span className="font-label-caps text-xs text-[#989083] block tracking-wider uppercase">
              — Dr. A. Sen, Guest of the Atrium
            </span>
          </div>
        </div>

        {/* Dynamic Verified Reviews Ledger */}
        <div className="mt-16 pt-10 border-t border-[#4c463c]/30">
          <div className="flex items-center justify-between mb-8">
            <span className="font-label-caps text-xs text-[#dac498] uppercase tracking-widest">
              VERIFIED PATRON REVIEWS
            </span>
            <div className="flex items-center gap-2">
              <div className="flex text-[#dac498] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#dac498]" />
                ))}
              </div>
              <span className="font-headline-sm text-lg font-serif text-[#e2e3e0]">4.8 / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REAL_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-[#1a1c1b] p-6 border border-[#4c463c]/30 hover:border-[#dac498]/40 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#dac498] gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#dac498]" />
                      ))}
                    </div>
                    <span className="font-label-caps text-[10px] uppercase tracking-wider text-[#dac498] bg-[#0d0f0e] px-2.5 py-1 border border-[#4c463c]/30">
                      {review.source}
                    </span>
                  </div>

                  <p className="font-body-sm text-xs sm:text-sm text-[#cfc5b7] font-light italic leading-relaxed">
                    “{review.comment}”
                  </p>
                </div>

                <div className="pt-3 border-t border-[#4c463c]/20 flex items-center justify-between font-label-caps text-xs">
                  <div>
                    <h4 className="font-serif text-base text-[#e2e3e0]">{review.author}</h4>
                    <span className="text-[10px] text-[#989083]">{review.role}</span>
                  </div>
                  <span className="text-[10px] text-[#989083]">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};


