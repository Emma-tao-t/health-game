import React from "react";

export default function KnowledgeCard({ card, onClose }) {
  if (!card) return null;

  const tone = card.tone === "good" ? "border-[#66b98b] bg-[#effff6]" : "border-[#e79a49] bg-[#fff6e7]";

  return (
    <aside className={`vn-knowledge ${tone}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-black text-[#6f4b28]">{card.title || "知识点"}</p>
        <button type="button" className="vn-close" onClick={onClose}>关闭</button>
      </div>
      <p className="mt-2 text-sm font-bold leading-6 text-[#3b2718]">{card.text}</p>
    </aside>
  );
}
