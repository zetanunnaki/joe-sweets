export interface ProductVariant {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  category: string;
  subcategory?: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  variants: ProductVariant[];
  tags: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar: string;
  date: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  instagram: string;
  address: string;
  deliveryZones: string[];
  deliveryFee: number;
  freeDeliveryMin: number;
  businessHours: string;
  stripe: {
    publicKey: string;
  };
}

export interface CartItem {
  productId: string;
  variantId: string;
  qty: number;
  price: number;
  name: string;
  image: string;
  variantLabel: string;
}

export interface CartState {
  items: CartItem[];
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  qty: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    deliveryDate: string;
    specialInstructions?: string;
  };
  total: number;
  stripePaymentId: string;
  status: 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Subscriber {
  email: string;
  subscribedAt: string;
}
