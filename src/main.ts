// Rendering and input. Rules live in logic.ts, story in content.ts, text in strings.ts.
import * as Phaser from 'phaser';
import { type State, newState, passDays, newFight, fightTurn, MOVES, MAX_CONF, type MoveId } from './logic';
import { MAPS, intro, afterScript, onSwim, type Ctx, type Ent, type Script } from './content';
import { TXT, LANGS, type Line } from './strings';
import * as music from './music';

const T = 48, W = 720, H = 480, SAVE = 'life-game-save';
const TILE: Record<string, string> = { '#': 'wall', '~': 'water', ',': 'path', '1': 'stone', '2': 'glass', '3': 'cream', '=': 'track', '^': 'rock' };
const SOLID = '#T123=^';

// Art is authored on a 16x16 grid and drawn at 3x into 48px textures; DETAIL adds fine 48px touches.
type Rect = [color: string, x: number, y: number, w: number, h: number];
type Ctx2 = CanvasRenderingContext2D;

const NAVY = '#1b2a4a';
const person = (shirt: string, hair: string, skin = '#e8b88a'): Rect[] => [
  [hair, 5, 1, 6, 3], [skin, 5, 3, 6, 4], ['#222', 6, 5, 1, 1], ['#222', 9, 5, 1, 1],
  [shirt, 4, 7, 8, 5], [skin, 3, 8, 1, 3], [skin, 12, 8, 1, 3], ['#2b2b3a', 5, 12, 2, 4], ['#2b2b3a', 9, 12, 2, 4],
];
const bricks = (base: string, line: string): Rect[] =>
  [[base, 0, 0, 16, 16], [line, 0, 7, 16, 1], [line, 0, 15, 16, 1], [line, 7, 0, 1, 7], [line, 3, 8, 1, 7], [line, 12, 8, 1, 7]];

