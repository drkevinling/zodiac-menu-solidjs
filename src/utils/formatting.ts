import { CoffeeMenuItem } from '../types/menu';

export function formatPrice(price: number, currency: string = '$'): string {
  return `${currency}${price.toFixed(2)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function hasValidAltText(item: CoffeeMenuItem): boolean {
  return !!item.alt && item.alt.trim().length > 0;
}

export function validateAltText(alt: string): boolean {
  return !!alt && alt.trim().length >= 5;
}
