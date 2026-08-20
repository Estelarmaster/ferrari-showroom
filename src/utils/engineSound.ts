let ctx: AudioContext | null = null;
let oscillators: OscillatorNode[] = [];
let gainNode: GainNode | null = null;

function getContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return ctx;
}

export function startEngine() {
  const audioCtx = getContext();
  if (audioCtx.state === "suspended") audioCtx.resume();

  stopEngine();

  gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.4);
  gainNode.connect(audioCtx.destination);

  const frequencies = [60, 90, 130];
  oscillators = frequencies.map((freq, i) => {
    const osc = audioCtx.createOscillator();
    osc.type = i === 0 ? "sawtooth" : "triangle";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.connect(gainNode as GainNode);
    osc.start();
    return osc;
  });
}

export function revEngine() {
  const audioCtx = getContext();
  if (!oscillators.length || !gainNode) return;
  const now = audioCtx.currentTime;
  oscillators.forEach((osc, i) => {
    const base = [60, 90, 130][i];
    osc.frequency.cancelScheduledValues(now);
    osc.frequency.setValueAtTime(base, now);
    osc.frequency.linearRampToValueAtTime(base * 3.4, now + 0.35);
    osc.frequency.linearRampToValueAtTime(base, now + 1.1);
  });
  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setValueAtTime(gainNode.gain.value, now);
  gainNode.gain.linearRampToValueAtTime(0.2, now + 0.35);
  gainNode.gain.linearRampToValueAtTime(0.12, now + 1.1);
}

export function stopEngine() {
  if (!ctx || !gainNode) {
    oscillators.forEach((o) => {
      try {
        o.stop();
      } catch {
        /* already stopped */
      }
    });
    oscillators = [];
    return;
  }
  const audioCtx = ctx;
  const now = audioCtx.currentTime;
  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setValueAtTime(gainNode.gain.value, now);
  gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
  const oscsToStop = oscillators;
  setTimeout(() => {
    oscsToStop.forEach((o) => {
      try {
        o.stop();
      } catch {
        /* already stopped */
      }
    });
  }, 350);
  oscillators = [];
  gainNode = null;
}
