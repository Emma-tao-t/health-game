import React from "react";
import SafeImage from "../components/SafeImage.jsx";

export default function HomePage({ onStart, onKnowledge }) {
  return (
    <main className="ac-home">
      <section className="ac-phone">
        <section className="ac-cover-card">
          <SafeImage src="/assets/cover/cover.png" alt="臭气退退退封面" fallbackLabel="臭气退退退" className="h-full w-full object-contain" />
          <div className="ac-cover-actions">
            <button type="button" className="ac-start" onClick={onStart}>开始故事</button>
            <button type="button" className="ac-soft-button ac-soft-button-green" onClick={onKnowledge}>科普图鉴</button>
          </div>
        </section>
      </section>
    </main>
  );
}