const ART: Record<string, Rect[]> = {
  grass: [['#5a9e4b', 0, 0, 16, 16], ['#4c8a3f', 3, 4, 2, 1], ['#4c8a3f', 11, 9, 2, 1], ['#6bb35a', 7, 13, 2, 1]],
  sand: [['#e6d5a8', 0, 0, 16, 16], ['#d4c190', 4, 5, 2, 1], ['#d4c190', 10, 11, 2, 1]],
  path: [['#cdbb8c', 0, 0, 16, 16], ['#b8a676', 4, 5, 2, 2], ['#b8a676', 11, 11, 2, 2]],
  wood: [['#b98d5a', 0, 0, 16, 16], ['#9c7446', 0, 7, 16, 1], ['#9c7446', 0, 15, 16, 1], ['#9c7446', 5, 0, 1, 7], ['#9c7446', 11, 8, 1, 7]],
  wall: bricks('#8a5a44', '#6e4635'),
  stone: bricks('#a3a9b1', '#7d838c'),
  glass: [['#3d5a80', 0, 0, 16, 16], ['#9fd3f0', 1, 1, 6, 6], ['#9fd3f0', 9, 1, 6, 6], ['#9fd3f0', 1, 9, 6, 6], ['#9fd3f0', 9, 9, 6, 6]],
  cream: [['#ead9b8', 0, 0, 16, 16], ['#c9b48a', 0, 15, 16, 1], ['#e2574c', 0, 0, 16, 3], ['#fff', 4, 0, 4, 3], ['#fff', 12, 0, 4, 3], ['#7fb2ee', 5, 6, 6, 6]],
  track: [['#8a7a66', 0, 0, 16, 16], ['#5d4d3c', 2, 0, 2, 16], ['#5d4d3c', 10, 0, 2, 16], ['#3a3a40', 0, 4, 16, 2], ['#3a3a40', 0, 10, 16, 2]],
  water: [['#3f7fd0', 0, 0, 16, 16], ['#7fb2ee', 2, 4, 5, 1], ['#7fb2ee', 9, 10, 5, 1]],
  tree: [['#6b4a2b', 7, 10, 2, 6], ['#2f6b35', 3, 2, 10, 9], ['#3d8444', 5, 1, 6, 4]],
  door: [['#3d2616', 3, 2, 10, 14], ['#7a5233', 4, 3, 8, 13], ['#f2c94c', 10, 9, 1, 2]],
  box: [['#b5895a', 2, 5, 12, 10], ['#8f6a40', 2, 5, 12, 2], ['#e8d9b0', 7, 5, 2, 10]],
  bed: [['#f2f2f2', 2, 1, 12, 5], ['#3b6fb5', 2, 6, 12, 9]],
  pc: [['#6b4a2b', 1, 9, 14, 5], ['#333', 4, 2, 8, 7], ['#7fd0ff', 5, 3, 6, 5]],
  tent: [['#2e7d5b', 7, 2, 2, 2], ['#2e7d5b', 5, 4, 6, 3], ['#2e7d5b', 3, 7, 10, 3], ['#2e7d5b', 1, 10, 14, 5], ['#1c3d30', 7, 9, 2, 6]],
  rope: [['#c9a66b', 4, 6, 8, 7], ['#8f6a40', 6, 8, 4, 3]],
  case: [['#444', 6, 2, 4, 1], ['#444', 6, 2, 1, 3], ['#444', 9, 2, 1, 3], ['#b0522d', 2, 5, 12, 10], ['#7a3418', 2, 9, 12, 1], ['#f2c94c', 7, 8, 2, 3]],
  me: person(NAVY, '#3a2a1a'),
  me_swim: [['#3a2a1a', 5, 5, 6, 3], ['#e8b88a', 5, 7, 6, 4], ['#222', 6, 9, 1, 1], ['#222', 9, 9, 1, 1], ['#e8b88a', 1, 10, 3, 1], ['#e8b88a', 12, 10, 3, 1], ['#cfe6ff', 2, 12, 12, 1], ['#cfe6ff', 4, 14, 8, 1]],
  me_bike: [['#3a2a1a', 4, 0, 6, 2], ['#e8b88a', 4, 2, 6, 4], ['#222', 8, 3, 1, 1], [NAVY, 4, 6, 6, 3], ['#e8b88a', 9, 7, 3, 1]],
  sister: person('#c0396b', '#3a2a1a'),
  partner: person('#3f8f5f', '#555'),
  niece1: person('#f2c94c', '#5a3a1a'),
  niece2: person('#f28b4c', '#3a2a1a'),
  neighbour: person('#7a6a9a', '#ddd'),
  swimmer: person('#e8b88a', '#c9a23a'),
  interviewer: person('#22252e', '#777'),
  tourist: person('#e2574c', '#d9a441'),
  snow: [['#eef3f8', 0, 0, 16, 16], ['#d5dee8', 3, 5, 2, 1], ['#d5dee8', 10, 11, 3, 1]],
  rock: [['#eef3f8', 0, 0, 16, 16], ['#8fa3b8', 2, 6, 12, 10], ['#b9c8d8', 4, 3, 8, 5], ['#fff', 6, 2, 4, 2]],
  hole: [['#b9c8d8', 2, 4, 12, 9], ['#2a5f93', 3, 5, 10, 7], ['#16406b', 5, 7, 6, 3]],
  bear: [['#f7f1dc', 2, 6, 12, 7], ['#f7f1dc', 10, 3, 5, 5], ['#222', 13, 5, 1, 1], ['#222', 14, 7, 1, 1], ['#f7f1dc', 3, 13, 2, 2], ['#f7f1dc', 10, 13, 2, 2]],
  penguin: [['#222', 5, 2, 6, 12], ['#fff', 6, 6, 4, 7], ['#fff', 6, 3, 1, 1], ['#fff', 9, 3, 1, 1], ['#f2a01e', 7, 5, 2, 1], ['#f2a01e', 5, 14, 2, 1], ['#f2a01e', 9, 14, 2, 1]],
  flag: [['#555', 7, 3, 1, 13], ['#e2372c', 8, 3, 6, 4]],
  mast: [['#777', 7, 0, 2, 16], ['#777', 3, 4, 10, 1], ['#e2372c', 3, 2, 2, 2], ['#333', 11, 2, 3, 3]],
  rov: [['#f2c94c', 2, 5, 12, 7], ['#333', 11, 7, 3, 3], ['#7fd0ff', 12, 8, 1, 1], ['#333', 0, 7, 2, 3], ['#888', 4, 12, 8, 1]],
  jelly: [['#e79ad6', 4, 3, 8, 5], ['#e79ad6', 5, 8, 1, 5], ['#e79ad6', 8, 8, 1, 6], ['#e79ad6', 10, 8, 1, 4]],
  angel: [['#fff', 6, 2, 4, 3], ['#ffd9e8', 5, 5, 6, 7], ['#fff', 2, 5, 3, 3], ['#fff', 11, 5, 3, 3], ['#ff8fab', 7, 7, 2, 3], ['#ffd9e8', 6, 12, 4, 2]],
  flame: [['#e2372c', 4, 6, 8, 9], ['#e2372c', 6, 2, 3, 5], ['#f28b2c', 5, 8, 6, 7], ['#f2c94c', 6, 10, 4, 5], ['#fff3b0', 7, 12, 2, 3]],
  sat: [['#3f6fd0', 0, 6, 5, 4], ['#3f6fd0', 11, 6, 5, 4], ['#9fd3f0', 1, 7, 3, 2], ['#9fd3f0', 12, 7, 3, 2], ['#c9ced6', 5, 5, 6, 6], ['#f2c94c', 7, 3, 2, 2], ['#8a8f98', 7, 11, 2, 2]],
  board: [['#1c1e21', 1, 3, 14, 10], ['#f2c94c', 2, 4, 12, 3], ['#1c1e21', 4, 5, 2, 1], ['#1c1e21', 8, 5, 4, 1], ['#59606b', 2, 8, 12, 1], ['#59606b', 2, 10, 8, 1]],
  prof: person('#4a6fa5', '#bbb'),
  guard: person('#d9822b', '#333'),
  boss: person('#555b6e', '#6b4a2b'),
  colleague: person('#7a9a5a', '#222'),
  bavarian: person('#2e6b3a', '#a57a3a'),
  chief: person('#e2572c', '#444'),
  leader: person('#b5a36a', '#222', '#b98a5e'),
  kid: person('#b5a36a', '#3a2a1a', '#c99a6e'),
};

