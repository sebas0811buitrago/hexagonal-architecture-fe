type Item = {
  id: string;
  [key: string]: any;
};

function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

function removeItem(key: string): void {
  localStorage.removeItem(key);
}

export const STORAGE_KEY = "items";

export function createItem(newItem: Item): void {
  const items = getItem<Item[]>(STORAGE_KEY) || [];
  items.push(newItem);
  setItem(STORAGE_KEY, items);
}

export function readItems(): Item[] {
  return getItem<Item[]>(STORAGE_KEY) || [];
}

export function updateItem(updatedItem: Item): void {
  let items = getItem<Item[]>(STORAGE_KEY) || [];
  items = items.map((item) =>
    item.id === updatedItem.id ? updatedItem : item,
  );
  setItem(STORAGE_KEY, items);
}

export function deleteItem(itemId: string): void {
  let items = getItem<Item[]>(STORAGE_KEY) || [];
  items = items.filter((item) => item.id !== itemId);
  setItem(STORAGE_KEY, items);
}
