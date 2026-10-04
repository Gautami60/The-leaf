import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { MenuItem } from '../types';
import { X } from 'lucide-react';
import { LEAF_IMAGE_ASSETS } from '../data/imageAssets';
import { modalVariants, EASE_CINEMATIC } from '../utils/motion';

interface MenuProps {
  items: MenuItem[];
  onOpenReservation: () => void;
}

export const Menu: React.FC<MenuProps> = ({ items, onOpenReservation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const balconySeatingAsset = LEAF_IMAGE_ASSETS.balcony_seating;
  const balconyNightAsset = LEAF_IMAGE_ASSETS.balcony_night;

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'coffee', label: 'Pour-Overs & Roasts' },
    { id: 'coldbrew', label: 'Botanical Cold Brews' },
    { id: 'infusions', label: 'Evening Tisanes' },
    { id: 'bakes', label: 'Artisanal Bakes' },
    { id: 'pasta', label: 'Signature Pastas' },
    { id: 'twilight', label: 'Twilight Specials' },
  ];

  // Map category tab filter to item categories
  const filteredItems = items.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'coffee') return item.category === 'coffee';
    if (activeCategory === 'coldbrew') return item.category === 'drinks' || item.id.includes('brew');
    if (activeCategory === 'infusions') return item.category === 'drinks';
    if (activeCategory === 'bakes') return item.category === 'desserts' || item.category === 'food';
    if (activeCategory === 'pasta') return item.category === 'pasta';
    if (activeCategory === 'twilight') return item.isSignature;
    return true;
  });

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="menu" className="w-full bg-[#1a1c1b] py-24 md:py-32 font-body-md border-t border-[#4c463c]/20 text-[#e2e3e0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#4c463c]/30 pb-3 mb-12 gap-2">
          <div>
            <span className="font-label-caps text-xs text-[#dac498] tracking-widest uppercase block mb-1">
              02 / THE BOTANICAL REGISTRY
            </span>
            <h2 className="font-headline-lg text-4xl sm:text-5xl font-serif text-[#e2e3e0]">
              Curated Extractions & Kitchen
            </h2>
          </div>
          <div className="font-label-caps text-xs text-[#989083] uppercase tracking-wider">
            SLOW CRAFT • SERVED UNTIL 23:30
          </div>
        </div>

        {/* Minimalist Editorial Category Filter Bar */}
        <nav aria-label="Menu Sections" className="mb-12 border-b border-[#4c463c]/20 pb-3 w-full max-w-full">
          <div className="flex items-center justify-between gap-6 w-full">
            <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-1 px-1 flex-1 min-w-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`font-label-caps text-xs uppercase tracking-[0.18em] transition-all duration-300 pb-2 border-b-2 cursor-pointer shrink-0 whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'border-[#dac498] text-[#dac498] font-bold'
                      : 'border-transparent text-[#989083] hover:text-[#e2e3e0]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            
            <div className="hidden lg:flex items-center gap-2 font-label-caps text-[11px] tracking-[0.18em] uppercase text-[#989083] shrink-0 whitespace-nowrap pl-4 border-l border-[#4c463c]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bccaba] animate-pulse" />
              <span>Veranda Kitchen Live</span>
            </div>
          </div>
        </nav>

        {/* Editorial Spread: Asymmetrical Layout with Authentic Visual Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Photo Anchor (Right Column in Stitch export - Day-lit Wooden Veranda Terrace) */}
          <div className="lg:col-span-5 lg:order-2 space-y-6">
            <div className="relative w-full aspect-[4/5] overflow-hidden border border-[#4c463c]/30 bg-[#1e201f] group">
              <img
                src={balconySeatingAsset.url}
                alt={balconySeatingAsset.alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[#0d0f0e]/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#0d0f0e]/85 backdrop-blur-md p-4 border border-[#4c463c]/30">
                <span className="font-label-caps text-xs text-[#dac498] tracking-widest block uppercase mb-1">
                  TERRACE SOJOURN
                </span>
                <p className="font-body-sm text-xs text-[#cfc5b7] font-light leading-relaxed">
                  Daylight gives way to balmy canopy breezes. Veranda seating opens daily at 11:00 AM for slow afternoon filter brews and light fare.
                </p>
              </div>
            </div>

            {/* Quick Balcony Action */}
            <div className="flex items-center justify-between pt-2 font-label-caps text-xs tracking-[0.16em] uppercase text-[#989083]">
              <span>Seating: Walk-in / Reservations</span>
              <button
                onClick={onOpenReservation}
                className="text-[#dac498] hover:text-[#e2e3e0] underline underline-offset-4 transition-colors cursor-pointer"
              >
                Book Terrace Table →
              </button>
            </div>
          </div>

          {/* Editorial Menu Ledger (Left 7 Cols in Stitch Export) */}
          <div className="lg:col-span-7 lg:order-1 divide-y divide-[#4c463c]/20 border-t border-b border-[#4c463c]/20">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((dish, idx) => {
                const hasValidImage = dish.image && !failedImages[dish.id];

                return (
                  <motion.article
                    key={dish.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
                    onClick={() => setSelectedDish(dish)}
                    className="py-6 px-3 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group hover:bg-[#1e201f] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-4 max-w-xl">
                      <span className="font-label-caps text-xs text-[#bccaba] tracking-widest mt-1">
                        0{idx + 1}
                      </span>
                      <div>
                        {hasValidImage && (
                          <div className="relative h-40 rounded-sm overflow-hidden mb-3 bg-[#0d0f0e] border border-[#4c463c]/30">
                            <img
                              src={dish.image}
                              alt={dish.name}
                              onError={() => handleImageError(dish.id)}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f0e]/80 via-transparent to-transparent" />
                          </div>
                        )}
                        <h3 className="font-headline-sm text-xl sm:text-2xl font-serif text-[#e2e3e0] group-hover:text-[#dac498] transition-colors leading-tight">
                          {dish.name}
                        </h3>
                        <p className="font-body-sm text-xs sm:text-sm text-[#cfc5b7] font-light mt-1.5 leading-relaxed">
                          {dish.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5 font-label-caps text-[11px] uppercase tracking-wider text-[#989083]">
                          <span>{dish.category}</span>
                          <span>•</span>
                          <span>{dish.prepTime || '15 mins'}</span>
                          {dish.dietary?.map((tag) => (
                            <React.Fragment key={tag}>
                              <span>•</span>
                              <span className="text-[#dac498]">{tag}</span>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="font-headline-sm text-xl sm:text-2xl font-serif text-[#dac498] shrink-0 font-medium">
                      ₹{dish.price}
                    </span>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Balcony Twilight & Late-Hours Curation Feature */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 my-20">
        <div className="bg-[#1e201f] border border-[#4c463c]/30 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-[#4c463c]/30">
            <div className="lg:col-span-8 space-y-2">
              <div className="text-xs tracking-widest uppercase text-[#dac498] font-label-caps font-medium">
                After 20:00 Exclusives
              </div>
              <h3 className="font-headline-lg text-3xl sm:text-4xl text-[#e2e3e0] font-serif">
                Balcony Twilight & Midnight Rituals
              </h3>
            </div>
            <div className="lg:col-span-4 lg:text-right text-xs tracking-wider uppercase text-[#989083] font-label-caps">
              <span>Dimmed Lamps · Low Acoustic Registry</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10 items-center">
            <div className="lg:col-span-6 relative overflow-hidden group bg-[#121413] border border-[#4c463c]/30">
              <img
                src={balconyNightAsset.url}
                alt={balconyNightAsset.alt}
                className="w-full h-80 sm:h-96 object-cover filter contrast-[1.05] brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f0e] via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-4 left-4 right-4 font-body-sm">
                <p className="font-headline-sm text-xl text-[#e2e3e0] font-serif">Suspended Woven Canes</p>
                <p className="text-xs uppercase tracking-wider text-[#989083]">Night Air · 2200K Lumens Ambiance</p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-8">
              <article className="group pb-6 border-b border-[#4c463c]/30">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h4 className="font-headline-sm text-xl text-[#e2e3e0] group-hover:text-[#dac498] transition-colors">
                      Smoked Oak Cascara Highball
                    </h4>
                    <span className="text-xs tracking-widest uppercase text-[#dac498] font-label-caps">
                      Non-Alcoholic Botanical
                    </span>
                  </div>
                  <span className="font-headline-sm text-xl text-[#dac498]">₹460</span>
                </div>
                <p className="font-body-sm text-sm text-[#cfc5b7] font-light mt-2 leading-relaxed">
                  Brewed organic coffee cherry cascara, charred barrel oak essence, gentian botanical tonic, and flamed orange peel poured over a hand-chipped pillar ice block.
                </p>
              </article>

              <article className="group pb-2">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h4 className="font-headline-sm text-xl text-[#e2e3e0] group-hover:text-[#dac498] transition-colors">
                      Mama Rosa Signature Creamy Penne
                    </h4>
                    <span className="text-xs tracking-widest uppercase text-[#989083] font-label-caps">
                      Wood Stone Hearth
                    </span>
                  </div>
                  <span className="font-headline-sm text-xl text-[#dac498]">₹380</span>
                </div>
                <p className="font-body-sm text-sm text-[#cfc5b7] font-light mt-2 leading-relaxed">
                  Rich pink cream sauce pasta tossed with fresh mozzarella, sautéed mushrooms, bell peppers, and fragrant basil leaves.
                </p>
              </article>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#4c463c]/30 text-xs tracking-wider uppercase text-[#989083] font-label-caps">
                <span>Sommelier on duty till 11:30 PM</span>
                <button
                  onClick={onOpenReservation}
                  className="text-[#dac498] hover:text-[#e2e3e0] transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
                >
                  Request Balcony Reservation →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Philosophy Footnotes */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-b border-white/10">
          <div className="space-y-2">
            <div className="font-serif-editorial text-xl text-[#f8f6f0] italic">Zero Artificial Sweeteners</div>
            <p className="text-xs text-[#8c9099] leading-relaxed font-sans-editorial font-light">
              All tisanes, cascara reductions, and cold extractions rely strictly on single-origin blossom nectar and raw unrefined flora.
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-serif-editorial text-xl text-[#f8f6f0] italic">Acoustic Etiquette</div>
            <p className="text-xs text-[#8c9099] leading-relaxed font-sans-editorial font-light">
              The outdoor balcony tables are arranged for low acoustic resonance. We ask guests to maintain whispered conversations after 22:00.
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-serif-editorial text-xl text-[#f8f6f0] italic">Electric Roastery Log</div>
            <p className="text-xs text-[#8c9099] leading-relaxed font-sans-editorial font-light">
              Batch micro-roasts occur weekly on our drum roaster. Ask staff for this week's unlisted 100% Arabica microlot trial.
            </p>
          </div>
        </div>
      </div>

      {/* Dish Detail Modal */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#090a0e]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-[#111218] border border-white/10 rounded-2xl max-w-xl w-full p-8 space-y-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-6 right-6 bg-white/5 text-[#f8f6f0] p-2 rounded-full border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2 border-b border-white/10 pb-4 font-mono">
                <span className="text-xs uppercase tracking-widest text-[#8ea89d]">{selectedDish.category}</span>
                <h3 className="font-serif-editorial text-3xl md:text-5xl text-[#f8f6f0]">{selectedDish.name}</h3>
                <span className="text-2xl font-serif-editorial text-[#e5b87e] block">₹{selectedDish.price}</span>
              </div>

              <p className="text-[#8c9099] text-sm md:text-base font-serif-editorial italic leading-relaxed">
                “{selectedDish.description}”
              </p>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs font-mono">
                <div>
                  <span className="text-[#8ea89d] uppercase tracking-wider block mb-1">Recommended Pairing</span>
                  <span className="text-[#f8f6f0]">
                    {selectedDish.category === 'pasta' ? 'Specialty Cold Brew' : 'Chikmagalur V60'}
                  </span>
                </div>
                <div>
                  <span className="text-[#8ea89d] uppercase tracking-wider block mb-1">Status</span>
                  <span className="text-[#8ea89d] font-bold">Available Today</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2 font-mono text-xs">
                  {selectedDish.dietary?.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[#8ea89d] border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedDish(null);
                    onOpenReservation();
                  }}
                  className="px-6 py-2.5 bg-[#f8f6f0] text-[#090a0e] text-xs font-sans-editorial font-bold uppercase tracking-widest rounded-full transition-all hover:bg-[#e5b87e] cursor-pointer"
                >
                  Reserve Table to Taste
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
