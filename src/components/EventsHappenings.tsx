import React, { useState } from 'react';
import type { EventItem } from '../data/cmsStore';
import { Calendar, Clock, Sparkles, X, CheckCircle } from 'lucide-react';

interface EventsHappeningsProps {
  events: EventItem[];
}

export const EventsHappenings: React.FC<EventsHappeningsProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);

  const handleRsvp = () => {
    setRsvpConfirmed(true);
    setTimeout(() => {
      setRsvpConfirmed(false);
      setSelectedEvent(null);
    }, 2500);
  };

  return (
    <section className="relative py-28 md:py-36 bg-[#171411] text-[#faf7f2] border-b border-[#2e2722]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#7d8c79]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#7d8c79] font-mono font-medium">CAFÉ CULTURE</span>
              <div className="h-[1px] w-12 bg-[#2e2722]" />
            </div>
            
            <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#faf7f2]">
              Happening at <span className="italic text-[#eae3d2] font-serif">The Leaf.</span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#c4bcae] font-manrope font-light max-w-md">
            Live music sessions, coffee cupping workshops, and poetry evenings on our balcony.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="group bg-[#1c1815] rounded-3xl border border-[#2e2722] hover:border-[#7d8c79]/50 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between hover:-translate-y-1.5 shadow-xl"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-transparent to-transparent opacity-80" />

                  <span className="absolute top-4 left-4 bg-[#12100e]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#7d8c79] border border-[#2e2722] uppercase tracking-wider">
                    {evt.category}
                  </span>
                </div>

                <div className="p-6 md:p-8 space-y-4">
                  <div className="space-y-1 text-xs font-mono text-[#7d8c79]">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {evt.date}</span>
                    <span className="flex items-center gap-1.5 text-[#c4bcae]"><Clock className="w-3.5 h-3.5" /> {evt.time}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#faf7f2] group-hover:text-[#eae3d2] transition-colors">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-[#c4bcae] font-manrope font-light leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-0">
                <button
                  onClick={() => setSelectedEvent(evt)}
                  className="w-full py-3 bg-[#12100e] hover:bg-[#7d8c79] text-[#faf7f2] hover:text-[#12100e] text-xs font-manrope font-bold uppercase tracking-widest rounded-full border border-[#2e2722] transition-all cursor-pointer"
                >
                  SEE WHAT'S HAPPENING
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Event Details Drawer */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-[#12100e]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6">
          <div className="bg-[#1c1815] border border-[#2e2722] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-fade-in">
            
            <div className="relative h-60">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#12100e]/80 text-[#faf7f2] border border-[#2e2722] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#7d8c79] uppercase tracking-wider">{selectedEvent.category}</span>
                <h3 className="font-serif text-3xl text-[#faf7f2]">{selectedEvent.title}</h3>
                <div className="flex gap-4 text-xs font-mono text-[#c4bcae]">
                  <span>🗓 {selectedEvent.date}</span>
                  <span>⏰ {selectedEvent.time}</span>
                </div>
              </div>

              <p className="text-xs text-[#c4bcae] font-manrope leading-relaxed">
                {selectedEvent.description}
              </p>

              <div className="p-4 bg-[#12100e] rounded-2xl border border-[#2e2722] text-xs font-mono text-[#c4bcae]">
                📍 Venue: Balcony & Main Lounge, The Leaf. Arera Colony Bhopal
              </div>

              {!rsvpConfirmed ? (
                <button
                  onClick={handleRsvp}
                  className="w-full py-3.5 bg-[#faf7f2] text-[#12100e] text-xs font-manrope font-bold uppercase tracking-widest rounded-full hover:bg-[#eae3d2] transition-colors cursor-pointer"
                >
                  RSVP FOR EVENT
                </button>
              ) : (
                <div className="py-3 bg-[#7d8c79]/20 text-[#7d8c79] border border-[#7d8c79]/40 rounded-full text-center text-xs font-mono font-bold flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  RSVP Confirmed! See you at The Leaf.
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
