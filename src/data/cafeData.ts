import type { MenuItem, ReviewItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Pastas
  {
    id: 'mama-rosa-pasta',
    name: 'Mama Rosa Pasta',
    category: 'pasta',
    price: 395,
    description: 'Silky penne tossed in house-special vodka pink cream sauce, roasted garlic, fresh basil, parmigiano reggiano & artisan sourdough croutons.',
    isSignature: true,
    dietary: ['Veg', 'Chef Special'],
    prepTime: '18 mins',
    availability: 'available'
  },
  {
    id: 'pesto-pasta',
    name: 'Pesto Pasta',
    category: 'pasta',
    price: 385,
    description: 'Freshly pounded basil & pine nut pesto tossed with fettuccine, blistered cherry tomatoes, extra virgin olive oil & toasted pine nuts.',
    isSignature: true,
    dietary: ['Veg', 'Contains Nuts'],
    prepTime: '16 mins',
    availability: 'available'
  },
  {
    id: 'creamy-pasta',
    name: 'Creamy Alfredo Pasta',
    category: 'pasta',
    price: 375,
    description: 'Rich & velvety garlic parmesan cream sauce tossed with penne, roasted broccoli, cracked black pepper & fresh herbs.',
    isSignature: true,
    dietary: ['Veg'],
    prepTime: '15 mins',
    availability: 'available'
  },

  // Food / Mains
  {
    id: 'baked-mac-cheese',
    name: 'Baked Mac & Cheese',
    category: 'food',
    price: 365,
    description: 'Elbow macaroni baked in a rich three-cheese sauce, topped with gold herb-panko crust and a subtle truffle essence finish.',
    isSignature: true,
    dietary: ['Veg'],
    prepTime: '20 mins',
    availability: 'available'
  },

  // Chinese / Asian
  {
    id: 'chili-garlic-noodles',
    name: 'Chili Garlic Noodles',
    category: 'chinese',
    price: 325,
    description: 'Hand-tossed artisan noodles wok-seared with charred scallions, dark soy, chili crisps, microgreens & roasted sesame glaze.',
    isSignature: true,
    dietary: ['Veg', 'Chef Special'],
    prepTime: '15 mins',
    availability: 'available'
  },

  // Pizza
  {
    id: 'farmhouse-pizza',
    name: 'Farmhouse Pizza',
    category: 'pizza',
    price: 445,
    description: 'Slow-fermented sourdough pizza crust topped with crushed heirloom tomato sauce, grilled bell peppers, wild mushrooms, fresh mozzarella & wild oregano.',
    isSignature: true,
    dietary: ['Veg'],
    prepTime: '22 mins',
    availability: 'available'
  },

  // Coffee & Cold Brews
  {
    id: 'hazelnut-frappe',
    name: 'Hazelnut Frappe',
    category: 'coffee',
    price: 245,
    description: 'Double shot 100% Arabica espresso blended with roasted hazelnut elixir, velvety cold milk, topped with whipped espresso cream.',
    isSignature: true,
    dietary: ['Veg', 'Contains Nuts'],
    prepTime: '8 mins',
    availability: 'available'
  },
  {
    id: 'iced-coffee',
    name: 'Iced Coffee',
    category: 'coffee',
    price: 210,
    description: '18-hour slow-extracted Chikmagalur cold brew poured over solid crystal ice spheres with optional velvety oat milk Float.',
    isSignature: true,
    dietary: ['Veg', 'Vegan'],
    prepTime: '5 mins',
    availability: 'available'
  },

  // Drinks / Teas / Refreshers
  {
    id: 'matcha-cold-foam',
    name: 'Iced Uji Matcha Latte',
    category: 'drinks',
    price: 260,
    description: 'Ceremonial grade Japanese Uji matcha whisked with cold oat milk and sweet vanilla bean cold foam.',
    isSignature: false,
    dietary: ['Veg', 'Vegan'],
    prepTime: '6 mins',
    availability: 'available'
  },

  // Desserts
  {
    id: 'tiramisu-jar',
    name: 'Artisanal Tiramisu Jar',
    category: 'desserts',
    price: 285,
    description: 'Traditional Italian ladyfingers soaked in dark espresso & dark rum extract, layered with whipped mascarpone & Valrhona cocoa dust.',
    isSignature: false,
    dietary: ['Veg'],
    prepTime: '5 mins',
    availability: 'available'
  }
];

export const REAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Aarav Sharma',
    role: 'Local Guide & Coffee Enthusiast',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The Leaf. is easily one of the best aesthetic cafes in Arera Colony! The ambiance is cozy, greenery everywhere, and the Hazelnut Frappe is heavenly. Excellent spot to sit with a book or meet friends.',
    source: 'Google Review'
  },
  {
    id: 'rev-2',
    author: 'Dr. Priya Malviya',
    role: 'Bhopal Foodie',
    rating: 5,
    date: '1 month ago',
    comment: 'Mama Rosa Pasta here is legendary. Perfectly cooked pasta with a rich garlic tomato sauce. The music volume is just right, and staff is super warm. 10/10 recommendation for Arera Colony.',
    source: 'Google Review'
  },
  {
    id: 'rev-3',
    author: 'Rohan Deshmukh',
    role: 'Architect',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Loved the interior design and minimal editorial feel. Coffee quality (especially their V60 pour-over) matches specialty roasters in metro cities. A very peaceful corner in Bhopal.',
    source: 'Dineout'
  },
  {
    id: 'rev-4',
    author: 'Saniya Khan',
    role: 'Design Lead',
    rating: 5,
    date: '2 months ago',
    comment: 'The Baked Mac & Cheese paired with cold brew iced coffee is my go-to weekend treat. Arera Colony needed a place like this that focuses on genuine food quality and quiet elegance.',
    source: 'Google Review'
  }
];
