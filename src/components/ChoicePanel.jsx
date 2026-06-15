import React from "react";

export default function ChoicePanel({ choices, onChoose }) {
  if (!choices?.length) return null;

  return (
    <div className="vn-choice-panel">
      {choices.map((choice, index) => (
        <button key={choice.text} type="button" className="vn-choice" style={{ animationDelay: `${index * 70}ms` }} onClick={() => onChoose(choice)}>
          <span>{String.fromCharCode(65 + index)}</span>
          {choice.text}
        </button>
      ))}
    </div>
  );
}