const DETAIL: Record<string, (x: Ctx2) => void> = {
  // The Berkelium shirt: gold frame and "Bk" on navy.
  me(x) {
    x.strokeStyle = x.fillStyle = '#f2b01e';
    x.lineWidth = 1; x.strokeRect(14.5, 22.5, 19, 12);
    x.font = 'bold 10px Arial'; x.textAlign = 'center'; x.fillText('Bk', 24, 32);
  },
  me_bike(x) {
    x.lineCap = x.lineJoin = 'round';
    for (const cx of [10, 38]) {
      x.strokeStyle = '#1a1a1a'; x.lineWidth = 3; x.beginPath(); x.arc(cx, 38, 8, 0, 7); x.stroke();
      x.strokeStyle = '#999'; x.lineWidth = 1; x.beginPath();
      x.moveTo(cx - 6, 38); x.lineTo(cx + 6, 38); x.moveTo(cx, 32); x.lineTo(cx, 44); x.stroke();
    }
    x.strokeStyle = '#e03a2f'; x.lineWidth = 3; x.beginPath(); // frame
    x.moveTo(10, 38); x.lineTo(19, 27); x.lineTo(32, 27); x.lineTo(24, 38); x.lineTo(10, 38);
    x.moveTo(19, 27); x.lineTo(24, 38); x.moveTo(32, 27); x.lineTo(38, 38); x.moveTo(32, 27); x.lineTo(33, 22); x.stroke();
    x.strokeStyle = '#222'; x.beginPath(); x.moveTo(30, 22); x.lineTo(37, 22); x.moveTo(15, 26); x.lineTo(22, 26); x.stroke(); // bars, saddle
    x.strokeStyle = '#2b2b3a'; x.lineWidth = 4; x.beginPath(); x.moveTo(19, 25); x.lineTo(26, 31); x.lineTo(24, 38); x.stroke(); // leg
    x.fillStyle = '#f2b01e'; x.fillRect(15, 20, 8, 5); // the logo, from the side
  },
};

function drawTrain(x: Ctx2) {
  x.fillStyle = '#555'; x.fillRect(0, 6, 240, 5);
  x.fillStyle = '#d62b2b'; x.fillRect(0, 10, 240, 44);
  x.fillStyle = '#fff'; x.fillRect(0, 36, 240, 5);
  x.fillStyle = '#bfe6ff'; for (let i = 0; i < 8; i++) x.fillRect(12 + i * 27, 16, 19, 15);
  x.fillStyle = '#1d2733'; x.fillRect(222, 14, 18, 20); // windscreen
  x.fillStyle = '#333'; x.fillRect(6, 54, 228, 6);
  x.fillStyle = '#1a1a1a'; for (const cx of [30, 60, 180, 210]) { x.beginPath(); x.arc(cx, 62, 7, 0, 7); x.fill(); }
}

// Activity tracker: 10 tiles = 1 km; PACE is nominal seconds per tile, so times and speeds look human.
type Mode = 'walk' | 'bike' | 'swim';
const PACE: Record<Mode, number> = { walk: 72, bike: 16, swim: 144 };
const TOTALS = document.getElementById('totals')!, CARD = document.getElementById('card')!; // side column, outside the game picture

type Obj = Phaser.GameObjects.GameObject & { x: number; y: number };
const FONT = { fontFamily: 'monospace', color: '#fff' };

class World extends Phaser.Scene implements Ctx {
  s!: State;
  layer!: Phaser.GameObjects.Container;
  me!: Phaser.GameObjects.Image;
  ents = new Map<string, Ent>();
  busy = true; moving = false; needRelease = false;
  onKey: ((code: string) => void) | null = null;
  redraw: (() => void) | null = null; // repaints the open dialogue, so L can switch language mid-sentence
  keys!: Phaser.Types.Input.Keyboard.CursorKeys;
  box!: Phaser.GameObjects.Rectangle;
  txt!: Phaser.GameObjects.Text;
  hudTxt!: Phaser.GameObjects.Text;
  fog!: Phaser.GameObjects.Image;
  cardTimer: ReturnType<typeof setTimeout> | undefined;
  seg = { mode: 'walk' as Mode, pts: [] as number[][] }; // the activity in progress and its route
  bigTxt!: Phaser.GameObjects.Text; // large glyphs inside the dialogue box (puzzle arrows)
  fightUi: any[] = [];
  scenery: Obj[] = []; hills: Obj[] = [];

  // Pin an object to the screen (not the world) at a given depth.
  ui<G>(o: G, depth: number): G { (o as any).setScrollFactor(0).setDepth(depth); return o; }
  tr(line: Line, ...args: (string | number)[]) {
    return line[this.s.lang ?? 0].replace(/\{(\d)\}/g, (_, i) => String(args[+i]));
  }
  wait(ms: number) { return new Promise<void>(done => this.time.delayedCall(ms, () => done())); }

