import React, { useState, useMemo } from 'react';
import { Grid, List, MapPin, Star } from 'lucide-react';
import { products, categories, vendors } from '../data/mockData';
import { Product, Vendor } from '../types';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import VendorCard from '../components/VendorCard';
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';
import { searchProducts, searchVendors } from '../utils/searchAlgorithm';

interface ShopPageProps {
  onNavigate: (page: string) => void;
  globalSearchTerm?: string;
}

const ShopPage: React.FC<ShopPageProps> = ({ onNavigate, globalSearchTerm = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState(globalSearchTerm);
  const [sortBy, setSortBy] = useState<string>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'vendors'>('products');
  const [searchTime, setSearchTime] = useState<number>(0);

  // Update search term when global search changes
  React.useEffect(() => {
    if (globalSearchTerm !== searchTerm) {
      setSearchTerm(globalSearchTerm);
    }
  }, [globalSearchTerm]);

  // Live search with algorithm
  const filteredProducts = useMemo(() => {
    const startTime = performance.now();
    
    // First apply search algorithm
    const searchResults = searchProducts(products, searchTerm);
    let filtered = searchResults.map(result => result.item);

    // Then apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    const endTime = performance.now();
    setSearchTime(Math.round(endTime - startTime));

    return filtered;
  }, [selectedCategory, searchTerm, sortBy]);

  // Live search for vendors
  const filteredVendors = useMemo(() => {
    const startTime = performance.now();
    const searchResults = searchVendors(vendors, searchTerm);
    const endTime = performance.now();
    setSearchTime(Math.round(endTime - startTime));
    return searchResults.map(result => result.item);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Generate search suggestions based on available data
  const getSearchSuggestions = () => {
    if (activeTab === 'products') {
      const suggestions = [
        'pelaminan emas',
        'fotografer wedding',
        'band acoustic',
        'makeup artist',
        'master ceremony'
      ];
      return suggestions.filter(s => 
        !searchTerm || s.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 3);
    } else {
      const suggestions = [
        'elegant wedding',
        'royal wedding',
        'dream photo',
        'jakarta pusat',
        'dekorasi mewah'
      ];
      return suggestions.filter(s => 
        !searchTerm || s.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 3);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {activeTab === 'products' ? 'Katalog Produk' : 'Daftar Vendor'}
          </h1>
          <p className="text-gray-600">
            {activeTab === 'products' 
              ? 'Temukan dekorasi dan layanan pernikahan terbaik untuk hari istimewa Anda'
              : 'Pilih vendor terpercaya untuk kebutuhan pernikahan Anda'
            }
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'products'
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Produk & Layanan
              </button>
              <button
                onClick={() => setActiveTab('vendors')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'vendors'
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vendor
              </button>
            </nav>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cari {activeTab === 'products' ? 'Produk' : 'Vendor'}
                </label>
                <SearchInput
                  placeholder={`Cari ${activeTab === 'products' ? 'nama produk, vendor, atau kategori...' : 'nama vendor, alamat, atau spesialisasi...'}`}
                  onSearch={handleSearch}
                  debounceMs={300}
                />
              </div>

              {/* Categories - Only show for products */}
              {activeTab === 'products' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategori</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                        selectedCategory === 'all'
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Semua Kategori
                    </button>
                    
                    {/* Paket Dekorasi */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-2">
                      <h4 className="font-medium text-gray-800 mb-2">Paket Dekorasi</h4>
                      <button
                        onClick={() => setSelectedCategory('paket')}
                        className={`w-full text-left px-3 py-1 rounded text-sm transition-colors duration-200 ${
                          selectedCategory === 'paket'
                            ? 'bg-rose-100 text-rose-600'
                            : 'text-gray-600 hover:bg-white'
                        }`}
                      >
                        🎊 Paket Lengkap
                      </button>
                    </div>

                    {/* Layanan Lain */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-medium text-gray-800 mb-2">Layanan Lain</h4>
                      <div className="space-y-1">
                        {categories.filter(cat => cat.id !== 'paket').map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full text-left px-3 py-1 rounded text-sm transition-colors duration-200 ${
                              selectedCategory === category.id
                                ? 'bg-rose-100 text-rose-600'
                                : 'text-gray-600 hover:bg-white'
                            }`}
                          >
                            {category.icon} {category.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sort */}
              {activeTab === 'products' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Urutkan</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  >
                    <option value="name">Nama A-Z</option>
                    <option value="price-low">Harga Terendah</option>
                    <option value="price-high">Harga Tertinggi</option>
                    <option value="rating">Rating Tertinggi</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Results Info */}
            <SearchResults
              searchTerm={searchTerm}
              resultCount={activeTab === 'products' ? filteredProducts.length : filteredVendors.length}
              searchTime={searchTime}
              suggestions={getSearchSuggestions()}
              onSuggestionClick={handleSearch}
            />

            {/* View Controls - Only for products */}
            {activeTab === 'products' && (
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-600">
                  Menampilkan {filteredProducts.length} produk
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${
                      viewMode === 'grid'
                        ? 'bg-rose-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${
                      viewMode === 'list'
                        ? 'bg-rose-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {activeTab === 'products' && (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={setSelectedProduct}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Vendors Grid */}
            {activeTab === 'vendors' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {((activeTab === 'products' && filteredProducts.length === 0) ||
              (activeTab === 'vendors' && filteredVendors.length === 0)) && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <div className="h-16 w-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔍</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {searchTerm ? 
                    `Tidak ada hasil untuk "${searchTerm}"` : 
                    `Tidak ada ${activeTab === 'products' ? 'produk' : 'vendor'} ditemukan`
                  }
                </h3>
                <p className="text-gray-600">
                  {searchTerm ? 
                    'Coba gunakan kata kunci yang berbeda atau lebih umum' :
                    'Coba ubah kata kunci pencarian atau filter yang Anda gunakan'
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={() => handleSearch('')}
                    className="mt-4 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors duration-200"
                  >
                    Lihat Semua {activeTab === 'products' ? 'Produk' : 'Vendor'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ShopPage;