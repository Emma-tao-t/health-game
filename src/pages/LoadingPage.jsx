import React from "react";

export default function LoadingPage({ progress }) {
  const percent = Math.round(progress * 100);

  return (
    <main className="ac-home">
      <section className="ac-phone">
        <section className="ac-loading-card">
          <div className="ac-loading-badge">臭气退退退</div>
          <h1>正在准备故事</h1>
          <p>图片加载中，马上开始</p>
          <div className="ac-loading-track">
            <div style={{ width: `${percent}%` }} />
          </div>
          <strong>{percent}%</strong>
        </section>
      </section>
    </main>
  );
}
