# Data Model: Coffee Menu Website

**Feature**: Coffee Menu Website
**Date**: 2026-03-24
**Purpose**: Define data structures and relationships for the coffee menu

## Overview

This document defines the data model for the Coffee Menu Website. The data is stored in a simple JSON file (`src/data/menu.json`) that can be easily edited by non-technical users.

## Entities

### MenuCategory

Represents a category grouping for coffee items (e.g., "Hot Coffee", "Iced Coffee", "Specialties").

**Fields**:
- `id` (string, required): Unique identifier for the category. Used for filtering and URL routing.
  - Format: kebab-case (e.g., "hot-coffee", "iced-coffee")
  - Example: "hot-coffee"
- `name` (string, required): Display name of the category shown to users.
  - Example: "Hot Coffee"
- `description` (string, optional): Brief description of the category shown in filter UI.
  - Example: "Classic hot coffee drinks"
- `order` (number, optional): Display order for categories in the filter UI.
  - Lower numbers appear first
  - Default: Alphabetical sort by name
  - Example: 1 (first category)

**Validation Rules**:
- `id` must be unique across all categories
- `id` must contain only lowercase letters, numbers, and hyphens
- `name` must not be empty
- `order` must be a positive integer (if provided)

**Example**:
```json
{
  "id": "hot-coffee",
  "name": "Hot Coffee",
  "description": "Classic hot coffee drinks",
  "order": 1
}
```

---

### CoffeeMenuItem

Represents a single coffee drink displayed in the menu.

**Fields**:
- `id` (string, required): Unique identifier for the coffee item. Used for URL routing and data lookup.
  - Format: kebab-case (e.g., "espresso", "caramel-latte")
  - Example: "espresso"
- `name` (string, required): Display name of the coffee drink.
  - Example: "Espresso"
- `description` (string, required): Detailed description of the coffee drink shown in both list and detail views.
  - Example: "Rich and bold espresso shot, perfect for a quick caffeine boost"
  - Supports markdown formatting for rich text (optional)
- `price` (number, required): Price of the coffee item in the local currency.
  - Format: Decimal number with 2 decimal places
  - Example: 2.50
- `category` (string, required): Reference to the `id` field of the `MenuCategory` this item belongs to.
  - Must match an existing category ID
  - Example: "hot-coffee"
- `image` (string, required): URL or path to the coffee item image.
  - Format: Relative path from public directory or absolute URL
  - Example: "/images/espresso.jpg"
  - Supports multiple image sizes for responsive loading (optional extension)
- `alt` (string, required): Alt text description for the image, required for accessibility (NFR-UX003).
  - Example: "Small cup of dark espresso in a white ceramic mug"
  - Must be descriptive and meaningful for screen readers
- `available` (boolean, optional): Flag indicating if the item is currently available.
  - Default: true
  - Example: true
- `order` (number, optional): Display order for items within their category.
  - Lower numbers appear first
  - Default: Alphabetical sort by name
  - Example: 1 (first item in category)

**Validation Rules**:
- `id` must be unique across all coffee items
- `id` must contain only lowercase letters, numbers, and hyphens
- `name`, `description`, `price`, `category`, `image`, `alt` must not be empty
- `price` must be a positive number with at most 2 decimal places
- `category` must reference an existing `MenuCategory.id`
- `image` must be a valid URL or relative path
- `order` must be a positive integer (if provided)

**Example**:
```json
{
  "id": "espresso",
  "name": "Espresso",
  "description": "Rich and bold espresso shot, perfect for a quick caffeine boost",
  "price": 2.50,
  "category": "hot-coffee",
  "image": "/images/espresso.jpg",
  "alt": "Small cup of dark espresso in a white ceramic mug",
  "available": true,
  "order": 1
}
```

---

### Menu

Root container for all menu data.

**Fields**:
- `categories` (array of MenuCategory, required): List of all menu categories.
- `items` (array of CoffeeMenuItem, required): List of all coffee items.

**Validation Rules**:
- `categories` array must contain at least one category
- `items` array must contain at least one item
- All `item.category` references must exist in `categories` array
- No duplicate IDs within categories or items

**Example**:
```json
{
  "categories": [
    {
      "id": "hot-coffee",
      "name": "Hot Coffee",
      "description": "Classic hot coffee drinks",
      "order": 1
    },
    {
      "id": "iced-coffee",
      "name": "Iced Coffee",
      "description": "Refreshing iced coffee drinks",
      "order": 2
    }
  ],
  "items": [
    {
      "id": "espresso",
      "name": "Espresso",
      "description": "Rich and bold espresso shot, perfect for a quick caffeine boost",
      "price": 2.50,
      "category": "hot-coffee",
      "image": "/images/espresso.jpg",
      "alt": "Small cup of dark espresso in a white ceramic mug",
      "available": true,
      "order": 1
    },
    {
      "id": "cappuccino",
      "name": "Cappuccino",
      "description": "Creamy cappuccino with steamed milk foam",
      "price": 3.75,
      "category": "hot-coffee",
      "image": "/images/cappuccino.jpg",
      "alt": "Cappuccino in a ceramic cup with heart-shaped foam art",
      "available": true,
      "order": 2
    },
    {
      "id": "iced-latte",
      "name": "Iced Latte",
      "description": "Smooth iced latte with cold milk and espresso",
      "price": 4.00,
      "category": "iced-coffee",
      "image": "/images/iced-latte.jpg",
      "alt": "Iced latte in a clear glass with ice cubes",
      "available": true,
      "order": 1
    }
  ]
}
```

