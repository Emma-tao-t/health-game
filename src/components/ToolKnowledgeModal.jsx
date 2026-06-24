import React, { useEffect } from "react";
import SafeImage from "./SafeImage.jsx";

export default function ToolKnowledgeModal({ tool, knowledge, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!tool || !knowledge) return null;

  const isScientific = tool.type === "科学工具";

  return (
    <div className="ac-tool-modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className={`ac-tool-modal ${isScientific ? "is-scientific" : "is-myth"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tool-knowledge-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="ac-tool-modal-close" onClick={onClose} aria-label="关闭知识卡">
          ×
        </button>

        <div className="ac-tool-modal-visual">
          <SafeImage src={tool.image} alt={tool.name} fallbackLabel={tool.name} />
        </div>

        <div className="ac-tool-modal-copy">
          <span>{isScientific ? "科学护理" : "常见误区"}</span>
          <h2 id="tool-knowledge-title">{tool.name}</h2>
          <strong>{knowledge.summary}</strong>
          {knowledge.details.map((detail) => (
            <p key={detail}>{detail}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
