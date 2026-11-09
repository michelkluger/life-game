import { test, expect } from 'bun:test';
import { MAPS, afterScript, onSwim, type Ctx } from './content';
import { freq, trackNames, trackNotes } from './music';
import { TXT } from './strings';
import { newState, newFight, fightTurn, passDays, pay, RENT, type Fight, type MoveId } from './logic';

const TERRAIN = '#T~,.123=^';

test('every place has a tune and every note is playable', () => {
  for (const map of [...Object.keys(MAPS), 'interview', 'train']) expect(trackNames(), map).toContain(map);
  for (const name of trackNames()) for (const n of trackNotes(name)) {
    expect(n, name).toMatch(/^[A-G]#?\d$/);
    expect(freq(n), `${name} ${n}`).toBeGreaterThan(40);
  }
});
const free = (map: string, x: number, y: number) => {
  const ch = MAPS[map].rows[y]?.[x];
  return ch === '.' || ch === ',';
};

test('maps are rectangular and every char is terrain or a defined entity', () => {
  for (const [name, m] of Object.entries(MAPS)) {
    for (const row of m.rows) {
      expect(row.length, `${name}: "${row}"`).toBe(m.rows[0].length);
      for (const ch of row) expect(TERRAIN.includes(ch) || ch in m.ents, `${name}: '${ch}'`).toBe(true);
    }
  }
});

test('every line exists in all four languages with the same placeholders', () => {
  for (const [key, line] of Object.entries(TXT)) {
    expect(line.length, key).toBe(4);
    for (const l of line) {
      expect(l.trim().length, key).toBeGreaterThan(0);
      expect(l.match(/\{\d\}/g)?.sort().join(), key).toBe(line[0].match(/\{\d\}/g)?.sort().join());
    }
  }
});

test('the wardrobe pays only once', async () => {
  const s = newState();
  const c = { s, say: async () => {}, choose: async () => 0, simon: async () => true, days: async () => {} } as unknown as Ctx;
  await MAPS.zurich.ents.N.act!(c);
  await MAPS.zurich.ents.N.act!(c);
  expect(s.money).toBe(2400 + 120);
});

test('rent is charged on its day and overdraft blocks spending', () => {
  const s = newState();
  expect(passDays(s, 8)).toBe(0);
  expect(passDays(s, 1)).toBe(1);
  expect(s.money).toBe(2400 - RENT);
  s.money = -5;
  expect(pay(s, 1)).toBe(false);
});

test('interview cannot be won without Be Prepared, and can with it', () => {
  const canWin = (f: Fight, ids: MoveId[]): boolean => ids.some(id => {
    const g = { ...f }, r = fightTurn(g, id);
    return r.result === 'win' || (r.result === null && canWin(g, ids));
  });
  expect(canWin(newFight(), ['python', 'german', 'charm'])).toBe(false);
  expect(canWin(newFight(), ['prepared'])).toBe(true);
});

test('the whole first build can be played to the end', async () => {
  const c: Ctx = {
    s: newState(),
    say: async () => {},
    choose: async prompt => (prompt === TXT.anMastQ ? 1 : 0), // first option everywhere, except the one real quiz
    go(map, x, y) { expect(free(map, x, y), `go ${map} ${x},${y}`).toBe(true); Object.assign(c.s, { map, x, y }); },
    days: async n => { passDays(c.s, n); },
    refresh() {},
    simon: async () => true,
    dodge: async () => 0,
    backdrop() {},
    async interview() {
      const f = newFight();
      for (;;) {
        const r = fightTurn(f, c.s.flags.prepared ? 'prepared' : 'python');
        if (r.result) return r.result === 'win';
      }
    },
  };
  const act = async (map: string, ch: string) => {
    expect(c.s.map).toBe(map);
    await MAPS[map].ents[ch].act!(c);
    await afterScript(c);
  };
  await act('flat', 'X');
  expect(c.s.map).toBe('flat'); // box stays shut until an interview goes wrong
  await act('flat', 'D');
  await act('zurich', 'O');
  expect(c.s.flags.failedInterview).toBe(true);
  await act('zurich', 'F');
  await act('flat', 'X');
  await act('camp', 'A');
  expect(c.s.map).toBe('camp'); // tent needs the rope first
  await act('camp', 'R');
  await act('camp', 'A');
  expect(c.s.flags.prepared).toBe(true);
  await act('flat', 'D');
  await act('zurich', 'O');
  expect(c.s.flags.employed).toBe(true);
  await act('zurich', 'H');
  await act('marseille', 'S');
  await act('marseille', 'P');
  await act('marseille', 'S');
  await act('marseille', 'G');
  expect(c.s.map).toBe('zurich');
  expect(c.s.flags.end).toBeUndefined(); // the box still holds four memories

  // Each memory needs its present-day trigger, in chronological order.
  await act('zurich', 'F');
  await act('flat', 'X');
  expect(c.s.map).toBe('flat'); // Svalbard waits until you have been in the lake
  await onSwim(c);
  await act('flat', 'X');
  await act('svalbard', 'H');
  expect(c.s.map).toBe('svalbard'); // no leaving town without the bear guard
  await act('svalbard', 'G');
  await act('svalbard', 'H');
  expect(c.s.flags.svalbard).toBe(true);

  await act('flat', 'X');
  await act('vienna', 'K');
  expect(c.s.map).toBe('vienna'); // no debugging before coffee
  for (let i = 0; i < 3; i++) await act('vienna', 'W');
  await act('vienna', 'K');
  expect(c.s.flags.vienna).toBe(true);

  await act('flat', 'X');
  await act('munich', 'C');
  expect(c.s.flags.munich).toBe(true);

  await c.days(10); // Antarctica waits for a paid rent
  await act('flat', 'X');
  await act('antarctica', 'M');
  expect(c.s.map).toBe('flat');
  expect(c.s.flags.end).toBe(true);
  expect(c.s.money).toBeGreaterThan(0);
  await act('flat', 'X'); // empty box: stays put
  expect(c.s.map).toBe('flat');
});
