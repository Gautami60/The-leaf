import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { EventItem } from '../data/cmsStore';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { modalVariants } from '../utils/motion';
import { LEAF_IMAGE_ASSETS } from '../data/imageAssets';

interface EventsHappeningsProps {
  events: EventItem[];
}

export const EventsHappenings: React.FC<EventsHappeningsProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Dynamic selection of featured / newest event
  const featuredEvent = events.find((e) => e.isUpcoming) || events[0];
  const remainingEvents = events.filter((e) => e?.id !== featuredEvent?.id);

  const defaultFeaturedImage = LEAF_IMAGE_ASSETS.balcony_night.url;

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleRsvp = () => {
    setRsvpConfirmed(true);
    setTimeout(() => {
      setRsvpConfirmed(false);
      setSelectedEvent(null);
    }, 2500);
  };

  // Handle Escape key for event detail modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedEvent) {
        setSelectedEvent(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvent]);

  return (
    <section id="events" className="w-full bg-[#0d0f0e] py-24 md:py-32 font-body-md border-t border-[#4c463c]/20 text-[#e2e3e0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#4c463c]/30 pb-3 mb-12 gap-2">
          <div>
            <span className="font-label-caps text-xs text-[#dac498] tracking-widest uppercase block mb-1">
              03 / FORTHCOMING NOCTURNES
            </span>
            <h2 className="font-headline-lg text-4xl sm:text-5xl font-serif text-[#e2e3e0]">
              Cultural Calendar & Sessions
            </h2>
          </div>
          <div className="font-label-caps text-xs text-[#989083] uppercase tracking-wider">
            INTIMATE OCCUPANCY • 24 GUESTS
          </div>
        </div>

        {/* 1. Hero / Featured Event Composition */}
        {featuredEvent && (
          <div className="mb-16 pb-16 border-b border-[#4c463c]/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Featured Event Image Anchor (7 Cols) */}
              <div
                onClick={() => setSelectedEvent(featuredEvent)}
                className="lg:col-span-7 relative aspect-[16/10] overflow-hidden border border-[#4c463c]/30 bg-[#1e201f] group cursor-pointer"
              >
                <img
                  src={
                    featuredEvent.image && !failedImages[featuredEvent.id]
                      ? featuredEvent.image
                      : defaultFeaturedImage
                  }
                  alt={featuredEvent.title}
                  onError={() => handleImageError(featuredEvent.id)}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f0e]/85 via-[#0d0f0e]/20 to-transparent pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 bg-[#0d0f0e]/85 backdrop-blur-md px-3.5 py-1.5 border border-[#4c463c]/30">
                  <span className="font-label-caps text-[11px] text-[#dac498] tracking-widest uppercase font-semibold">
                    NEXT AT THE LEAF
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-label-caps">
                  <span className="text-[#e2e3e0] tracking-wider uppercase bg-[#0d0f0e]/80 backdrop-blur-sm px-3 py-1 border border-[#4c463c]/30">
                    {featuredEvent.category}
                  </span>
                  <span className="text-[#dac498] font-bold tracking-widest">
                    [{featuredEvent.date}]
                  </span>
                </div>
              </div>

              {/* Featured Event Narrative Column (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#dac498] animate-pulse" />
                    <span className="font-label-caps text-xs text-[#dac498] uppercase tracking-widest font-semibold">
                      FEATURED NOCTURNE SESSION
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedEvent(featuredEvent)}
                    className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-serif text-[#e2e3e0] hover:text-[#dac498] transition-colors cursor-pointer leading-tight"
                  >
                    {featuredEvent.title}
                  </h3>

                  <div className="flex items-center gap-4 mt-4 font-label-caps text-xs text-[#989083]">
                    <span className="text-[#dac498] font-bold px-2 py-0.5 border border-[#dac498]/40">
                      {featuredEvent.date}
                    </span>
                    <span>•</span>
                    <span>{featuredEvent.time}</span>
                  </div>

                  <p className="mt-4 font-body-sm text-sm sm:text-base text-[#cfc5b7] font-light leading-relaxed">
                    {featuredEvent.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#4c463c]/20 flex items-center justify-between">
                  <span className="font-label-caps text-xs text-[#989083] uppercase tracking-wider">
                    Venue: Starlit Veranda Atrium
                  </span>
                  <button
                    onClick={() => setSelectedEvent(featuredEvent)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#dac498] text-[#3c2e0f] font-label-caps text-xs uppercase tracking-widest font-bold hover:bg-[#b9a47a] transition-colors cursor-pointer"
                  >
                    <span>RESERVE PASS</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#3c2e0f]" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. Secondary / Upcoming Calendar List */}
        {remainingEvents.length > 0 && (
          <div className="space-y-6">
            <div className="font-label-caps text-xs text-[#989083] uppercase tracking-widest">
              UPCOMING CULTURAL CALENDAR
            </div>

            <div className="divide-y divide-[#4c463c]/20 border-t border-b border-[#4c463c]/20">
              {remainingEvents.map((evt) => (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedEvent(evt)}
                  className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center group cursor-pointer hover:bg-[#1e201f]/50 px-3 sm:px-4 transition-colors"
                >
                  <div className="md:col-span-3 flex items-center gap-3">
                    <span className="font-label-caps text-xs text-[#dac498] px-2.5 py-1 border border-[#dac498]/40 shrink-0">
                      [{evt.date}]
                    </span>
                    <span className="font-label-caps text-xs text-[#989083] tracking-wider uppercase truncate">
                      {evt.time}
                    </span>
                  </div>

                  <div className="md:col-span-6">
                    <h4 className="font-headline-sm text-xl sm:text-2xl font-serif text-[#e2e3e0] group-hover:text-[#dac498] transition-colors leading-tight">
                      {evt.title}
                    </h4>
                    <p className="font-body-sm text-xs sm:text-sm text-[#cfc5b7] font-light mt-1 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="md:col-span-3 md:text-right">
                    <span className="font-label-caps text-xs text-[#cfc5b7] group-hover:text-[#dac498] transition-colors inline-flex items-center gap-2 tracking-wider">
                      RESERVE PASS <ArrowRight className="w-3.5 h-3.5 text-[#dac498]" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Event Details Drawer */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-50 bg-[#0d0f0e]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 cursor-pointer"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1e201f] border border-[#4c463c]/30 max-w-lg w-full overflow-hidden shadow-2xl relative font-body-md cursor-default"
            >
              {selectedEvent.image && !failedImages[selectedEvent.id] ? (
                <div className="relative h-60">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    onError={() => handleImageError(selectedEvent.id)}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedEvent(null)}
                    aria-label="Close event modal"
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0d0f0e]/80 text-[#e2e3e0] hover:text-[#dac498] border border-[#4c463c]/30 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="relative p-6 bg-[#0d0f0e] border-b border-[#4c463c]/30 flex justify-between items-center">
                  <span className="font-label-caps text-xs text-[#dac498] uppercase tracking-wider">{selectedEvent.category}</span>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    aria-label="Close event modal"
                    className="w-10 h-10 rounded-full bg-white/5 text-[#e2e3e0] hover:text-[#dac498] border border-[#4c463c]/30 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-2">
                  <span className="font-label-caps text-xs text-[#dac498] uppercase tracking-wider">{selectedEvent.category}</span>
                  <h3 className="font-headline-md text-3xl font-serif text-[#e2e3e0]">{selectedEvent.title}</h3>
                  <div className="flex gap-4 font-label-caps text-xs text-[#cfc5b7]">
                    <span>🗓 {selectedEvent.date}</span>
                    <span>⏰ {selectedEvent.time}</span>
                  </div>
                </div>

                <p className="text-sm text-[#cfc5b7] font-light leading-relaxed">
                  {selectedEvent.description}
                </p>

                <div className="p-4 bg-[#0d0f0e] border border-[#4c463c]/30 text-xs font-label-caps text-[#cfc5b7]">
                  📍 Venue: Balcony & Main Lounge, The Leaf. Arera Colony Bhopal
                </div>

                {!rsvpConfirmed ? (
                  <button
                    onClick={handleRsvp}
                    className="w-full py-3.5 bg-[#dac498] text-[#3c2e0f] font-label-caps text-xs uppercase tracking-widest font-bold hover:bg-[#b9a47a] transition-colors cursor-pointer"
                  >
                    RSVP FOR EVENT
                  </button>
                ) : (
                  <div className="py-3 bg-[#dac498]/20 text-[#dac498] border border-[#dac498]/40 text-center font-label-caps text-xs font-bold flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    RSVP Confirmed! See you at The Leaf.
                  </div>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


