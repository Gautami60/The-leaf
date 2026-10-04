import React from 'react';
import { Coffee as CoffeeIcon, Flame } from 'lucide-react';
import { LEAF_IMAGE_ASSETS } from '../data/imageAssets';

export const CoffeeSection: React.FC = () => {
  const brewMethods = [
    {
      name: 'V60 Specialty Pour-Over',
      notes: 'Clean, floral aroma, subtle citrus & dark cacao notes.',
      beans: 'Chikmagalur Single-Origin washed Arabica',
      process: 'Hand-poured at 93°C'
    },
    {
      name: '18-Hour Slow Cold Brew',
      notes: 'Velvety smooth, ultra low acidity with toasted hazelnut finish.',
      beans: 'Baba Budangiri Estate 100% Arabica',
      process: 'Steeped for 18 hours in cold filtered water'
    },
    {
      name: 'Artisan Espresso',
      notes: 'Rich golden crema, heavy body with dark chocolate resonance.',
      beans: 'House Signature Dark Roast Blend',
      process: 'Extracted under 9 bars of pressure'
    },
    {
      name: 'Calming Teas & Herbal Brews',
      notes: 'Organic Kashmiri Kahwa, Chamomile Flowers & Spiced Chai Elixir.',
      beans: 'Whole Leaf First-Flush Himalayan Teas',
      process: 'Steeped to exact botanical perfection'
    }
  ];

  // Robust image asset lookup with safe fallback chain:
  // 1. LEAF_IMAGE_ASSETS.latte_art
  // 2. LEAF_IMAGE_ASSETS.interior_main (Real uploaded cafe interior)
  // 3. LEAF_IMAGE_ASSETS.hero (Real uploaded balcony)
  const coffeeAsset = LEAF_IMAGE_ASSETS.indoor_lounge || LEAF_IMAGE_ASSETS.hero_balcony || {
    url: '/images/leaf_indoor_lounge.jpg',
    alt: 'The Leaf. Specialty Coffee Brew',
    title: 'The Leaf Coffee Craft'
  };

  return (
    <section className="relative py-28 md:py-36 bg-[#171411] text-[#faf7f2] border-b border-[#2e2722]/40 overflow-hidden">
      
      {/* Background Graphic Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8c6547]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7d8c79]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Editorial Top Quote Layout */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1815] border border-[#2e2722] text-[11px] font-mono uppercase tracking-[0.25em] text-[#7d8c79]">
            <CoffeeIcon className="w-3.5 h-3.5" />
            CRAFT BREWING PHILOSOPHY
          </div>

          <h2 className="font-serif text-5xl md:text-7xl font-normal leading-tight text-[#faf7f2]">
            “Brewed for the <span className="italic text-[#eae3d2] font-serif">pause.</span>”
          </h2>

          <p className="text-lg md:text-xl text-[#c4bcae] font-serif italic">
            Highlighting 100% Arabica speciality coffee, natural teas & calming brews at <strong className="text-[#faf7f2] font-semibold">The Leaf.</strong>
          </p>
        </div>

        {/* Feature Grid: Coffee Image Spotlight + Brewing Process Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Coffee Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border border-[#2e2722] shadow-2xl group">
              <img
                src={coffeeAsset.url}
                alt={coffeeAsset.alt || 'The Leaf Coffee Craft'}
                className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-transparent to-transparent opacity-60" />
            </div>

            {/* Overlapping Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#1c1815]/90 backdrop-blur-md p-5 rounded-2xl border border-[#2e2722] shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono text-[#7d8c79] mb-1">
                <span>BEAN ORIGIN</span>
                <span>100% ARABICA</span>
              </div>
              <p className="font-serif text-lg text-[#faf7f2]">Chikmagalur & Baba Budangiri Hills, Karnataka</p>
            </div>
          </div>

          {/* Brewing Method Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2 mb-8">
              <h3 className="font-serif text-3xl text-[#faf7f2]">The Craft & Extraction</h3>
              <p className="text-sm text-[#c4bcae] font-manrope">
                We source exclusively from shade-grown South Indian coffee estates where beans mature slowly, resulting in deeper sweetness and floral clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {brewMethods.map((method, idx) => (
                <div
                  key={method.name}
                  className="bg-[#1c1815]/80 p-6 rounded-2xl border border-[#2e2722] hover:border-[#7d8c79]/40 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#7d8c79]">0{idx + 1}</span>
                    <Flame className="w-4 h-4 text-[#8c6547]" />
                  </div>

                  <h4 className="font-serif text-xl text-[#faf7f2]">{method.name}</h4>
                  <p className="text-xs text-[#c4bcae] leading-relaxed font-manrope font-light">{method.notes}</p>
                  
                  <div className="pt-3 border-t border-[#2e2722]/60 text-[11px] font-mono text-[#c4bcae]/80 flex items-center justify-between">
                    <span>{method.process}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
