import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { OfferItem } from '../data/cmsStore';
import { Gift, Copy, Check, X, Tag } from 'lucide-react';
import { fadeInUp, modalVariants, EASE_CINEMATIC } from '../utils/motion';

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
    <section id="offers" className="relative py-28 md:py-36 bg-transparent text-[#faf7f2] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-inter uppercase tracking-[0.25em] text-[#7d8c79]">
            <Gift className="w-3.5 h-3.5" />
            CAFÉ PRIVILEGES
          </div>

          <h2 className="font-instrument text-4xl md:text-6xl font-normal text-[#faf7f2]">
            A Little Something <span className="italic text-[#eae3d2] font-serif">From Us.</span>
          </h2>

          <p className="text-sm md:text-base text-[#a3b899] font-inter font-light">
            Exclusive perks and welcoming gestures created for guests visiting <strong className="text-[#faf7f2] font-semibold">The Leaf.</strong> in Arera Colony.
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_CINEMATIC }}
              className="group forest-glass hover:bg-[#12241b] p-8 rounded-3xl border border-white/10 transition-colors duration-300 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-inter uppercase tracking-widest text-[#7d8c79] bg-[#0a1410] px-3 py-1 rounded-full border border-white/10">
                    {offer.badge}
                  </span>
                  <span className="text-xs font-inter text-[#a3b899]">{offer.expiry}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-inter text-[#a3b899] uppercase tracking-wider block">
                    {offer.subtitle}
                  </span>
                  <h3 className="font-instrument text-2xl md:text-3xl text-[#faf7f2] group-hover:text-[#eae3d2] transition-colors">
                    {offer.title}
                  </h3>
                </div>

                <p className="text-xs text-[#a3b899] font-inter font-light leading-relaxed">
                  {offer.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-[#7d8c79]" />
                  <span className="text-xs font-mono font-bold text-[#faf7f2] bg-[#0a1410] px-3 py-1 rounded-lg border border-white/10">
                    {offer.code}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedOffer(offer)}
                  className="liquid-glass px-5 py-2 text-[#faf7f2] text-xs font-inter font-semibold uppercase tracking-widest rounded-full transition-all hover:scale-[1.02] cursor-pointer"
                >
                  VIEW OFFER
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Offer Modal */}
      <AnimatePresence>
        {selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a1410]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="forest-glass-elevated rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl relative text-center"
            >
              <button
                onClick={() => setSelectedOffer(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#0a1410] text-[#a3b899] hover:text-[#faf7f2] border border-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-[#7d8c79]/20 border border-[#7d8c79] text-[#7d8c79] flex items-center justify-center mx-auto">
                <Gift className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-inter text-[#7d8c79] uppercase tracking-widest">{selectedOffer.badge}</span>
                <h3 className="font-instrument text-2xl md:text-3xl text-[#faf7f2]">{selectedOffer.title}</h3>
                <p className="text-xs text-[#a3b899] font-inter">{selectedOffer.description}</p>
              </div>

              <div className="bg-[#0a1410] p-4 rounded-2xl border border-white/10 space-y-2">
                <span className="text-[10px] font-inter uppercase tracking-widest text-[#a3b899] block">PROMO CODE</span>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-xl font-bold text-[#eae3d2] tracking-wider">{selectedOffer.code}</span>
                  <button
                    onClick={() => handleCopy(selectedOffer.code)}
                    className="p-2 bg-white/5 hover:bg-white/10 text-[#7d8c79] rounded-lg border border-white/10 cursor-pointer transition-colors"
                    title="Copy Code"
                  >
                    {copiedCode === selectedOffer.code ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copiedCode === selectedOffer.code && (
                  <span className="text-[10px] font-mono text-green-400 block animate-pulse">Code copied to clipboard!</span>
                )}
              </div>

              <p className="text-[11px] font-inter text-[#a3b899]/80 italic">
                * {selectedOffer.terms}
              </p>

              <button
                onClick={() => setSelectedOffer(null)}
                className="liquid-glass w-full py-3 text-[#faf7f2] text-xs font-inter font-bold uppercase tracking-widest rounded-full cursor-pointer"
              >
                DONE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
