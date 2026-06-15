import React from "react";

export default function SettingsModal({ textSpeed, onTextSpeed, onReset, onClose }) {
  return (
    <div className="vn-modal-backdrop">
      <section className="vn-modal">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#3b2718]">设置</h2>
          <button type="button" className="vn-close" onClick={onClose}>关闭</button>
        </div>
        <label className="mt-5 block">
          <span className="text-sm font-black text-[#6f4b28]">文字速度</span>
          <input
            type="range"
            min="1"
            max="3"
            value={textSpeed}
            onChange={(event) => onTextSpeed(Number(event.target.value))}
            className="mt-3 w-full accent-[#d7a14d]"
          />
        </label>
        <button type="button" className="vn-reset-button mt-6" onClick={onReset}>重置游戏</button>
      </section>
    </div>
  );
}