  create() {
    for (const [key, rects] of Object.entries(ART)) {
      const tex = this.textures.createCanvas(key, 48, 48)!, x = tex.context;
      for (const [c, rx, ry, w, h] of rects) { x.fillStyle = c; x.fillRect(rx * 3, ry * 3, w * 3, h * 3); }
      DETAIL[key]?.(x);
      tex.refresh();
      tex.setFilter(Phaser.Textures.FilterMode.NEAREST); // crisp pixels for art only; text stays smooth
    }
    const train = this.textures.createCanvas('train', 240, 72)!;
    drawTrain(train.context); train.refresh();
    // Fog: a clear circle around the player fading to solid colour (polar night, whiteout).
    for (const [key, rgb] of [['fog_dark', '6,9,22'], ['fog_white', '244,247,250']]) {
      const fog = this.textures.createCanvas(key, W, H)!, g = fog.context.createRadialGradient(W / 2, H / 2, 70, W / 2, H / 2, 210);
      g.addColorStop(0, `rgba(${rgb},0)`); g.addColorStop(1, `rgba(${rgb},0.97)`);
      fog.context.fillStyle = g; fog.context.fillRect(0, 0, W, H); fog.refresh();
    }
    this.fog = this.ui(this.add.image(W / 2, H / 2, 'fog_dark'), 20).setVisible(false);

    this.keys = this.input.keyboard!.createCursorKeys();
    this.input.keyboard!.on('keydown', (e: KeyboardEvent) => {
      music.unlock();
      if (e.code === 'KeyM') music.toggleMute();
      if (e.code === 'KeyL') this.setLang((this.s.lang + 1) % LANGS.length);
      this.onKey?.(e.code);
    });

    this.layer = this.add.container();
    this.me = this.add.image(0, 0, 'me').setOrigin(0).setDepth(10);
    this.cameras.main.startFollow(this.me, true, 1, 1, -T / 2, -T / 2);

    this.fightUi = [
      this.ui(this.add.rectangle(W / 2, H / 2, W, H, 0x2b3a55), 50),
      this.ui(this.add.text(W / 2, 40, '', { ...FONT, fontSize: '26px' }).setOrigin(0.5), 51),
      this.ui(this.add.image(150, 130, 'me').setOrigin(0).setScale(10 / 3), 51),
      this.ui(this.add.image(410, 90, 'interviewer').setOrigin(0).setScale(10 / 3).setFlipX(true), 51),
    ];
    this.fightUi.forEach(o => o.setVisible(false));
    this.box = this.ui(this.add.rectangle(W / 2, H - 76, W - 20, 136, 0x101820, 0.95).setStrokeStyle(3, 0xffffff), 100).setVisible(false);
    this.txt = this.ui(this.add.text(26, H - 134, '', { ...FONT, fontSize: '17px', lineSpacing: 5, wordWrap: { width: W - 52 } }), 101);
    this.bigTxt = this.ui(this.add.text(W / 2, H - 62, '', { ...FONT, fontSize: '44px', color: '#f2c94c' }).setOrigin(0.5), 101);
    this.hudTxt = this.ui(this.add.text(8, 6, '', { ...FONT, fontSize: '15px', backgroundColor: '#101820', padding: { x: 6, y: 3 } }), 101);

    let saved: State | null = null;
    try { saved = JSON.parse(localStorage.getItem(SAVE) ?? 'null'); } catch { /* no usable save: start fresh */ }
    const hadSave = !!saved && !!MAPS[saved.map];
    // Until the player picks, speak the browser's language if it is one of ours.
    const guess = Math.max(0, ['en', 'fr', 'pt', 'de'].indexOf(navigator.language.slice(0, 2)));
    this.s = hadSave ? { ...newState(guess), ...saved! } : newState(guess); // newState fills fields older saves lack
    this.go(this.s.map, this.s.x, this.s.y);
    this.run(async c => {
      if (hadSave && await c.choose(TXT.welcomeBack, [TXT.cont, TXT.newGame]) === 0) return;
      this.s = newState(this.s.lang);
      this.go(this.s.map, this.s.x, this.s.y);
      this.setLang(await this.choose(TXT.langPrompt, LANGS, this.s.lang));
      await intro(c);
    });
  }

  setLang(lang: number) {
    this.s.lang = lang;
    this.build(); // signs and HUD
    this.fightUi[1].setText(this.tr(TXT.fightTitle));
    this.redraw?.();
  }

  build() {
    const m = MAPS[this.s.map];
    this.layer.removeAll(true);
    this.ents.clear();
    const put = (key: string, x: number, y: number, small = false) =>
      this.layer.add(this.add.image(x * T + (small ? 8 : 0), y * T + (small ? 16 : 0), key).setOrigin(0).setScale(small ? 2 / 3 : 1));
    m.rows.forEach((row, y) => [...row].forEach((ch, x) => {
      const ent = m.ents[ch];
      put(ent?.on ?? TILE[ch] ?? m.floor, x, y);
      if (ch === 'T') put('tree', x, y);
      if (!ent || ent.hide?.(this.s)) return;
      put(ent.tex, x, y, ent.small);
      if (ent.label) this.layer.add(this.add.text(x * T + T / 2, y * T - 6, this.tr(ent.label),
        { ...FONT, fontSize: '13px', fontStyle: 'bold', backgroundColor: '#101820', padding: { x: 5, y: 2 } }).setOrigin(0.5, 1));
      this.ents.set(`${x},${y}`, ent);
    }));
    this.fog.setVisible(!!m.fog);
    if (m.fog) this.fog.setTexture('fog_' + m.fog);
    if (!this.moving) this.me.setPosition(this.s.x * T, this.s.y * T).setTexture(m.rows[this.s.y][this.s.x] === '~' ? 'me_swim' : 'me');
    this.hud();
  }

  hud() {
    const { day, money, rentDue, map } = this.s;
    this.hudTxt.setText(this.tr(TXT.hud, this.tr(MAPS[map].name), day, money, rentDue - day));
    const d = this.s.dist;
    const rows: [Line, number][] = [[TXT.actWalk, d.walk], [TXT.actRide, d.bike], [TXT.actSwim, d.swim]];
    TOTALS.innerHTML = rows.map(([l, n]) => `<div><span>${this.tr(l)}</span><b>${(n / 10).toFixed(1)} km</b></div>`).join('');
  }

  // Count the step from (fx,fy) to (x,y). When the kind of movement changes, the finished stretch is saved as an activity.
  track(mode: Mode, x: number, y: number, fx: number, fy: number) {
    if (mode !== this.seg.mode) {
      if (this.seg.pts.length > 5) this.card(this.seg.mode, this.seg.pts);
      this.seg = { mode, pts: [[fx, fy]] };
    }
    this.seg.pts.push([x, y]);
    this.s.dist[mode]++;
    this.hud();
  }

