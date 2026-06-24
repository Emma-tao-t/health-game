import React from "react";

export default function LoadingPage({ progress }) {
  const percent = Math.round(progress * 100);

  return (
    <main className="ac-home">
      <section className="ac-phone">
        <section className="ac-loading-card">
          <div className="ac-loading-badge">臭气退退退</div>
          <h1>正在准备全部图片</h1>
          <p>完成后进入游戏，后续场景无需等待</p>
          <div className="ac-loading-track">
            <div style={{ width: `${percent}%` }} />
          </div>
          <strong>{percent}%</strong>
        </section>
      </section>
    </main>
  );
}
