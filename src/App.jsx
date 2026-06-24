import React, { useEffect, useMemo, useState } from "react";
import CharacterSelectPage from "./pages/CharacterSelectPage.jsx";
import BackgroundMusic from "./components/BackgroundMusic.jsx";
import HomePage from "./pages/HomePage.jsx";
import GamePage from "./pages/GamePage.jsx";
import KnowledgeCollectionPage from "./pages/KnowledgeCollectionPage.jsx";
import LoadingPage from "./pages/LoadingPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import { characters } from "./data/characters.js";
import { knowledgeCards } from "./data/knowledgeCards.js";
import { routes } from "./data/routes.js";
import { toolImages } from "./data/toolImages.js";
import { preloadImages } from "./utils/preloadImages.js";
import { installGameAudio } from "./utils/sound.js";

function getRouteImages(route) {
  if (!route) return [];

  return Object.values(route.nodes || {}).flatMap((node) => [
    node.background,
    ...(node.characters || []).map((item) => {
      const profile = characters[item.name];
      return profile?.images?.[item.expression] || profile?.images?.normal;
    }),
  ]);
}

function getOpeningImages(route) {
  if (!route) return [];
  const node = route.nodes?.[route.startNode];
  if (!node) return [];

  return [
    node.background,
    ...(node.characters || []).map((item) => {
      const profile = characters[item.name];
      return profile?.images?.[item.expression] || profile?.images?.normal;
    }),
  ];
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [routeId, setRouteId] = useState("nick");
  const [result, setResult] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [musicShouldStart, setMusicShouldStart] = useState(false);
  const [unlockedKnowledge, setUnlockedKnowledge] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("odor-game-unlocked-knowledge") || "[]");
      return Array.isArray(saved) ? saved.filter((id) => knowledgeCards[id]) : [];
    } catch {
      return [];
    }
  });
  const storyWarmupList = useMemo(() => {
    const routeBackgrounds = Object.values(routes).flatMap((route) =>
      Object.values(route.nodes || {}).map((node) => node.background),
    );
    const characterImages = Object.values(characters).flatMap((character) =>
      Object.values(character.images || {}),
    );

    return [...routeBackgrounds, ...characterImages, ...toolImages.map((tool) => tool.image)];
  }, []);

  useEffect(() => {
    if (screen !== "home") {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      void preloadImages(storyWarmupList, undefined, {
        concurrency: 8,
        priority: "high",
        timeout: 12000,
        retries: 2,
      });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [screen, storyWarmupList]);

  useEffect(() => installGameAudio(), []);

  async function openCharacterSelect() {
    setResult(null);
    setLoadingProgress(0);
    setScreen("loading");
    await preloadImages(storyWarmupList, setLoadingProgress, {
      concurrency: 8,
      priority: "high",
      timeout: 12000,
      retries: 2,
    });
    setScreen("select");
    setMusicShouldStart(true);
    window.dispatchEvent(new Event("game:start-music"));
  }

  async function startGame(nextRouteId) {
    const nextRoute = routes[nextRouteId] || routes.nick;
    setScreen("loading");
    setLoadingProgress(0);
    await preloadImages(getOpeningImages(nextRoute), setLoadingProgress, {
      concurrency: 3,
      priority: "high",
      timeout: 5000,
      retries: 1,
    });
    setRouteId(nextRouteId);
    setResult(null);
    setScreen("game");
    void preloadImages([...getRouteImages(nextRoute), ...toolImages.map((tool) => tool.image)], undefined, {
      concurrency: 5,
      priority: "high",
      timeout: 7000,
    });
  }

  function finishGame(nextResult) {
    const mergedKnowledge = [...new Set([...unlockedKnowledge, ...nextResult.unlockedKnowledge])].filter((id) => knowledgeCards[id]);
    setUnlockedKnowledge(mergedKnowledge);
    window.localStorage.setItem("odor-game-unlocked-knowledge", JSON.stringify(mergedKnowledge));
    setResult(nextResult);
    setScreen("result");
  }

  let content = <HomePage onStart={openCharacterSelect} onKnowledge={() => setScreen("knowledge")} />;

  if (screen === "knowledge") {
    content = <KnowledgeCollectionPage onHome={() => setScreen("home")} onStart={openCharacterSelect} />;
  } else if (screen === "loading") {
    content = <LoadingPage progress={loadingProgress} />;
  } else if (screen === "select") {
    content = <CharacterSelectPage onSelect={startGame} onHome={() => setScreen("home")} />;
  } else if (screen === "game") {
    content = <GamePage routeId={routeId} onFinish={finishGame} onHome={() => setScreen("home")} />;
  } else if (screen === "result" && result) {
    content = (
      <ResultPage
        result={result}
        onReplay={() => startGame(result.route.id)}
        onKnowledge={() => setScreen("knowledge")}
        onSelect={openCharacterSelect}
      />
    );
  }

  return (
    <>
      <BackgroundMusic shouldStart={musicShouldStart} />
      {content}
    </>
  );
}