  // Activity card in the side column, styled like a fitness feed: who, what, three stats, the route, kudos.
  card(mode: Mode, pts: number[][]) {
    const n = pts.length - 1, secs = n * PACE[mode];
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const k = Math.min(150 / Math.max(1, Math.max(...xs) - Math.min(...xs)), 34 / Math.max(1, Math.max(...ys) - Math.min(...ys)), 12);
    const at = (p: number[]) => `${(90 + (p[0] - cx) * k).toFixed(1)},${(25 + (p[1] - cy) * k).toFixed(1)}`;
    const [sx, sy] = at(pts[0]).split(','), [ex, ey] = at(pts[n]).split(',');
    const title = this.tr(mode === 'walk' ? TXT.actTitleWalk : mode === 'bike' ? TXT.actTitleRide : TXT.actTitleSwim);
    const stat = (label: Line, value: string) => `<div><small>${this.tr(label)}</small><b>${value}</b></div>`;
    // Only our own strings and numbers go in here, never player input.
    CARD.innerHTML = `
      <header><i></i><div><b>Michel</b><small>${this.tr(MAPS[this.s.map].name)}</small></div></header>
      <h3>${title}</h3>
      <div class="stats">${stat(TXT.actDist, (n / 10).toFixed(1) + ' km')}${stat(TXT.actTime, `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`)}${stat(TXT.actSpeed, (n * 360 / secs).toFixed(1) + ' km/h')}</div>
      <svg viewBox="0 0 180 50"><polyline points="${pts.map(at).join(' ')}"/><circle cx="${sx}" cy="${sy}" r="3.5" fill="#2bb673"/><circle cx="${ex}" cy="${ey}" r="3.5" fill="#1c1e21"/></svg>
      <footer>👍 ${this.tr(TXT.actKudos, n % 4)}</footer>`;
    CARD.hidden = false;
    clearTimeout(this.cardTimer);
    this.cardTimer = setTimeout(() => { CARD.hidden = true; }, 6000);
  }

  async run(fn: Script) {
    this.busy = true;
    await fn(this);
    await afterScript(this);
    this.redraw = null;
    this.box.setVisible(false);
    this.txt.setText(''); this.bigTxt.setText('');
    this.hud();
    try { localStorage.setItem(SAVE, JSON.stringify(this.s)); } catch { /* storage blocked: play on without saving */ }
    this.needRelease = true; // so a held arrow key does not re-trigger the same character
    this.busy = false;
  }

  update(_: number, dt: number) {
    for (const h of this.hills) { h.x -= dt * 0.12; if (h.x < -220) h.x += 1150; }
    const k = this.keys, any = k.left.isDown || k.right.isDown || k.up.isDown || k.down.isDown;
    if (this.needRelease) { this.needRelease = any; return; }
    if (this.busy || this.moving || !any) return;
    const dx = k.left.isDown ? -1 : k.right.isDown ? 1 : 0, dy = dx ? 0 : k.up.isDown ? -1 : 1;
    const x = this.s.x + dx, y = this.s.y + dy, m = MAPS[this.s.map], ch = m.rows[y]?.[x];
    if (dx) this.me.setFlipX(dx < 0);
    const water = ch === '~';
    if (!ch || SOLID.includes(ch) || (water && !m.swim)) return;
    const ent = this.ents.get(`${x},${y}`);
    if (ent) { if (ent.act) this.run(ent.act); return; }
    const bike = !water && !!m.outdoor && k.shift.isDown;
    this.me.setTexture(water ? 'me_swim' : bike ? 'me_bike' : 'me');
    this.s.x = x; this.s.y = y; this.moving = true;
    this.track(water ? 'swim' : bike ? 'bike' : 'walk', x, y, x - dx, y - dy);
    this.tweens.add({
      targets: this.me, x: x * T, y: y * T, duration: water && !this.s.flags.svalbard ? 320 : bike ? 80 : 170, // Svalbard perk: no slowdown in water
      onComplete: () => { this.moving = false; if (water && !this.s.flags.swam) this.run(onSwim); },
    });
  }

  // ---- Ctx: what story scripts can do ----

  key(codes: string[]) {
    return new Promise<string>(done => { this.onKey = c => { if (codes.includes(c)) { this.onKey = null; done(c); } }; });
  }
  show(text: () => string, big = '') {
    this.redraw = () => { this.box.setVisible(true); this.txt.setText(text()); this.bigTxt.setText(big); this.hud(); };
    this.redraw();
  }

  async say(...lines: Line[]) {
    for (const l of lines) { this.show(() => this.tr(l) + ' ▼'); await this.key(['Space', 'Enter']); }
  }

  async choose(prompt: Line, opts: Line[], start = 0, ...args: (string | number)[]) {
    for (let i = start; ;) {
      this.show(() => this.tr(prompt, ...args) + '\n' + opts.map((o, j) => (j === i ? '> ' : '  ') + this.tr(o)).join('\n'));
      const c = await this.key(['ArrowUp', 'ArrowDown', 'Space', 'Enter']);
      if (c === 'ArrowUp') i = (i + opts.length - 1) % opts.length;
      else if (c === 'ArrowDown') i = (i + 1) % opts.length;
      else return i;
    }
  }

  go(map: string, x: number, y: number) {
    this.tweens.killTweensOf(this.me); this.moving = false; // never leave a half-finished step behind
    this.seg = { mode: 'walk', pts: [[x, y]] };              // a route never spans two places
    Object.assign(this.s, { map, x, y }); this.build(); music.play(map);
  }
  refresh() { this.build(); }

  async days(n = 1) {
    const salaried = this.s.flags.employed;
    if (!passDays(this.s, n)) return;
    await this.say(TXT.rent);
    if (salaried) await this.say(TXT.rentSalary);
    if (this.s.money < 0) await this.say(TXT.overdrawn);
  }

