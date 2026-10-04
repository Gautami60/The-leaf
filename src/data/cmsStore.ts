export interface WhatsNewItem {
  id: string;
  category: 'NEW DRINK' | 'NEW DISH' | 'NEW BAKE' | 'SEASONAL';
  title: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  launchDate: string;
  isNew: boolean;
}

export interface OfferItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  code: string;
  expiry: string;
  badge: string;
  terms: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  category: 'Live Music' | 'Coffee Workshop' | 'Open Mic' | 'Special Evening';
  isUpcoming: boolean;
}

export const INITIAL_WHATS_NEW: WhatsNewItem[] = [
  {
    id: 'wn-1',
    category: 'NEW DRINK',
    title: 'Pistachio Cold Brew',
    tagline: 'Now brewing at The Leaf.',
    description: '18-hour slow-extracted Chikmagalur cold brew crowned with handcrafted pistachio cold foam and crushed roasted pistachios.',
    price: 265,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    launchDate: 'October 2026',
    isNew: true
  },
  {
    id: 'wn-2',
    category: 'NEW DISH',
    title: 'Truffle Wild Mushroom Pasta',
    tagline: 'Freshly added to the menu.',
    description: 'Handcrafted fettuccine tossed with sautéed shiitake & portobello mushrooms, garlic cream sauce, and black truffle oil.',
    price: 425,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
    launchDate: 'October 2026',
    isNew: true
  },
  {
    id: 'wn-3',
    category: 'NEW BAKE',
    title: 'Warm Almond Croissant',
    tagline: 'Freshly baked every morning at 11 AM.',
    description: 'Flaky buttery sourdough croissant filled with rich almond frangipane cream and toasted sliced almonds.',
    price: 210,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    launchDate: 'This Week',
    isNew: true
  }
];

export const INITIAL_OFFERS: OfferItem[] = [
  {
    id: 'off-1',
    title: '15% OFF YOUR NEXT COFFEE',
    subtitle: 'Welcome to The Leaf digital home',
    description: 'Enjoy 15% off any specialty pour-over or cold brew when you show this offer code to our barista.',
    code: 'LEAF15',
    expiry: 'Valid until Sunday',
    badge: 'CAFÉ SPECIAL',
    terms: 'Applicable on all espresso & pour-over coffee drinks.'
  },
  {
    id: 'off-2',
    title: 'WEEKDAY COFFEE SPECIAL',
    subtitle: '11:00 AM – 3:00 PM',
    description: 'Buy 1 Specialty Cold Brew or Hazelnut Frappe and get 50% off your second coffee during weekday afternoon hours.',
    code: 'AFTERNOON50',
    expiry: 'Mon – Fri Only',
    badge: 'POPULAR',
    terms: 'Valid on dine-in orders between 11 AM and 3 PM.'
  },
  {
    id: 'off-3',
    title: 'NEW MENU LAUNCH OFFER',
    subtitle: 'Complimentary Tiramisu Jar',
    description: 'Receive a complimentary artisanal Tiramisu Jar with any 2 gourmet pasta or pizza mains ordered.',
    code: 'SWEETTREAT',
    expiry: 'Limited Slots Daily',
    badge: 'CHEF SPECIAL',
    terms: 'Minimum bill of ₹750 required.'
  },
  {
    id: 'off-4',
    title: 'BIRTHDAY TREAT FROM THE LEAF.',
    subtitle: 'Celebrate your special day with us',
    description: 'Celebrate your birthday at The Leaf and receive a complimentary specialty brew and handcrafted dessert slice.',
    code: 'BIRTHDAYLEAF',
    expiry: 'Valid during birthday month',
    badge: 'CELEBRATION',
    terms: 'Valid ID proof required upon dine-in.'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Acoustic Sunset Live',
    date: 'Saturday · Oct 14',
    time: '7:00 PM – 9:30 PM',
    description: 'Unwind on our leaf-view balcony with soulful live acoustic guitar, warm lantern lights, and single-origin cold extractions.',
    image: '/images/leaf_balcony_night.jpg',
    category: 'Live Music',
    isUpcoming: true
  },
  {
    id: 'evt-2',
    title: 'Artisanal Coffee Cupping Workshop',
    date: 'Sunday · Oct 15',
    time: '11:30 AM – 1:00 PM',
    description: 'Learn flavor profiling, V60 pour-over techniques, and taste single-origin Karnataka Arabicas with our head roaster.',
    image: '/images/leaf_indoor_lounge.jpg',
    category: 'Coffee Workshop',
    isUpcoming: true
  },
  {
    id: 'evt-3',
    title: 'Poetry & Open Mic Evening',
    date: 'Friday · Oct 20',
    time: '7:30 PM – 10:00 PM',
    description: 'A cozy evening of storytelling, acoustic music, and original spoken word in our upper gallery sanctuary.',
    image: '/images/leaf_gallery_wall.jpg',
    category: 'Open Mic',
    isUpcoming: true
  }
];
