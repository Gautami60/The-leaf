import React from 'react';
import { REAL_REVIEWS } from '../data/cafeData';
import { Star, ShieldCheck } from 'lucide-react';

export const Reviews: React.FC = () => {
  return (
    <section className="relative py-28 md:py-36 bg-[#12100e] text-[#faf7f2] border-b border-[#2e2722]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Rating Statistics Spotlight Header */}
        <div className="bg-[#1c1815] rounded-3xl border border-[#2e2722] p-8 md:p-14 mb-20 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12100e] border border-[#2e2722] text-[11px] font-mono uppercase tracking-widest text-[#7d8c79]">
              <ShieldCheck className="w-3.5 h-3.5" />
              VERIFIED CUSTOMER REVIEWS
            </div>

            <h2 className="font-serif text-4xl md:text-6xl text-[#faf7f2]">
              Loved by Bhopal.
            </h2>

            <p className="text-sm md:text-base text-[#c4bcae] font-manrope font-light leading-relaxed">
              Authentic reviews from coffee enthusiasts, local residents, and food lovers who visit our sanctuary at <strong className="text-[#faf7f2] font-semibold">The Leaf.</strong> in Arera Colony.
            </p>
          </div>

          {/* Big Stat Box (4.8 / 5 and 1,100+ reviews) */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-8 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#2e2722]/80 lg:pl-12">
            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[#d4a373] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#d4a373]" />
                ))}
              </div>
              <span className="font-serif text-5xl md:text-6xl text-[#faf7f2] font-semibold block">4.8 / 5</span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#7d8c79]">Overall Rating</span>
            </div>

            <div className="h-12 w-[1px] bg-[#2e2722] hidden sm:block" />

            <div className="text-center sm:text-left space-y-1">
              <span className="font-serif text-5xl md:text-6xl text-[#eae3d2] font-semibold block">1,100+</span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#7d8c79]">Verified Reviews</span>
            </div>
          </div>

        </div>

        {/* Real Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REAL_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#1c1815]/70 p-8 rounded-2xl border border-[#2e2722] hover:border-[#7d8c79]/40 transition-all duration-300 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating & Source */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#d4a373] gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d4a373]" />
                    ))}
                  </div>

                  <span className="text-[11px] font-mono text-[#7d8c79] bg-[#12100e] px-3 py-1 rounded-full border border-[#2e2722]">
                    {review.source}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm md:text-base text-[#c4bcae] font-serif italic leading-relaxed">
                  “{review.comment}”
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#2e2722]/60 flex items-center justify-between font-manrope">
                <div>
                  <h4 className="font-serif text-lg text-[#faf7f2] font-semibold">{review.author}</h4>
                  <span className="text-xs text-[#c4bcae]/80">{review.role}</span>
                </div>
                <span className="text-[11px] font-mono text-[#c4bcae]/60">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