  async interview() {
    const f = newFight();
    const ids = (Object.keys(MOVES) as MoveId[]).filter(id => id !== 'prepared' || this.s.flags.prepared);
    this.fightUi[1].setText(this.tr(TXT.fightTitle));
    this.fightUi.forEach(o => o.setVisible(true));
    music.play('interview');
    let result: 'win' | 'lose' | null = null;
    while (!result) {
      const id = ids[await this.choose(TXT.fightPrompt, ids.map(i => MOVES[i].name), 0, f.conf, MAX_CONF, f.skep)];
      const r = fightTurn(f, id);
      await this.say(MOVES[id].line);
      if (r.q) await this.say(r.q.line);
      result = r.result;
    }
    this.fightUi.forEach(o => o.setVisible(false));
    music.play(this.s.map);
    return result === 'win';
  }

  // ---- Minigames. Each stage of the story gets its own kind, so no two feel the same. ----

  // Shared stage: clears the dialogue, paints a backdrop, runs tick() every frame until it returns a result.
  play<R>(bg: number, setup: (add: <G>(o: G, depth?: number) => G, label: Phaser.GameObjects.Text) => (dt: number, t: number) => R | undefined) {
    return new Promise<R>(done => {
      const made: any[] = [];
      const add = <G>(o: G, depth = 61) => { made.push(o); return this.ui(o, depth); };
      this.redraw = null; this.box.setVisible(false); this.txt.setText(''); this.bigTxt.setText('');
      add(this.add.rectangle(W / 2, H / 2, W + 80, H + 80, bg), 60); // oversized so camera shake never shows the map
      const label = add(this.add.text(W / 2, 54, '', { ...FONT, fontSize: '18px' }).setOrigin(0.5));
      const tick = setup(add, label);
      let t = 0;
      const loop = (_: number, dt: number) => {
        t += dt;
        const result = tick(dt, t);
        if (result === undefined) return;
        this.events.off('update', loop);
        this.onKey = null;
        made.forEach(o => o.destroy());
        done(result);
      };
      this.events.on('update', loop);
    });
  }
  get lives() { return this.s.flags.munich ? 4 : 3; } // Munich perk: one more mistake allowed
  held() { const k = this.keys; return { x: +k.right.isDown - +k.left.isDown, y: +k.down.isDown - +k.up.isDown }; }
  left(seconds: number, t: number) { return Math.max(0, Math.ceil(seconds - t / 1000)); }

  // Memory puzzle: n arrows flash one by one, then the player repeats them. (Scout knots.)
  async simon(n: number) {
    const KEYS = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'], GLYPH = '↑→↓←';
    const seq = Array.from({ length: n }, () => Math.floor(Math.random() * 4));
    for (const g of seq) {
      this.show(() => this.tr(TXT.watch), GLYPH[g]);
      await this.wait(650);
      this.show(() => this.tr(TXT.watch));
      await this.wait(180);
    }
    for (let i = 0; i < n; i++) {
      this.show(() => this.tr(TXT.repeat), seq.slice(0, i).map(g => GLYPH[g]).join(' '));
      if (KEYS.indexOf(await this.key(KEYS)) !== seq[i]) return false;
    }
    return true;
  }

  // Lane dodger: things come at you, Up/Down to switch lane. Returns collisions. (Changing trains.)
  dodge(seconds: number) {
    const speed = this.s.flags.vienna ? 0.3 : 0.38; // Vienna perk: crowds move slower
    return this.play<number>(0x5b6068, (add, label) => {
      const LANE = [150, 240, 330];
      for (const y of [195, 285]) add(this.add.rectangle(W / 2, y, W, 3, 0xf2c94c), 60);
      const p = add(this.add.image(120, LANE[1], 'me').setScale(1.5), 62);
      const things: { o: Phaser.GameObjects.Image; lane: number; hit: boolean }[] = [];
      let lane = 1, hits = 0, next = 600;
      this.onKey = c => {
        if (c === 'ArrowUp' && lane > 0) lane--;
        if (c === 'ArrowDown' && lane < 2) lane++;
        p.y = LANE[lane];
      };
      return (dt, t) => {
        if (t > next) {
          next = t + 420 + Math.random() * 380;
          const l = Math.floor(Math.random() * 3);
          things.push({ o: add(this.add.image(W + 40, LANE[l], Math.random() < 0.5 ? 'case' : 'tourist').setScale(1.5)), lane: l, hit: false });
        }
        for (const th of things) {
          th.o.x -= dt * speed;
          if (!th.hit && th.lane === lane && Math.abs(th.o.x - p.x) < 44) { th.hit = true; hits++; this.cameras.main.shake(140, 0.012); }
        }
        label.setText(this.tr(TXT.dodgeHud, this.left(seconds, t), Math.min(hits, 3)));
        return t >= seconds * 1000 ? hits : undefined;
      };
    });
  }

