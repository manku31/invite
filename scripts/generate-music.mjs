// Original shehnai-inspired instrumental. No third-party recordings or melodies.
// Recreate the self-hosted WAV with: node scripts/generate-music.mjs
import { writeFileSync } from "node:fs";
const rate = 24000;
const seconds = 40;
const total = rate * seconds;
const samples = new Float64Array(total);
const tonic = 261.6256;
const phrase = [
  [0, 2, 0],
  [2, 1, 2],
  [3, 2, 4],
  [5, 2, 7],
  [7, 3, 4],
  [10, 2, 2],
  [12, 3, 0],
  [15, 2, 2],
  [17, 3, 4],
  [20, 2, 7],
  [22, 2, 9],
  [24, 3, 7],
  [27, 2, 4],
  [29, 2, 2],
  [31, 3, 4],
  [34, 2, 2],
  [36, 4, 0],
];
for (let i = 0; i < total; i++) {
  const t = i / rate;
  const fade = Math.min(1, t / 1.6, (seconds - t) / 2.4);
  // A quiet sustained tonic/fifth, rounded like a tanpura drone.
  samples[i] =
    fade *
    (0.045 * Math.sin(((2 * Math.PI * tonic) / 2) * t) +
      0.024 * Math.sin(2 * Math.PI * tonic * 0.75 * t));
}
let previous = tonic;
for (const [start, duration, semitones] of phrase) {
  const frequency = tonic * 2 ** (semitones / 12);
  let phase = 0;
  for (let j = 0; j < duration * rate; j++) {
    const t = j / rate;
    const i = Math.floor(start * rate) + j;
    const glide = frequency + (previous - frequency) * Math.exp(-t * 13);
    const vibrato =
      1 + 0.003 * Math.sin(2 * Math.PI * 4.7 * t) * Math.min(1, t * 3);
    phase += (2 * Math.PI * glide * vibrato) / rate;
    const envelope =
      (1 - Math.exp(-t * 7)) * Math.min(1, (duration - t) / 0.45);
    // Soft reed harmonics, avoiding a harsh high-frequency edge.
    const reed =
      Math.sin(phase) +
      0.31 * Math.sin(2 * phase) +
      0.17 * Math.sin(3 * phase) +
      0.06 * Math.sin(4 * phase);
    samples[i] += 0.18 * envelope * reed;
  }
  previous = frequency;
}
// Gentle room reflections; keep the end faded for a quiet loop boundary.
for (const [delay, gain] of [
  [0.17, 0.16],
  [0.31, 0.09],
]) {
  const offset = Math.floor(delay * rate);
  for (let i = total - 1; i >= offset; i--)
    samples[i] += samples[i - offset] * gain;
}
const wav = Buffer.alloc(44 + total * 2);
wav.write("RIFF");
wav.writeUInt32LE(wav.length - 8, 4);
wav.write("WAVEfmt ", 8);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(1, 22);
wav.writeUInt32LE(rate, 24);
wav.writeUInt32LE(rate * 2, 28);
wav.writeUInt16LE(2, 32);
wav.writeUInt16LE(16, 34);
wav.write("data", 36);
wav.writeUInt32LE(total * 2, 40);
for (let i = 0; i < total; i++) {
  const fade = Math.min(1, i / rate / 1.6, (total - i) / rate / 2.4);
  wav.writeInt16LE(
    Math.round(Math.max(-1, Math.min(1, samples[i] * fade)) * 32767),
    44 + i * 2,
  );
}
writeFileSync(
  new URL("../public/audio/rajasthani-blessings.wav", import.meta.url),
  wav,
);
console.log(
  `Created ${seconds}s shehnai-inspired instrumental (${wav.length} bytes).`,
);
