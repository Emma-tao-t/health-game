import React, { useState } from "react";
import { characters } from "../data/characters.js";

const positionClass = {
  left: "left-[8%]",
  center: "left-1/2 -translate-x-1/2",
  right: "right-[7%]",
};

function CharacterSprite({ item }) {
  const [failed, setFailed] = useState(false);
  const profile = characters[item.name];
  const src = profile?.images?.[item.expression] || profile?.images?.normal;
  const activeClass = item.active ? "opacity-100 scale-100" : "opacity-55 scale-[0.96]";

  return (
    <div className={`vn-character ${positionClass[item.position] || positionClass.center} ${activeClass}`}>
      {src && !failed ? (
        <img
          src={src}
          alt={item.name}
          className="h-full w-full object-contain"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="vn-character-placeholder">{item.name}</div>
      )}
    </div>
  );
}

export default function CharacterLayer({ characterList }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[25%] top-[14%]">
      {characterList.map((item) => (
        <CharacterSprite key={`${item.name}-${item.position}`} item={item} />
      ))}
    </div>
  );
}
