export function setCacheWithExpiry(key: string, value: any, ttlHours: number) {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttlHours * 60 * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getCacheWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  try {
    const item = JSON.parse(itemStr);
    if (new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}