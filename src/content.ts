// Story content: maps, characters, what happens when you bump into them. Text lives in strings.ts.
// No engine imports, so a test can play the whole thing through.
import { type State, pay } from './logic';
import { TXT as t, type Line, same } from './strings';

export type Ctx = {
  s: State;
  say(...lines: Line[]): Promise<void>;
  choose(prompt: Line, opts: Line[]): Promise<number>;
  go(map: string, x: number, y: number): void;
  days(n?: number): Promise<void>;
  interview(): Promise<boolean>;
  simon(n: number): Promise<boolean>;      // puzzle: memorise and repeat n arrows
  dodge(seconds: number): Promise<number>; // action: run a platform, returns collisions
  backdrop(on: boolean): void;             // train-ride scene behind the dialogue
  refresh(): void;
};
export type Script = (c: Ctx) => Promise<void>;
// `on` is the wall tile drawn under the entity (doors); `label` is a sign above it.
export type Ent = { tex: string; act?: Script; hide?: (s: State) => boolean; small?: boolean; on?: string; label?: Line };
// Map chars: '#' brick, '1' stone, '2' glass, '3' cream wall, '=' rails, 'T' tree, '~' water, ',' path, '.' floor.
// Any other char is a key in `ents`.
export type MapDef = { name: Line; floor: string; outdoor?: boolean; swim?: boolean; rows: string[]; ents: Record<string, Ent> };

const yes = async (c: Ctx, q: Line) => (await c.choose(q, [t.yes, t.no])) === 0;
const TICKET = 89, CAKE = 28; // also written into the text in strings.ts

export const intro: Script = c => c.say(t.intro1, t.intro2, t.intro3);

export const onSwim: Script = async c => {
  c.s.flags.swam = true;
  await c.say(t.swim1, t.swim2);
};

export const afterScript: Script = async c => {
  const f = c.s.flags;
  if (!f.employed || !f.birthday || f.end) return;
  f.end = true;
  await c.say(t.end1, t.end2);
};

// Animated ride, then a sprint for the connection. Missing it costs an extra day.
async function trainRide(c: Ctx, lines: Line[], sprint: Line) {
  c.backdrop(true);
  await c.say(...lines, sprint);
  const missed = (await c.dodge(12)) >= 3;
  await c.say(missed ? t.dodgeMiss : t.dodgeOk);
  c.backdrop(false);
  await c.days(missed ? 2 : 1);
}

