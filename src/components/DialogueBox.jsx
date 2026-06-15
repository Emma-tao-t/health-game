import React from "react";

export default function DialogueBox({ node, onNext, onBack, onHistory, onSkip, autoPlay, onAuto, onSettings }) {
  const canContinue = !node.choices;

  return (
    <section className="vn-dialogue">
      <div className="flex items-center justify-between gap-3">
        <div className="vn-nameplate">{node.speaker || "旁白"}</div>
        <div className="flex gap-1.5">
          <button type="button" onClick={(event) => { event.stopPropagation(); onBack(); }} className="vn-mini-button">返回</button>
          <button type="button" onClick={(event) => { event.stopPropagation(); onHistory(); }} className="vn-mini-button">历史</button>
          <button type="button" onClick={(event) => { event.stopPropagation(); onSkip(); }} className="vn-mini-button">快进</button>
          <button type="button" onClick={(event) => { event.stopPropagation(); onAuto(); }} className={`vn-mini-button ${autoPlay ? "vn-mini-active" : ""}`}>自动</button>
          <button type="button" onClick={(event) => { event.stopPropagation(); onSettings(); }} className="vn-mini-button">设置</button>
        </div>
      </div>
      <p className="mt-3 min-h-[4.8rem] text-[17px] font-bold leading-8 text-[#3b2718]">{node.text}</p>
      <p className="mt-2 text-right text-xs font-black text-[#8b6a45]">{canContinue ? "点击任意位置继续" : "请选择接下来的行动"}</p>
    </section>
  );
}
