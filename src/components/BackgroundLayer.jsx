import React, { useState } from "react";

export default function BackgroundLayer({ src }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <div className="vn-background-fallback" />;
  }

  return (
    <img
      src={src}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      loading="eager"
      decoding="async"
      fetchPriority="high"
      onError={() => setFailed(true)}
    />
  );
}
