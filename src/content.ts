// Story content: maps, characters, what happens when you bump into them. Text lives in strings.ts.
// No engine imports, so a test can play the whole thing through.
import { type State, type DuelId, pay, ending, ENDINGS } from './logic';
import { TXT as t, type Line, same } from './strings';

export type Ctx = {
  s: State;
  say(...lines: Line[]): Promise<void>;
  choose(prompt: Line, opts: Line[]): Promise<number>;
  go(map: string, x: number, y: number): void;
  days(n?: number): Promise<void>;
  duel(kind: DuelId): Promise<boolean>;    // turn-based conversation (interview, family lunch)
  backdrop(kind: false | 'train' | 'plane'): void; // travel scene behind the dialogue
  refresh(): void;
  // Minigames: each returns whether you made it, unless noted.
  simon(n: number): Promise<boolean>;                 // memorise and repeat n arrows
  dodge(seconds: number): Promise<number>;            // three-lane dodger; returns collisions
  pairs(seconds: number): Promise<boolean>;           // match six pairs of cards
  timing(rounds: number): Promise<boolean>;           // Space while the marker is in the green
  aim(seconds: number): Promise<boolean>;             // keep the crosshair on a moving target
  whack(count: number, tex: 'flame' | 'board'): Promise<boolean>; // press the arrow where something pops up
  collect(n: number, seconds: number): Promise<boolean>; // free movement, gather n things
  balance(seconds: number): Promise<boolean>;         // keep something upright against gusts
  leds(seconds: number): Promise<boolean>;            // lights-out grid
  sort(count: number): Promise<boolean>;              // left = fine, right = suspicious
  glide(seconds: number): Promise<boolean>;           // hold Up to climb, avoid peaks and clouds
  mash(metres: number): Promise<number>;              // alternate Left/Right to run; returns your place (1-4)
  gather(n: number): Promise<boolean>;                // catch the ripe ones falling, avoid the green ones
  tag(n: number, seconds: number): Promise<boolean>;  // you are it: touch n fleeing kids in time
  climb(n: number): Promise<boolean>;                 // press the arrow on each hold, bottom to top
  sneak(seconds: number, theme: 'armrest' | 'baby'): Promise<boolean>; // hold Space to advance, only while unobserved
};
export type Script = (c: Ctx) => Promise<void>;
// `on` is the tile drawn under the entity (doors in walls, things in water); `label` is a sign above it.
export type Ent = { tex: string; act?: Script; hide?: (s: State) => boolean; small?: boolean; on?: string; label?: Line };
// Map chars: '#' brick, '1' stone, '2' glass, '3' cream wall, '=' rails, 'T' tree, '^' rock, '~' water, ',' path, '.' floor.
// Any other char is a key in `ents`. `fog` limits how far you can see. `spawn` is where you arrive.
export type MapDef = {
  name: Line; floor: string; spawn: [number, number]; outdoor?: boolean; swim?: boolean; fog?: 'dark' | 'white';
  rows: string[]; ents: Record<string, Ent>;
};

const yes = async (c: Ctx, q: Line) => (await c.choose(q, [t.yes, t.no])) === 0;
const fill = (l: Line, ...a: (string | number)[]): Line => l.map(s => s.replace(/\{(\d)\}/g, (_, i) => String(a[+i])));
const CAKE = 28, FLIGHT = 1200, CHOCOLATE = 35, COURSE = 300, RACE = 40; // also written into the text in strings.ts
const ticket = (s: State) => (s.flags.halbtax ? 45 : 89);                 // the bank memory earns you the half-fare card
const arrive = (c: Ctx, map: string) => c.go(map, ...MAPS[map].spawn);
const wakeUp = (c: Ctx) => c.go('flat', 8, 2);
const bump = (c: Ctx, key: string) => (c.s.n[key] = (c.s.n[key] ?? 0) + 1);
// A commitment made in conversation: it weighs heavily on the future, and the latest one breaks ties.
const commit = (c: Ctx, flag: string) => { c.s.flags[flag] = true; c.s.n['at_' + flag] = bump(c, 'seq'); };
const T = t as Record<string, Line>;

export const intro: Script = c => c.say(t.intro1, t.intro2, t.intro3);

export const onSwim: Script = async c => {
  c.s.flags.swam = true;
  await c.say(t.swim1, t.swim2);
};

