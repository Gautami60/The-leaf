/**
 * Authentic Photo Asset Data Model for The Leaf. – Cafe & Brew
 * Real photographs of The Leaf Cafe & Brew in Arera Colony, Bhopal,
 * plus curated food & drink assets.
 */

export interface CafeImageAsset {
  id: string;
  url: string;
  alt: string;
  title: string;
  category: 'ambience' | 'balcony' | 'interior' | 'coffee' | 'food';
  caption: string;
}

export const LEAF_IMAGE_ASSETS: Record<string, CafeImageAsset> = {
  // Real Uploaded Photographs of The Leaf Cafe & Brew
  hero: {
    id: 'hero',
    url: '/images/real_leaf_balcony.jpg',
    alt: 'The Leaf. Cafe & Brew balcony dining area with lush greenery in Arera Colony, Bhopal',
    title: 'The Leaf Balcony Sanctuary',
    category: 'balcony',
    caption: 'Real outdoor balcony overlooking Arera Colony foliage with handcrafted timber seating.'
  },
  interior_main: {
    id: 'interior_main',
    url: '/images/real_leaf_interior.jpg',
    alt: 'The Leaf. Cafe & Brew main indoor lounge with neon sign, turquoise seating and bar',
    title: 'Indoor Main Lounge & Bar',
    category: 'interior',
    caption: 'Real interior lounge featuring lush green walls, turquoise plush armchairs, and illuminated bar.'
  },
  balcony_view: {
    id: 'balcony_view',
    url: '/images/real_leaf_balcony.jpg',
    alt: 'Outdoor balcony view at The Leaf. Bhopal',
    title: 'Open-Air Leaf Balcony',
    category: 'balcony',
    caption: 'Natural breeze and quiet morning corners on our 1st floor balcony.'
  },
  full_composite: {
    id: 'full_composite',
    url: '/images/real_leaf_full.jpg',
    alt: 'The Leaf. Cafe & Brew balcony and indoor overview',
    title: 'The Leaf Overview',
    category: 'ambience',
    caption: 'Full view of balcony and interior lounge at The Leaf.'
  },

  // Coffee Visual Assets
  latte_art: {
    id: 'latte_art',
    url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    alt: 'Artisanal Leaf Latte Art',
    title: 'Artisanal Leaf Latte Art',
    category: 'coffee',
    caption: 'Handcrafted specialty espresso with leaf latte art.'
  },
  coffee_pour: {
    id: 'coffee_pour',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    alt: 'Specialty V60 Pour Over',
    title: 'V60 Specialty Pour-Over',
    category: 'coffee',
    caption: 'Single-origin Chikmagalur Arabica brewed with pour-over precision.'
  },

  // Menu Food & Coffee Item Visual Assets
  mama_rosa_pasta: {
    id: 'mama_rosa_pasta',
    url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281273?auto=format&fit=crop&w=800&q=80',
    alt: 'Mama Rosa Pasta',
    title: 'Mama Rosa Pasta',
    category: 'food',
    caption: 'Silky pink tomato vodka cream sauce with basil.'
  },
  pesto_pasta: {
    id: 'pesto_pasta',
    url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
    alt: 'Pesto Pasta',
    title: 'Pesto Pasta',
    category: 'food',
    caption: 'Pounded basil and pine nut pesto with cherry tomatoes.'
  },
  mac_and_cheese: {
    id: 'mac_and_cheese',
    url: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
    alt: 'Baked Mac & Cheese',
    title: 'Baked Mac & Cheese',
    category: 'food',
    caption: 'Three-cheese blend baked with herb panko crust.'
  },
  chili_garlic_noodles: {
    id: 'chili_garlic_noodles',
    url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    alt: 'Chili Garlic Noodles',
    title: 'Chili Garlic Noodles',
    category: 'food',
    caption: 'Hand-tossed noodles wok-seared with scallions & chili crisps.'
  },
  farmhouse_pizza: {
    id: 'farmhouse_pizza',
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    alt: 'Farmhouse Pizza',
    title: 'Farmhouse Pizza',
    category: 'food',
    caption: 'Slow-fermented sourdough pizza with fresh mozzarella.'
  },
  hazelnut_frappe: {
    id: 'hazelnut_frappe',
    url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    alt: 'Hazelnut Frappe',
    title: 'Hazelnut Frappe',
    category: 'coffee',
    caption: 'Double espresso blended with roasted hazelnut elixir.'
  },
  iced_coffee: {
    id: 'iced_coffee',
    url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    alt: 'Iced Coffee',
    title: 'Iced Coffee',
    category: 'coffee',
    caption: '18-hour cold brew over crystal ice spheres.'
  }
};
