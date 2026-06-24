import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getEnding } from "../data/endings.js";
import { characters } from "../data/characters.js";
import { knowledgeCards } from "../data/knowledgeCards.js";
import { routes } from "../data/routes.js";
import { preloadImages } from "../utils/preloadImages.js";
import BackgroundLayer from "./BackgroundLayer.jsx";
import CharacterLayer from "./CharacterLayer.jsx";
import ChoicePanel from "./ChoicePanel.jsx";
import DialogueBox from "./DialogueBox.jsx";
import HistoryModal from "./HistoryModal.jsx";
import KnowledgeCard from "./KnowledgeCard.jsx";
import SettingsModal from "./SettingsModal.jsx";
import StatusBar from "./StatusBar.jsx";

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

export default function VisualNovel({ routeId, onFinish, onHome }) {
  const route = routes[routeId] || routes.nick;
  const [nodeId, setNodeId] = useState(route.startNode);
  const [smellValue, setSmellValue] = useState(route.initialStats.smellValue);
  const [confidenceValue, setConfidenceValue] = useState(route.initialStats.confidenceValue);
  const [scienceValue, setScienceValue] = useState(route.initialStats.scienceValue);
  const [history, setHistory] = useState([]);
  const [snapshots, setSnapshots] = useState([]);
  const [unlockedKnowledge, setUnlockedKnowledge] = useState([]);
  const [knowledgeCard, setKnowledgeCard] = useState(null);
  const [pendingNext, setPendingNext] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [textSpeed, setTextSpeed] = useState(2);

  const node = route.nodes[nodeId] || route.nodes[route.startNode];

  useEffect(() => {
    const nextIds = [
      node.next,
      ...(node.choices || []).map((choice) => choice.next),
    ].filter((id) => id && id !== "ending");
    const nextAssets = [...new Set(nextIds)].flatMap((id) => {
      const nextNode = route.nodes[id];
      if (!nextNode) return [];
      return [
        nextNode.background,
        ...(nextNode.characters || []).map((item) => {
          const profile = characters[item.name];
          return profile?.images?.[item.expression] || profile?.images?.normal;
        }),
      ];
    });

    void preloadImages(nextAssets, undefined, {
      concurrency: 4,
      priority: "high",
      timeout: 6000,
    });
  }, [node, route]);

  const snapshot = useCallback(
    () => ({
      nodeId,
      smellValue,
      confidenceValue,
      scienceValue,
      history,
      unlockedKnowledge,
    }),
    [confidenceValue, history, nodeId, scienceValue, smellValue, unlockedKnowledge],
  );

  const recordCurrent = useCallback(() => {
    setHistory((current) => {
      if (current[current.length - 1]?.id === node.id) return current;
      return [...current, { id: node.id, speaker: node.speaker || "旁白", text: node.text }];
    });
  }, [node.id, node.speaker, node.text]);

  const finish = useCallback(
    (nextSmell = smellValue, nextConfidence = confidenceValue, nextScience = scienceValue, historyOverride = history, knowledgeOverride = unlockedKnowledge) => {
      onFinish({
        route,
        smellValue: nextSmell,
        confidenceValue: nextConfidence,
        scienceValue: nextScience,
        unlockedKnowledge: knowledgeOverride,
        ending: getEnding(nextSmell, nextConfidence, nextScience, route),
        history: historyOverride,
      });
    },
    [confidenceValue, history, onFinish, route, scienceValue, smellValue, unlockedKnowledge],
  );

  const goToNode = useCallback(
    (nextId) => {
      if (!nextId) return;
      if (nextId === "ending") {
        const finalHistory =
          history[history.length - 1]?.id === node.id
            ? history
            : [...history, { id: node.id, speaker: node.speaker || "旁白", text: node.text }];
        setHistory(finalHistory);
        finish(smellValue, confidenceValue, scienceValue, finalHistory, unlockedKnowledge);
        return;
      }
      setSnapshots((current) => [...current, snapshot()]);
      recordCurrent();
      setNodeId(nextId);
    },
    [finish, recordCurrent, scienceValue, snapshot, unlockedKnowledge],
  );

  function handleNext() {
    if (node.choices) return;
    setKnowledgeCard(null);
    goToNode(node.next);
  }

  function handleStageClick(event) {
    if (event.target.closest("button, input, .vn-modal-backdrop")) return;
    if (knowledgeCard) {
      handleKnowledgeClose();
      return;
    }
    handleNext();
  }

  function handleChoose(choice) {
    const nextSmell = clamp(smellValue + (choice.effects?.smell || 0));
    const nextConfidence = clamp(confidenceValue + (choice.effects?.confidence || 0));
    const nextScience = clamp(scienceValue + (choice.effects?.science || 0));
    const knowledge = knowledgeCards[choice.knowledgeId];
    const nextUnlocked = knowledge && !unlockedKnowledge.includes(knowledge.id) ? [...unlockedKnowledge, knowledge.id] : unlockedKnowledge;
    const nextHistory =
      history[history.length - 1]?.id === node.id
        ? history
        : [...history, { id: node.id, speaker: node.speaker || "旁白", text: node.text }];
    setSnapshots((current) => [...current, snapshot()]);
    setSmellValue(nextSmell);
    setConfidenceValue(nextConfidence);
    setScienceValue(nextScience);
    setUnlockedKnowledge(nextUnlocked);
    setKnowledgeCard({
      title: knowledge?.title || "知识点",
      summary: knowledge?.summary || knowledge?.text || choice.feedback,
      consequence: choice.consequence,
      feedback: choice.feedback,
      tone: choice.tone,
    });
    setPendingNext({
      next: choice.next,
      smellValue: nextSmell,
      confidenceValue: nextConfidence,
      scienceValue: nextScience,
      history: nextHistory,
      unlockedKnowledge: nextUnlocked,
    });
    setAutoPlay(false);
    setHistory(nextHistory);
  }

  function handleKnowledgeClose() {
    const pending = pendingNext;
    setKnowledgeCard(null);
    setPendingNext(null);
    if (!pending) return;
    if (pending.next === "ending") {
      finish(
        pending.smellValue,
        pending.confidenceValue,
        pending.scienceValue,
        pending.history,
        pending.unlockedKnowledge,
      );
      return;
    }
    setNodeId(pending.next);
  }

  function handleBack() {
    const last = snapshots[snapshots.length - 1];
    if (!last) return;
    setNodeId(last.nodeId);
    setSmellValue(last.smellValue);
    setConfidenceValue(last.confidenceValue);
    setScienceValue(last.scienceValue);
    setHistory(last.history);
    setUnlockedKnowledge(last.unlockedKnowledge);
    setSnapshots((current) => current.slice(0, -1));
    setKnowledgeCard(null);
    setPendingNext(null);
  }

  function handleSkip() {
    let current = node;
    const skipped = [];
    while (current && !current.choices && current.next && current.next !== "ending") {
      skipped.push({ id: current.id, speaker: current.speaker || "旁白", text: current.text });
      current = route.nodes[current.next];
      if (current?.choices) break;
    }
    if (!current) return;
    setSnapshots((list) => [...list, snapshot()]);
    setHistory((list) => [...list, ...skipped.filter((item) => list[list.length - 1]?.id !== item.id)]);
    setNodeId(current.id);
    setAutoPlay(false);
    setKnowledgeCard(null);
    setPendingNext(null);
  }

  function resetGame() {
    setNodeId(route.startNode);
    setSmellValue(route.initialStats.smellValue);
    setConfidenceValue(route.initialStats.confidenceValue);
    setScienceValue(route.initialStats.scienceValue);
    setHistory([]);
    setSnapshots([]);
    setUnlockedKnowledge([]);
    setKnowledgeCard(null);
    setPendingNext(null);
    setShowSettings(false);
    setAutoPlay(false);
  }

  useEffect(() => {
    if (!autoPlay || node.choices) {
      if (node.choices) setAutoPlay(false);
      return undefined;
    }
    const delay = textSpeed === 1 ? 2600 : textSpeed === 2 ? 2000 : 1400;
    const timer = window.setTimeout(handleNext, delay);
    return () => window.clearTimeout(timer);
  }, [autoPlay, node.choices, nodeId, textSpeed]);

  const characterList = useMemo(() => node.characters || [], [node.characters]);

  return (
    <main className="vn-shell" onClick={handleStageClick}>
      <BackgroundLayer src={node.background} />
      <div className="vn-soft-overlay" />
      <StatusBar smellValue={smellValue} confidenceValue={confidenceValue} scienceValue={scienceValue} />
      <button type="button" className="vn-home-button" onClick={onHome}>首页</button>
      <CharacterLayer characterList={characterList} />
      <ChoicePanel choices={knowledgeCard ? null : node.choices} onChoose={handleChoose} />
      <DialogueBox
        node={node}
        onNext={handleNext}
        onBack={handleBack}
        onHistory={() => setShowHistory(true)}
        onSkip={handleSkip}
        autoPlay={autoPlay}
        onAuto={() => setAutoPlay((value) => !value)}
        onSettings={() => setShowSettings(true)}
      />
      <KnowledgeCard card={knowledgeCard} onClose={handleKnowledgeClose} />
      {showHistory ? <HistoryModal entries={history} onClose={() => setShowHistory(false)} /> : null}
      {showSettings ? (
        <SettingsModal textSpeed={textSpeed} onTextSpeed={setTextSpeed} onReset={resetGame} onClose={() => setShowSettings(false)} />
      ) : null}
    </main>
  );
}