  // Card matching: arrows move, Space turns a card, find all six pairs in time. (The wardrobe's parts.)
  pairs(seconds: number) {
    return this.play<boolean>(0x3a3350, (add, label) => {
      const FACE = ['●', '■', '▲', '◆', '✚', '♥'], TINT = ['#e2574c', '#3f8fd0', '#3fbf7f', '#f2c94c', '#c77dff', '#ff8fab'];
      const deck = [...FACE.keys(), ...FACE.keys()].sort(() => Math.random() - 0.5);
      const cards = deck.map((f, i) => {
        const x = 195 + (i % 4) * 110, y = 135 + Math.floor(i / 4) * 110;
        return { f, open: false, done: false,
          back: add(this.add.rectangle(x, y, 92, 92, 0x7a6a9a).setStrokeStyle(3, 0x2a2440)),
          face: add(this.add.text(x, y, FACE[f], { ...FONT, fontSize: '52px', color: TINT[f] }).setOrigin(0.5), 62).setVisible(false) };
      });
      const cursor = add(this.add.rectangle(0, 0, 102, 102).setStrokeStyle(4, 0xffffff), 63);
      let at = 0, first = -1, lock = 0;
      const turn = (i: number, open: boolean) => { cards[i].open = open; cards[i].face.setVisible(open); cards[i].back.setFillStyle(open ? 0xf4efe6 : 0x7a6a9a); };
      this.onKey = c => {
        const d = ({ ArrowLeft: -1, ArrowRight: 1, ArrowUp: -4, ArrowDown: 4 } as Record<string, number>)[c];
        if (d && at + d >= 0 && at + d < 12 && (Math.abs(d) === 4 || Math.floor((at + d) / 4) === Math.floor(at / 4))) at += d;
        if (c !== 'Space' || lock > 0 || cards[at].open) return;
        turn(at, true);
        if (first < 0) { first = at; return; }
        const a = first, b = at; first = -1;
        if (cards[a].f === cards[b].f) cards[a].done = cards[b].done = true;
        else { lock = 700; this.time.delayedCall(700, () => { turn(a, false); turn(b, false); }); }
      };
      return (dt, t) => {
        lock -= dt;
        cursor.setPosition(cards[at].back.x, cards[at].back.y);
        label.setText(this.tr(TXT.pairsHud, this.left(seconds, t)));
        if (cards.every(c => c.done)) return true;
        return t >= seconds * 1000 ? false : undefined;
      };
    });
  }

  // Timing bar: a marker sweeps back and forth, Space while it is in the green. The green shrinks. (Real-time deadline.)
  timing(rounds: number) {
    return this.play<boolean>(0x1d2b3a, (add, label) => {
      const X0 = 110, BAR = 500;
      add(this.add.rectangle(W / 2, 240, BAR, 34, 0x0d151e).setStrokeStyle(2, 0x6b7a8a));
      const zone = add(this.add.rectangle(0, 240, 10, 34, 0x3fbf7f));
      const marker = add(this.add.rectangle(0, 240, 6, 56, 0xffffff), 62);
      let hits = 0, misses = 0, pos = 0, zx = 0, zw = 0;
      const place = () => { zw = 120 - hits * 25; zx = 40 + Math.random() * (BAR - zw - 80); zone.setPosition(X0 + zx + zw / 2, 240).setSize(zw, 34).setOrigin(0.5); };
      place();
      this.onKey = c => {
        if (c !== 'Space') return;
        if (pos >= zx && pos <= zx + zw) { hits++; if (hits < rounds) place(); }
        else { misses++; this.cameras.main.shake(120, 0.01); }
      };
      return (_, t) => {
        const cycle = 1800 - hits * 200, ph = (t % cycle) / cycle; // faster each round
        pos = BAR * (ph < 0.5 ? ph * 2 : 2 - ph * 2);
        marker.x = X0 + pos;
        label.setText(this.tr(TXT.timingHud, hits, rounds, misses, this.lives));
        return hits >= rounds ? true : misses >= this.lives ? false : undefined;
      };
    });
  }

  // Tracking: keep the crosshair on a drifting target until the link fills up. (Pointing the dish at the satellite.)
  aim(seconds: number) {
    return this.play<boolean>(0x0b1026, (add, label) => {
      for (let i = 0; i < 40; i++) add(this.add.rectangle(Math.random() * W, 70 + Math.random() * 380, 2, 2, 0xffffff), 60);
      const sat = add(this.add.image(W / 2, H / 2, 'sat').setScale(1.4));
      const ring = add(this.add.circle(W / 2, 320, 46).setStrokeStyle(3, 0xf2c94c), 62);
      let lock = 0;
      return (dt, t) => {
        sat.setPosition(W / 2 + 250 * Math.sin(t / 1300), 250 + 130 * Math.sin(t / 800 + 1));
        const h = this.held();
        ring.x = Phaser.Math.Clamp(ring.x + h.x * dt * 0.3, 40, W - 40);
        ring.y = Phaser.Math.Clamp(ring.y + h.y * dt * 0.3, 80, H - 40);
        const on = Phaser.Math.Distance.Between(ring.x, ring.y, sat.x, sat.y) < 46;
        if (on) lock += dt;
        ring.setStrokeStyle(3, on ? 0x3fbf7f : 0xf2c94c);
        label.setText(this.tr(TXT.trackHud, Math.min(100, Math.floor(lock / 40)), this.left(seconds, t)));
        return lock >= 4000 ? true : t >= seconds * 1000 ? false : undefined;
      };
    });
  }

