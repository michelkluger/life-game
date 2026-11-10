// Pure game rules: no rendering, so they can be tested with `bun test`.
import { TXT, type Line } from './strings';

export type State = {
  money: number; day: number; rentDue: number; lang: number;
  dist: { walk: number; bike: number; swim: number }; // tiles travelled; 10 tiles = 1 km
  flags: Record<string, boolean>;
  map: string; x: number; y: number;
};

export const RENT = 1850, SALARY = 6500;

export const newState = (lang = 0): State =>
  ({ money: 2400, day: 1, rentDue: 10, lang, dist: { walk: 0, bike: 0, swim: 0 }, flags: {}, map: 'flat', x: 5, y: 2 });

// Rent may push money below zero (overdraft); pay() then refuses all spending.
export function passDays(s: State, n = 1): number {
  let rents = 0;
  s.day += n;
  while (s.day >= s.rentDue) {
    if (s.flags.employed) s.money += SALARY;
    s.money -= RENT; s.rentDue += 30; rents++;
  }
  return rents;
}

export function pay(s: State, cost: number): boolean {
  if (s.money < cost) return false;
  s.money -= cost;
  return true;
}

// ---- Duels: turn-based conversations you win by wearing down the other side before your nerve runs out. ----
// Each duel is tuned so the ordinary moves are never enough: you need the special move, earned elsewhere (`needs` flag).
type Move = { name: Line; dmg: number; heal: number; line: Line; needs?: string };
type Duel = { title: Line; prompt: Line; foe: string; moves: Record<string, Move>; questions: { dmg: number; line: Line }[] };

export const DUELS = {
  interview: {
    title: TXT.fightTitle, prompt: TXT.fightPrompt, foe: 'interviewer',
    moves: {
      python: { name: TXT.mvPython, dmg: 6, heal: 0, line: TXT.mvPythonL },
      german: { name: TXT.mvGerman, dmg: 3, heal: 2, line: TXT.mvGermanL },
      charm: { name: TXT.mvCharm, dmg: 5, heal: 0, line: TXT.mvCharmL },
      prepared: { name: TXT.mvPrepared, dmg: 10, heal: 0, line: TXT.mvPreparedL, needs: 'prepared' },
    },
    questions: [{ dmg: 5, line: TXT.q1 }, { dmg: 6, line: TXT.q2 }, { dmg: 4, line: TXT.q3 }],
  },
  lunch: {
    title: TXT.lunchTitle, prompt: TXT.lunchPrompt, foe: 'aunt',
    moves: {
      photos: { name: TXT.lmPhotos, dmg: 6, heal: 0, line: TXT.lmPhotosL },
      food: { name: TXT.lmFood, dmg: 3, heal: 2, line: TXT.lmFoodL },
      football: { name: TXT.lmFootball, dmg: 5, heal: 0, line: TXT.lmFootballL },
      chocolate: { name: TXT.lmChoc, dmg: 10, heal: 0, line: TXT.lmChocL, needs: 'chocolate' },
    },
    questions: [{ dmg: 5, line: TXT.lq1 }, { dmg: 6, line: TXT.lq2 }, { dmg: 4, line: TXT.lq3 }],
  },
} satisfies Record<string, Duel>;
export type DuelId = keyof typeof DUELS;
export const duel = (id: DuelId): Duel => DUELS[id];

export const MAX_CONF = 20;
export const newFight = () => ({ conf: MAX_CONF, skep: 30, turn: 0 });
export type Fight = ReturnType<typeof newFight>;

export function fightTurn(f: Fight, d: Duel, move: string) {
  const m = d.moves[move];
  f.skep -= m.dmg;
  f.conf = Math.min(MAX_CONF, f.conf + m.heal);
  if (f.skep <= 0) return { q: null, result: 'win' as const };
  const q = d.questions[f.turn++ % d.questions.length];
  f.conf -= q.dmg;
  return { q, result: f.conf <= 0 ? 'lose' as const : null };
}
