export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  order?: number;
}

export interface CoffeeMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
  available?: boolean;
  order?: number;
}

export interface Menu {
  categories: MenuCategory[];
  items: CoffeeMenuItem[];
}
