// Pure game rules: no rendering, so they can be tested with `bun test`.

export type State = {
  money: number; day: number; rentDue: number; lang: number;
  dist: { walk: number; bike: number; swim: number }; // tiles travelled; 10 tiles = 1 km
  flags: Record<string, boolean>;
  n: Record<string, number>; // counters: trips, flights, when each commitment was made
  map: string; x: number; y: number;
};

export const RENT = 1850, SALARY = 6500;

export const newState = (lang = 0): State =>
  ({ money: 2400, day: 1, rentDue: 10, lang, dist: { walk: 0, bike: 0, swim: 0 }, flags: {}, n: {}, map: 'flat', x: 5, y: 2 });

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

// ---- Futures ----
// Four secret futures have hard conditions and win outright. Otherwise the five ordinary futures are scored:
// a commitment you made in conversation counts 3, the smaller things you did for that part of your life count 1 each
// (at most 4). Ties go to the commitment you made most recently; with nothing at all, you simply stay in Zurich.
export const ENDINGS = ['time', 'antarctica', 'sky', 'astronaut', 'science', 'founder', 'marseille', 'brazil', 'zurich'] as const;
export type Ending = typeof ENDINGS[number];
const AXES: { id: Ending; commit: string; extras: (s: State) => number }[] = [
  { id: 'science', commit: 'phd', extras: s => count(s, 'svalbard', 'antarctica', 'munich', 'vienna') },
  { id: 'founder', commit: 'startup', extras: s => count(s, 'wardrobe', 'bank', 'wiener', 'paoqGiven') },
  { id: 'marseille', commit: 'moveMarseille', extras: s => count(s, 'birthday', 'ballDone', 'iceDone', 'petanque') + (s.n.marseille ?? 0) },
  { id: 'brazil', commit: 'moveBrazil', extras: s => count(s, 'lunch', 'mangoes', 'sweet', 'parabens', 'bloco') + (s.n.brazil ?? 0) },
  { id: 'zurich', commit: 'dating', extras: s => count(s, 'climbed', 'pilot', 'medal', 'swam', 'badgers', 'capuns', 'coelhoDone') },
];
const count = (s: State, ...flags: string[]) => flags.filter(f => s.flags[f]).length;

export function ending(s: State): Ending {
  const f = s.flags, n = s.n;
  if ((n.box ?? 0) >= 5) return 'time';
  if (f.svalbard && f.antarctica && s.dist.swim >= 30) return 'antarctica';
  if ((n.flights ?? 0) >= 3) return 'sky';
  if (f.phd && f.munich && f.medal && f.pilot) return 'astronaut';
  let best: Ending = 'zurich', top = 0, when = -1;
  for (const a of AXES) {
    const score = (f[a.commit] ? 3 : 0) + Math.min(4, a.extras(s)), at = n['at_' + a.commit] ?? 0;
    if (score > top || (score === top && score > 0 && at > when)) { best = a.id; top = score; when = at; }
  }
  return best;
}
