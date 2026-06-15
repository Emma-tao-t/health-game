import React, { useState } from "react";
import CharacterSelectPage from "./pages/CharacterSelectPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import GamePage from "./pages/GamePage.jsx";
import KnowledgeCollectionPage from "./pages/KnowledgeCollectionPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [routeId, setRouteId] = useState("nick");
  const [result, setResult] = useState(null);

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
