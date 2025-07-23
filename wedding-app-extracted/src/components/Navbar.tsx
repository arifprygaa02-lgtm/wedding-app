import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, Heart, Phone, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import SearchInput from './SearchInput';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onGlobalSearch?: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onGlobalSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'shop', label: 'Shop', icon: '🛍️' },
    { id: 'vendors', label: 'Vendor', icon: '🏢' },
    ...(isAuthenticated ? [{ id: 'orders', label: 'Pesanan Saya', icon: '📋' }] : []),
    { id: 'contact', label: 'Kontak', icon: '📞' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-rose-500" />
              <span className="text-xl font-bold text-gray-800">WeddingDecor</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'text-rose-600 bg-rose-50'
                      : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Global Search - Desktop */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <SearchInput
              placeholder="Cari produk, vendor, atau layanan..."
              onSearch={(term) => {
                if (onGlobalSearch) {
                  onGlobalSearch(term);
                  if (term && currentPage !== 'shop') {
                    onNavigate('shop');
                  }
                }
              }}
              debounceMs={300}
            />
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Global Search Toggle - Tablet */}
            <button
              onClick={() => setShowGlobalSearch(!showGlobalSearch)}
              className="lg:hidden p-2 text-gray-700 hover:text-rose-600 transition-colors duration-200"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Cart */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-gray-700 hover:text-rose-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">Hi, {user?.name}</span>
                <button
                  onClick={logout}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="bg-rose-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-rose-600 transition-colors duration-200"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-rose-600 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Global Search - Mobile/Tablet */}
      {showGlobalSearch && (
        <div className="lg:hidden bg-white border-t border-gray-200 p-4">
          <SearchInput
            placeholder="Cari produk, vendor, atau layanan..."
            onSearch={(term) => {
              if (onGlobalSearch) {
                onGlobalSearch(term);
                if (term && currentPage !== 'shop') {
                  onNavigate('shop');
                }
              }
              if (term) {
                setShowGlobalSearch(false);
              }
            }}
            debounceMs={300}
          />
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'text-rose-600 bg-rose-50'
                    : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Search */}
            <div className="border-t pt-3 mt-3">
              <div className="px-3 py-2">
                <SearchInput
                  placeholder="Cari produk atau vendor..."
                  onSearch={(term) => {
                    if (onGlobalSearch) {
                      onGlobalSearch(term);
                      if (term && currentPage !== 'shop') {
                        onNavigate('shop');
                      }
                    }
                    if (term) {
                      setIsMenuOpen(false);
                    }
                  }}
                  debounceMs={300}
                />
              </div>
            </div>
            
            {/* Mobile cart and auth */}
            <div className="border-t pt-3 mt-3">
              <button
                onClick={() => {
                  onNavigate('cart');
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-rose-600"
              >
                <span>Keranjang</span>
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
              </button>
              
              {isAuthenticated ? (
                <div className="px-3 py-2">
                  <p className="text-sm text-gray-600 mb-2">Hi, {user?.name}</p>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onNavigate('auth');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-rose-500 text-white px-4 py-2 mx-3 rounded-md text-sm font-medium hover:bg-rose-600 transition-colors duration-200"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;