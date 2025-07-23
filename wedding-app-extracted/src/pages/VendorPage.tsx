import React, { useState } from 'react';
import { MapPin, Phone, Star, Eye } from 'lucide-react';
import { vendors } from '../data/mockData';
import SearchInput from '../components/SearchInput';
import { searchVendors } from '../utils/searchAlgorithm';
import SearchResults from '../components/SearchResults';

interface VendorPageProps {
  onNavigate: (page: string) => void;
  globalSearchTerm?: string;
}

const VendorPage: React.FC<VendorPageProps> = ({ onNavigate, globalSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState(globalSearchTerm);
  const [searchTime, setSearchTime] = useState<number>(0);

  // Update search term when global search changes
  React.useEffect(() => {
    if (globalSearchTerm !== searchTerm) {
      setSearchTerm(globalSearchTerm);
    }
  }, [globalSearchTerm]);

  // Use advanced search algorithm
  const filteredVendors = React.useMemo(() => {
    const startTime = performance.now();
    const searchResults = searchVendors(vendors, searchTerm);
    const endTime = performance.now();
    setSearchTime(Math.round(endTime - startTime));
    return searchResults.map(result => result.item);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Generate search suggestions
  const getSearchSuggestions = () => {
    const suggestions = [
      'elegant wedding',
      'royal wedding',
      'dream photo',
      'jakarta pusat',
      'dekorasi mewah',
      'fotografer profesional'
    ];
    return suggestions.filter(s => 
      !searchTerm || s.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 3);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Vendor Terpercaya</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Temukan vendor pernikahan terbaik dengan pengalaman dan kualitas terjamin untuk hari istimewa Anda
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <SearchInput
            placeholder="Cari vendor, alamat, atau spesialisasi..."
            onSearch={handleSearch}
            className="text-lg"
            debounceMs={250}
          />
        </div>

        {/* Results Count */}
        <SearchResults
          searchTerm={searchTerm}
          resultCount={filteredVendors.length}
          searchTime={searchTime}
          suggestions={getSearchSuggestions()}
          onSuggestionClick={handleSearch}
        />

        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan {filteredVendors.length} vendor
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{vendor.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{vendor.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">{vendor.phone}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-gray-600 font-medium">{vendor.rating}/5</span>
                    </div>
                  </div>
                  {vendor.logo && (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center ml-4">
                      <img src={vendor.logo} alt={vendor.name} className="w-12 h-12 object-contain" />
                    </div>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
                  {vendor.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">Spesialisasi:</h4>
                  <div className="flex flex-wrap gap-2">
                    {vendor.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-rose-50 text-rose-600 text-xs px-3 py-1 rounded-full border border-rose-200 font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('shop')}
                  className="w-full bg-rose-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Produk
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <div className="h-16 w-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {searchTerm ? 
                `Tidak ada hasil untuk "${searchTerm}"` : 
                'Tidak ada vendor ditemukan'
              }
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 
                'Coba gunakan kata kunci yang berbeda atau lebih umum' :
                'Coba ubah kata kunci pencarian Anda'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="mt-4 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors duration-200"
              >
                Lihat Semua Vendor
              </button>
            )}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ingin Bergabung Sebagai Vendor?
          </h2>
          <p className="text-rose-100 mb-6">
            Daftarkan bisnis pernikahan Anda dan jangkau lebih banyak calon pengantin
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-rose-500 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            Hubungi Kami
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorPage;