import React from 'react';
import { Sun, MessageCircle, Utensils, Coffee } from 'lucide-react';

export const Experience: React.FC = () => {
  const pillars = [
    {
      title: 'Slow mornings',
      subtitle: '11:00 AM Dawn Pause',
      description: 'Gentle natural light streaming through tall windows, soft acoustic melodies, warm croissants, and the scent of freshly ground Chikmagalur beans to start your day.',
      icon: Sun
    },
    {
      title: 'Long conversations',
      subtitle: 'Sanctuary for Connection',
      description: 'Deep comfortable booths, warm timber finishes, low evening ambiance, and an environment crafted specifically for unhurried talks that stretch into the evening.',
      icon: MessageCircle
    },
    {
      title: 'Good food',
      subtitle: 'Artisanal & Comforting',
      description: 'Handcrafted pasta sauces, fresh mozzarella, hand-tossed noodles, and baked cheeses prepared fresh from scratch using farm-sourced produce.',
      icon: Utensils
    },
    {
      title: 'Better coffee',
      subtitle: 'Specialty Extraction',
      description: 'Ethically sourced 100% Arabica beans, roasted in small batches, precisely weighed, and brewed using V60, Aeropress & pressure espresso methods.',
      icon: Coffee
    }
  ];

  return (
    <section id="experience" className="relative py-28 md:py-36 bg-[#171411] text-[#faf7f2] border-b border-[#2e2722]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1815] border border-[#2e2722] text-[11px] font-mono uppercase tracking-[0.25em] text-[#7d8c79]">
            THE LEAF. EXPERIENCE
          </div>

          <h2 className="font-serif text-5xl md:text-7xl font-normal leading-tight text-[#faf7f2]">
            Come for the coffee.<br />
            <span className="italic text-[#eae3d2] font-serif">Stay for the atmosphere.</span>
          </h2>

          <p className="text-base md:text-lg text-[#c4bcae] font-serif italic max-w-xl mx-auto">
            “A serene space crafted with natural timber, warm sunlight, and an unhurried cadence in the heart of Arera Colony.”
          </p>
        </div>

        {/* 4 Pillars Typographic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group bg-[#1c1815] p-8 rounded-3xl border border-[#2e2722] hover:border-[#7d8c79]/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between hover:-translate-y-1.5 shadow-xl"
              >
                <div className="space-y-6">
                  {/* Top Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#7d8c79]">0{index + 1}</span>
                    <div className="w-10 h-10 rounded-2xl bg-[#12100e] border border-[#2e2722] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5 text-[#7d8c79]" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#c4bcae]/60 block">
                      {pillar.subtitle}
                    </span>
                    <h3 className="font-serif text-3xl text-[#faf7f2] group-hover:text-[#eae3d2] transition-colors">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#c4bcae] font-manrope font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-[#2e2722]/60 text-[11px] font-mono text-[#7d8c79] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7d8c79]" />
                  <span>Arera Colony Vibe</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
