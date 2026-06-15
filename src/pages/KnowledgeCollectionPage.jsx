import React, { useMemo, useState } from "react";
import { knowledgeList } from "../data/knowledgeCards.js";
import { toolImages } from "../data/toolImages.js";
import SafeImage from "../components/SafeImage.jsx";

export default function KnowledgeCollectionPage({ onHome, onStart }) {
  const [view, setView] = useState("knowledge");
  const groupedTools = useMemo(
    () => ({
      right: toolImages.filter((tool) => tool.type === "科学工具"),
      wrong: toolImages.filter((tool) => tool.type !== "科学工具"),
    }),
    [],
  );

  return (
    <main className="ac-select">
      <section className="ac-select-phone">
        <header className="ac-select-head">
          <button type="button" className="ac-small-button" onClick={onHome}>首页</button>
          <div>
            <p>科普图鉴</p>
            <h1>护理知识卡</h1>
          </div>
        </header>

        <div className="ac-atlas-tabs">
          <button type="button" className={view === "knowledge" ? "is-active" : ""} onClick={() => setView("knowledge")}>科普知识</button>
          <button type="button" className={view === "tools" ? "is-active" : ""} onClick={() => setView("tools")}>护理工具</button>
        </div>

        {view === "knowledge" ? (
          <div className="ac-knowledge-list">
            {knowledgeList.map((card, index) => (
              <article key={card.id} className="ac-knowledge-item">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{card.title}</h2>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="ac-tool-screen">
            <ToolGroup title="正确工具" label="科学护理" tools={groupedTools.right} tone="right" />
            <ToolGroup title="错误工具" label="常见误区" tools={groupedTools.wrong} tone="wrong" />
          </div>
        )}

        <button type="button" className="ac-start mt-4" onClick={onStart}>开始故事</button>
      </section>
    </main>
  );
}

function ToolGroup({ title, label, tools, tone }) {
  return (
    <section className={`ac-tool-atlas ac-tool-atlas-${tone}`}>
      <div className="ac-tool-atlas-head">
        <p>{title}</p>
        <strong>{label} · {tools.length} 件</strong>
      </div>
      <div className="ac-tool-grid">
        {tools.map((tool) => (
          <article key={tool.id} className="ac-tool-card">
            <div className="ac-tool-image">
              <SafeImage src={tool.image} alt={tool.name} fallbackLabel={tool.name} className="ac-tool-img" />
            </div>
            <strong>{tool.name}</strong>
            <span>{tool.type}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
