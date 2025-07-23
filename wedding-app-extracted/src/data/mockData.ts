import { Vendor, Product } from '../types';

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Elegant Wedding Solutions',
    address: 'Jl. Merdeka No. 123, Jakarta Pusat',
    description: 'Spesialis dekorasi pernikahan mewah dengan pengalaman lebih dari 10 tahun',
    rating: 4.8,
    phone: '+62812-3456-7890',
    specialties: ['Dekorasi Pelaminan', 'Lighting Design', 'Floral Arrangement']
  },
  {
    id: '2',
    name: 'Royal Wedding Decor',
    address: 'Jl. Sudirman No. 456, Jakarta Selatan',
    description: 'Menciptakan momen pernikahan yang tak terlupakan dengan sentuhan royal',
    rating: 4.9,
    phone: '+62813-9876-5432',
    specialties: ['Tema Royal', 'Outdoor Wedding', 'Garden Party']
  },
  {
    id: '3',
    name: 'Dream Photo Studio',
    address: 'Jl. Thamrin No. 789, Jakarta Pusat',
    description: 'Fotografer profesional untuk moment spesial pernikahan Anda',
    rating: 4.7,
    phone: '+62814-5555-1234',
    specialties: ['Pre-wedding', 'Wedding Day', 'Drone Photography']
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Pelaminan Klasik Emas',
    price: 15000000,
    category: 'pelaminan',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Pelaminan mewah dengan ornamen emas dan bunga segar pilihan',
    vendorId: '1',
    vendor: 'Elegant Wedding Solutions',
    rating: 4.8,
    available: true
  },
  {
    id: '2',
    name: 'Pelaminan Modern Minimalis',
    price: 8500000,
    category: 'pelaminan',
    image: 'https://images.pexels.com/photos/1024992/pexels-photo-1024992.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Desain modern dengan konsep clean dan elegan',
    vendorId: '2',
    vendor: 'Royal Wedding Decor',
    rating: 4.6,
    available: true
  },
  {
    id: '3',
    name: 'Paket Fotografer Wedding',
    price: 12000000,
    category: 'fotografer',
    image: 'https://images.pexels.com/photos/1024981/pexels-photo-1024981.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Paket lengkap dokumentasi pernikahan dengan tim profesional',
    vendorId: '3',
    vendor: 'Dream Photo Studio',
    rating: 4.9,
    available: true
  },
  {
    id: '4',
    name: 'Band Acoustic Wedding',
    price: 5000000,
    category: 'musik',
    image: 'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Band acoustic untuk menciptakan suasana romantis',
    vendorId: '1',
    vendor: 'Elegant Wedding Solutions',
    rating: 4.5,
    available: true
  },
  {
    id: '5',
    name: 'MUA Profesional',
    price: 3500000,
    category: 'mua',
    image: 'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Make up artist berpengalaman untuk pengantin',
    vendorId: '2',
    vendor: 'Royal Wedding Decor',
    rating: 4.7,
    available: true
  },
  {
    id: '6',
    name: 'MC Professional',
    price: 2500000,
    category: 'mc',
    image: 'https://images.pexels.com/photos/1024996/pexels-photo-1024996.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Master of Ceremony berpengalaman untuk acara pernikahan',
    vendorId: '3',
    vendor: 'Dream Photo Studio',
    rating: 4.6,
    available: true
  }
];

export const categories = [
  { id: 'paket', name: 'Paket Dekorasi', icon: '🎊' },
  { id: 'pelaminan', name: 'Pelaminan', icon: '👑' },
  { id: 'fotografer', name: 'Fotografer', icon: '📸' },
  { id: 'musik', name: 'Musik', icon: '🎵' },
  { id: 'mua', name: 'MUA', icon: '💄' },
  { id: 'mc', name: 'MC', icon: '🎤' }
];