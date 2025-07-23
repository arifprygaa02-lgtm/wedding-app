import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (term: string) => void;
  className?: string;
  showClearButton?: boolean;
  debounceMs?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Cari...",
  onSearch,
  className = "",
  showClearButton = true,
  debounceMs = 300
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  // Trigger search when debounced term changes
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`relative transition-all duration-200 ${
        isFocused ? 'transform scale-105' : ''
      }`}>
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-colors duration-200" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 ${
            isFocused ? 'shadow-lg' : 'shadow-sm'
          }`}
        />
        
        {/* Clear button */}
        {showClearButton && searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-3 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {/* Search indicator */}
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-gray-500 px-3">
          {debouncedSearchTerm !== searchTerm ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-rose-500 mr-2"></div>
              Mencari...
            </span>
          ) : (
            <span>Menampilkan hasil untuk "{debouncedSearchTerm}"</span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;