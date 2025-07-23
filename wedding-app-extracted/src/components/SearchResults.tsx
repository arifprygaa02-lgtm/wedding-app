import React from 'react';
import { Search, TrendingUp } from 'lucide-react';

interface SearchResultsProps {
  searchTerm: string;
  resultCount: number;
  searchTime?: number;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchTerm,
  resultCount,
  searchTime,
  suggestions = [],
  onSuggestionClick
}) => {
  if (!searchTerm) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Hasil pencarian untuk <strong>"{searchTerm}"</strong>
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {resultCount} hasil
          {searchTime && (
            <span className="ml-2">({searchTime}ms)</span>
          )}
        </div>
      </div>

      {/* Search suggestions */}
      {suggestions.length > 0 && (
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-500 font-medium">Saran pencarian:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;