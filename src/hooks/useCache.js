import { useState, useEffect } from "react";

const MAX_CACHE_ENTRIES = 10;

const useCache = (name) => {
  const [hasCache, setCache] = useState(false);

  useEffect(() => {
    if ("caches" in window) {
      setCache(true);
    }
  }, []);

  const addCache = async (request, response) => {
    if (!hasCache) {
      return;
    }

    const cache = await window.caches.open(name);
    const keys = await cache.keys();

    if (keys.length >= MAX_CACHE_ENTRIES) {
      cache.delete(keys[keys.length - 1]);
    }

    cache.put(request, new Response(JSON.stringify(response)));
  };

  const getCache = async (request) => {
    if (!hasCache) {
      return null;
    }

    const cache = await window.caches.open(name);
    const cachedResponse = await cache.match(request);

    return cachedResponse ? await cachedResponse.json() : null;
  };

  const getAllCaches = async () => {
    if (!hasCache) {
      return [];
    }

    const cache = await window.caches.open(name);

    return cache ? await cache.keys() : [];
  };

  return { hasCache, addCache, getCache, getAllCaches };
};

export default useCache;