  // Reaction: something flares up in one of four spots, press that arrow before it is too late. (Fires, platform changes.)
  whack(count: number, tex: string) {
    return this.play<boolean>(tex === 'flame' ? 0x2a1c1c : 0x2b3a55, (add, label) => {
      const KEYS = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'], GLYPH = '↑→↓←';
      const SPOT = [[W / 2, 130], [W / 2 + 190, 260], [W / 2, 390], [W / 2 - 190, 260]];
      SPOT.forEach(([x, y], i) => {
        add(this.add.rectangle(x, y, 96, 96, 0x000000, 0.35).setStrokeStyle(2, 0x8a8f98));
        add(this.add.text(x, y, GLYPH[i], { ...FONT, fontSize: '34px', color: '#59606b' }).setOrigin(0.5));
      });
      const thing = add(this.add.image(0, 0, tex).setScale(1.7), 62).setVisible(false);
      let hits = 0, misses = 0, spot = -1, due = 700, born = 0, now = 0;
      const miss = () => { misses++; spot = -1; thing.setVisible(false); due = now + 400; this.cameras.main.shake(120, 0.01); };
      this.onKey = c => {
        const i = KEYS.indexOf(c);
        if (i < 0 || spot < 0) return;
        if (i !== spot) return miss();
        hits++; spot = -1; thing.setVisible(false); due = now + 250 + Math.random() * 350;
      };
      return (_, t) => {
        now = t;
        if (spot < 0 && t >= due) { spot = Math.floor(Math.random() * 4); born = t; thing.setPosition(SPOT[spot][0], SPOT[spot][1]).setVisible(true); }
        if (spot >= 0 && t - born > 1100 - hits * 40) miss(); // they get quicker
        label.setText(this.tr(tex === 'flame' ? TXT.whackHud : TXT.whackHudTrain, hits, count, misses, this.lives));
        return hits >= count ? true : misses >= this.lives ? false : undefined;
      };
    });
  }

  // Free swimming: steer with all four arrows, pick up n samples before time runs out, jellyfish stun you. (The robot under the ice.)
  collect(n: number, seconds: number) {
    return this.play<boolean>(0x16406b, (add, label) => {
      const rov = add(this.add.image(120, 260, 'rov').setScale(1.4), 63);
      const sample = add(this.add.image(0, 0, 'angel').setScale(1.2), 62);
      const jellies = [0, 1, 2, 3].map(i => add(this.add.image(180 + i * 150, 120 + i * 80, 'jelly').setScale(1.3)));
      const drop = () => sample.setPosition(80 + Math.random() * (W - 160), 100 + Math.random() * (H - 160));
      let got = 0, stun = 0;
      drop();
      return (dt, t) => {
        stun -= dt;
        const h = this.held();
        if (stun <= 0) {
          rov.x = Phaser.Math.Clamp(rov.x + h.x * dt * 0.26, 30, W - 30);
          rov.y = Phaser.Math.Clamp(rov.y + h.y * dt * 0.26, 80, H - 30);
          if (h.x) rov.setFlipX(h.x < 0);
        }
        rov.setAlpha(stun > 0 ? 0.4 : 1);
        jellies.forEach((j, i) => {
          j.y = 250 + 150 * Math.sin(t / (700 + i * 160) + i * 2);
          if (stun <= 0 && Phaser.Math.Distance.Between(j.x, j.y, rov.x, rov.y) < 40) { stun = 900; this.cameras.main.shake(140, 0.012); }
        });
        if (Phaser.Math.Distance.Between(sample.x, sample.y, rov.x, rov.y) < 42) { got++; drop(); }
        label.setText(this.tr(TXT.collectHud, got, n, this.left(seconds, t)));
        return got >= n ? true : t >= seconds * 1000 ? false : undefined;
      };
    });
  }

  // Balance: gusts push the mast over, Left/Right to hold it upright for the whole time. (Antarctic wind.)
  balance(seconds: number) {
    return this.play<boolean>(0xdfe8f0, (add, label) => {
      label.setColor('#1c1e21');
      add(this.add.rectangle(W / 2, 420, W + 80, 120, 0xffffff));
      const mast = add(this.add.image(W / 2, 372, 'mast').setOrigin(0.5, 1).setScale(5), 62);
      let tilt = 0, spin = 0, gust = 0, change = 0;
      return (dt, t) => {
        if (t > change) { change = t + 500 + Math.random() * 600; gust = (Math.random() * 2 - 1) * (0.6 + t / 12000); }
        spin += (gust + tilt * 0.8 + this.held().x * 3) * dt / 1000; // it also falls faster the further it leans
        spin *= 0.985 ** (dt / 16); // a little drag; tuned by simulation so idle always loses and an attentive player wins
        tilt += spin * dt / 1000;
        mast.rotation = tilt;
        label.setText(this.tr(TXT.balanceHud, this.left(seconds, t)));
        return Math.abs(tilt) > 1.1 ? false : t >= seconds * 1000 ? true : undefined;
      };
    });
  }

  // Train rolling through hills, shown behind the dialogue box.
  backdrop(on: boolean) {
    this.scenery.forEach(o => { this.tweens.killTweensOf(o); o.destroy(); });
    this.scenery = []; this.hills = [];
    music.play(on ? 'train' : this.s.map);
    if (!on) return;
    const add = <G extends Obj>(o: G) => { this.scenery.push(o); return this.ui(o, 50); };
    add(this.add.rectangle(W / 2, H / 2, W, H, 0x9fd3f0));
    add(this.add.circle(610, 70, 30, 0xffe08a));
    for (let i = 0; i < 5; i++) this.hills.push(add(this.add.ellipse(i * 230, 290, 340, 170 + (i % 2) * 70, i % 2 ? 0x4c8a3f : 0x6bb35a)));
    add(this.add.rectangle(W / 2, 390, W, 200, 0x5a9e4b));
    add(this.add.rectangle(W / 2, 318, W, 6, 0x4a4038));
    const train = add(this.add.image(W / 2, 280, 'train'));
    this.tweens.add({ targets: train, y: 278, duration: 140, yoyo: true, repeat: -1 });
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO, parent: 'game', width: W, height: H, backgroundColor: '#101820',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: World,
});
(window as any).game = game; // handle for poking at state from the browser console