// The box in the flat: memories open in chronological order, each once something in the present calls it up.
// `done` is the flag the memory sets when finished; until `ready`, the box only gives the hint.
const MEMORIES: { map: string; done: string; ready: (s: State) => boolean; hint: Line; open: Line[] }[] = [
  { map: 'camp', done: 'prepared', ready: s => !!s.flags.failedInterview, hint: t.boxClosed, open: [t.boxOpen1, t.boxOpen2] },
  { map: 'svalbard', done: 'svalbard', ready: s => !!s.flags.swam, hint: t.boxSvalHint, open: [t.boxSvalOpen] },
  { map: 'vienna', done: 'vienna', ready: s => !!s.flags.employed, hint: t.boxVieHint, open: [t.boxVieOpen] },
  { map: 'wiener', done: 'wiener', ready: s => s.dist.bike >= 30, hint: t.boxWnHint, open: [t.boxWnOpen] },
  { map: 'munich', done: 'munich', ready: s => !!s.flags.birthday, hint: t.boxMunHint, open: [t.boxMunOpen] },
  { map: 'antarctica', done: 'antarctica', ready: s => s.rentDue > 10, hint: t.boxAntHint, open: [t.boxAntOpen] },
  { map: 'bank', done: 'bank', ready: s => s.money >= 5000, hint: t.boxBkHint, open: [t.boxBkOpen] },
];

export const afterScript: Script = async c => {
  const f = c.s.flags;
  if (f.end || !f.employed || !f.birthday || !f.lunch || MEMORIES.some(m => !f[m.done])) return;
  f.end = true;
  await c.say(t.end1, t.end2);
};

// Animated ride, then a game to make the connection. Missing it costs an extra day.
async function trainRide(c: Ctx, lines: Line[], how: Line, game: () => Promise<boolean>) {
  c.backdrop('train');
  await c.say(...lines, how);
  const missed = !await game();
  await c.say(missed ? t.dodgeMiss : t.dodgeOk);
  c.backdrop(false);
  await c.days(missed ? 2 : 1);
}

