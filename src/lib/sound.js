// Cross-browser Web Audio manager for UI sound effects (slider/counter ticks)
// Resolves autoplay and rapid-trigger playback issues across Safari, iOS Safari, Firefox, and Chromium.

let audioCtx = null;
let tickBuffer = null;
let syntheticBuffer = null;
let isFetching = false;
let lastTickTime = 0;

// Universal AudioContext getter
export function getAudioContext() {
  if (typeof window === "undefined") return null;
  
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

// Generate a clean tactile mechanical click buffer as an instant fallback
function createSyntheticTickBuffer(ctx) {
  if (!ctx) return null;
  const sampleRate = ctx.sampleRate || 44100;
  const duration = 0.025; // 25ms
  const frameCount = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, frameCount, sampleRate);
  const channelData = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i++) {
    const t = i / sampleRate;
    // Exponential decay envelope
    const env = Math.exp(-t * 180);
    // Pitch drop for mechanical click feel
    const freq = 1200 * Math.exp(-t * 80);
    const sine = Math.sin(2 * Math.PI * freq * t);
    // Subtle noise for tactile texture
    const noise = (Math.random() * 2 - 1) * 0.15 * Math.exp(-t * 250);
    channelData[i] = (sine * 0.85 + noise) * env;
  }
  return buffer;
}

// Cross-browser safe audio buffer decoding (supports both Promise & callback WebKit styles)
function decodeAudioDataSafe(ctx, arrayBuffer) {
  return new Promise((resolve, reject) => {
    let resolved = false;
    try {
      const res = ctx.decodeAudioData(
        arrayBuffer,
        (decoded) => {
          if (!resolved) {
            resolved = true;
            resolve(decoded);
          }
        },
        (err) => {
          if (!resolved) {
            resolved = true;
            reject(err);
          }
        }
      );
      if (res && typeof res.then === "function") {
        res.then((decoded) => {
          if (!resolved) {
            resolved = true;
            resolve(decoded);
          }
        }).catch((err) => {
          if (!resolved) {
            resolved = true;
            reject(err);
          }
        });
      }
    } catch (e) {
      if (!resolved) reject(e);
    }
  });
}

// Preload and decode tick sound file
export function preloadTickSound() {
  if (typeof window === "undefined" || tickBuffer || isFetching) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (!syntheticBuffer) {
    try {
      syntheticBuffer = createSyntheticTickBuffer(ctx);
    } catch {
      // Ignore synthesis errors
    }
  }

  isFetching = true;
  // Try loading tick.mp3, falling back to tick.wav if needed
  const urls = ["/tick.mp3", "/tick.wav"];
  
  const loadNext = (index) => {
    if (index >= urls.length) {
      isFetching = false;
      return;
    }

    fetch(urls[index])
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.arrayBuffer();
      })
      .then((arrayBuffer) => decodeAudioDataSafe(ctx, arrayBuffer))
      .then((decoded) => {
        tickBuffer = decoded;
        isFetching = false;
      })
      .catch(() => {
        loadNext(index + 1);
      });
  };

  loadNext(0);
}

// Unlock audio context on user interaction (required by iOS Safari, Safari macOS, Firefox)
export function unlockAudio() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  if (!tickBuffer && !isFetching) {
    preloadTickSound();
  }
}

// Attach global interaction listeners for seamless unlocking across all browsers
if (typeof window !== "undefined") {
  const unlockEvents = ["pointerdown", "touchstart", "touchend", "mousedown", "keydown", "click"];
  const handleInteraction = () => {
    unlockAudio();
  };

  unlockEvents.forEach((event) => {
    window.addEventListener(event, handleInteraction, { passive: true, capture: true });
  });

  // Attempt initial preload
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(() => preloadTickSound());
  } else {
    setTimeout(preloadTickSound, 1000);
  }
}

// Play tick sound with throttling and cross-browser Web Audio support
export function playTickSound(volume = 0.15, throttleMs = 30) {
  if (typeof window === "undefined") return;

  const now = Date.now();
  if (now - lastTickTime < throttleMs) {
    return;
  }
  lastTickTime = now;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  const bufferToPlay = tickBuffer || syntheticBuffer || (syntheticBuffer = createSyntheticTickBuffer(ctx));
  if (!bufferToPlay) return;

  try {
    const source = ctx.createBufferSource();
    source.buffer = bufferToPlay;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);

    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start(0);
  } catch {
    // Fail silently without interrupting UI animations
  }
}

// Generate a soft, diffused impulse response for a subtle calming reverb
function createReverbImpulse(ctx, duration = 5.2, decay = 5.6) {
  const sampleRate = ctx.sampleRate || 44100;
  const length = Math.floor(sampleRate * duration);
  const impulse = ctx.createBuffer(2, length, sampleRate);
  const left = impulse.getChannelData(0);
  const right = impulse.getChannelData(1);

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * decay);
    left[i] = (Math.random() * 2 - 1) * env;
    right[i] = (Math.random() * 2 - 1) * env;
  }
  return impulse;
}

// Play a subtle, calming ambient swell reverb for the Welcome Screen
export function playWelcomeTransitionSound(volume = 0.18) {
  if (typeof window === "undefined") return;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const duration = 2.4;

  // Master Gain with gentle fade in and long calming tail
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(volume, now + 0.35);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  masterGain.connect(ctx.destination);

  // --- REVERB CONVOLUTION ENGINE ---
  let reverbNode = null;
  let reverbGain = null;
  try {
    reverbNode = ctx.createConvolver();
    reverbNode.buffer = createReverbImpulse(ctx, 2.4, 1.5);

    reverbGain = ctx.createGain();
    reverbGain.gain.setValueAtTime(0.75, now);
    reverbNode.connect(reverbGain);
    reverbGain.connect(masterGain);
  } catch {
    // Fallback if convolver is unsupported
  }

  // --- WARM, CALMING SWELL CHORD (Soft pure sine tones) ---
  const swellNotes = [130.81, 196.00, 21.63, 629.63]; // C3, G3, C4, E4
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.Q.setValueAtTime(0, now); // Gentle, smooth curve with zero resonance

  // Warm breathing filter swell
  filter.frequency.setValueAtTime(2200, now);
  filter.frequency.exponentialRampToValueAtTime(750, now + 0.5);
  filter.frequency.exponentialRampToValueAtTime(260, now + duration);

  const swellGain = ctx.createGain();
  swellGain.gain.setValueAtTime(0, now);
  swellGain.gain.linearRampToValueAtTime(0.5, now + 0.4);
  swellGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  filter.connect(swellGain);
  swellGain.connect(masterGain);
  if (reverbNode) swellGain.connect(reverbNode);

  swellNotes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    oscGain.gain.setValueAtTime(idx === 0 ? 0.35 : 0.2, now);

    osc.connect(oscGain);
    oscGain.connect(filter);

    osc.start(now);
    osc.stop(now + duration);
  });
}
