import React from "react";
import SafeImage from "../components/SafeImage.jsx";
import { characters } from "../data/characters.js";
import { knowledgeList } from "../data/knowledgeCards.js";

export default function ResultPage({ result, onReplay, onHome, onSelect }) {
  const profile = characters[result.route.character];
  const image = profile.images[result.ending.imageMood] || profile.images.normal;
  const npcFeedback =
    result.ending.id === "good"
      ? "这一天的选择更科学，也更温和：护理不是遮掩自己，而是照顾自己。"
      : result.ending.id === "normal"
        ? "已经有不少进步，但仍有一些护理误区。下一次可以更稳一点。"
        : "这不是失败，只是提醒：别被焦虑和偏方牵着走，科学护理可以慢慢建立。";

  return (
    <main className="vn-result">
      <section className="vn-result-panel">
        <p className="vn-ending-label">{result.route.title} · {result.ending.label}</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-[#5A3A2E]">{result.ending.title}</h1>
        <div className="mt-5 grid grid-cols-[0.85fr_1fr] gap-4">
          <div className="ac-photo-frame">
            <SafeImage src={image} alt={result.route.character} fallbackLabel={result.route.character} className="h-44 w-full object-contain" />
          </div>
          <div className="grid content-center gap-3">
            <div className="vn-result-stat"><span>气味值</span><strong>{Math.round(result.smellValue)}</strong></div>
            <div className="vn-result-stat"><span>自信值</span><strong>{Math.round(result.confidenceValue)}</strong></div>
            <div className="vn-result-stat"><span>科学值</span><strong>{Math.round(result.scienceValue)}</strong></div>
          </div>
        </div>
        <p className="ac-note ac-note-green mt-4">本次解锁知识：{result.unlockedKnowledge.length} / {knowledgeList.length}</p>
        <p className="ac-note ac-note-blue mt-4">{npcFeedback}</p>
        <p className="ac-note ac-note-cream mt-4">{result.ending.text}</p>
        <div className="mt-4 grid gap-2">
          {result.ending.summary.map((item) => (
            <p key={item} className="ac-summary-note">{item}</p>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <button type="button" className="vn-start-button" onClick={onReplay}>再玩一次</button>
          <button type="button" className="vn-secondary-button" onClick={onSelect}>换角色</button>
          <button type="button" className="vn-secondary-button" onClick={onHome}>回到首页</button>
        </div>
      </section>
    </main>
  );
}
