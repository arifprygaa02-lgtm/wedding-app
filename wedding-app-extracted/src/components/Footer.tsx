import React from 'react';
import { Heart, MapPin, Phone, Mail, Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-rose-500" />
              <span className="text-2xl font-bold">WeddingDecor</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Kami adalah penyedia layanan dekorasi pernikahan terpercaya dengan pengalaman lebih dari 10 tahun. 
              Wujudkan pernikahan impian Anda bersama vendor-vendor terbaik pilihan kami.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 p-3 rounded-full hover:bg-green-600 transition-colors duration-200"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/weddingdecor"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-500 p-3 rounded-full hover:bg-pink-600 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu Utama</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('vendors')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Vendor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Kontak
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Jl. Merdeka Raya No. 123<br />
                  Jakarta Pusat, DKI Jakarta 10110
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-rose-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-rose-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@weddingdecor.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 WeddingDecor. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <button
                onClick={() => onNavigate('admin')}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;