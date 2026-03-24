import { describe, it, expect } from 'vitest';
import { formatPrice, truncateText, hasValidAltText, validateAltText } from '../../src/utils/formatting';
import { CoffeeMenuItem } from '../../src/types/menu';

describe('formatPrice', () => {
  it('should format price with dollar sign', () => {
    expect(formatPrice(2.50)).toBe('$2.50');
  });

  it('should format price with two decimal places', () => {
    expect(formatPrice(3)).toBe('$3.00');
    expect(formatPrice(4.75)).toBe('$4.75');
  });

  it('should handle zero price', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('should support custom currency symbol', () => {
    expect(formatPrice(2.50, '€')).toBe('€2.50');
  });
});

describe('truncateText', () => {
  it('should return original text if shorter than max length', () => {
    expect(truncateText('Hello', 10)).toBe('Hello');
  });

  it('should truncate text and add ellipsis if longer than max length', () => {
    expect(truncateText('Hello World', 5)).toBe('Hello...');
  });

  it('should handle empty string', () => {
    expect(truncateText('', 10)).toBe('');
  });

  it('should trim whitespace', () => {
    expect(truncateText('Hello World  ', 8)).toBe('Hello...');
  });
});

describe('hasValidAltText', () => {
  it('should return true for valid alt text', () => {
    const item: CoffeeMenuItem = {
      id: 'test',
      name: 'Test',
      description: 'Test',
      price: 2.50,
      category: 'test',
      image: '/test.jpg',
      alt: 'A test coffee drink'
    };
    expect(hasValidAltText(item)).toBe(true);
  });

  it('should return false for empty alt text', () => {
    const item: CoffeeMenuItem = {
      id: 'test',
      name: 'Test',
      description: 'Test',
      price: 2.50,
      category: 'test',
      image: '/test.jpg',
      alt: ''
    };
    expect(hasValidAltText(item)).toBe(false);
  });

  it('should return false for whitespace-only alt text', () => {
    const item: CoffeeMenuItem = {
      id: 'test',
      name: 'Test',
      description: 'Test',
      price: 2.50,
      category: 'test',
      image: '/test.jpg',
      alt: '   '
    };
    expect(hasValidAltText(item)).toBe(false);
  });
});

describe('validateAltText', () => {
  it('should return true for valid alt text', () => {
    expect(validateAltText('A delicious coffee drink')).toBe(true);
  });

  it('should return false for empty alt text', () => {
    expect(validateAltText('')).toBe(false);
  });

  it('should return false for alt text shorter than 5 characters', () => {
    expect(validateAltText('test')).toBe(false);
    expect(validateAltText('1234')).toBe(false);
  });

  it('should return true for alt text exactly 5 characters', () => {
    expect(validateAltText('12345')).toBe(true);
  });
});
