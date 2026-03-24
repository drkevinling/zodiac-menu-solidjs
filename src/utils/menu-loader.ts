import { Menu } from '../types/menu';
import menuJson from '../data/menu.json';

let menuData: Menu | null = null;

export async function loadMenu(): Promise<Menu> {
  if (menuData) {
    return menuData;
  }

  try {
    menuData = menuJson as Menu;
    return menuData;
  } catch (error) {
    console.error('Error loading menu data:', error);
    throw error;
  }
}

export function getMenu(): Menu | null {
  return menuData;
}

export function setMenu(menu: Menu): void {
  menuData = menu;
}
