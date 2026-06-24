import React, { useMemo, useState } from "react";
import { knowledgeSections } from "../data/knowledgeSections.js";
import { toolImages } from "../data/toolImages.js";
import { toolKnowledge } from "../data/toolKnowledge.js";
import SafeImage from "../components/SafeImage.jsx";
import ToolKnowledgeModal from "../components/ToolKnowledgeModal.jsx";

export default function KnowledgeCollectionPage({ onHome, onStart }) {
  const [activeSection, setActiveSection] = useState("basics");
  const [selectedTool, setSelectedTool] = useState(null);
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

        <nav className="ac-knowledge-nav ac-knowledge-tabs" aria-label="科普图鉴分类">
          <SectionButton index="01" title="基础机制" tone="yellow" active={activeSection === "basics"} onClick={() => setActiveSection("basics")} />
          <SectionButton index="02" title="科学护理" tone="green" active={activeSection === "care"} onClick={() => setActiveSection("care")} />
          <SectionButton index="03" title="常见误区" tone="red" active={activeSection === "myths"} onClick={() => setActiveSection("myths")} />
          <SectionButton index="04" title="进阶知识" tone="blue" active={activeSection === "advanced"} onClick={() => setActiveSection("advanced")} />
        </nav>

        <div className="ac-atlas-content">
          {activeSection === "basics" && <KnowledgeSection section={knowledgeSections.basics} />}
          {activeSection === "care" && (
            <div className="ac-tool-screen">
              <p className="ac-tool-hint">点击正确护理工具，查看它的科学原理。</p>
              <ToolGroup title="科学护理" label="正确工具" tools={groupedTools.right} tone="right" onSelect={setSelectedTool} />
            </div>
          )}
          {activeSection === "myths" && (
            <div className="ac-tool-screen">
              <p className="ac-tool-hint">点击常见误区工具，了解它为什么不能解决气味源头。</p>
              <ToolGroup title="常见误区" label="错误工具" tools={groupedTools.wrong} tone="wrong" onSelect={setSelectedTool} />
            </div>
          )}
          {activeSection === "advanced" && <KnowledgeSection section={knowledgeSections.advanced} />}
        </div>

        <button type="button" className="ac-start mt-4" onClick={onStart}>开始故事</button>
      </section>
      <ToolKnowledgeModal
        tool={selectedTool}
        knowledge={selectedTool ? toolKnowledge[selectedTool.id] : null}
        onClose={() => setSelectedTool(null)}
      />
    </main>
  );
}

function SectionButton({ index, title, tone, active, onClick }) {
  return (
    <button type="button" className={`is-${tone} ${active ? "is-active" : ""}`} onClick={onClick}>
      <span>{index}</span>
      {title}
    </button>
  );
}

function KnowledgeSection({ section }) {
  return (
    <section className={`ac-knowledge-section ac-knowledge-section-${section.tone}`}>
      <header className="ac-knowledge-section-head">
        <span>{section.index}</span>
        <div>
          <h2>{section.title}</h2>
          <p>{section.subtitle}</p>
        </div>
      </header>
      <ol>
        {section.facts.map((fact, index) => (
          <li key={fact.title}>
            <span>{index + 1}</span>
            <div>
              <h3>{fact.title}</h3>
              <p>{fact.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ToolGroup({ title, label, tools, tone, onSelect }) {
  return (
    <section className={`ac-tool-atlas ac-tool-atlas-${tone}`}>
      <div className="ac-tool-atlas-head">
        <p>{title}</p>
        <strong>{label} · {tools.length} 件</strong>
      </div>
      <div className="ac-tool-grid">
        {tools.map((tool) => (
          <button key={tool.id} type="button" className="ac-tool-card" onClick={() => onSelect(tool)}>
            <div className="ac-tool-image">
              <SafeImage src={tool.image} alt={tool.name} fallbackLabel={tool.name} className="ac-tool-img" />
            </div>
            <strong>{tool.name}</strong>
            <span>{tool.type}</span>
            <small>点击查看</small>
          </button>
        ))}
      </div>
    </section>
  );
}
