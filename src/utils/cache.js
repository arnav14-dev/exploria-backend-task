const cache = new Map();

export function getFromCache(key) {
  if (cache.has(key)) {
    const value = cache.get(key);
    cache.delete(key); // Move to latest
    cache.set(key, value);
    return { hit: true, value };
  }
  return { hit: false };
}

export function setInCache(key, value) {
  if (cache.size >= 15) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(key, value);
}
