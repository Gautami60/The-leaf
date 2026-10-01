export type MenuCategory = 'coffee' | 'drinks' | 'food' | 'pasta' | 'chinese' | 'pizza' | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  isSignature?: boolean;
  dietary?: ('Veg' | 'Vegan' | 'Chef Special' | 'Contains Nuts')[];
  prepTime?: string;
  availability: 'available' | 'sold_out_today';
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  source: 'Google Review' | 'Zomato Gold' | 'Dineout';
}