export const MAPS: Record<string, MapDef> = {
  flat: {
    name: t.mFlat, floor: 'wood',
    rows: [
      '##########',
      '#B......X#',
      '#........#',
      '#...C....#',
      '#........#',
      '####D#####',
    ],
    ents: {
      B: { tex: 'bed', act: async c => {
        if (!await yes(c, t.bedQ)) return;
        await c.say(t.bedSleep);
        await c.days(1);
      } },
      C: { tex: 'pc', act: async c => {
        await c.say(t.pc1);
        if (!c.s.flags.employed) await c.say(t.pc2);
      } },
      X: { tex: 'box', act: async c => {
        const f = c.s.flags;
        if (f.prepared) return c.say(t.boxLater);
        if (!f.failedInterview) return c.say(t.boxClosed);
        await c.say(t.boxOpen1, t.boxOpen2);
        c.go('camp', 2, 4);
      } },
      D: { tex: 'door', on: 'wall', act: async c => c.go('zurich', 3, 7) },
    },
  },

  zurich: {
    name: t.mZurich, floor: 'grass', outdoor: true, swim: true,
    rows: [
      'TTTTTTTTTTTTTTTTTTTTTTTT',
      'T~~~~~~.........2222222T',
      'T~~~~~~.,,,,,,,.222O222T',
      'T~~~~~~.,.....,,,,,,,,.T',
      'T......K,.....,........T',
      'T.####..,..N..,..11111.T',
      'T.#F##..,.....,..11H11.T',
      'T..,,,,,,,,,,,,,,,,,...T',
      'T...............=======T',
      'TTTTTTTTTTTTTTTTTTTTTTTT',
    ],
    ents: {
      F: { tex: 'door', on: 'wall', label: t.lblHome, act: async c => c.go('flat', 4, 4) },
      K: { tex: 'swimmer', act: c => c.say(t.swimmer1, t.swimmer2) },
      N: { tex: 'neighbour', act: async c => {
        const f = c.s.flags;
        if (f.wardrobe) return c.say(t.nbDone);
        await c.say(t.nb1, t.nb2);
        if (!await yes(c, t.nbQ)) return;
        await c.say(t.nbHow);
        if (await c.simon(5)) {
          f.wardrobe = true; c.s.money += 120;
          await c.say(t.nbWin);
        } else await c.say(t.nbFail);
        await c.days(1);
      } },
      O: { tex: 'door', on: 'glass', label: same('Gletscher Labs'), act: async c => {
        const f = c.s.flags;
        if (f.employed) return c.say(t.offEmployed);
        if (!await yes(c, t.offQ)) return;
        if (await c.interview()) {
          f.employed = true; c.s.money += 3000;
          await c.say(t.offWin1, t.offWin2);
        } else {
          f.failedInterview = true;
          await c.say(t.offLose1, t.offLose2);
        }
        await c.days(1);
      } },
      H: { tex: 'door', on: 'stone', label: same('Zürich HB'), act: async c => {
        if (c.s.money < TICKET) return c.say(t.hbBroke);
        if (!await yes(c, t.hbQ)) return;
        pay(c.s, TICKET);
        await trainRide(c, [t.hb1, t.hb2], t.dodgeIntro);
        c.go('marseille', 4, 3);
      } },
    },
  },

  marseille: {
    name: t.mMarseille, floor: 'sand', outdoor: true, swim: true,
    rows: [
      'TTTTTTTTTTTTTTTTTTTT',
      'T.1111......3333...T',
      'T.11G1......3P33...T',
      'T..,,,,,,,,,,,.....T',
      'T...,..............T',
      'T...,.....S.J......T',
      'T...,,,,,..a.b.....T',
      'T..................T',
      'T~~~~~~~~~~~~~~~~~~T',
      'TTTTTTTTTTTTTTTTTTTT',
    ],
    ents: {
      G: { tex: 'door', on: 'stone', label: same('Gare St-Charles'), act: async c => {
        if (!await yes(c, t.gareQ)) return;
        if (!pay(c.s, TICKET)) await c.say(t.gareBroke);
        await trainRide(c, [t.gare1], t.dodgeBack);
        c.go('zurich', 19, 7);
      } },
      P: { tex: 'door', on: 'cream', label: same('Pâtisserie'), act: async c => {
        const f = c.s.flags;
        if (!f.cakeAsked || f.cake) return c.say(t.patIdle);
        if (!await yes(c, t.patQ)) return;
        if (!pay(c.s, CAKE)) await c.say(t.patFree);
        f.cake = true;
        await c.say(t.patGot);
      } },
      S: { tex: 'sister', act: async c => {
        const f = c.s.flags;
        if (f.birthday) return c.say(t.sisDone);
        if (!f.cake) { f.cakeAsked = true; return c.say(t.sis1, t.sis2); }
        f.birthday = true;
        await c.say(t.sisWin1, t.sisWin2, t.sisWin3);
      } },
      J: { tex: 'partner', act: c => c.say(t.partner) },
      a: { tex: 'niece1', small: true, act: c => c.say(c.s.flags.birthday ? t.n1b : t.n1a) },
      b: { tex: 'niece2', small: true, act: c => c.say(c.s.flags.birthday ? t.n2b : t.n2a) },
    },
  },

  camp: {
    name: t.mCamp, floor: 'grass', outdoor: true,
    rows: [
      'TTTTTTTTTTTTTTTT',
      'T......T.......T',
      'T..L.......R...T',
      'T..............T',
      'T....A....T....T',
      'T..........k...T',
      'TTTTTTTTTTTTTTTT',
    ],
    ents: {
      L: { tex: 'leader', act: c => c.say(t.leader1, t.leader2) },
      R: { tex: 'rope', hide: s => !!s.flags.rope, act: async c => {
        c.s.flags.rope = true; c.refresh();
        await c.say(t.rope);
      } },
      k: { tex: 'kid', small: true, act: c => c.say(t.kid) },
      A: { tex: 'tent', act: async c => {
        const f = c.s.flags;
        if (!f.rope) return c.say(t.tentNeed);
        await c.say(t.tentHow);
        if (!await c.simon(4)) return c.say(t.tentFail);
        f.prepared = true;
        await c.say(t.tent1, t.tent2, t.tent3, t.tent4);
        c.go('flat', 8, 2);
      } },
    },
  },
};
