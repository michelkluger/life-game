// Pure game rules: no rendering, so they can be tested with `bun test`.
import { TXT } from './strings';

export type State = {
  money: number; day: number; rentDue: number; lang: number;
  flags: Record<string, boolean>;
  map: string; x: number; y: number;
};

export const RENT = 1850, SALARY = 6500;

export const newState = (lang = 0): State =>
  ({ money: 2400, day: 1, rentDue: 10, lang, flags: {}, map: 'flat', x: 5, y: 2 });

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

export const MOVES = {
  python: { name: TXT.mvPython, dmg: 6, heal: 0, line: TXT.mvPythonL },
  german: { name: TXT.mvGerman, dmg: 3, heal: 2, line: TXT.mvGermanL },
  charm: { name: TXT.mvCharm, dmg: 5, heal: 0, line: TXT.mvCharmL },
  prepared: { name: TXT.mvPrepared, dmg: 10, heal: 0, line: TXT.mvPreparedL },
};
export type MoveId = keyof typeof MOVES;

export const QUESTIONS = [
  { dmg: 5, line: TXT.q1 },
  { dmg: 6, line: TXT.q2 },
  { dmg: 4, line: TXT.q3 },
];

export const MAX_CONF = 20;
export const newFight = () => ({ conf: MAX_CONF, skep: 30, turn: 0 });
export type Fight = ReturnType<typeof newFight>;

export function fightTurn(f: Fight, id: MoveId) {
  const m = MOVES[id];
  f.skep -= m.dmg;
  f.conf = Math.min(MAX_CONF, f.conf + m.heal);
  if (f.skep <= 0) return { q: null, result: 'win' as const };
  const q = QUESTIONS[f.turn++ % QUESTIONS.length];
  f.conf -= q.dmg;
  return { q, result: f.conf <= 0 ? 'lose' as const : null };
}
