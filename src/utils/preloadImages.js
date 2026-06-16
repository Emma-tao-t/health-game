export function preloadImages(urls, onProgress) {
  const uniqueUrls = [...new Set(urls.filter(Boolean))];

  if (uniqueUrls.length === 0) {
    onProgress?.(1);
    return Promise.resolve();
  }

  let finished = 0;

  return Promise.all(
    uniqueUrls.map(
      (url) =>
        new Promise((resolve) => {
          const image = new Image();
          const done = () => {
            finished += 1;
            onProgress?.(finished / uniqueUrls.length);
            resolve();
          };

          image.onload = done;
          image.onerror = done;
          image.decoding = "async";
          image.fetchPriority = "low";
          image.src = url;
        }),
    ),
  );
}
