// Small music box on WebAudio: one looping tune per place, no audio files.
// Each track is a lead and a bass line of eighth notes; '-' is a rest.
// Kept gentle on purpose: soft waves, slow tempos, sparse pentatonic melodies, a low-pass filter and a quiet echo.
const TRACKS: Record<string, { bpm: number; lead: string; bass: string }> = {
  flat: { bpm: 72,
    lead: 'E4 - G4 - A4 - - - G4 - E4 - D4 - - - C4 - D4 - E4 - G4 - E4 - - - - - - -',
    bass: 'C3 - - - G2 - - - A2 - - - E2 - - - F2 - - - C3 - - - G2 - - - - - - -' },
  zurich: { bpm: 96,
    lead: 'D5 - B4 - G4 - A4 B4 D5 - - - E5 - D5 - B4 - A4 - G4 - - - A4 - B4 - A4 - - -',
    bass: 'G2 - - D3 - - G2 - E2 - - B2 - - E2 - C3 - - G2 - - C3 - D3 - - A2 - - D3 -' },
  marseille: { bpm: 100,
    lead: 'E5 - - C5 - - A4 - - C5 - - D5 - - B4 - - G4 - - B4 - - C5 - - A4 - - E4 - - A4 - - B4 - - G#4 - - E4 - - - - -',
    bass: 'A2 - - E3 - - A2 - - E3 - - G2 - - D3 - - G2 - - D3 - - F2 - - C3 - - F2 - - C3 - - E2 - - B2 - - E2 - - B2 - -' },
  camp: { bpm: 88,
    lead: 'F#4 - A4 - - B4 - A4 - F#4 - - E4 - - - D4 - F#4 - - A4 - F#4 - E4 - - D4 - - -',
    bass: 'D3 - - A2 - D3 - - B2 - - F#2 - B2 - - G2 - - D3 - G2 - - A2 - - E3 - A2 - -' },
  svalbard: { bpm: 60,
    lead: 'A4 - - - - - E5 - - - - - D5 - - - C5 - - - - - A4 - - - - - - - - -',
    bass: 'A2 - - - - - - - - - - - - - - - F2 - - - - - - - - - - - - - - -' },
  vienna: { bpm: 108,
    lead: 'E5 - G5 - E5 - D5 - C5 - - - D5 - F5 - D5 - C5 - B4 - - - C5 - E5 - G5 - A5 - G5 - E5 - D5 - C5 - - - - - - -',
    bass: 'C3 - G3 - G3 - C3 - G3 - G3 - G2 - D3 - D3 - G2 - D3 - D3 - A2 - E3 - E3 - F2 - C3 - C3 - G2 - D3 - D3 - C3 - G3 - - -' },
  munich: { bpm: 76,
    lead: 'D4 - - F4 - - A4 - - - G4 - F4 - - - D4 - - C4 - - D4 - - - - - - - - -',
    bass: 'D2 - - - - - A2 - - - - - - - - - C2 - - - - - G2 - - - - - - - - -' },
  antarctica: { bpm: 54,
    lead: 'B4 - - - - - - - E5 - - - - - - - F#5 - - - - - E5 - - - - - - - - -',
    bass: 'E2 - - - - - - - - - - - - - - - B1 - - - - - - - - - - - - - - -' },
  interview: { bpm: 110,
    lead: 'E4 - - G4 - - A4 - - - B4 - A4 - G4 - E4 - - G4 - - D4 - - - E4 - - - - -',
    bass: 'E2 - E2 - - - E2 - D2 - D2 - - - D2 - C2 - C2 - - - C2 - D2 - D2 - - - B1 -' },
  train: { bpm: 120,
    lead: 'G4 - B4 - D5 - B4 - G4 - B4 - E5 - D5 - C5 - E5 - G5 - E5 - D5 - B4 - A4 - - -',
    bass: 'G2 D3 G2 D3 G2 D3 G2 D3 E2 B2 E2 B2 E2 B2 E2 B2 C3 G2 C3 G2 C3 G2 C3 G2 D3 A2 D3 A2 D3 A2 D3 A2' },
};

const SEMI: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
export const freq = (n: string) => 440 * 2 ** ((SEMI[n[0]] + (n[1] === '#' ? 1 : 0) + 12 * (+n.slice(-1) + 1) - 69) / 12);
export const trackNames = () => Object.keys(TRACKS);
export const trackNotes = (name: string) => (TRACKS[name].lead + ' ' + TRACKS[name].bass).split(' ').filter(n => n !== '-');

let ac: AudioContext | null = null, out: AudioNode, timer: ReturnType<typeof setInterval> | undefined, current = '', muted = false;

// Soft attack and a long fade, so notes ring like a music box instead of beeping.
function note(f: number, dur: number, wave: OscillatorType, vol: number) {
  const o = ac!.createOscillator(), g = ac!.createGain(), at = ac!.currentTime + 0.04;
  o.type = wave; o.frequency.value = f;
  g.gain.setValueAtTime(0.0001, at);
  g.gain.linearRampToValueAtTime(vol, at + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g).connect(out);
  o.start(at); o.stop(at + dur + 0.05);
}

function start() {
  clearInterval(timer);
  const tr = TRACKS[current];
  if (!ac || muted || !tr) return;
  const lead = tr.lead.split(' '), bass = tr.bass.split(' '), step = 30 / tr.bpm;
  let i = 0;
  timer = setInterval(() => {
    const l = lead[i % lead.length], b = bass[i % bass.length];
    if (l !== '-') note(freq(l), step * 5, 'triangle', 0.05);
    if (b !== '-') note(freq(b), step * 6, 'sine', 0.06);
    i++;
  }, step * 1000);
}

export function play(name: string) { if (name !== current) { current = name; start(); } }

// Browsers only allow sound after a key press, so the first key starts the music.
export function unlock() {
  if (ac) return;
  ac = new AudioContext();
  const filter = ac.createBiquadFilter(), echo = ac.createDelay(), feedback = ac.createGain();
  filter.type = 'lowpass'; filter.frequency.value = 1600;
  echo.delayTime.value = 0.32; feedback.gain.value = 0.22;
  filter.connect(ac.destination);
  filter.connect(echo).connect(feedback).connect(echo); // quiet repeating echo
  feedback.connect(ac.destination);
  out = filter;
  start();
}
export function toggleMute() { muted = !muted; start(); }
