import { useState, useEffect } from "react";

const useCache = (name) => {
  const [hasCache, setCache] = useState(false);

  useEffect(() => {
    if ("caches" in window) {
      setCache(true);
    }
  }, []);

  const addCache = async (request, response) => {
    const cache = await window.caches.open(name);

    cache.put(request, new Response(JSON.stringify(response)));
  };

  const getCache = async (request) => {
    const cache = await window.caches.open(name);
    const cachedResponse = await cache.match(request);

    return cachedResponse ? await cachedResponse.json() : null;
  };

  const getAllCaches = async () => {
    const cache = await window.caches.open(name);

    return cache ? await cache.keys() : [];
  };

  return { hasCache, addCache, getCache, getAllCaches };
};

export default useCache;