## Relationships

### Category to Items (One-to-Many)

**Description**: Each `MenuCategory` contains multiple `CoffeeMenuItem` objects.

**Relationship**:
- `MenuCategory.id` is referenced by `CoffeeMenuItem.category`
- A category can have zero or more items
- Each item belongs to exactly one category

**Business Rules**:
- Items are displayed grouped by their category
- Filtering by category shows only items in that category
- Deleting a category should cascade to either:
  - Remove all items in that category, OR
  - Require reassignment of items to another category
  (Implementation choice: for MVP, category deletion is not supported)

### Item Display Order

**Description**: Items are displayed in a specific order within their category.

**Implementation**:
- Primary sort: `CoffeeMenuItem.order` (if provided)
- Secondary sort: `CoffeeMenuItem.name` (alphabetical)
- Categories sorted by `MenuCategory.order`, then `MenuCategory.name`

**Business Rules**:
- If `order` field is not provided, items are sorted alphabetically by name
- Category order can be customized by setting `order` field
- This enables business logic like "featured items first"

## Data Flow

### Load Menu Data

1. Application starts
2. Read `src/data/menu.json` file
3. Parse JSON data
4. Validate against data model
5. Store in application state (SolidJS store or context)
6. Components access data through state

### Filter Menu by Category

1. User selects category filter
2. Filter `items` array where `item.category === selectedCategoryId`
3. Return filtered list for display

### Get Item Details

1. User navigates to detail view (e.g., `/menu/espresso`)
2. Extract item ID from URL
2. Find `CoffeeMenuItem` where `item.id === itemId`
3. Return item details for display

## Type Definitions (TypeScript)

```typescript
interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  order?: number;
}

interface CoffeeMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  alt: string;
  available?: boolean;
  order?: number;
}

interface Menu {
  categories: MenuCategory[];
  items: CoffeeMenuItem[];
}
```

## Edge Cases

### Missing Image

**Scenario**: A coffee item references an image file that doesn't exist.

**Handling**:
- Display a placeholder image (e.g., generic coffee icon)
- Show alt text as fallback
- Log warning to console for debugging
- Graceful degradation (no broken image icon)

### Empty Category

**Scenario**: A category has zero items assigned to it.

**Handling**:
- Display category in filter with "(0)" indicator
- Show "No items available" message when category selected
- Hide category from filter (implementation choice: for MVP, show but indicate zero items)

### Invalid Data

**Scenario**: Menu data JSON contains validation errors (missing required fields, invalid references).

**Handling**:
- Fail gracefully: Show error message to developer
- Display default placeholder data for users
- Log validation errors to console
- Prevent application crash

### Long Descriptions

**Scenario**: A coffee item description is very long and might break layout on small screens.

**Handling** (from edge cases in spec):
- CSS truncation with ellipsis for list view
- Show full description in detail view
- Text scaling support up to 200% (NFR-UX004)
- Line clamping with "Read more" button (optional enhancement)

## Future Extensions

### Multiple Images per Item

**Current**: Single image URL per item.

**Potential Extension**:
```json
"images": {
  "small": "/images/espresso-small.jpg",
  "medium": "/images/espresso-medium.jpg",
  "large": "/images/espresso-large.jpg"
}
```

**Rationale**: Enables responsive image loading with srcset for better performance.

### Nutrition Information

**Potential Extension**:
```json
"nutrition": {
  "calories": 5,
  "caffeine": 63,
  "sugar": 0
}
```

**Rationale**: Provides additional information for health-conscious customers.

### Size Variants

**Potential Extension**:
```json
"variants": [
  { "size": "small", "price": 2.50 },
  { "size": "medium", "price": 3.00 },
  { "size": "large", "price": 3.50 }
]
```

**Rationale**: Coffee drinks often come in multiple sizes with different prices.

## Summary

The data model provides a simple, flexible structure for storing and displaying coffee menu data. Key characteristics:

- **Simple JSON format**: Easy for non-technical users to edit (FR-006 requirement)
- **Type-safe**: TypeScript interfaces ensure data integrity
- **Validated**: Clear validation rules for each field
- **Extensible**: Designed for future enhancements while maintaining backward compatibility
- **Accessible**: Alt text required for all images (NFR-UX003)
- **Performant**: Simple structure enables efficient filtering and lookup

No external interfaces or API contracts needed for this static website.
