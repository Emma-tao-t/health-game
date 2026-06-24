let audioContext;
let masterGain;
let audioReadyPromise;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioContext) {
    audioContext = new AudioContextClass();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.52;
    masterGain.connect(audioContext.destination);
  }

  return audioContext;
}

async function unlockAudio() {
  const context = getAudioContext();
  if (!context) return null;
  if (context.state === "running") return context;

  if (!audioReadyPromise) {
    audioReadyPromise = context.resume().then(() => context).catch(() => null);
  }

  return audioReadyPromise;
}

function playTone(frequency, duration = 0.07, gain = 0.12, type = "triangle") {
  const context = getAudioContext();
  if (!context || !masterGain || context.state !== "running") return;

  const start = context.currentTime;
  const oscillator = context.createOscillator();
  const envelope = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  envelope.gain.setValueAtTime(0.0001, start);
  envelope.gain.exponentialRampToValueAtTime(gain, start + 0.012);
  envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(envelope);
  envelope.connect(masterGain);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

export async function playButtonSound(kind = "tap") {
  await unlockAudio();

  if (kind === "choice") {
    playTone(660, 0.09, 0.34);
    window.setTimeout(() => playTone(880, 0.09, 0.24), 45);
    return;
  }

  if (kind === "page") {
    playTone(440, 0.065, 0.18, "sine");
    return;
  }

  playTone(520, 0.07, 0.26);
}

export function installGameAudio() {
  if (typeof window === "undefined") return () => {};

  const handlePointerDown = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest(".vn-choice")) {
      void playButtonSound("choice");
      return;
    }

    if (target.closest("button")) {
      void playButtonSound("tap");
      return;
    }

    if (target.closest(".vn-shell")) {
      void playButtonSound("page");
    }
  };

  const handleVisibility = () => {
    if (!audioContext) return;
    if (document.hidden) {
      audioContext.suspend();
    } else {
      audioContext.resume();
    }
  };

  window.addEventListener("pointerdown", handlePointerDown, { capture: true });
  document.addEventListener("visibilitychange", handleVisibility);

  return () => {
    window.removeEventListener("pointerdown", handlePointerDown, { capture: true });
    document.removeEventListener("visibilitychange", handleVisibility);
  };
}
