import React, { useEffect, useMemo, useState } from "react";
import CharacterSelectPage from "./pages/CharacterSelectPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import GamePage from "./pages/GamePage.jsx";
import KnowledgeCollectionPage from "./pages/KnowledgeCollectionPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import { characters } from "./data/characters.js";
import { routes } from "./data/routes.js";
import { preloadImages } from "./utils/preloadImages.js";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [routeId, setRouteId] = useState("nick");
  const [result, setResult] = useState(null);
  const storyWarmupList = useMemo(() => {
    const routeBackgrounds = Object.values(routes).flatMap((route) =>
      Object.values(route.nodes || {}).map((node) => node.background),
    );
    const characterImages = Object.values(characters).flatMap((character) =>
      Object.values(character.images || {}),
    );

    return [...routeBackgrounds, ...characterImages];
  }, []);

  useEffect(() => {
    if (screen !== "home") {
      return undefined;
    }

    const warmup = () => preloadImages(storyWarmupList);
    const timer = window.setTimeout(warmup, 550);
    return () => window.clearTimeout(timer);
  }, [screen, storyWarmupList]);

  function openCharacterSelect() {
    setResult(null);
    setScreen("select");
  }

  function startGame(nextRouteId) {
    setRouteId(nextRouteId);
    setResult(null);
    setScreen("game");
  }

  function finishGame(nextResult) {
    setResult(nextResult);
    setScreen("result");
  }

  if (screen === "home") {
    return <HomePage onStart={openCharacterSelect} onKnowledge={() => setScreen("knowledge")} />;
  }

  if (screen === "knowledge") {
    return <KnowledgeCollectionPage onHome={() => setScreen("home")} onStart={openCharacterSelect} />;
  }

  if (screen === "select") {
    return <CharacterSelectPage onSelect={startGame} onHome={() => setScreen("home")} />;
  }

  if (screen === "game") {
    return <GamePage routeId={routeId} onFinish={finishGame} onHome={() => setScreen("home")} />;
  }

  if (screen === "result" && result) {
    return <ResultPage result={result} onReplay={() => startGame(result.route.id)} onHome={() => setScreen("home")} onSelect={openCharacterSelect} />;
  }

  return <HomePage onStart={openCharacterSelect} onKnowledge={() => setScreen("knowledge")} />;
}
