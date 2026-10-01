import React, { useState } from 'react';
import type { OfferItem } from '../data/cmsStore';
import { Gift, Copy, Check, X, Tag } from 'lucide-react';

interface PersonalOffersProps {
  offers: OfferItem[];
}

export const PersonalOffers: React.FC<PersonalOffersProps> = ({ offers }) => {
  const [selectedOffer, setSelectedOffer] = useState<OfferItem | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="offers" className="relative py-28 md:py-36 bg-[#12100e] text-[#faf7f2] border-b border-[#2e2722]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1815] border border-[#2e2722] text-[11px] font-mono uppercase tracking-[0.25em] text-[#7d8c79]">
            <Gift className="w-3.5 h-3.5" />
            CAFÉ PRIVILEGES
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#faf7f2]">
            A Little Something <span className="italic text-[#eae3d2] font-serif">From Us.</span>
          </h2>

          <p className="text-sm md:text-base text-[#c4bcae] font-manrope font-light">
            Exclusive perks and welcoming gestures created for guests visiting <strong className="text-[#faf7f2] font-semibold">The Leaf.</strong> in Arera Colony.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group bg-[#1c1815] p-8 rounded-3xl border border-[#2e2722] hover:border-[#7d8c79]/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between hover:-translate-y-1 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#7d8c79] bg-[#12100e] px-3 py-1 rounded-full border border-[#2e2722]">
                    {offer.badge}
                  </span>
                  <span className="text-xs font-mono text-[#c4bcae]">{offer.expiry}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#c4bcae] uppercase tracking-wider block">
                    {offer.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#faf7f2] group-hover:text-[#eae3d2] transition-colors">
                    {offer.title}
                  </h3>
                </div>

                <p className="text-xs text-[#c4bcae] font-manrope font-light leading-relaxed">
                  {offer.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#2e2722]/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-[#7d8c79]" />
                  <span className="text-xs font-mono font-bold text-[#faf7f2] bg-[#12100e] px-3 py-1 rounded-lg border border-[#2e2722]">
                    {offer.code}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedOffer(offer)}
                  className="px-5 py-2 bg-[#faf7f2] hover:bg-[#eae3d2] text-[#12100e] text-xs font-manrope font-bold uppercase tracking-widest rounded-full transition-colors cursor-pointer"
                >
                  VIEW OFFER
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Offer Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 bg-[#12100e]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6">
          <div className="bg-[#1c1815] border border-[#2e2722] rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl relative animate-fade-in text-center">
            
            <button
              onClick={() => setSelectedOffer(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#12100e] text-[#c4bcae] hover:text-[#faf7f2] border border-[#2e2722] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#7d8c79]/20 border border-[#7d8c79] text-[#7d8c79] flex items-center justify-center mx-auto">
              <Gift className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#7d8c79] uppercase tracking-widest">{selectedOffer.badge}</span>
              <h3 className="font-serif text-2xl text-[#faf7f2]">{selectedOffer.title}</h3>
              <p className="text-xs text-[#c4bcae] font-manrope">{selectedOffer.description}</p>
            </div>

            <div className="bg-[#12100e] p-4 rounded-2xl border border-[#2e2722] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c4bcae] block">PROMO CODE</span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-xl font-bold text-[#eae3d2] tracking-wider">{selectedOffer.code}</span>
                <button
                  onClick={() => handleCopy(selectedOffer.code)}
                  className="p-2 bg-[#1c1815] hover:bg-[#2e2722] text-[#7d8c79] rounded-lg border border-[#2e2722] cursor-pointer transition-colors"
                  title="Copy Code"
                >
                  {copiedCode === selectedOffer.code ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copiedCode === selectedOffer.code && (
                <span className="text-[10px] font-mono text-green-400 block animate-pulse">Code copied to clipboard!</span>
              )}
            </div>

            <p className="text-[11px] font-mono text-[#c4bcae]/80 italic">
              * {selectedOffer.terms}
            </p>

            <button
              onClick={() => setSelectedOffer(null)}
              className="w-full py-3 bg-[#faf7f2] text-[#12100e] text-xs font-manrope font-bold uppercase tracking-widest rounded-full hover:bg-[#eae3d2] transition-colors cursor-pointer"
            >
              DONE
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
