import React from "react";

export default function HistoryModal({ entries, onClose }) {
  return (
    <div className="vn-modal-backdrop">
      <section className="vn-modal">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#3b2718]">历史记录</h2>
          <button type="button" className="vn-close" onClick={onClose}>关闭</button>
        </div>
        <div className="mt-4 max-h-[52dvh] space-y-3 overflow-y-auto pr-1">
          {entries.length ? (
            entries.slice(-18).map((entry, index) => (
              <div key={`${entry.id}-${index}`} className="rounded-2xl bg-[#fff6df] p-3">
                <p className="text-xs font-black text-[#a87434]">{entry.speaker}</p>
                <p className="mt-1 text-sm font-bold leading-6 text-[#3b2718]">{entry.text}</p>
              </div>
            ))
          ) : (
            <p className="rounded-2xl bg-[#fff6df] p-4 text-sm font-bold text-[#7b5a36]">还没有历史对白。</p>
          )}
        </div>
      </section>
    </div>
  );
}
