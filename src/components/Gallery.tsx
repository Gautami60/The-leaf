import React, { useState } from 'react';
import { Maximize2, X, Image as ImageIcon } from 'lucide-react';
import { LEAF_IMAGE_ASSETS } from '../data/imageAssets';

export const Gallery: React.FC = () => {
  const galleryItems = [
    LEAF_IMAGE_ASSETS.hero,
    LEAF_IMAGE_ASSETS.interior_main,
    LEAF_IMAGE_ASSETS.balcony_view,
    LEAF_IMAGE_ASSETS.mama_rosa_pasta,
    LEAF_IMAGE_ASSETS.latte_art,
    LEAF_IMAGE_ASSETS.coffee_pour,
  ].filter(Boolean);

  const [activeImage, setActiveImage] = useState<typeof galleryItems[0] | null>(null);

  return (
    <section className="relative py-28 md:py-36 bg-[#12100e] text-[#faf7f2] border-b border-[#2e2722]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1815] border border-[#2e2722] text-[11px] font-mono uppercase tracking-[0.25em] text-[#7d8c79]">
            <ImageIcon className="w-3.5 h-3.5" />
            REAL VISUAL ATMOSPHERE
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#faf7f2]">
            Moments at <span className="italic text-[#eae3d2] font-serif">The Leaf.</span>
          </h2>

          <p className="text-sm md:text-base text-[#c4bcae] font-manrope font-light">
            An authentic photographic glance into our sanctuary in Arera Colony, Bhopal.
          </p>
        </div>

        {/* Asymmetric Masonry / Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-[#2e2722] hover:border-[#7d8c79]/50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                index === 0 ? 'md:col-span-2 md:row-span-2 h-[420px] md:h-[580px]' : 'h-[280px] md:h-[360px]'
              }`}
            >
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-[#12100e]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Content on Hover */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#7d8c79] bg-[#12100e]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#2e2722]">
                    {item.category}
                  </span>

                  <span className="w-9 h-9 rounded-full bg-[#12100e]/80 backdrop-blur-md text-[#faf7f2] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#faf7f2]">{item.title}</h3>
                  <p className="text-xs text-[#c4bcae] font-manrope font-light">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-[#12100e]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#1c1815] border border-[#2e2722] rounded-3xl overflow-hidden shadow-2xl animate-fade-in"
          >
            <div className="relative max-h-[75vh] overflow-hidden">
              <img
                src={activeImage.url}
                alt={activeImage.alt}
                className="w-full h-full object-contain max-h-[75vh] mx-auto bg-[#12100e]"
              />
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 bg-[#12100e]/80 hover:bg-[#12100e] text-[#faf7f2] p-2.5 rounded-full border border-[#2e2722] cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 bg-[#1c1815] border-t border-[#2e2722] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#7d8c79] block mb-1">
                  {activeImage.category}
                </span>
                <h3 className="font-serif text-2xl text-[#faf7f2]">{activeImage.title}</h3>
                <p className="text-xs text-[#c4bcae] mt-1 font-manrope font-light">{activeImage.caption}</p>
              </div>

              <button
                onClick={() => setActiveImage(null)}
                className="px-6 py-2.5 bg-[#faf7f2] text-[#12100e] text-xs font-manrope font-bold uppercase tracking-widest rounded-full hover:bg-[#eae3d2] transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
