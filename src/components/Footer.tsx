import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 pt-16 pb-12 font-manrope">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Large Brand Heading & Sub-ledger */}
        <div className="mb-16 pb-8 border-b border-outline-variant/20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="font-headline-lg text-5xl md:text-7xl font-bodoni text-on-surface/15 select-none tracking-tight">
            THE LEAF.
          </div>
          <div className="font-label-caps text-xs text-outline tracking-widest max-w-md uppercase">
            1st Floor, E7/161, Arera Colony, Bhopal — 11:00 AM to 11:30 PM
          </div>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-2">
          {/* Column 1: Editions */}
          <div className="flex flex-col space-y-3">
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold">
              EDITIONS
            </span>
            <div className="flex flex-col space-y-2">
              <a
                href="#events"
                className="font-body-sm text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Nocturne Sessions
              </a>
              <a
                href="#experience"
                className="font-body-sm text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Balcony Sessions
              </a>
              <a
                href="#menu"
                className="font-body-sm text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Cupping Archive
              </a>
            </div>
          </div>

          {/* Column 2: Enquiries */}
          <div className="flex flex-col space-y-3">
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold">
              ENQUIRIES
            </span>
            <div className="flex flex-col space-y-2">
              <a
                href="#visit"
                className="font-body-sm text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Private Gatherings
              </a>
              <a
                href="#visit"
                className="font-body-sm text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Press & Archival Requests
              </a>
              <a
                href="#visit"
                className="font-body-sm text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Botanical Residencies
              </a>
            </div>
          </div>

          {/* Column 3: Hours & Atmosphere */}
          <div className="flex flex-col space-y-3">
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold">
              HOURS & ATMOSPHERE
            </span>
            <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
              Tuesday through Sunday
              <br />
              Dusk till Late (11:00 AM — 11:30 PM)
            </p>
            <p className="font-body-sm text-xs text-outline pt-1 leading-normal">
              Curated architectural acoustics and low-light botanical atrium.
            </p>
          </div>
        </div>

        {/* Sub-Footer Metadata & Top Scroll */}
        <div className="mt-16 pt-6 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between text-outline font-label-caps text-[11px] tracking-widest uppercase">
          <p>© 2025 THE LEAF CAFE. ARERA COLONY, BHOPAL. ALL RIGHTS RESERVED.</p>
          <div className="mt-3 sm:mt-0 flex items-center gap-4">
            <span>23.2185° N, 77.4343° E</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-primary hover:text-on-surface transition-colors cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};


