import { useState } from 'react';
import { GlobalAtmosphere } from './components/GlobalAtmosphere';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Menu } from './components/Menu';
import { WhatsNew } from './components/WhatsNew';
import { PersonalOffers } from './components/PersonalOffers';
import { Experience } from './components/Experience';
import { EventsHappenings } from './components/EventsHappenings';
import { Reviews } from './components/Reviews';
import { Visit } from './components/Visit';
import { ReservationModal } from './components/ReservationModal';
import { CmsModal } from './components/CmsModal';
import { Footer } from './components/Footer';

import { MENU_ITEMS } from './data/cafeData';
import { INITIAL_WHATS_NEW, INITIAL_OFFERS, INITIAL_EVENTS } from './data/cmsStore';
import type { WhatsNewItem, OfferItem, EventItem } from './data/cmsStore';
import { INITIAL_TABLES, INITIAL_RESERVATIONS } from './data/reservationStore';
import type { CafeTable, Reservation } from './types/reservation';
import type { MenuItem } from './types';

export function App() {
  const [tables] = useState<CafeTable[]>(INITIAL_TABLES);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  
  // Dynamic CMS state stores
  const [menuList, setMenuList] = useState<MenuItem[]>(MENU_ITEMS);
  const [whatsNewList, setWhatsNewList] = useState<WhatsNewItem[]>(INITIAL_WHATS_NEW);
  const [offersList, setOffersList] = useState<OfferItem[]>(INITIAL_OFFERS);
  const [eventsList, setEventsList] = useState<EventItem[]>(INITIAL_EVENTS);

  // Modals & Portal states
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCmsOpen, setIsCmsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNewReservation = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
  };

  // CMS Handlers
  const handleAddMenuItem = (newItem: MenuItem) => {
    setMenuList((prev) => [newItem, ...prev]);
  };

  const handleToggleItemAvailability = (itemId: string) => {
    setMenuList((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextAvail = item.availability === 'available' ? 'sold_out_today' : 'available';
          return { ...item, availability: nextAvail };
        }
        return item;
      })
    );
  };

  const handleAddWhatsNew = (newItem: WhatsNewItem) => {
    setWhatsNewList((prev) => [newItem, ...prev]);
  };

  const handleAddOffer = (newOffer: OfferItem) => {
    setOffersList((prev) => [newOffer, ...prev]);
  };

  const handleAddEvent = (newEvent: EventItem) => {
    setEventsList((prev) => [newEvent, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0a1410] text-[#faf7f2] font-inter selection:bg-[#7d8c79]/30 selection:text-[#faf7f2] overflow-x-hidden relative">
      
      {/* 0. Global Starry Night Atmosphere Background Shell */}
      <GlobalAtmosphere />

      {/* Top Navbar */}
      <Navbar
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenCms={() => setIsCmsOpen(true)}
      />

      {/* 1. Hero Section */}
      <Hero
        onExploreMenu={() => scrollToSection('#menu')}
      />

      {/* 2. Story Section */}
      <Story />

      {/* 3. Menu Section */}
      <Menu
        items={menuList}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* 4. What's New Section */}
      <WhatsNew items={whatsNewList} />

      {/* 5. Personal Offers Section */}
      <PersonalOffers offers={offersList} />

      {/* 6. Experience Section */}
      <Experience />

      {/* 7. Events & Happenings */}
      <EventsHappenings events={eventsList} />

      {/* 8. Reviews Section */}
      <Reviews />

      {/* 9. Visit Section */}
      <Visit onOpenReservation={() => setIsReservationOpen(true)} />

      {/* Customer Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        tables={tables}
        reservations={reservations}
        onNewReservation={handleNewReservation}
      />

      {/* CMS Manager Modal */}
      <CmsModal
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        menuItems={menuList}
        onAddMenuItem={handleAddMenuItem}
        onToggleItemAvailability={handleToggleItemAvailability}
        onAddWhatsNew={handleAddWhatsNew}
        onAddOffer={handleAddOffer}
        onAddEvent={handleAddEvent}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
