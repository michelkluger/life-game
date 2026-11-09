// Tiny chiptune sequencer on WebAudio: one looping tune per place, no audio files.
// Each track is a lead and a bass line of eighth notes; '-' is a rest.
const TRACKS: Record<string, { bpm: number; wave: OscillatorType; lead: string; bass: string }> = {
  flat: { bpm: 80, wave: 'triangle',
    lead: 'E4 - G4 - B4 - G4 - D4 - F#4 - A4 - F#4 - C4 - E4 - G4 - E4 - D4 - F#4 - A4 - - -',
    bass: 'E2 - - - - - - - D2 - - - - - - - C2 - - - - - - - D2 - - - - - - -' },
  zurich: { bpm: 126, wave: 'square',
    lead: 'C5 E5 G5 E5 C5 E5 D5 F5 A5 F5 D5 F5 B4 D5 G5 D5 B4 D5 C5 E5 G5 - C5 -',
    bass: 'C3 - - G2 - - D3 - - A2 - - G2 - - D3 - - C3 - - G2 - -' },
  marseille: { bpm: 138, wave: 'sawtooth',
    lead: 'A4 C5 E5 A5 E5 C5 G4 B4 D5 G5 D5 B4 F4 A4 C5 F5 C5 A4 E4 G#4 B4 E5 B4 G#4',
    bass: 'A2 - - E3 - - G2 - - D3 - - F2 - - C3 - - E2 - - B2 - -' },
  camp: { bpm: 104, wave: 'triangle',
    lead: 'F#4 - A4 F#4 - D5 - A4 E4 - G4 E4 - B4 - G4',
    bass: 'D3 - - A2 D3 - A2 - A2 - - E3 A2 - E3 -' },
  interview: { bpm: 144, wave: 'square',
    lead: 'E4 - E4 F4 E4 - D#4 - E4 - E4 G4 F4 - E4 -',
    bass: 'E2 E2 - E2 E2 - E2 - F2 F2 - F2 E2 - E2 -' },
  train: { bpm: 156, wave: 'square',
    lead: 'G4 - B4 D5 G4 - B4 D5 A4 - C5 E5 A4 - C5 E5',
    bass: 'G2 G2 D3 G2 G2 G2 D3 G2 A2 A2 E3 A2 A2 A2 E3 A2' },
};

const SEMI: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const freq = (n: string) => 440 * 2 ** ((SEMI[n[0]] + (n[1] === '#' ? 1 : 0) + 12 * (+n.slice(-1) + 1) - 69) / 12);

let ac: AudioContext | null = null, timer: ReturnType<typeof setInterval> | undefined, current = '', muted = false;

function blip(f: number, dur: number, wave: OscillatorType, vol: number) {
  const o = ac!.createOscillator(), g = ac!.createGain(), at = ac!.currentTime + 0.03;
  o.type = wave; o.frequency.value = f;
  g.gain.setValueAtTime(vol, at);
  g.gain.exponentialRampToValueAtTime(0.001, at + dur);
  o.connect(g).connect(ac!.destination);
  o.start(at); o.stop(at + dur);
}

function start() {
  clearInterval(timer);
  const tr = TRACKS[current];
  if (!ac || muted || !tr) return;
  const lead = tr.lead.split(' '), bass = tr.bass.split(' '), step = 30 / tr.bpm;
  let i = 0;
  timer = setInterval(() => {
    const l = lead[i % lead.length], b = bass[i % bass.length];
    if (l !== '-') blip(freq(l), step * 1.8, tr.wave, 0.035);
    if (b !== '-') blip(freq(b), step * 1.9, 'triangle', 0.09);
    i++;
  }, step * 1000);
}

export function play(name: string) { if (name !== current) { current = name; start(); } }
// Browsers only allow sound after a key press, so the first key starts the music.
export function unlock() { if (!ac) { ac = new AudioContext(); start(); } }
export function toggleMute() { muted = !muted; start(); }
