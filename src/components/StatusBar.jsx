import React from "react";

function Meter({ label, value, type }) {
  const percent = Math.max(0, Math.min(100, value));
  const smellTone =
    percent > 65 ? "from-[#ff8a7a] to-[#e64747]" : percent > 35 ? "from-[#ffd86a] to-[#ff9f43]" : "from-[#8ce8b4] to-[#38bf78]";
  const tone = type === "smell" ? smellTone : type === "science" ? "from-[#b79cff] to-[#69b7ff]" : "from-[#8ec5ff] to-[#ff94c8]";

  return (
    <div className="min-w-0 flex-1">
      <div className="mb-1 flex items-center justify-between text-[11px] font-black text-[#fff8df]">
        <span>{label}</span>
        <span>{Math.round(value)}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border-2 border-[#6f4b28] bg-[#fff4d7]/85">
        <div className={`h-full rounded-full bg-gradient-to-r ${tone}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function StatusBar({ smellValue, confidenceValue, scienceValue }) {
  return (
    <header className="vn-status">
      <Meter label="气味值" value={smellValue} type="smell" />
      <Meter label="自信值" value={confidenceValue} type="confidence" />
      <Meter label="科学值" value={scienceValue} type="science" />
    </header>
  );
}
