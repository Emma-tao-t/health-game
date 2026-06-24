import React from "react";
import SafeImage from "../components/SafeImage.jsx";
import { characters } from "../data/characters.js";
import { knowledgeCards } from "../data/knowledgeCards.js";

export default function ResultPage({ result, onReplay, onKnowledge, onSelect }) {
  const profile = characters[result.route.character];
  const image = profile.images[result.ending.imageMood] || profile.images.normal;
  const routeKnowledge = [
    ...new Set(
      Object.values(result.route.nodes)
        .flatMap((node) => node.choices || [])
        .map((choice) => choice.knowledgeId)
        .filter(Boolean),
    ),
  ];
  const unlockedSet = new Set(result.unlockedKnowledge);
  const reviews = [
    ...result.route.keyKnowledge.filter((id) => unlockedSet.has(id)),
    ...result.unlockedKnowledge,
    ...result.route.keyKnowledge,
  ]
    .filter((id, index, list) => knowledgeCards[id] && list.indexOf(id) === index)
    .slice(0, 3)
    .map((id) => knowledgeCards[id]);

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
        <p className="ac-note ac-note-green mt-4">本路线解锁知识：{result.unlockedKnowledge.length} / {routeKnowledge.length}</p>
        <p className="ac-note ac-note-blue mt-4"><strong>本路线传播目标：</strong>{result.route.communicationGoal}</p>
        <p className="ac-note ac-note-cream mt-4">{result.ending.text}</p>
        <div className="mt-4 grid gap-2">
          <p className="font-black text-[#5A3A2E]">本次关键知识回顾</p>
          {reviews.map((card) => (
            <p key={card.id} className="ac-summary-note"><strong>{card.title}：</strong>{card.summary}</p>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <button type="button" className="vn-start-button" onClick={onReplay}>重新开始</button>
          <button type="button" className="vn-secondary-button" onClick={onKnowledge}>查看图鉴</button>
          <button type="button" className="vn-secondary-button" onClick={onSelect}>选择路线</button>
        </div>
      </section>
    </main>
  );
}
