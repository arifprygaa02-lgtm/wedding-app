import { Product, Vendor } from '../types';

/**
 * Advanced search algorithm with scoring and ranking
 */
export interface SearchResult<T> {
  item: T;
  score: number;
  matchedFields: string[];
}

/**
 * Calculate search score based on multiple factors
 */
function calculateScore(
  searchTerm: string,
  text: string,
  fieldWeight: number = 1,
  isExactMatch: boolean = false
): number {
  if (!text || !searchTerm) return 0;

  const normalizedText = text.toLowerCase();
  const normalizedSearch = searchTerm.toLowerCase();

  // Exact match gets highest score
  if (normalizedText === normalizedSearch) {
    return 100 * fieldWeight;
  }

  // Starts with search term gets high score
  if (normalizedText.startsWith(normalizedSearch)) {
    return 80 * fieldWeight;
  }

  // Contains search term gets medium score
  if (normalizedText.includes(normalizedSearch)) {
    return 60 * fieldWeight;
  }

  // Fuzzy matching for partial words
  const words = normalizedText.split(' ');
  let maxWordScore = 0;

  for (const word of words) {
    if (word.startsWith(normalizedSearch)) {
      maxWordScore = Math.max(maxWordScore, 70);
    } else if (word.includes(normalizedSearch)) {
      maxWordScore = Math.max(maxWordScore, 40);
    }
  }

  return maxWordScore * fieldWeight;
}

/**
 * Search products with advanced scoring
 */
export function searchProducts(
  products: Product[],
  searchTerm: string
): SearchResult<Product>[] {
  if (!searchTerm.trim()) {
    return products.map(product => ({
      item: product,
      score: 0,
      matchedFields: []
    }));
  }

  const results: SearchResult<Product>[] = [];

  for (const product of products) {
    let totalScore = 0;
    const matchedFields: string[] = [];

    // Search in product name (highest weight)
    const nameScore = calculateScore(searchTerm, product.name, 3);
    if (nameScore > 0) {
      totalScore += nameScore;
      matchedFields.push('name');
    }

    // Search in vendor name (high weight)
    const vendorScore = calculateScore(searchTerm, product.vendor, 2);
    if (vendorScore > 0) {
      totalScore += vendorScore;
      matchedFields.push('vendor');
    }

    // Search in description (medium weight)
    const descriptionScore = calculateScore(searchTerm, product.description, 1);
    if (descriptionScore > 0) {
      totalScore += descriptionScore;
      matchedFields.push('description');
    }

    // Search in category (medium weight)
    const categoryScore = calculateScore(searchTerm, product.category, 1.5);
    if (categoryScore > 0) {
      totalScore += categoryScore;
      matchedFields.push('category');
    }

    // Only include results with some relevance
    if (totalScore > 0) {
      results.push({
        item: product,
        score: totalScore,
        matchedFields
      });
    }
  }

  // Sort by score (highest first)
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Search vendors with advanced scoring
 */
export function searchVendors(
  vendors: Vendor[],
  searchTerm: string
): SearchResult<Vendor>[] {
  if (!searchTerm.trim()) {
    return vendors.map(vendor => ({
      item: vendor,
      score: 0,
      matchedFields: []
    }));
  }

  const results: SearchResult<Vendor>[] = [];

  for (const vendor of vendors) {
    let totalScore = 0;
    const matchedFields: string[] = [];

    // Search in vendor name (highest weight)
    const nameScore = calculateScore(searchTerm, vendor.name, 3);
    if (nameScore > 0) {
      totalScore += nameScore;
      matchedFields.push('name');
    }

    // Search in address (high weight)
    const addressScore = calculateScore(searchTerm, vendor.address, 2);
    if (addressScore > 0) {
      totalScore += addressScore;
      matchedFields.push('address');
    }

    // Search in description (medium weight)
    const descriptionScore = calculateScore(searchTerm, vendor.description, 1);
    if (descriptionScore > 0) {
      totalScore += descriptionScore;
      matchedFields.push('description');
    }

    // Search in specialties (medium weight)
    const specialtiesText = vendor.specialties.join(' ');
    const specialtiesScore = calculateScore(searchTerm, specialtiesText, 1.5);
    if (specialtiesScore > 0) {
      totalScore += specialtiesScore;
      matchedFields.push('specialties');
    }

    // Only include results with some relevance
    if (totalScore > 0) {
      results.push({
        item: vendor,
        score: totalScore,
        matchedFields
      });
    }
  }

  // Sort by score (highest first)
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Highlight search terms in text
 */
export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}