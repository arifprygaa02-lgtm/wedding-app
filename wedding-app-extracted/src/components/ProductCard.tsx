import React from 'react';
import { Star, ShoppingCart, MapPin } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, viewMode = 'grid' }) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      pelaminan: 'Pelaminan',
      fotografer: 'Fotografer',
      musik: 'Musik',
      mua: 'MUA',
      mc: 'MC',
      paket: 'Paket Dekorasi'
    };
    return categories[category] || category;
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="flex">
          <div className="relative w-48 h-32">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2">
              <span className="bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {getCategoryLabel(product.category)}
              </span>
            </div>
            {!product.available && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Tidak Tersedia
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">{product.vendor}</span>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              </div>
              
              <div className="text-right ml-4">
                <div className="mb-4">
                  <span className="text-xl font-bold text-rose-600">
                    {formatPrice(product.price)}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => onViewDetails(product)}
                    className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.available}
                    className="bg-rose-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {getCategoryLabel(product.category)}
          </span>
        </div>
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              Tidak Tersedia
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
          <span className="text-sm text-gray-600">{product.vendor}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-rose-600">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            Lihat Detail
          </button>
          <button
            onClick={() => addToCart(product)}
            disabled={!product.available}
            className="flex-1 bg-rose-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;