import React, { useEffect, useRef, useState } from "react";
import { assetPath } from "../utils/assetPath.js";

const MUSIC_KEY = "musicEnabled";
const TARGET_VOLUME = 0.07;
const FADE_STEP = 0.012;
const FADE_INTERVAL = 45;
const BEAT_MS = 312;
const melody = [523.25, 659.25, 783.99, 880, 783.99, 659.25, 587.33, 523.25, 587.33, 659.25, 783.99, 659.25, 523.25, 659.25, 587.33, 523.25];
const chords = [
  [261.63, 329.63, 392],
  [196, 293.66, 392],
  [220, 261.63, 329.63],
  [174.61, 261.63, 349.23],
];

function readInitialEnabled() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(MUSIC_KEY) !== "false";
}

export default function BackgroundMusic({ shouldStart }) {
  const musicSrc = assetPath("/assets/audio/bgm.mp3");
  const audioRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const synthRef = useRef({
    context: null,
    gain: null,
    timer: null,
    beat: 0,
  });
  const [enabled, setEnabled] = useState(readInitialEnabled);
  const [missing, setMissing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  function clearFadeTimer() {
    if (fadeTimerRef.current) {
      window.clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }

  function fadeTo(targetVolume, afterFade) {
    const audio = audioRef.current;
    if (!audio) return;

    clearFadeTimer();
    fadeTimerRef.current = window.setInterval(() => {
      const direction = audio.volume < targetVolume ? 1 : -1;
      const nextVolume = audio.volume + direction * FADE_STEP;
      const reached = direction > 0 ? nextVolume >= targetVolume : nextVolume <= targetVolume;

      audio.volume = reached ? targetVolume : Math.max(0, Math.min(TARGET_VOLUME, nextVolume));

      if (reached) {
        clearFadeTimer();
        afterFade?.();
      }
    }, FADE_INTERVAL);
  }

  function getSynth() {
    const synth = synthRef.current;
    if (!synth.context) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      synth.context = new AudioContextClass();
      synth.gain = synth.context.createGain();
      synth.gain.gain.value = 0;
      synth.gain.connect(synth.context.destination);
    }
    return synth;
  }

  function playTone(frequency, duration, gain, type = "triangle") {
    const synth = getSynth();
    if (!synth?.context || !synth.gain || synth.context.state !== "running") return;

    const start = synth.context.currentTime;
    const oscillator = synth.context.createOscillator();
    const envelope = synth.context.createGain();
    const filter = synth.context.createBiquadFilter();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2600, start);
    filter.frequency.exponentialRampToValueAtTime(900, start + duration);
    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(gain, start + 0.015);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(filter);
    filter.connect(envelope);
    envelope.connect(synth.gain);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  }

  function playNoise(duration = 0.035, gain = 0.012) {
    const synth = getSynth();
    if (!synth?.context || !synth.gain || synth.context.state !== "running") return;

    const bufferSize = Math.max(1, Math.floor(synth.context.sampleRate * duration));
    const buffer = synth.context.createBuffer(1, bufferSize, synth.context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const source = synth.context.createBufferSource();
    const envelope = synth.context.createGain();
    envelope.gain.value = gain;
    source.buffer = buffer;
    source.connect(envelope);
    envelope.connect(synth.gain);
    source.start(synth.context.currentTime);
  }

  function playSynthBeat() {
    const synth = synthRef.current;
    const beat = synth.beat;
    const note = melody[beat % melody.length];
    const chord = chords[Math.floor(beat / 8) % chords.length];
    const accent = beat % 4 === 0;

    if (beat % 4 === 0) {
      chord.forEach((frequency, index) => {
        window.setTimeout(() => playTone(frequency * 2, 0.48, 0.018, "sine"), index * 22);
      });
      playTone(chord[0] / 2, 0.42, 0.025, "sine");
    }

    playTone(note, 0.2, accent ? 0.075 : 0.055, "triangle");
    if (beat % 8 === 6) {
      playTone(note * 1.5, 0.12, 0.025, "sine");
    }
    if (beat % 2 === 1) {
      playNoise();
    }

    synth.beat += 1;
  }

  async function startSynthMusic() {
    const synth = getSynth();
    if (!synth?.context || !synth.gain) return;
    if (synth.context.state === "suspended") {
      await synth.context.resume();
    }
    if (!synth.timer) {
      playSynthBeat();
      synth.timer = window.setInterval(playSynthBeat, BEAT_MS);
    }
    synth.gain.gain.cancelScheduledValues(synth.context.currentTime);
    synth.gain.gain.setTargetAtTime(TARGET_VOLUME, synth.context.currentTime, 0.45);
  }

  function stopSynthMusic() {
    const synth = synthRef.current;
    if (!synth.context || !synth.gain) return;
    synth.gain.gain.cancelScheduledValues(synth.context.currentTime);
    synth.gain.gain.setTargetAtTime(0, synth.context.currentTime, 0.35);
    window.setTimeout(() => {
      if (synth.timer && synth.gain?.gain.value < 0.02) {
        window.clearInterval(synth.timer);
        synth.timer = null;
      }
    }, 700);
  }

  async function playMusic() {
    const audio = audioRef.current;
    await startSynthMusic();
    setHasStarted(true);

    if (!audio || missing) {
      return;
    }

    try {
      if (!audio.getAttribute("src")) {
        audio.preload = "auto";
        audio.src = musicSrc;
        audio.load();
      }
      audio.loop = true;
      audio.volume = 0;
      await audio.play();
      setHasStarted(true);
      fadeTo(TARGET_VOLUME);
      window.setTimeout(() => {
        if (!audio.paused && audio.currentTime > 0) {
          stopSynthMusic();
        }
      }, 650);
    } catch (error) {
      if (error?.name !== "NotAllowedError") {
        console.warn("背景音乐文件未找到");
        setMissing(true);
      }
    }
  }

  function stopMusic() {
    const audio = audioRef.current;
    if (audio) {
      fadeTo(0, () => audio.pause());
    }
    stopSynthMusic();
  }

  function toggleMusic() {
    const nextEnabled = !enabled;
    setEnabled(nextEnabled);
    window.localStorage.setItem(MUSIC_KEY, String(nextEnabled));

    if (nextEnabled) {
      void playMusic();
    } else {
      stopMusic();
    }
  }

  useEffect(() => {
    window.localStorage.setItem(MUSIC_KEY, String(enabled));
  }, [enabled]);

  useEffect(() => {
    if (shouldStart && enabled && !hasStarted) {
      void playMusic();
    }
  }, [shouldStart, enabled, hasStarted]);

  useEffect(() => {
    const handleStartMusic = () => {
      if (enabled) {
        void playMusic();
      }
    };

    window.addEventListener("game:start-music", handleStartMusic);
    return () => window.removeEventListener("game:start-music", handleStartMusic);
  }, [enabled, missing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const handleError = () => {
      console.warn("背景音乐文件未找到");
      setMissing(true);
    };

    audio.addEventListener("error", handleError);
    return () => {
      audio.removeEventListener("error", handleError);
      clearFadeTimer();
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} preload="none" loop playsInline />
      <button
        type="button"
        className={`music-toggle ${enabled ? "music-toggle-on" : "music-toggle-off"}`}
        onClick={toggleMusic}
        aria-label={enabled ? "关闭音乐" : "开启音乐"}
      >
        <span aria-hidden="true">{enabled ? "🔊" : "🔇"}</span>
        <strong>{enabled ? "关闭音乐" : "开启音乐"}</strong>
      </button>
    </>
  );
}