export const MAPS: Record<string, MapDef> = {
  flat: {
    name: t.mFlat, floor: 'wood', spawn: [5, 2],
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
        const f = c.s.flags;
        const pick = await c.choose(t.pcMenu, [t.pcJobs, t.pcDating, ...(f.end ? [t.pcDecide] : [])]);
        if (pick === 0) {
          await c.say(t.pc1);
          if (!f.employed) await c.say(t.pc2);
        } else if (pick === 1) {
          if (f.dating) return c.say(t.pcDatingDone);
          if (f.match) return c.say(t.pcMatchWaiting);
          f.match = true; // she now waits by the lake
          await c.say(t.pcMatch1, t.pcMatch2);
        } else {
          const id = ending(c.s);
          f['saw_' + id] = true;
          await c.say(t.decide1, T['endT_' + id], T['endA_' + id], T['endB_' + id],
            fill(t.endSeen, ENDINGS.filter(e => f['saw_' + e]).length, ENDINGS.length));
        }
      } },
      X: { tex: 'box', act: async c => {
        const m = MEMORIES.find(m => !c.s.flags[m.done]);
        if (!m) return c.say(bump(c, 'box') < 3 ? t.boxEmpty : t.boxEmpty2); // keep looking and something odd happens
        if (!m.ready(c.s)) return c.say(m.hint);
        await c.say(...m.open);
        arrive(c, m.map);
      } },
      D: { tex: 'door', on: 'wall', act: async c => arrive(c, 'zurich') },
    },
  },

  // The present. West: the lake. South-west: the mountain. North-east: the job, the station, the airport.
  zurich: {
    name: t.mZurich, floor: 'grass', spawn: [3, 9], outdoor: true, swim: true,
    rows: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T~~~~~~~~..........2222222.........T',
      'T~~~~~~~~.,,,,,,,,.222O222..1111111T',
      'T~~~~~~~~.,......,,,,,,,,,..111A111T',
      'T~~~~~~~~.,..m...,.......,,,,,,,,,.T',
      'T~~~~~~~~R,......,..t..u...........T',
      'T...c....K,......,........11111....T',
      'T.####....,..N...,..b.....11H11....T',
      'T.#F##.r..,......,,,,,,,,,,,,,,....T',
      'T..,,,,,,,,,,,,,,,.........========T',
      'T..,........d....,.................T',
      'T..,..l..........,......e..........T',
      'T^^,^^^^^........,.................T',
      'T^.,.....^.......,,,,,,,,,,,,,,,,,.T',
      'T^.P.....^..............33333......T',
      'T^.......^..............33g33......T',
      'T^^^^^^^^^.........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
    ],
    ents: {
      F: { tex: 'door', on: 'wall', label: t.lblHome, act: async c => c.go('flat', 4, 4) },
      K: { tex: 'swimmer', act: c => c.say(t.swimmer1, t.swimmer2) },
      t: { tex: 'tourist', act: c => c.say(t.zTourist1, t.zTourist2) },
      b: { tex: 'banker', act: c => c.say(t.zBanker) },
      d: { tex: 'dog', act: c => c.say(t.zDog) },
      l: { tex: 'friend', act: async c => {
        const f = c.s.flags;
        if (f.climbed) return c.say(t.zLate3);
        await c.say(f.climbInvite ? t.zLate2 : t.zLate);
        f.climbInvite = true;
      } },
      g: { tex: 'door', on: 'cream', label: same('Boulderhalle'), act: async c => {
        const f = c.s.flags;
        if (!f.climbInvite) return c.say(t.gymIdle);
        if (f.climbed) return c.say(t.gymDone);
        await c.say(t.gym1, t.gymHow);
        if (!await c.climb(10)) return c.say(t.gymFail);
        f.climbed = true;
        await c.say(t.gymWin);
      } },
      // Commitment: science. She wants three stories from the box before she will listen.
      u: { tex: 'prof', act: async c => {
        const f = c.s.flags;
        if (f.phd) return c.say(t.uniDone);
        if (MEMORIES.filter(m => f[m.done]).length < 3) return c.say(t.uni1);
        await c.say(t.uni2);
        const pick = await c.choose(t.uniQ, [t.uniA1, t.uniA2, t.uniA3]);
        await c.say([t.uniR1, t.uniR2, t.uniR3][pick]);
        commit(c, 'phd');
        await c.say(t.uni3);
      } },
      // The date: three questions, one good answer each. Two good answers and there is a second date.
      c: { tex: 'date', hide: s => !s.flags.match || !!s.flags.dating, act: async c => {
        const rounds: [Line, Line[], Line[], number][] = [ // question, answers, reactions, index of the good answer
          [t.dq1, [t.dq1a, t.dq1b, t.dq1c], [t.dr1a, t.dr1b, t.dr1c], 1],
          [t.dq2, [t.dq2a, t.dq2b, t.dq2c], [t.dr2a, t.dr2b, t.dr2c], 0],
          [t.dq3, [t.dq3a, t.dq3b, t.dq3c], [t.dr3a, t.dr3b, t.dr3c], 1],
        ];
        await c.say(t.date1);
        let good = 0;
        for (const [q, answers, reactions, best] of rounds) {
          const pick = await c.choose(q, answers);
          if (pick === best) good++;
          await c.say(reactions[pick]);
        }
        if (good < 2) { c.s.flags.match = false; c.refresh(); return c.say(t.dateLose); }
        commit(c, 'dating'); c.refresh();
        await c.say(t.dateWin1, t.dateWin2);
      } },
      m: { tex: 'musician', act: c => c.say(t.zMusician) },
      r: { tex: 'recycler', act: c => c.say(t.zRecycle) },
      // Side quest across two countries: he wants pão de queijo, your mother supplies it.
      e: { tex: 'expat', act: async c => {
        const f = c.s.flags;
        if (f.startup) return c.say(t.zStartupDone);
        if (f.paoqGiven) {
          await c.say(t.zStartup1);
          if (!await yes(c, t.zStartupQ)) return c.say(t.zExpatDone);
          if (!pay(c.s, 2000)) return c.say(t.zStartupBroke);
          commit(c, 'startup');
          return c.say(t.zStartup2);
        }
        if (!f.paoq) return c.say(t.zExpat1);
        f.paoqGiven = true;
        await c.say(t.zExpat2);
      } },
      N: { tex: 'neighbour', act: async c => {
        const f = c.s.flags;
        if (f.wardrobe) return c.say(t.nbDone);
        await c.say(t.nb1, t.nb2);
        if (!await yes(c, t.nbQ)) return;
        await c.say(t.nbHow);
        if (await c.pairs(60)) {
          f.wardrobe = true; c.s.money += 120;
          await c.say(t.nbWin);
        } else await c.say(t.nbFail);
        await c.days(1);
      } },
      O: { tex: 'door', on: 'glass', label: same('Gletscher Labs'), act: async c => {
        const f = c.s.flags;
        if (f.employed) return c.say(t.offEmployed);
        if (!await yes(c, t.offQ)) return;
        if (await c.duel('interview')) {
          f.employed = true; c.s.money += 3000;
          await c.say(t.offWin1, t.offWin2);
        } else {
          f.failedInterview = true;
          await c.say(t.offLose1, t.offLose2);
        }
        await c.days(1);
      } },
      H: { tex: 'door', on: 'stone', label: same('Zürich HB'), act: async c => {
        const price = ticket(c.s);
        if (c.s.money < price) return c.say(fill(t.hbBroke, price));
        if (!await yes(c, fill(t.hbQ, price))) return;
        pay(c.s, price); bump(c, 'marseille');
        await trainRide(c, [t.hb1, t.hb2], t.dodgeIntro, async () => await c.dodge(12) < 3);
        arrive(c, 'marseille');
      } },
      A: { tex: 'door', on: 'stone', label: same('Flughafen'), act: async c => {
        const f = c.s.flags;
        if (c.s.money < FLIGHT) return c.say(t.apBroke);
        if (!await yes(c, t.apQ)) return;
        pay(c.s, FLIGHT); bump(c, 'brazil');
        if (!f.chocolate && await yes(c, t.apChocQ) && pay(c.s, CHOCOLATE)) f.chocolate = true;
        c.backdrop('plane');
        await c.say(t.apFly1, t.apSneakHow);
        await c.say(await c.sneak(25, 'armrest') ? t.apSneakWin : t.apSneakLose, t.apFly2);
        c.backdrop(false);
        await c.days(2);
        arrive(c, 'brazil');
      } },
      // Paragliding school on the mountain: the course is paid once, retries are free.
      P: { tex: 'instructor', act: async c => {
        const f = c.s.flags;
        if (f.pilot) {
          await c.say(t.pgAgain);
          if (!await c.glide(20)) return c.say(t.pgFail);
          bump(c, 'flights');
          return c.say(t.pgAgainWin);
        }
        await c.say(t.pgInstr);
        if (!f.coursePaid) {
          if (!await yes(c, t.pgQ)) return;
          if (!pay(c.s, COURSE)) return c.say(t.pgBroke);
          f.coursePaid = true;
        }
        await c.say(t.pgHow);
        if (!await c.glide(20)) return c.say(t.pgFail);
        f.pilot = true; bump(c, 'flights');
        await c.say(t.pgWin1, t.pgWin2);
      } },
      R: { tex: 'organiser', act: async c => {
        await c.say(t.runOrg);
        if (!await yes(c, t.runQ)) return;
        if (!pay(c.s, RACE)) return c.say(t.runBroke);
        await c.say(t.runHow);
        const place = await c.mash(100);
        if (place === 1) c.s.flags.medal = true;
        await c.say(place === 1 ? t.runWin : fill(t.runLose, place));
      } },
    },
  },

  // Family. North: station and pâtisserie. Middle: the terrace. South: the old port, and the sea you can swim in.
  marseille: {
    name: t.mMarseille, floor: 'sand', spawn: [4, 3], outdoor: true, swim: true,
    rows: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T.1111......3333.............T',
      'T.11G1......3P33.....p.q.....T',
      'T..,,,,,,,,,,,,,,,,,,,,,.....T',
      'T...,..................,.....T',
      'T...,.....S.J..........,.....T',
      'T...,,,,,..a.b.........,.....T',
      'T......................,..f..T',
      'T.....,,,,,,,,,,,,,,,,,,.....T',
      'T~~~~~~~~~~~~~~~~~~~~~~~~~~~~T',
      'T~~~~~~B~~~~~~~~v~~~~~~v~~~~~T',
      'T~~~~~~~~~~~~~~~~~~~~~~~~~~~~T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
    ],
    ents: {
      G: { tex: 'door', on: 'stone', label: same('Gare St-Charles'), act: async c => {
        const price = ticket(c.s);
        if (!await yes(c, fill(t.gareQ, price))) return;
        if (!pay(c.s, price)) await c.say(t.gareBroke);
        await trainRide(c, [t.gare1], t.dodgeBack, () => c.whack(8, 'board'));
        c.go('zurich', 28, 8);
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
        if (f.birthday) {
          if (f.moveMarseille || !await yes(c, t.maMoveQ)) return c.say(t.sisDone);
          commit(c, 'moveMarseille');
          return c.say(t.maMoveYes);
        }
        if (!f.cake) { f.cakeAsked = true; return c.say(t.sis1, t.sis2); }
        f.birthday = true;
        await c.say(t.sisWin1, t.sisWin2, t.sisWin3);
      } },
      // Fetch quest: ice for the pastis, from the fishmonger at the port.
      J: { tex: 'partner', act: async c => {
        const f = c.s.flags;
        if (f.iceDone) return c.say(t.partner);
        if (!f.ice) { f.iceAsked = true; return c.say(t.maIce1); }
        f.iceDone = true;
        await c.say(t.maIce2);
      } },
      f: { tex: 'fishmonger', act: async c => {
        const f = c.s.flags;
        if (!f.iceAsked || f.ice) return c.say(t.maFish);
        f.ice = true;
        await c.say(t.maFishIce);
      } },
      p: { tex: 'oldman', act: async c => {
        const f = c.s.flags;
        if (f.petanque) return c.say(t.peDone);
        await c.say(t.pe1, t.peHow);
        if (!await c.timing(3)) return c.say(t.peFail);
        f.petanque = true;
        await c.say(t.peWin);
      } },
      q: { tex: 'oldman2', act: c => c.say(t.peOther) },
      // The nieces' ball is in the harbour: swim out for it.
      a: { tex: 'niece1', small: true, act: async c => {
        const f = c.s.flags;
        if (!f.ballAsked) { f.ballAsked = true; return c.say(t.maBall1); }
        if (f.ball && !f.ballDone) { f.ballDone = true; return c.say(t.maBall2); }
        await c.say(f.birthday ? t.n1b : t.n1a);
      } },
      b: { tex: 'niece2', small: true, act: c => c.say(c.s.flags.birthday ? t.n2b : t.n2a) },
      B: { tex: 'ball', on: 'water', hide: s => !!s.flags.ball, act: async c => {
        if (!c.s.flags.ballAsked) return c.say(t.maBallSee);
        c.s.flags.ball = true; c.refresh();
        await c.say(t.maBallGet);
      } },
      v: { tex: 'boat', on: 'water', act: c => c.say(t.maBoat) },
    },
  },

  // Home. North-west: parents' house, grandma on the veranda, the Sunday lunch.
  // South-west: the cemetery where your father works, with the mango tree. East: the friends' birthday party.
  // Chain: father's mangoes -> grandma's sweet -> you may enter the party.
  brazil: {
    name: t.mBrazil, floor: 'grass', spawn: [3, 3], outdoor: true,
    rows: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T.111.........######.....T.............T',
      'T.1X1.........######.....T..oo...E.....T',
      'T..,..........##V.##.....T...h..i......T',
      'T..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.....T',
      'T.........M...,..........T..k....n.....T',
      'T.....g.......,...U......T....j....w...T',
      'T..........A..,..........T.k.....ZZ....T',
      'T.....C.......,..........T......n......T',
      'T............s,..........T.............T',
      'T.111111111111,1111111111T.............T',
      'T.1...+...+...,.+...+..1.T.............T',
      'T.1...........,....D.Y.1.T.............T',
      'T.1...+...+...,.+......1.T.............T',
      'T.1111111111111111111111.T.............T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
    ],
    ents: {
      s: { tex: 'sign', label: t.lblCemetery, act: c => c.say(t.brCemSign) },
      '+': { tex: 'tomb', act: c => c.say(t.brTomb) },
      X: { tex: 'door', on: 'stone', label: t.lblAirport, act: async c => {
        if (!await yes(c, t.brAirQ)) return;
        await c.say(t.brAir1);
        c.backdrop('plane');
        await c.say(t.brFly, t.brSneakHow);
        await c.say(await c.sneak(25, 'baby') ? t.brSneakWin : t.brSneakLose);
        c.backdrop(false);
        await c.days(2);
        c.go('zurich', 31, 4);
      } },
      M: { tex: 'mom', act: async c => {
        const f = c.s.flags;
        if (!f.lunch) return c.say(t.brMom1);
        if (f.paoq) {
          if (f.moveBrazil) return c.say(t.brMomDone);
          if (!await yes(c, t.brMoveQ)) return c.say(t.brMoveNo);
          commit(c, 'moveBrazil');
          return c.say(t.brMoveYes);
        }
        f.paoq = true;
        await c.say(t.brMom2);
      } },
      D: { tex: 'dad', act: async c => {
        const f = c.s.flags;
        if (f.mangoes) return c.say(t.brDadDone);
        await c.say(t.brDad1);
        if (!await c.gather(8)) return c.say(t.brDadFail);
        f.mangoes = true;
        await c.say(t.brDadWin);
      } },
      V: { tex: 'grandma', act: async c => {
        const f = c.s.flags;
        if (f.sweet) return c.say(t.brGranDone);
        if (!f.mangoes) return c.say(t.brGran1);
        f.sweet = true;
        await c.say(t.brGran2, t.brGran3);
      } },
      // The Sunday lunch interrogation: you get through it either way, but Swiss chocolate wins it.
      A: { tex: 'aunt', act: async c => {
        const f = c.s.flags;
        if (f.lunch) return c.say(t.brAuntDone);
        await c.say(t.brAunt1);
        const won = await c.duel('lunch');
        f.lunch = true;
        await c.say(...(won ? [t.brAuntWin1, t.brAuntWin2] : [t.brAuntLose]));
      } },
      U: { tex: 'uncle', act: c => c.say(t.brUncle) },
      C: { tex: 'cousin', act: c => c.say(t.brCousin) },
      g: { tex: 'caramelo', act: c => c.say(t.brDog) },
      Y: { tex: 'mangotree' },

      // The party: the host lets you in with grandma's sweet, then the kids expect a game of tag.
      h: { tex: 'host', act: async c => {
        const f = c.s.flags;
        if (f.parabens) return c.say(t.brHostDone);
        if (!f.sweet) return c.say(t.brPartyEmpty);
        await c.say(f.partyIn ? t.brTagAgain : t.brPartyIn, t.brTagHow);
        f.partyIn = true;
        if (!await c.tag(8, 30)) return c.say(t.brTagFail);
        f.parabens = true;
        await c.say(t.brTagWin, t.brParabens);
      } },
      i: { tex: 'friend2', act: c => c.say(t.brFriend1) },
      j: { tex: 'friend3', act: c => c.say(t.brFriend2) },
      w: { tex: 'friend4', act: c => c.say(t.brFriend3) },
      k: { tex: 'kid2', small: true, act: c => c.say(t.brKid1) },
      n: { tex: 'kid3', small: true, act: c => c.say(t.brKid2) },
      E: { tex: 'caketable', act: c => c.say(c.s.flags.parabens ? t.brTableYes : t.brTableNo) },
      o: { tex: 'balloon' },
      Z: { tex: 'castle' },
    },
  },

  // ---- Memories ----

  camp: {
    name: t.mCamp, floor: 'grass', spawn: [2, 4], outdoor: true,
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
        wakeUp(c);
      } },
    },
  },

  // Polar night: find the bear guard, then fly the robot around collecting samples. Reward: swim at full speed.
  svalbard: {
    name: t.mSvalbard, floor: 'snow', spawn: [2, 4], outdoor: true, fog: 'dark',
    rows: [
      '^^^^^^^^^^^^^^^^^^',
      '^.111.........^..^',
      '^.111...........B^',
      '^..P...G.........^',
      '^................^',
      '^...^............^',
      '^............H...^',
      '^^^^^^^^^^^^^^^^^^',
    ],
    ents: {
      P: { tex: 'prof', act: c => c.say(t.svProf1, t.svProf2) },
      G: { tex: 'guard', act: async c => { c.s.flags.guard = true; await c.say(t.svGuard); } },
      B: { tex: 'bear', act: c => c.say(t.svBear) },
      H: { tex: 'hole', act: async c => {
        if (!c.s.flags.guard) return c.say(t.svNoGuard);
        await c.say(t.svHole);
        if (!await c.collect(6, 25)) return c.say(t.svFail);
        c.s.flags.svalbard = true;
        await c.say(t.sv1, t.sv2, t.sv3);
        wakeUp(c);
      } },
    },
  },

  // First job: get a coffee out of a Viennese waiter, then hit the timing window three times. Reward: slower crowds.
  vienna: {
    name: t.mVienna, floor: 'path', spawn: [2, 4], outdoor: true,
    rows: [
      'TTTTTTTTTTTTTTTTTT',
      'T.2222......3333.T',
      'T.2K22......3W33.T',
      'T....B..c........T',
      'T................T',
      'T================T',
      'TTTTTTTTTTTTTTTTTT',
    ],
    ents: {
      B: { tex: 'boss', act: c => c.say(t.viBoss1, t.viBoss2) },
      c: { tex: 'colleague', act: c => c.say(t.viCol) },
      W: { tex: 'door', on: 'cream', label: same('Kaffeehaus'), act: async c => {
        const f = c.s.flags;
        if (f.coffee) return c.say(t.viWaiterDone);
        if (!f.waiter1) { f.waiter1 = true; return c.say(t.viWaiter1); }
        if (!f.waiter2) { f.waiter2 = true; return c.say(t.viWaiter2); }
        f.coffee = true;
        await c.say(t.viWaiter3);
      } },
      K: { tex: 'door', on: 'glass', label: same('TickTock Tech'), act: async c => {
        if (!c.s.flags.coffee) return c.say(t.viNoCoffee);
        await c.say(t.viTermHow);
        if (!await c.timing(3)) return c.say(t.viFail);
        c.s.flags.vienna = true;
        await c.say(t.vi1, t.vi2, t.vi3);
        wakeUp(c);
      } },
    },
  },

  // Headlight factory: a bureaucratic loop for the key, then a lights-out puzzle. Reward: a faster bike.
  wiener: {
    name: t.mWiener, floor: 'path', spawn: [2, 4], outdoor: true,
    rows: [
      'TTTTTTTTTTTTTTTTTTTTTT',
      'T.222222......1111...T',
      'T.22K222......11h1...T',
      'T....B...............T',
      'T..,,,,,,,,,,,,,,,,..T',
      'T........c.....p.....T',
      'T====================T',
      'TTTTTTTTTTTTTTTTTTTTTT',
    ],
    ents: {
      B: { tex: 'boss', act: c => c.say(t.wnBoss) },
      c: { tex: 'colleague', act: c => c.say(t.wnCol) },
      p: { tex: 'porter', act: async c => {
        const f = c.s.flags;
        if (f.wnKey) return c.say(t.wnPorterDone);
        if (!f.wnHr1) { f.wnA38 = true; return c.say(t.wnPorter1); }
        f.wnA39 = true;
        await c.say(t.wnPorter2);
      } },
      h: { tex: 'door', on: 'stone', label: same('HR'), act: async c => {
        const f = c.s.flags;
        if (f.wnKey || !f.wnA38) return c.say(t.wnHrDone);
        if (!f.wnA39) { f.wnHr1 = true; return c.say(t.wnHr1); }
        f.wnKey = true;
        await c.say(t.wnHr2);
      } },
      K: { tex: 'door', on: 'glass', label: same('Lumen Werke'), act: async c => {
        if (!c.s.flags.wnKey) return c.say(t.wnNoKey);
        await c.say(t.wnHow);
        if (!await c.leds(60)) return c.say(t.wnFail);
        c.s.flags.wiener = true;
        await c.say(t.wn1, t.wn2, t.wn3);
        wakeUp(c);
      } },
    },
  },

  // Night shift: point the dish at the satellite, then the pager goes off and you put out a fire. Reward: one extra mistake.
  munich: {
    name: t.mMunich, floor: 'grass', spawn: [2, 3], outdoor: true,
    rows: [
      'TTTTTTTTTTTTTTTTTT',
      'T.1111...........T',
      'T.1C11.....b.....T',
      'T..,,,,,,,,,,,,..T',
      'T....o...........T',
      'TTTTTTTTTTTTTTTTTT',
    ],
    ents: {
      o: { tex: 'colleague', act: c => c.say(t.muCol) },
      b: { tex: 'bavarian', act: c => c.say(t.muBav) },
      C: { tex: 'door', on: 'stone', label: same('Sat Control'), act: async c => {
        await c.say(t.muOps1, t.muOps2);
        if (!await c.aim(20)) return c.say(t.muFail);
        await c.say(t.mu1, t.mu2);
        await c.say(await c.whack(10, 'flame') ? t.muOnTime : t.muLate);
        c.s.flags.munich = true;
        await c.say(t.mu3, t.mu4, t.mu5);
        wakeUp(c);
      } },
    },
  },

  // Whiteout: follow the flags to the mast, hold it in the wind, then know what cold does to batteries.
  antarctica: {
    name: t.mAntarctica, floor: 'snow', spawn: [2, 3], outdoor: true, fog: 'white',
    rows: [
      '^^^^^^^^^^^^^^^^^^^^',
      '^.##...............^',
      '^.##.L.f...........^',
      '^..................^',
      '^.........f........^',
      '^....p.............^',
      '^............f.....^',
      '^..................^',
      '^..............f.M.^',
      '^^^^^^^^^^^^^^^^^^^^',
    ],
    ents: {
      L: { tex: 'chief', act: c => c.say(t.anBoss1, t.anBoss2) },
      p: { tex: 'penguin', act: c => c.say(t.anPenguin) },
      f: { tex: 'flag', act: c => c.say(t.anFlag) },
      M: { tex: 'mast', act: async c => {
        await c.say(t.anMastHow);
        if (!await c.balance(12)) return c.say(t.anMastFall);
        const pick = await c.choose(t.anMastQ, [t.anOptA, t.anOptB, t.anOptC]);
        if (pick !== 1) return c.say(pick === 0 ? t.anWrongA : t.anWrongC);
        c.s.flags.antarctica = true;
        await c.say(t.an1, t.an2, t.an3);
        wakeUp(c);
      } },
    },
  },

  // Arriving in Zurich in 2020: laptop from IT, a flat (via the district office), then compliance screening.
  // Reward: the half-fare card.
  bank: {
    name: t.mBank, floor: 'path', spawn: [2, 4], outdoor: true,
    rows: [
      'TTTTTTTTTTTTTTTTTTTTTTTT',
      'T.2222222.....1111.....T',
      'T.222C222.....1W11.....T',
      'T.I....................T',
      'T..,,,,,,,,,,,,,,,,,,..T',
      'T..................###.T',
      'T.............qqqqG###.T',
      'T......................T',
      'TTTTTTTTTTTTTTTTTTTTTTTT',
    ],
    ents: {
      I: { tex: 'itguy', act: async c => {
        if (c.s.flags.laptop) return c.say(t.bkItDone);
        c.s.flags.laptop = true;
        await c.say(t.bkIt1);
      } },
      q: { tex: 'tourist', act: c => c.say(t.bkQueue) },
      G: { tex: 'agent', act: async c => {
        const f = c.s.flags;
        if (f.flat) return c.say(t.bkAgentDone);
        if (!f.extract) { f.bkAsked = true; return c.say(t.bkAgent1); }
        f.flat = true;
        await c.say(t.bkAgent2);
      } },
      W: { tex: 'door', on: 'stone', label: same('Kreisbüro'), act: async c => {
        const f = c.s.flags;
        if (f.extract) return c.say(t.bkOfficeDone);
        if (!f.bkAsked) return c.say(t.bkOfficeIdle);
        if (!f.queue1) { f.queue1 = true; return c.say(t.bkOffice1); }
        if (!f.queue2) { f.queue2 = true; return c.say(t.bkOffice2); }
        f.extract = true;
        await c.say(t.bkOffice3);
      } },
      C: { tex: 'door', on: 'glass', label: same('Three Keys Bank'), act: async c => {
        const f = c.s.flags;
        if (!f.laptop) return c.say(t.bkNoLaptop);
        if (!f.flat) return c.say(t.bkNoFlat);
        await c.say(t.bkHow);
        if (!await c.sort(8)) return c.say(t.bkFail);
        f.bank = f.halbtax = true;
        await c.say(t.bk1, t.bk2, t.bk3);
        wakeUp(c);
      } },
    },
  },
};
