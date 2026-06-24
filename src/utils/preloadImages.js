const loadedImages = new Set();
const pendingImages = new Map();

export function preloadImage(url, { priority = "low", timeout = 8000 } = {}) {
  if (!url || loadedImages.has(url)) {
    return Promise.resolve(true);
  }

  if (pendingImages.has(url)) {
    return pendingImages.get(url);
  }

  const request = new Promise((resolve) => {
    const image = new Image();
    let settled = false;
    const done = (loaded = false) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      if (loaded) {
        loadedImages.add(url);
      }
      pendingImages.delete(url);
      resolve(loaded);
    };
    const timer = window.setTimeout(() => done(false), timeout);

    image.onload = () => done(true);
    image.onerror = () => done(false);
    image.decoding = "async";
    image.fetchPriority = priority;
    image.src = url;
  });

  pendingImages.set(url, request);
  return request;
}

export async function preloadImages(urls, onProgress, options = {}) {
  const uniqueUrls = [...new Set(urls.filter(Boolean))];

  if (uniqueUrls.length === 0) {
    onProgress?.(1);
    return;
  }

  let finished = 0;
  const concurrency = Math.max(1, Math.min(options.concurrency || 4, uniqueUrls.length));
  let cursor = 0;

  async function worker() {
    while (cursor < uniqueUrls.length) {
      const url = uniqueUrls[cursor];
      cursor += 1;
      let loaded = false;
      const attempts = Math.max(1, (options.retries || 0) + 1);
      for (let attempt = 0; attempt < attempts && !loaded; attempt += 1) {
        loaded = await preloadImage(url, options);
      }
      finished += 1;
      onProgress?.(finished / uniqueUrls.length);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
}
