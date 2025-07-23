export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Vendor {
  id: string;
  name: string;
  address: string;
  logo?: string;
  description: string;
  rating: number;
  phone: string;
  specialties: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  vendorId: string;
  vendor: string;
  rating: number;
  available: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  eventDate: string;
  eventLocation: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed';
  paymentStatus: 'none' | 'dp' | 'full';
  paymentProof?: string;
  createdAt: string;
}

export type Category = 'pelaminan' | 'fotografer' | 'musik' | 'mua' | 'mc' | 'paket';