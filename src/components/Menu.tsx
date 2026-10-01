import React, { useState } from 'react';
import type { MenuItem, MenuCategory } from '../types';
import { Clock, Info, Plus } from 'lucide-react';

interface MenuProps {
  items: MenuItem[];
  onOpenReservation: () => void;
}

export const Menu: React.FC<MenuProps> = ({ items, onOpenReservation }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const categories: { id: MenuCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'coffee', label: 'Coffee' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'pasta', label: 'Pasta' },
    { id: 'food', label: 'Food' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'pizza', label: 'Pizza' },
    { id: 'desserts', label: 'Desserts' },
  ];

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory);

  const heroFeaturedDish = items.find((item) => item.id === 'mama-rosa-pasta') || items[0];

  return (
    <section id="menu" className="relative py-28 md:py-36 bg-[#12100e] text-[#faf7f2] border-b border-[#2e2722]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7d8c79] font-mono font-medium">CURATED FLAVOURS</span>
              <div className="h-[1px] w-12 bg-[#2e2722]" />
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#faf7f2]">
              The Editorial <span className="italic text-[#eae3d2] font-serif">Menu.</span>
            </h2>
            <p className="text-[#c4bcae] text-sm md:text-base font-manrope font-light">
              Crafted fresh to order with natural ingredients, farm-sourced produce, and artisanal coffee beans.
            </p>
          </div>

          {/* Category Tabs: Coffee · Drinks · Food · Pasta · Chinese · Pizza · Desserts */}
          <div className="flex flex-wrap gap-2 pt-4 md:pt-0 border-b border-[#2e2722]/60 pb-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-mono transition-all duration-300 rounded-full cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#7d8c79] text-[#12100e] font-bold shadow-lg'
                    : 'text-[#c4bcae] hover:text-[#faf7f2] hover:bg-[#1c1815]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Dish Spotlight (Editorial Layout) */}
        {activeCategory === 'all' && heroFeaturedDish && (
          <div className="mb-20 bg-[#1c1815] rounded-3xl border border-[#2e2722] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
            <div className="lg:col-span-6 relative overflow-hidden group min-h-[340px] lg:min-h-[460px]">
              <img
                src={heroFeaturedDish.image}
                alt={heroFeaturedDish.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
              />
              <div className="absolute top-6 left-6 bg-[#12100e]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#2e2722] text-[11px] font-mono uppercase tracking-widest text-[#7d8c79]">
                CHEF'S SIGNATURE SPOTLIGHT
              </div>
            </div>

            <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#7d8c79] font-mono">CHEF SPECIAL · PASTAS</span>
                  <span className="text-2xl font-serif text-[#eae3d2] font-semibold">₹{heroFeaturedDish.price}</span>
                </div>

                <h3 className="font-serif text-3xl md:text-5xl text-[#faf7f2]">
                  {heroFeaturedDish.name}
                </h3>

                <p className="text-[#c4bcae] text-base font-manrope font-light leading-relaxed">
                  {heroFeaturedDish.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {heroFeaturedDish.dietary?.map((tag) => (
                    <span key={tag} className="text-[11px] font-mono px-3 py-1 bg-[#2e2722] rounded-full text-[#faf7f2]/90 border border-[#7d8c79]/30">
                      {tag}
                    </span>
                  ))}
                  <span className="text-[11px] font-mono px-3 py-1 bg-[#2e2722]/50 rounded-full text-[#c4bcae] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#7d8c79]" /> {heroFeaturedDish.prepTime}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#2e2722]/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedDish(heroFeaturedDish)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-manrope font-semibold text-[#faf7f2] hover:text-[#7d8c79] transition-colors cursor-pointer group"
                >
                  <span>VIEW DETAILS & PAIRINGS</span>
                  <Info className="w-4 h-4 text-[#7d8c79] group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Editorial Menu List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((dish, index) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              className="group bg-[#1c1815]/70 hover:bg-[#1c1815] border border-[#2e2722] hover:border-[#7d8c79]/50 rounded-2xl p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                {/* Image & Header */}
                <div className="relative h-56 rounded-xl overflow-hidden mb-6">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12100e]/80 via-transparent to-transparent" />
                  
                  {/* Number Badge */}
                  <span className="absolute top-3 left-3 bg-[#12100e]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-[#7d8c79] border border-[#2e2722]">
                    0{index + 1}
                  </span>

                  {/* Availability Badge */}
                  <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                    dish.availability === 'available'
                      ? 'bg-[#7d8c79]/20 text-[#7d8c79] border border-[#7d8c79]/40'
                      : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}>
                    {dish.availability === 'available' ? 'Available' : 'Sold Out Today'}
                  </span>

                  {/* Price Badge */}
                  <span className="absolute bottom-3 right-3 bg-[#12100e]/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-serif font-semibold text-[#eae3d2] border border-[#2e2722]">
                    ₹{dish.price}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-[#faf7f2] group-hover:text-[#eae3d2] transition-colors">
                    {dish.name}
                  </h3>

                  <p className="text-xs text-[#c4bcae] font-manrope font-light leading-relaxed line-clamp-2">
                    {dish.description}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 mt-6 border-t border-[#2e2722]/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {dish.dietary?.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2.5 py-0.5 bg-[#2e2722] rounded-full text-[#c4bcae]">
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="w-8 h-8 rounded-full bg-[#2e2722] group-hover:bg-[#7d8c79] text-[#faf7f2] group-hover:text-[#12100e] flex items-center justify-center transition-all">
                  <Plus className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Dish Detail Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 bg-[#12100e]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-6">
          <div className="bg-[#1c1815] border border-[#2e2722] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-fade-in">
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 bg-[#12100e]/80 hover:bg-[#12100e] text-[#faf7f2] p-2 rounded-full border border-[#2e2722] cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-3xl text-[#faf7f2]">{selectedDish.name}</h3>
                <span className="text-2xl font-serif text-[#eae3d2] font-semibold">₹{selectedDish.price}</span>
              </div>

              <p className="text-[#c4bcae] text-sm md:text-base font-manrope leading-relaxed">
                {selectedDish.description}
              </p>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#2e2722]">
                <div>
                  <span className="text-[11px] font-mono text-[#7d8c79] uppercase tracking-wider block">Recommended Pairing</span>
                  <span className="text-sm font-serif text-[#faf7f2]">
                    {selectedDish.category === 'pasta' ? 'Pistachio Cold Brew' : 'Hazelnut Frappe'}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#7d8c79] uppercase tracking-wider block">Status</span>
                  <span className="text-xs font-mono font-semibold uppercase text-[#7d8c79]">
                    {selectedDish.availability === 'available' ? 'Available Today' : 'Sold Out Today'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                  {selectedDish.dietary?.map((tag) => (
                    <span key={tag} className="text-xs font-mono px-3 py-1 bg-[#2e2722] rounded-full text-[#c4bcae]">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedDish(null);
                    onOpenReservation();
                  }}
                  className="px-6 py-2.5 bg-[#faf7f2] hover:bg-[#eae3d2] text-[#12100e] text-xs font-manrope font-bold uppercase tracking-widest rounded-full transition-colors cursor-pointer"
                >
                  Reserve Table to Taste
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
