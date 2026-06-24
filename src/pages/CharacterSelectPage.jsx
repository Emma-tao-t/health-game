import React from "react";
import SafeImage from "../components/SafeImage.jsx";
import { characters } from "../data/characters.js";
import { routeList } from "../data/routes.js";

export default function CharacterSelectPage({ onSelect, onHome }) {
  return (
    <main className="ac-select">
      <section className="ac-select-phone">
        <header className="ac-select-head">
          <button type="button" className="ac-small-button" onClick={onHome}>首页</button>
          <div>
            <p>角色目录</p>
            <h1>选择一位角色开始</h1>
          </div>
        </header>

        <div className="ac-route-list">
          {routeList.map((route, index) => {
            const profile = characters[route.character];
            const image = profile?.images?.happy || profile?.images?.normal;
            return (
              <button
                key={route.id}
                type="button"
                className="ac-route-card"
                style={{ "--route-accent": route.accent, "--tilt": `${index % 2 ? 1.2 : -1.2}deg` }}
                onClick={() => onSelect(route.id)}
              >
                <div className="ac-route-avatar">
                  <SafeImage
                    src={image}
                    alt={route.character}
                    fallbackLabel={route.character}
                    className="h-full w-full object-contain"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <div className="ac-route-copy">
                  <span>{route.label}</span>
                  <h2>{route.title}</h2>
                  <p>{route.description}</p>
                  <strong>开始路线</strong>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
