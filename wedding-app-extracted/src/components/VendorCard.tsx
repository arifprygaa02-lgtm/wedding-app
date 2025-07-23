import React from 'react';
import { Star, MapPin, Phone, Eye } from 'lucide-react';
import { Vendor } from '../types';

interface VendorCardProps {
  vendor: Vendor;
  onNavigate: (page: string) => void;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor, onNavigate }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{vendor.name}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">{vendor.address}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm">{vendor.phone}</span>
            </div>
            <div className="flex items-center mb-3">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="text-sm text-gray-600">{vendor.rating}/5</span>
            </div>
          </div>
          {vendor.logo && (
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center ml-4">
              <img src={vendor.logo} alt={vendor.name} className="w-12 h-12 object-contain" />
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{vendor.description}</p>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-800 mb-2">Spesialisasi:</h4>
          <div className="flex flex-wrap gap-2">
            {vendor.specialties.map((specialty, index) => (
              <span
                key={index}
                className="bg-rose-50 text-rose-600 text-xs px-2 py-1 rounded-full border border-rose-200"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onNavigate('shop')}
          className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200 flex items-center justify-center"
        >
          <Eye className="h-4 w-4 mr-2" />
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default VendorCard;