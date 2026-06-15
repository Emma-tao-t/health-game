import React from "react";
import VisualNovel from "../components/VisualNovel.jsx";

export default function GamePage({ routeId, onFinish, onHome }) {
  return <VisualNovel routeId={routeId} onFinish={onFinish} onHome={onHome} />;
}
