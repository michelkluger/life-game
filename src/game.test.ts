import { test, expect } from 'bun:test';
import { MAPS, afterScript, onSwim, type Ctx } from './content';
import { TXT, SORT_ITEMS } from './strings';
import { freq, trackNames, trackNotes } from './music';
import { DUELS, ENDINGS, duel, ending, newState, newFight, fightTurn, passDays, pay, RENT, type DuelId, type Fight, type State } from './logic';

const TERRAIN = '#T~,.123=^';
const free = (map: string, x: number, y: number) => {
  const ch = MAPS[map].rows[y]?.[x];
  return ch === '.' || ch === ',';
};

test('maps are rectangular and every char is terrain or a defined entity', () => {
  for (const [name, m] of Object.entries(MAPS)) {
    expect(free(name, ...m.spawn), `${name} spawn`).toBe(true);
    for (const row of m.rows) {
      expect(row.length, `${name}: "${row}"`).toBe(m.rows[0].length);
      for (const ch of row) expect(TERRAIN.includes(ch) || ch in m.ents, `${name}: '${ch}'`).toBe(true);
    }
  }
});

test('every character and door can be reached on foot (or by swimming) from where you arrive', () => {
  for (const [name, m] of Object.entries(MAPS)) {
    const open = (x: number, y: number) => { const ch = m.rows[y]?.[x]; return ch === '.' || ch === ',' || (ch === '~' && !!m.swim); };
    const seen = new Set<string>([m.spawn.join()]), todo = [m.spawn];
    const around = (x: number, y: number) => [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
    for (let cell; (cell = todo.pop());) {
      for (const [x, y] of around(cell[0], cell[1])) {
        if (open(x, y) && !seen.has(`${x},${y}`)) { seen.add(`${x},${y}`); todo.push([x, y]); }
      }
    }
    m.rows.forEach((row, y) => [...row].forEach((ch, x) => {
      if (m.ents[ch]?.act) expect(around(x, y).some(([ax, ay]) => seen.has(`${ax},${ay}`)), `${name}: '${ch}' at ${x},${y}`).toBe(true);
    }));
  }
});

test('every place has a tune and every note is playable', () => {
  for (const map of [...Object.keys(MAPS), 'interview', 'train']) expect(trackNames(), map).toContain(map);
  for (const name of trackNames()) for (const n of trackNotes(name)) {
    expect(n, name).toMatch(/^[A-G]#?\d$/);
    expect(freq(n), `${name} ${n}`).toBeGreaterThan(40);
  }
});

test('every line exists in all four languages with the same placeholders', () => {
  const lines = [...Object.entries(TXT), ...SORT_ITEMS.map((it, i) => [`sort ${i}`, it.text] as const)];
  for (const [key, line] of lines) {
    expect(line.length, key).toBe(4);
    for (const l of line) {
      expect(l.trim().length, key).toBeGreaterThan(0);
      expect(l.match(/\{\d\}/g)?.sort().join(), key).toBe(line[0].match(/\{\d\}/g)?.sort().join());
    }
  }
  expect(SORT_ITEMS.filter(it => it.bad).length).toBe(SORT_ITEMS.length / 2); // an even mix to sort
});

test('the wardrobe pays only once', async () => {
  const s = newState();
  const c = { s, say: async () => {}, choose: async () => 0, pairs: async () => true, days: async () => {} } as unknown as Ctx;
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

test('no duel can be won with ordinary moves, and each can with its special move', () => {
  for (const id of Object.keys(DUELS) as DuelId[]) {
    const d = duel(id);
    const canWin = (f: Fight, moves: string[]): boolean => moves.some(m => {
      const g = { ...f }, r = fightTurn(g, d, m);
      return r.result === 'win' || (r.result === null && canWin(g, moves));
    });
    const ordinary = Object.keys(d.moves).filter(m => !d.moves[m].needs), special = Object.keys(d.moves).filter(m => d.moves[m].needs);
    expect(special.length, id).toBe(1);
    expect(canWin(newFight(), ordinary), id).toBe(false);
    expect(canWin(newFight(), special), id).toBe(true);
  }
});

test('every future can be reached, and the right one wins', () => {
  const with_ = (flags: string[], more: Partial<State> = {}): State => ({ ...newState(), ...more, flags: Object.fromEntries(flags.map(f => [f, true])) });
  expect(ending(newState())).toBe('zurich'); // nothing done: you stay
  expect(ending(with_(['phd']))).toBe('science');
  expect(ending(with_(['startup']))).toBe('founder');
  expect(ending(with_(['moveMarseille']))).toBe('marseille');
  expect(ending(with_(['moveBrazil']))).toBe('brazil');
  expect(ending(with_(['dating']))).toBe('zurich');
  // without any commitment, what you actually spent time on decides
  expect(ending(with_(['birthday', 'ballDone', 'lunch']))).toBe('marseille');
  // a commitment outweighs a few good deeds elsewhere
  expect(ending(with_(['phd', 'lunch', 'mangoes']))).toBe('science');
  // two equal commitments: the later one wins
  expect(ending(with_(['phd', 'startup'], { n: { at_phd: 1, at_startup: 2 } }))).toBe('founder');
  expect(ending(with_(['phd', 'startup'], { n: { at_phd: 2, at_startup: 1 } }))).toBe('science');
  // secret futures beat everything
  expect(ending(with_(['moveBrazil'], { n: { box: 5 } }))).toBe('time');
  expect(ending(with_(['svalbard', 'antarctica', 'phd'], { dist: { walk: 0, bike: 0, swim: 30 } }))).toBe('antarctica');
  expect(ending(with_(['pilot', 'dating'], { n: { flights: 3 } }))).toBe('sky');
  expect(ending(with_(['phd', 'munich', 'medal', 'pilot']))).toBe('astronaut');
  for (const e of ENDINGS) for (const part of ['endT_', 'endA_', 'endB_']) expect(TXT, part + e).toHaveProperty(part + e);
});

test('the whole game can be played to the end', async () => {
  const ok = async () => true;
  const c: Ctx = {
    s: newState(),
    say: async () => {},
    choose: async prompt => (prompt === TXT.anMastQ ? 1 : 0), // first option everywhere, except the one real quiz
    go(map, x, y) { expect(free(map, x, y), `go ${map} ${x},${y}`).toBe(true); Object.assign(c.s, { map, x, y }); },
    days: async n => { passDays(c.s, n); },
    refresh() {}, backdrop() {},
    simon: ok, pairs: ok, timing: ok, aim: ok, whack: ok, collect: ok, balance: ok, leds: ok, sort: ok, glide: ok, gather: ok, tag: ok, climb: ok, sneak: ok, formation: ok, dance: ok, oven: ok, paceline: ok,
    dodge: async () => 0,
    mash: async () => 1,
    // Play the special move if you have earned it, otherwise the first one, until someone gives.
    async duel(kind) {
      const d = duel(kind), f = newFight();
      const ids = Object.keys(d.moves).filter(m => !d.moves[m].needs || c.s.flags[d.moves[m].needs!]);
      const move = ids.find(m => d.moves[m].needs) ?? ids[0];
      for (;;) { const r = fightTurn(f, d, move); if (r.result) return r.result === 'win'; }
    },
  };
  const f = c.s.flags;
  const act = async (map: string, ...chars: string[]) => {
    for (const ch of chars) {
      expect(c.s.map, `before '${ch}'`).toBe(map);
      await MAPS[map].ents[ch].act!(c);
      await afterScript(c);
    }
  };

  await act('flat', 'E');
  expect(f.ellie && f.ellieOut).toBe(true); // Ellie comes along from the start

  // Present day: fail the interview, remember the scouts, win the job.
  await act('flat', 'X');
  expect(c.s.map).toBe('flat'); // box stays shut until an interview goes wrong
  await act('flat', 'D');
  await act('zurich', 'O', 'j', 'y');
  expect(f.failedInterview).toBe(true);
  expect(f.badgers || f.capuns).toBeUndefined(); // no licence, no kilometres: no friends yet
  await act('zurich', 'F');
  await act('flat', 'X');
  await act('camp', 'A');
  expect(c.s.map).toBe('camp'); // tent needs the rope first
  await act('camp', 'R', 'A');
  expect(f.prepared).toBe(true);
  await act('flat', 'D');
  await act('zurich', 'O');
  expect(f.employed).toBe(true);

  // Marseille: cake, ball, ice, pétanque.
  await act('zurich', 'H');
  await act('marseille', 'S', 'P', 'S');
  expect(f.birthday).toBe(true);
  await act('marseille', 'B');
  expect(f.ball).toBeUndefined(); // nobody asked for it yet
  await act('marseille', 'a', 'B', 'a');
  expect(f.ballDone).toBe(true);
  await act('marseille', 'f');
  expect(f.ice).toBeUndefined();
  await act('marseille', 'J', 'f', 'J');
  expect(f.iceDone).toBe(true);
  await act('marseille', 'p', 'G');
  expect(f.petanque).toBe(true);
  expect(c.s.map).toBe('zurich');
  expect(f.end).toBeUndefined();

  // The box, in chronological order, each memory waiting for its present-day trigger.
  await act('zurich', 'F');
  await act('flat', 'X');
  expect(c.s.map).toBe('flat'); // Svalbard waits until you have been in the lake
  await onSwim(c);
  await act('flat', 'X');
  await act('svalbard', 'H');
  expect(c.s.map).toBe('svalbard'); // no leaving town without the bear guard
  await act('svalbard', 'G', 'H');
  expect(f.svalbard).toBe(true);

  await act('flat', 'X');
  await act('vienna', 'K');
  expect(c.s.map).toBe('vienna'); // no debugging before coffee
  await act('vienna', 'W', 'W', 'W', 'K');
  expect(f.vienna).toBe(true);

  await act('flat', 'X');
  expect(c.s.map).toBe('flat'); // Wiener Neustadt waits for three kilometres on the bike
  c.s.dist.bike = 30;
  await act('flat', 'X');
  await act('wiener', 'K');
  expect(c.s.map).toBe('wiener'); // bench is locked
  await act('wiener', 'h', 'p', 'h', 'p', 'h', 'K'); // the form A38 runaround
  expect(f.wiener).toBe(true);

  await act('flat', 'X');
  await act('munich', 'C');
  expect(f.munich).toBe(true);

  await c.days(10); // Antarctica waits for a paid rent; the salary arriving also satisfies the bank badge
  await act('flat', 'X');
  await act('antarctica', 'M');
  expect(f.antarctica).toBe(true);

  await act('flat', 'X');
  await act('bank', 'C', 'I', 'C');
  expect(c.s.map).toBe('bank'); // laptop but nowhere to live
  await act('bank', 'W', 'G', 'W', 'W', 'W', 'G', 'C');
  expect(f.bank && f.halbtax).toBe(true);
  await act('flat', 'X'); // empty box: stays put
  expect(c.s.map).toBe('flat');
  expect(f.end).toBeUndefined(); // still owes the family a visit

  // Brazil: chocolate wins the lunch, mother packs the pão de queijo.
  await act('flat', 'D');
  await act('zurich', 'A');
  expect(f.chocolate).toBe(true);
  await act('brazil', 'M');
  expect(f.paoq).toBeUndefined(); // lunch first
  await act('brazil', 'A');
  expect(f.end).toBe(true);
  await act('brazil', 'M', 'h');
  expect(f.partyIn).toBeUndefined(); // nobody arrives at a birthday empty-handed
  await act('brazil', 'V');
  expect(f.sweet).toBeUndefined();   // grandma needs the mangoes first
  await act('brazil', 'D', 'V', 'E', 'h', 'E', 'X');
  expect(f.paoq && f.mangoes && f.sweet && f.parabens).toBe(true);

  // Back home: deliver the pão de queijo, fly, race, and ride the train at half fare.
  await act('zurich', 'e', 'P', 'R');
  expect(f.paoqGiven && f.pilot && f.medal).toBe(true);
  // Friends: the Badgers need the licence, the Capuns need kilometres.
  await act('zurich', 'j', 'y', 'w', 'z');
  expect(f.badgers && f.bgFly && f.capuns).toBe(true);

  // Commitments and the rest of life in Zurich.
  await act('zurich', 'e');                       // the expat pitches the company; first answer is yes
  expect(f.startup).toBe(true);
  await act('zurich', 'g');
  expect(f.climbed).toBeUndefined();              // nobody invited you yet
  await act('zurich', 'l', 'g', 'u');
  expect(f.climbed && f.phd).toBe(true);
  await act('zurich', 'F');
  const pickLast = c.choose;
  c.choose = async (_p, opts) => 1;               // laptop: the dating app
  await act('flat', 'C');
  expect(f.match).toBe(true);
  await act('flat', 'D');
  const answers = [1, 0, 1];                      // the three good answers
  c.choose = async () => answers.shift()!;
  await act('zurich', 'c');
  expect(f.dating).toBe(true);
  await act('zurich', 'F');
  c.choose = async (_p, opts) => opts.length - 1; // laptop: decide
  await act('flat', 'C');
  expect(ENDINGS.some(e => f['saw_' + e])).toBe(true);
  expect(f.saw_astronaut).toBe(true);             // this player did everything, which earns a secret future
  c.choose = pickLast;
  await act('flat', 'D');
  const before = c.s.money;
  await act('zurich', 'H');
  expect(before - c.s.money).toBe(45);
  expect(c.s.money).toBeGreaterThan(0);
});
