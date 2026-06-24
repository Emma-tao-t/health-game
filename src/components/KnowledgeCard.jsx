import React from "react";

export default function KnowledgeCard({ card, onClose }) {
  if (!card) return null;

  const tone = card.tone === "good" ? "border-[#66b98b] bg-[#effff6]" : "border-[#e79a49] bg-[#fff6e7]";

  return (
    <aside className={`vn-knowledge ${tone}`}>
      <div className="vn-knowledge-head">
        <p>{card.title || "知识点"}</p>
        <span>点击任意位置继续</span>
      </div>
      <p className="vn-knowledge-body">{card.feedback}</p>
      <p className="vn-knowledge-unlocked">已解锁到清爽知识图鉴</p>
    </aside>
  );
}
