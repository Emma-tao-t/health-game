import React, { useState } from "react";

export default function SafeImage({ src, alt, className = "", fallbackLabel = "图片暂未加载", loading = "lazy" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-3xl border-2 border-dashed border-[#25145f] bg-[#fff7da] text-center text-sm font-black text-[#25145f] ${className}`}
      >
        {fallbackLabel}
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} loading={loading} decoding="async" onError={() => setFailed(true)} />;
}
