/**
 * Single Source of Truth for Authentic Photography: The Leaf. – Cafe & Brew
 * Real photographs of The Leaf Cafe & Brew in Arera Colony, Bhopal.
 */

export interface CafeImageAsset {
  id: string;
  url: string;
  alt: string;
  title: string;
  category: 'hero' | 'story' | 'atmosphere' | 'balcony' | 'interior' | 'gallery';
  caption: string;
  objectPosition?: string;
}

export const LEAF_IMAGE_ASSETS: Record<string, CafeImageAsset> = {
  // 1. Hero Photograph: Daytime Leaf Balcony with green canopy
  hero_balcony: {
    id: 'hero_balcony',
    url: '/images/leaf_balcony_day.jpg',
    alt: 'The Leaf. Daytime outdoor balcony overlooking Arera Colony greenery',
    title: 'Balcony Canopy View',
    category: 'hero',
    caption: '1st floor outdoor balcony surrounded by natural greenery and handcrafted wooden tables.',
    objectPosition: 'center 40%'
  },

  // 2. Story Photograph: Real Indoor Lounge & Bar with turquoise armchairs and neon sign
  indoor_lounge: {
    id: 'indoor_lounge',
    url: '/images/leaf_indoor_lounge.jpg',
    alt: 'The Leaf. Main indoor lounge featuring green walls, turquoise armchairs, and illuminated bar',
    title: 'Indoor Main Lounge & Bar',
    category: 'story',
    caption: 'Cozy indoor seating area with plush turquoise armchairs, green accent walls, and artisanal coffee bar.',
    objectPosition: 'center center'
  },

  // 3. Outdoor Seating Photograph: High wooden tables along glass facade
  balcony_seating: {
    id: 'balcony_seating',
    url: '/images/leaf_balcony_seating.jpg',
    alt: 'The Leaf. Balcony seating area with carved wooden chairs along the glass facade',
    title: 'Balcony Glass Facade Seating',
    category: 'balcony',
    caption: 'High wooden round tables and carved chairs situated along the glass window wall.',
    objectPosition: 'center center'
  },

  // 4. Nighttime Balcony Photograph: Glowing wicker lamps & city views
  balcony_night: {
    id: 'balcony_night',
    url: '/images/leaf_balcony_night.jpg',
    alt: 'The Leaf. Nighttime balcony ambiance with glowing wicker pendant lamps',
    title: 'Evening Balcony Ambiance',
    category: 'atmosphere',
    caption: 'Warm wicker pendant lamps glowing softly over evening balcony tables.',
    objectPosition: 'center 30%'
  },

  // 5. Gallery Wall Photograph: Framed black & white architecture art prints
  gallery_wall: {
    id: 'gallery_wall',
    url: '/images/leaf_gallery_wall.jpg',
    alt: 'The Leaf. Interior gallery wall featuring black and white architectural photography',
    title: 'Café Art & Gallery Wall',
    category: 'gallery',
    caption: 'Framed black & white world architecture photography wall inside the café.',
    objectPosition: 'center center'
  },

  // Compatibility aliases to prevent any component runtime crashes
  hero: {
    id: 'hero',
    url: '/images/leaf_balcony_day.jpg',
    alt: 'The Leaf. Daytime outdoor balcony overlooking Arera Colony greenery',
    title: 'Balcony Canopy View',
    category: 'hero',
    caption: '1st floor outdoor balcony surrounded by natural greenery.',
    objectPosition: 'center 40%'
  },
  interior_main: {
    id: 'interior_main',
    url: '/images/leaf_indoor_lounge.jpg',
    alt: 'The Leaf. Main indoor lounge featuring green walls, turquoise armchairs, and illuminated bar',
    title: 'Indoor Main Lounge & Bar',
    category: 'story',
    caption: 'Cozy indoor seating area with plush turquoise armchairs.',
    objectPosition: 'center center'
  },
  balcony_view: {
    id: 'balcony_view',
    url: '/images/leaf_balcony_seating.jpg',
    alt: 'The Leaf. Balcony seating area',
    title: 'Balcony Glass Facade Seating',
    category: 'balcony',
    caption: 'High wooden round tables and carved chairs along the glass window wall.',
    objectPosition: 'center center'
  }
};

