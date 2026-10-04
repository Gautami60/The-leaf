import React from 'react';
import { motion } from 'motion/react';
import type { WhatsNewItem } from '../data/cmsStore';
import { Sparkles, ArrowRight } from 'lucide-react';
import { fadeInUp, EASE_CINEMATIC } from '../utils/motion';

interface WhatsNewProps {
  items: WhatsNewItem[];
}

export const WhatsNew: React.FC<WhatsNewProps> = ({ items }) => {
  const [failedImages, setFailedImages] = React.useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="whats-new" className="relative py-28 md:py-36 bg-[#171411] text-[#faf7f2] border-b border-[#2e2722]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#7d8c79]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#7d8c79] font-mono font-medium">RECENT CREATIONS</span>
              <div className="h-[1px] w-12 bg-[#2e2722]" />
            </div>
            
            <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#faf7f2]">
              What’s New at <span className="italic text-[#eae3d2] font-serif">The Leaf.</span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#c4bcae] font-manrope font-light max-w-md">
            Our kitchen and barista desk are constantly evolving with seasonal cold brews, artisanal bakes, and freshly developed recipes.
          </p>
        </motion.div>

        {/* Dynamic Items Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => {
            const hasValidImage = item.image && !failedImages[item.id];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
                className="group bg-[#1c1815] rounded-3xl border border-[#2e2722] hover:border-[#7d8c79]/50 overflow-hidden transition-colors duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Header / Image Area */}
                  {hasValidImage ? (
                    <div className="relative h-64 overflow-hidden bg-[#12100e]">
                      <img
                        src={item.image}
                        alt={item.title}
                        onError={() => handleImageError(item.id)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-transparent to-transparent opacity-80" />

                      {/* Badge */}
                      <span className="absolute top-4 left-4 bg-[#7d8c79] text-[#12100e] px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg">
                        {item.category}
                      </span>

                      {item.isNew && (
                        <span className="absolute top-4 right-4 bg-[#12100e]/90 text-[#eae3d2] border border-[#2e2722] px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md">
                          ✨ NEW
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="relative p-6 bg-gradient-to-br from-[#1f1a16] to-[#141210] border-b border-[#2e2722] flex items-center justify-between">
                      <span className="bg-[#7d8c79]/20 text-[#7d8c79] border border-[#7d8c79]/30 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                        {item.category}
                      </span>

                      {item.isNew && (
                        <span className="text-[#eae3d2] text-[10px] font-mono font-semibold uppercase tracking-wider">
                          ✨ NEW
                        </span>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 md:p-8 space-y-4">
                    <span className="text-xs font-serif italic text-[#eae3d2] block">
                      “{item.tagline}”
                    </span>

                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl text-[#faf7f2] group-hover:text-[#eae3d2] transition-colors">
                        {item.title}
                      </h3>
                      <span className="font-serif text-xl font-semibold text-[#faf7f2]">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-xs text-[#c4bcae] font-manrope font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 md:px-8 pb-6 pt-4 border-t border-[#2e2722]/60 flex items-center justify-between text-xs font-mono text-[#c4bcae]">
                  <span>Added: {item.launchDate}</span>
                  <span className="text-[#7d8c79] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Taste Today <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
