// Rendering and input. Rules live in logic.ts, story in content.ts, text in strings.ts.
import * as Phaser from 'phaser';
import { type State, newState, passDays, newFight, fightTurn, MOVES, MAX_CONF, type MoveId } from './logic';
import { MAPS, intro, afterScript, onSwim, type Ctx, type Ent, type Script } from './content';
import { TXT, LANGS, type Line } from './strings';
import * as music from './music';

const T = 48, W = 720, H = 480, SAVE = 'life-game-save';
const TILE: Record<string, string> = { '#': 'wall', '~': 'water', ',': 'path', '1': 'stone', '2': 'glass', '3': 'cream', '=': 'track' };
const SOLID = '#T123=';

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
    this.s = hadSave ? { ...saved!, lang: saved!.lang ?? guess } : newState(guess);
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
    if (!this.moving) this.me.setPosition(this.s.x * T, this.s.y * T).setTexture(m.rows[this.s.y][this.s.x] === '~' ? 'me_swim' : 'me');
    this.hud();
  }

  hud() {
    const { day, money, rentDue, map } = this.s;
    this.hudTxt.setText(this.tr(TXT.hud, this.tr(MAPS[map].name), day, money, rentDue - day));
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
    this.tweens.add({
      targets: this.me, x: x * T, y: y * T, duration: water ? 320 : bike ? 80 : 170,
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

  // Puzzle: n arrows flash one by one, then the player repeats them.
  async simon(n: number) {
    const KEYS = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'], GLYPH = '↑→↓←';
    const seq = Array.from({ length: n }, () => Math.floor(Math.random() * 4));
    for (const a of seq) {
      this.show(() => this.tr(TXT.watch), GLYPH[a]);
      await this.wait(650);
      this.show(() => this.tr(TXT.watch));
      await this.wait(180);
    }
    for (let i = 0; i < n; i++) {
      this.show(() => this.tr(TXT.repeat), seq.slice(0, i).map(a => GLYPH[a]).join(' '));
      if (KEYS.indexOf(await this.key(KEYS)) !== seq[i]) return false;
    }
    return true;
  }

  // Action: three lanes, things come at you, Up/Down to dodge. Always leaves a free lane.
  dodge(seconds: number) {
    return new Promise<number>(done => {
      const LANE = [150, 240, 330], made: Obj[] = [];
      const add = <G extends Obj>(o: G, depth = 61) => { made.push(o); return this.ui(o, depth); };
      this.redraw = null; this.box.setVisible(false); this.txt.setText(''); this.bigTxt.setText('');
      add(this.add.rectangle(W / 2, H / 2, W + 80, H + 80, 0x5b6068), 60); // oversized so camera shake never shows the map
      for (const y of [195, 285]) add(this.add.rectangle(W / 2, y, W, 3, 0xf2c94c), 60);
      const label = add(this.add.text(W / 2, 60, '', { ...FONT, fontSize: '18px' }).setOrigin(0.5));
      const p = add(this.add.image(120, LANE[1], 'me').setScale(1.5), 62);
      const things: { o: Phaser.GameObjects.Image; lane: number; hit: boolean }[] = [];
      let lane = 1, hits = 0, t = 0, next = 600;
      this.onKey = c => {
        if (c === 'ArrowUp' && lane > 0) lane--;
        if (c === 'ArrowDown' && lane < 2) lane++;
        p.y = LANE[lane];
      };
      const tick = (_: number, dt: number) => {
        t += dt;
        if (t > next) {
          next = t + 420 + Math.random() * 380;
          const l = Math.floor(Math.random() * 3);
          things.push({ o: add(this.add.image(W + 40, LANE[l], Math.random() < 0.5 ? 'case' : 'tourist').setScale(1.5)), lane: l, hit: false });
        }
        for (const th of things) {
          th.o.x -= dt * 0.38;
          if (!th.hit && th.lane === lane && Math.abs(th.o.x - p.x) < 44) { th.hit = true; hits++; this.cameras.main.shake(140, 0.012); }
        }
        label.setText(this.tr(TXT.dodgeHud, Math.max(0, Math.ceil(seconds - t / 1000)), Math.min(hits, 3)));
        if (t < seconds * 1000) return;
        this.events.off('update', tick);
        this.onKey = null;
        made.forEach(o => o.destroy());
        done(hits);
      };
      this.events.on('update', tick);
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
  type: Phaser.AUTO, width: W, height: H, backgroundColor: '#101820',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: World,
});
(window as any).game = game; // handle for poking at state from the browser console
