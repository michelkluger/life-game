// Rendering and input. Rules live in logic.ts, story in content.ts, text in strings.ts.
import * as Phaser from 'phaser';
import { type State, newState, passDays } from './logic';
import { MAPS, intro, afterScript, onSwim, board, type Ctx, type Ent, type Script } from './content';
import { TXT, LANGS, SORT_ITEMS, type Line } from './strings';
import * as music from './music';

const T = 48, W = 720, H = 480, SAVE = 'life-game-save';
const TILE: Record<string, string> = { '#': 'wall', '~': 'water', ',': 'path', '1': 'stone', '2': 'glass', '3': 'cream', '=': 'track', '^': 'rock' };
const SOLID = '#T123=^';
const pad = { x: 0, y: 0, shift: false, a: false }; // touch controls: direction held and bike toggle
const CANCEL = Symbol('Esc'); // thrown out of a conversation the player walks away from

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
  me_walk: [...person(NAVY, '#3a2a1a').slice(0, 7), ['#2b2b3a', 5, 12, 2, 3], ['#2b2b3a', 9, 13, 2, 3]], // mid-stride
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
  dog: [['#2b2320', 3, 7, 9, 5], ['#2b2320', 11, 4, 4, 5], ['#fff', 12, 7, 3, 2], ['#b5652b', 11, 5, 1, 1], ['#fff', 5, 10, 4, 2], ['#2b2320', 3, 12, 2, 3], ['#2b2320', 9, 12, 2, 3], ['#2b2320', 2, 6, 1, 3]],
  caramelo: [['#c98a3c', 3, 7, 9, 5], ['#c98a3c', 11, 4, 4, 5], ['#222', 13, 6, 1, 1], ['#c98a3c', 3, 12, 2, 3], ['#c98a3c', 9, 12, 2, 3], ['#c98a3c', 1, 4, 2, 4]],
  ball: [['#e2372c', 5, 5, 6, 6], ['#fff', 7, 5, 2, 6], ['#cfe6ff', 3, 12, 10, 1]],
  boat: [['#fff', 7, 1, 1, 9], ['#f4f4f4', 8, 2, 5, 6], ['#8a5a44', 2, 10, 12, 3], ['#6e4635', 3, 13, 10, 1]],
  mangotree: [['#6b4a2b', 7, 9, 2, 7], ['#2f6b35', 2, 1, 12, 9], ['#f2a01e', 4, 4, 2, 2], ['#f2a01e', 9, 6, 2, 2], ['#f2a01e', 7, 2, 2, 2]],
  mango: [['#f2a01e', 4, 4, 8, 9], ['#e2572c', 6, 4, 5, 4], ['#3d8444', 7, 2, 2, 2]],
  greenmango: [['#4f9a45', 4, 4, 8, 9], ['#7fc46a', 6, 5, 3, 3], ['#3d8444', 7, 2, 2, 2]],
  glider: [['#e2372c', 1, 1, 14, 3], ['#f2c94c', 5, 1, 6, 3], ['#555', 3, 4, 1, 5], ['#555', 12, 4, 1, 5], ['#e8b88a', 6, 6, 4, 3], [NAVY, 6, 9, 4, 4], ['#2b2b3a', 6, 13, 4, 2]],
  // Headstone with visitors' pebbles on top; the sign carries a Star of David (drawn in DETAIL).
  tomb: [['#5a9e4b', 3, 14, 10, 2], ['#9aa0a8', 4, 5, 8, 10], ['#b9c0c8', 5, 4, 6, 2], ['#7d838c', 6, 8, 4, 1], ['#7d838c', 6, 10, 4, 1], ['#5d636b', 5, 3, 2, 1], ['#e8e2d4', 8, 3, 1, 1], ['#5d636b', 10, 3, 1, 1]],
  sign: [['#8a5a44', 7, 9, 2, 7], ['#f4efe6', 2, 1, 12, 9]],
  grandma: person('#c39bd3', '#f4f4f4', '#c99a6e'),
  host: person('#e74c3c', '#2b2320', '#c68e5e'),
  friend2: person('#3498db', '#5a3a1a', '#c99a6e'),
  friend3: person('#1abc9c', '#111', '#b98a5e'),
  friend4: person('#f39c12', '#6b4a2b', '#d9a877'),
  kid2: person('#e84393', '#2b2320', '#c99a6e'),
  kid3: person('#00b894', '#5a3a1a', '#d9a877'),
  balloon: [['#e2372c', 2, 1, 5, 6], ['#3f8fd0', 9, 3, 5, 6], ['#999', 4, 7, 1, 8], ['#999', 11, 9, 1, 6]],
  caketable: [['#fff', 1, 8, 14, 5], ['#8a5a44', 2, 13, 2, 3], ['#8a5a44', 12, 13, 2, 3], ['#f5b7d0', 5, 4, 6, 4], ['#f2c94c', 7, 2, 1, 2], ['#5a3a1a', 2, 7, 1, 1], ['#5a3a1a', 4, 7, 1, 1], ['#5a3a1a', 12, 7, 1, 1]],
  castle: [['#e2372c', 0, 6, 16, 10], ['#f2c94c', 0, 2, 4, 4], ['#f2c94c', 12, 2, 4, 4], ['#3f8fd0', 4, 9, 8, 7]],
  ellie: [['#86a0b8', 1, 7, 1, 3], ['#9db4c8', 2, 6, 9, 7], ['#9db4c8', 9, 3, 6, 6], ['#86a0b8', 8, 3, 3, 5], ['#f5b7d0', 9, 4, 1, 3], ['#9db4c8', 14, 7, 2, 6], ['#222', 12, 5, 1, 1], ['#86a0b8', 3, 13, 2, 3], ['#86a0b8', 8, 13, 2, 3]],
  date: person('#16a085', '#7b3f00'),
  badger1: person('#5d6d7e', '#f4f4f4'),
  badger2: person('#34495e', '#111'),
  capun: [['#f4f4f4', 3, 0, 8, 2], ['#2e7d32', 5, 0, 2, 2], ['#e8b88a', 4, 2, 6, 4], ['#222', 8, 3, 1, 1], ['#2e7d32', 4, 6, 6, 3], ['#e8b88a', 9, 7, 3, 1]], // rider in the club's green
  pumpkin: [['#e67e22', 2, 5, 12, 9], ['#d35400', 5, 5, 1, 9], ['#d35400', 10, 5, 1, 9], ['#2e7d32', 7, 2, 2, 3], ['#222', 4, 8, 2, 2], ['#222', 10, 8, 2, 2], ['#222', 5, 11, 6, 1]],
  cryptoman: person('#111418', '#d9c38a'),
  banker: person('#1c2333', '#2b2320'),
  friend: person('#8e44ad', '#a5682a'),
  musician: person('#b0392b', '#eee'),
  recycler: person('#5d6d7e', '#999'),
  expat: person('#f2c94c', '#2b2320', '#c68e5e'),
  instructor: person('#e67e22', '#d9c38a'),
  organiser: person('#27ae60', '#6b4a2b'),
  fishmonger: person('#2e86c1', '#444'),
  oldman: person('#ecf0f1', '#ddd'),
  oldman2: person('#a9cce3', '#bbb'),
  mom: person('#d98880', '#5a3a1a', '#c99a6e'),
  dad: person('#7fb3d5', '#888', '#c99a6e'),
  aunt: person('#bb8fce', '#3a2a1a', '#c99a6e'),
  uncle: person('#f0b27a', '#333', '#b98a5e'),
  cousin: person('#76d7c4', '#2b2320', '#c99a6e'),
  porter: person('#566573', '#aaa'),
  itguy: person('#34495e', '#c0392b'),
  agent: person('#17202a', '#d9c38a'),
  prof: person('#4a6fa5', '#bbb'),
  guard: person('#d9822b', '#333'),
  boss: person('#555b6e', '#6b4a2b'),
  colleague: person('#7a9a5a', '#222'),
  bavarian: person('#2e6b3a', '#a57a3a'),
  chief: person('#e2572c', '#444'),
  leader: person('#b5a36a', '#222', '#b98a5e'),
  kid: person('#b5a36a', '#3a2a1a', '#c99a6e'),
  // Board icons for things you carry.
  badge: [['#555', 7, 0, 2, 4], ['#f4f4f4', 3, 4, 10, 11], ['#3d5a80', 3, 4, 10, 3], ['#e8b88a', 5, 8, 3, 4], ['#59606b', 9, 9, 3, 1], ['#59606b', 9, 11, 3, 1]],
  medal: [['#3f8fd0', 5, 0, 2, 6], ['#e2372c', 9, 0, 2, 6], ['#f2c94c', 4, 6, 8, 8], ['#c99a2e', 6, 8, 4, 4]],
  mask: [['#c77dff', 2, 5, 12, 5], ['#222', 4, 6, 3, 2], ['#222', 9, 6, 3, 2], ['#f2c94c', 1, 4, 2, 2], ['#f2c94c', 13, 4, 2, 2], ['#3fbf7f', 6, 1, 1, 4], ['#e2372c', 9, 1, 1, 4]],
  choc: [['#6b3a1f', 2, 4, 12, 9], ['#8a5230', 3, 5, 3, 3], ['#8a5230', 7, 5, 3, 3], ['#8a5230', 3, 9, 3, 3], ['#8a5230', 7, 9, 3, 3], ['#e2372c', 11, 4, 3, 9], ['#fff', 12, 7, 1, 3]],
  ice: [['#cfe6ff', 3, 6, 5, 5], ['#e8f4ff', 8, 4, 5, 5], ['#bcd9f5', 6, 9, 5, 5], ['#fff', 4, 7, 1, 1], ['#fff', 9, 5, 1, 1]],
  tupper: [['#cfe6ff', 2, 6, 12, 8], ['#3f8fd0', 1, 4, 14, 3], ['#e8c060', 4, 9, 3, 3], ['#e8c060', 8, 9, 3, 3], ['#e8c060', 6, 11, 3, 2]],
  jar: [['#f4efe6', 4, 2, 8, 3], ['#f2a01e', 4, 5, 8, 10], ['#e2572c', 5, 7, 6, 6], ['#fff', 5, 6, 1, 3]],
  bug: [['#2e7d5b', 5, 1, 6, 3], ['#3fbf7f', 3, 4, 10, 10], ['#2e7d5b', 7, 4, 2, 10], ['#e2372c', 5, 2, 1, 1], ['#e2372c', 10, 2, 1, 1], ['#1c3d30', 1, 5, 2, 1], ['#1c3d30', 13, 5, 2, 1], ['#1c3d30', 1, 9, 2, 1], ['#1c3d30', 13, 9, 2, 1], ['#1c3d30', 1, 13, 2, 1], ['#1c3d30', 13, 13, 2, 1], ['#1c3d30', 5, 0, 1, 1], ['#1c3d30', 10, 0, 1, 1]],
  mariana: [...person('#5dade2', '#4a2c17'), ['#4a2c17', 4, 2, 1, 5], ['#4a2c17', 11, 2, 1, 5]],
  coelho: [['#f4f4f4', 4, 8, 9, 6], ['#f4f4f4', 10, 5, 5, 5], ['#f4f4f4', 10, 0, 2, 6], ['#f4f4f4', 13, 1, 2, 5], ['#f5b7d0', 11, 1, 1, 4], ['#222', 13, 7, 1, 1], ['#f5b7d0', 14, 8, 1, 1], ['#fff', 3, 9, 2, 2], ['#ddd', 5, 13, 3, 2], ['#ddd', 10, 13, 3, 2]],
  // The bloquinho: a banner on two poles, the surdo, a giant pão de queijo, and the leader in sequins and feathers.
  banner: [['#8a5a44', 1, 4, 1, 12], ['#8a5a44', 14, 4, 1, 12], ['#f4efe6', 1, 3, 14, 7], ['#e2372c', 2, 4, 3, 2], ['#f2c94c', 6, 4, 4, 2], ['#3fbf7f', 11, 4, 3, 2], ['#3f8fd0', 3, 7, 10, 1]],
  surdo: [...person('#f2c94c', '#111', '#a8784e'), ['#d9d9d9', 4, 9, 8, 6], ['#3f8fd0', 4, 10, 8, 1], ['#3f8fd0', 4, 13, 8, 1]],
  folia1: [...person('#e8c060', '#2b2320', '#c68e5e'), ['#e8c060', 2, 6, 12, 7], ['#c9a040', 4, 8, 2, 2], ['#c9a040', 9, 10, 2, 2]],
  folia2: person('#ff4fa3', '#f2c94c', '#c99a6e'),
  passista: [...person('#9b59b6', '#2b2320', '#b98a5e'), ['#f2c94c', 3, 7, 1, 6], ['#f2c94c', 12, 7, 1, 6], ['#fff3b0', 5, 8, 1, 1], ['#fff3b0', 9, 10, 1, 1], ['#e2372c', 5, 0, 1, 2], ['#3fbf7f', 7, 0, 2, 1], ['#3f8fd0', 10, 0, 1, 2]],
};

const DETAIL: Record<string, (x: Ctx2) => void> = {
  // Star of David on the cemetery sign: two overlapping triangles.
  sign(x) {
    x.strokeStyle = '#2a5db0'; x.lineWidth = 2; x.lineJoin = 'round';
    for (const flip of [1, -1]) {
      x.beginPath(); x.moveTo(24, 16.5 - 10 * flip); x.lineTo(33, 16.5 + 5 * flip); x.lineTo(15, 16.5 + 5 * flip); x.closePath(); x.stroke();
    }
  },
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

DETAIL.me_walk = DETAIL.me;
DETAIL.capun = DETAIL.me_bike; // same bike, their jersey

function drawPlane(x: Ctx2) {
  x.fillStyle = '#c9ced6'; x.beginPath(); x.moveTo(150, 44); x.lineTo(92, 78); x.lineTo(72, 78); x.lineTo(104, 44); x.fill(); // wing
  x.fillStyle = '#f4f6f9'; x.beginPath(); x.roundRect(10, 26, 186, 24, 12); x.fill();                                          // fuselage
  x.beginPath(); x.moveTo(186, 26); x.quadraticCurveTo(222, 38, 186, 50); x.fill();                                            // nose
  x.fillStyle = '#d62b2b'; x.beginPath(); x.moveTo(12, 30); x.lineTo(2, 2); x.lineTo(24, 2); x.lineTo(46, 28); x.fill();      // tail fin
  x.fillRect(14, 41, 184, 3);                                                                                                  // stripe
  x.fillStyle = '#3d5a80'; for (let i = 0; i < 11; i++) x.fillRect(48 + i * 13, 31, 7, 6);                                     // windows
  x.fillStyle = '#1d2733'; x.fillRect(194, 31, 11, 6);                                                                         // cockpit
  x.fillStyle = '#8a8f98'; x.beginPath(); x.roundRect(98, 53, 32, 11, 5); x.fill();                                            // engine
}

function drawCar(x: Ctx2, paint: string) {
  x.fillStyle = paint; x.beginPath(); x.roundRect(2, 16, 92, 20, 7); x.fill();                       // body
  x.beginPath(); x.moveTo(22, 17); x.lineTo(32, 3); x.lineTo(64, 3); x.lineTo(76, 17); x.fill();     // cabin
  x.fillStyle = '#bfe6ff'; x.beginPath(); x.moveTo(27, 16); x.lineTo(34, 6); x.lineTo(46, 6); x.lineTo(46, 16); x.fill();
  x.beginPath(); x.moveTo(49, 16); x.lineTo(49, 6); x.lineTo(62, 6); x.lineTo(71, 16); x.fill();     // windows
  x.fillStyle = '#fff3b0'; x.fillRect(90, 20, 4, 5);                                                 // headlight
  x.fillStyle = '#1a1a1a'; for (const cx of [22, 74]) { x.beginPath(); x.arc(cx, 37, 7, 0, 7); x.fill(); }
  x.fillStyle = '#999'; for (const cx of [22, 74]) { x.beginPath(); x.arc(cx, 37, 3, 0, 7); x.fill(); }
}

// What Zurich drivers shout at cyclists. Left in Swiss German on purpose: it is funnier, and nothing depends on reading it.
const HONKS = [
  `Hesch s'Gfühl, d'Strass ghört dir?!`,
  `Fahr doch uf em Veloweg, du Löli!`,
  `Gopfridstutz, scho wieder Velofahrer!`,
  `Ich zahl Stüüre für die Strass!`,
  `Chasch nöd im Wald go fahre?!`,
  `Sorry gäll, aber gaht's no?!`,
  `Näbenand fahre isch verbote, gäll!`,
  `Ich ha's pressant, ihr Gümmeler!`,
];

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
  ellie!: Phaser.GameObjects.Image; // the soft toy elephant, one step behind you when she is along
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
  scenery: Obj[] = []; hills: Obj[] = [];
  undo: State | null = null; // the state before this conversation; Esc goes back to it until a minigame has been played
  boardUi: Phaser.GameObjects.GameObject[] = []; // the open board (I), empty while closed

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
    for (const [key, paint] of [['car', '#c0392b'], ['car2', '#2e5f9e'], ['car3', '#e8e8e8']]) {
      const car = this.textures.createCanvas(key, 96, 46)!;
      drawCar(car.context, paint); car.refresh();
    }
    const plane = this.textures.createCanvas('plane', 224, 80)!;
    drawPlane(plane.context); plane.refresh();
    // Fog: a clear circle around the player fading to solid colour (polar night, whiteout).
    for (const [key, rgb] of [['fog_dark', '6,9,22'], ['fog_white', '244,247,250']]) {
      const fog = this.textures.createCanvas(key, W, H)!, g = fog.context.createRadialGradient(W / 2, H / 2, 70, W / 2, H / 2, 210);
      g.addColorStop(0, `rgba(${rgb},0)`); g.addColorStop(1, `rgba(${rgb},0.97)`);
      fog.context.fillStyle = g; fog.context.fillRect(0, 0, W, H); fog.refresh();
    }
    this.fog = this.ui(this.add.image(W / 2, H / 2, 'fog_dark'), 20).setVisible(false);

    // Phaser puts its own plugins on the scene (load, lights, time...), which silently shadow a method of the same name.
    for (const k of ['bugs', 'rally', 'simon', 'dodge', 'board', 'pairs', 'timing', 'boules', 'aim', 'whack', 'collect', 'balance', 'leds', 'sort', 'glide', 'mash', 'gather', 'tag', 'climb', 'sneak', 'stack', 'formation', 'dance', 'oven', 'paceline', 'build', 'play'])
      if (typeof (this as any)[k] !== 'function') throw new Error(`World.${k} is shadowed by a Phaser plugin: rename it`);
    this.keys = this.input.keyboard!.createCursorKeys();
    this.input.keyboard!.on('keydown', (e: KeyboardEvent) => {
      music.unlock();
      if (e.code === 'KeyM') music.toggleMute();
      if (e.code === 'KeyE') this.toggleEllie();
      if (e.code === 'KeyI' || (e.code === 'Escape' && this.boardUi.length)) this.toggleBoard();
      if (e.code === 'KeyL') this.setLang((this.s.lang + 1) % LANGS.length);
      this.onKey?.(e.code);
    });

    this.layer = this.add.container();
    this.me = this.add.image(0, 0, 'me').setOrigin(0).setDepth(10);
    this.ellie = this.add.image(0, 0, 'ellie').setOrigin(0).setDepth(9).setVisible(false);
    this.cameras.main.startFollow(this.me, true, 1, 1, -T / 2, -T / 2);

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

  // E: Ellie tags along, or stays home. Only once you have picked her up.
  toggleEllie() {
    const f = this.s.flags;
    if (!f.ellie) return;
    f.ellieOut = !f.ellieOut;
    this.ellie.setVisible(f.ellieOut).setPosition(this.me.x, this.me.y);
    music.sfx('tick');
  }

  // I: the board of what the memories taught you and what you carry. Opens only while you are walking around, and
  // holds you in place until it is closed with I or Esc.
  toggleBoard() {
    if (this.boardUi.length) { this.boardUi.forEach(o => o.destroy()); this.boardUi = []; this.busy = false; this.needRelease = true; return; }
    if (this.busy) return;
    this.busy = true;
    const add = <G>(o: G) => { this.boardUi.push(o as any); return this.ui(o, 120); };
    const text = (x: number, y: number, s: string, size: number, color: string, bold = false, wrap = 182) =>
      add(this.add.text(x, y, s, { ...FONT, fontSize: `${size}px`, color, fontStyle: bold ? 'bold' : '', wordWrap: { width: wrap } }));
    const card = (col: number, row: number, c: { tex: string; title: Line; note: Line }, dim = false) => {
      const x = 12 + col * 234, y = 62 + row * 58;
      add(this.add.rectangle(x, y, 228, 54, dim ? 0xd9cdb8 : 0xf4efe6).setOrigin(0));
      add(this.add.circle(x + 114, y + 3, 4, 0xe2372c)); // the pin
      add(this.add.image(x + 22, y + 27, c.tex).setScale(0.75)).setAlpha(dim ? 0.5 : 1);
      text(x + 44, y + 4, this.tr(c.title), 12, '#1c1e21', true);
      text(x + 44, y + 20, this.tr(c.note), 11, dim ? '#7a7f87' : '#4a4f57');
    };
    const b = board(this.s);
    add(this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.55));
    add(this.add.rectangle(W / 2, H / 2, W - 8, H - 8, 0x9c7446).setStrokeStyle(6, 0x6e4635)); // cork
    text(12, 10, this.tr(TXT.bdTitle), 15, '#fff3b0', true, 700);
    text(12, 40, this.tr(TXT.bdLearnedHdr), 13, '#fff', true, 228);
    text(246, 40, this.tr(TXT.bdThingsHdr), 13, '#fff', true, 460);
    b.learned.forEach((c, i) => card(0, i, c, !c.got));
    b.things.slice(0, 14).forEach((c, i) => card(1 + Math.floor(i / 7), i % 7, c)); // two columns of seven
    if (!b.things.length) text(246, 66, this.tr(TXT.bdNone), 13, '#fff', false, 460);
  }

  setLang(lang: number) {
    this.s.lang = lang;
    this.build(); // signs and HUD
    this.redraw?.();
    if (this.boardUi.length) { this.toggleBoard(); this.toggleBoard(); } // redraw an open board in the new language
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
    if (!this.moving) this.ellie.setVisible(!!this.s.flags.ellieOut).setPosition(this.s.x * T, this.s.y * T);
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
    this.undo = structuredClone(this.s);
    try { await fn(this); } catch (e) {
      if (e !== CANCEL) throw e;
      // Esc: walk away as if the conversation never happened (keeping the language you may have switched to).
      this.s = { ...this.undo!, lang: this.s.lang };
      this.backdrop(false);
      this.go(this.s.map, this.s.x, this.s.y);
    }
    this.undo = null;
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
    const k = this.keys, h = this.held(), any = !!(h.x || h.y);
    if (this.needRelease) { this.needRelease = any; return; }
    if (this.busy || this.moving || !any) return;
    const dx = h.x, dy = dx ? 0 : h.y;
    const x = this.s.x + dx, y = this.s.y + dy, m = MAPS[this.s.map], ch = m.rows[y]?.[x];
    if (dx) this.me.setFlipX(dx < 0);
    const water = ch === '~';
    if (!ch || SOLID.includes(ch) || (water && !m.swim)) return;
    const ent = this.ents.get(`${x},${y}`);
    if (ent) { if (ent.act) this.run(ent.act); return; }
    const bike = !water && !!m.outdoor && (k.shift.isDown || pad.shift);
    this.me.setTexture(water ? 'me_swim' : bike ? 'me_bike' : (x + y) % 2 ? 'me_walk' : 'me');
    if (this.s.flags.ellieOut) {
      this.ellie.setFlipX(dx < 0);
      this.tweens.add({ targets: this.ellie, x: this.s.x * T, y: this.s.y * T, duration: water ? 320 : bike ? 80 : 170 });
    }
    this.s.x = x; this.s.y = y; this.moving = true;
    this.track(water ? 'swim' : bike ? 'bike' : 'walk', x, y, x - dx, y - dy);
    this.tweens.add({
      targets: this.me, x: x * T, y: y * T, duration: water && !this.s.flags.svalbard ? 320 : bike ? (this.s.flags.wiener ? 55 : 80) : 170, // Svalbard perk: no slowdown in water
      onComplete: () => { this.moving = false; if (water && !this.s.flags.swam) this.run(onSwim); },
    });
  }

  // ---- Ctx: what story scripts can do ----

  // Waits for one of `codes`. Esc walks out of the conversation while that is still undoable; otherwise it counts only if listed.
  key(codes: string[]) {
    return new Promise<string>((done, fail) => {
      this.onKey = c => {
        if (c === 'Escape' && this.undo) { this.onKey = null; fail(CANCEL); }
        else if (codes.includes(c)) { this.onKey = null; done(c); }
      };
    });
  }
  show(text: () => string, big = '') {
    this.redraw = () => { this.box.setVisible(true); this.txt.setText(text()); this.bigTxt.setText(big); this.hud(); };
    this.redraw();
  }

  async say(...lines: Line[]) {
    for (const l of lines) {
      this.show(() => this.tr(l) + ' ▼');
      if (await this.key(['Space', 'Enter', 'Escape']) === 'Escape') break; // after a minigame, Esc can only skip the talking
      music.sfx('tick');
    }
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
    this.tweens.killTweensOf(this.me); this.tweens.killTweensOf(this.ellie); this.moving = false; // never leave a half-finished step behind
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

  // ---- Minigames. Each stage of the story gets its own kind, so no two feel the same. ----

  // Live coding: a swarm of bugs sways across the code and steps down at each edge. Left/Right to move, Space fires a
  // fix straight up (one at a time). Fix them all before one reaches the red line. Tuned by simulation: a 350 ms
  // reaction wins, a 500 ms one mostly loses, idle loses in ~35 s. (The interview at Gletscher Labs.)
  async bugs(rows: number) {
    music.play('interview');
    const won = await this.play<boolean>(0x1b1f2a, (add, label) => {
      const LINE = 400;
      for (let i = 0; i < 9; i++) add(this.add.rectangle(60 + (i * 53) % 140, 90 + i * 34, 120 + (i * 97) % 260, 6, 0x2f3647).setOrigin(0, 0.5)); // code
      add(this.add.rectangle(W / 2, LINE, W, 3, 0xe2574c));
      add(this.add.image(W - 50, 110, 'interviewer').setFlipX(true), 61); // watching you type
      const swarm = Array.from({ length: rows * 6 }, (_, i) => ({ o: add(this.add.image(185 + (i % 6) * 70, 110 + Math.floor(i / 6) * 48, 'bug').setScale(0.9), 62), alive: true }));
      const me = add(this.add.image(W / 2, 440, 'me'), 63);
      const shot = add(this.add.rectangle(0, 0, 5, 18, 0x7fd0ff), 62).setVisible(false);
      let dir = 1;
      this.onKey = c => { if (c === 'Space' && !shot.visible) shot.setPosition(me.x, me.y - 30).setVisible(true); };
      return dt => {
        me.x = Phaser.Math.Clamp(me.x + this.held().x * dt * 0.35, 40, W - 40);
        const alive = swarm.filter(b => b.alive), speed = 0.065 + (swarm.length - alive.length) * 0.005; // fewer bugs, faster bugs
        const xs = alive.map(b => b.o.x);
        if ((dir > 0 && Math.max(...xs) > W - 40) || (dir < 0 && Math.min(...xs) < 40)) { dir = -dir; alive.forEach(b => { b.o.y += 24; }); }
        alive.forEach(b => { b.o.x += dir * speed * dt; });
        if (shot.visible) {
          shot.y -= dt * 0.7;
          const hit = alive.find(b => Math.abs(b.o.x - shot.x) < 22 && Math.abs(b.o.y - shot.y) < 20);
          if (hit) { hit.alive = false; hit.o.setVisible(false); shot.setVisible(false); music.sfx('tick'); }
          else if (shot.y < 70) shot.setVisible(false);
        }
        label.setText(this.tr(TXT.bugsHud, alive.length));
        return alive.length === 0 ? true : alive.some(b => b.o.y + 16 >= LINE) ? false : undefined;
      };
    });
    music.play(this.s.map);
    return won;
  }

  // Question rally, seen from above the lunch table: she fires a question across, Up/Down moves your answer to bat it
  // back, and she always returns it, a little faster. Where it hits your answer sets the angle. Let one past and you
  // have to answer it properly. Chocolate keeps her busy and slows her down. (The aunt at Sunday lunch.)
  rally(n: number, sweetened: boolean) {
    return this.play<boolean>(0x6b4a2b, (add, label) => {
      const QS = [TXT.lq1, TXT.lq2, TXT.lq3, TXT.lq4, TXT.lq5], TOP = 110, BOTTOM = 450, MINE = 100, HERS = W - 110, HALF = 50;
      add(this.add.rectangle(W / 2, (TOP + BOTTOM) / 2, W - 60, BOTTOM - TOP, 0xb98d5a).setStrokeStyle(4, 0x8a5a44)); // the table
      add(this.add.image(W - 50, (TOP + BOTTOM) / 2, 'aunt').setScale(1.5).setFlipX(true));
      const me = add(this.add.image(46, 280, 'me').setScale(1.3), 62);
      const answer = add(this.add.rectangle(MINE, 280, 14, HALF * 2, 0xf4efe6).setStrokeStyle(2, 0x3d5a80), 62);
      const ball = add(this.add.circle(0, 0, 16, 0xe2574c), 63), mark = add(this.add.text(0, 0, '?', { ...FONT, fontSize: '22px', fontStyle: 'bold' }).setOrigin(0.5), 64);
      const asked = add(this.add.text(W / 2, 88, '', { ...FONT, fontSize: '16px', color: '#fff3b0', align: 'center', wordWrap: { width: W - 120 } }).setOrigin(0.5));
      let back = 0, missed = 0, q = 0, vx = 0, vy = 0, wait = 0;
      const pace = () => (0.3 + back * 0.02) * (sweetened ? 0.75 : 1);
      const serve = (y = TOP + 40 + Math.random() * (BOTTOM - TOP - 80)) => { // she asks the next question
        ball.setPosition(HERS, y); mark.setPosition(HERS, y);
        vx = -pace(); vy = (Math.random() - 0.5) * 0.4;
        asked.setText(this.tr(QS[q++ % QS.length]));
      };
      serve();
      return dt => {
        answer.y = Phaser.Math.Clamp(answer.y + this.held().y * dt * 0.42, TOP + HALF, BOTTOM - HALF);
        me.y = answer.y;
        if ((wait -= dt) > 0) return undefined;
        ball.x += vx * dt; ball.y += vy * dt;
        if (ball.y < TOP + 16 || ball.y > BOTTOM - 16) { vy = -vy; ball.y = Phaser.Math.Clamp(ball.y, TOP + 16, BOTTOM - 16); }
        if (vx < 0 && ball.x <= MINE + 22 && ball.x > MINE - 10 && Math.abs(ball.y - answer.y) < HALF + 14) {
          back++; music.sfx('tick');
          vx = pace(); vy = (ball.y - answer.y) / HALF * 0.3; // the edge of your answer sends it off at an angle
        } else if (ball.x < MINE - 40) { missed++; this.ouch(); wait = 700; serve(); }
        else if (vx > 0 && ball.x >= HERS) serve(ball.y); // she bats it straight back with another question
        mark.setPosition(ball.x, ball.y);
        label.setText(this.tr(TXT.rallyHud, back, n, missed, this.lives));
        return back >= n ? true : missed >= this.lives ? false : undefined;
      };
    });
  }

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
        if (typeof result === 'boolean') music.sfx(result ? 'ok' : 'bad');
        this.undo = null; // a game played to the end stays played
        done(result);
      };
      this.events.on('update', loop);
    });
  }
  ouch() { this.cameras.main.shake(130, 0.012); music.sfx('bad'); } // every mistake looks and sounds the same
  get lives() { return this.s.flags.munich ? 4 : 3; } // Munich perk: one more mistake allowed
  held() { const k = this.keys; return { x: (+k.right.isDown - +k.left.isDown) || pad.x, y: (+k.down.isDown - +k.up.isDown) || pad.y }; }
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
    let ok = true;
    for (let i = 0; i < n && ok; i++) {
      this.show(() => this.tr(TXT.repeat), seq.slice(0, i).map(g => GLYPH[g]).join(' '));
      ok = KEYS.indexOf(await this.key(KEYS)) === seq[i];
    }
    this.undo = null;
    return ok;
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
          if (!th.hit && th.lane === lane && Math.abs(th.o.x - p.x) < 44) { th.hit = true; hits++; this.ouch(); }
        }
        label.setText(this.tr(TXT.dodgeHud, this.left(seconds, t), Math.min(hits, 3)));
        return t >= seconds * 1000 ? hits : undefined;
      };
    });
  }

  // Departure board: it keeps flipping. Find the train to Genève and press Space on its row before it flips again. (Lyon.)
  board(rounds: number) {
    return this.play<boolean>(0x14161c, (add, label) => {
      const TOWNS = ['Paris', 'Dijon', 'Grenoble', 'Annecy', 'Lille', 'Nice', 'Nantes', 'Metz', 'Chambéry', 'Valence'], N = 6;
      add(this.add.rectangle(W / 2, 255, 500, 330, 0x1c1e21).setStrokeStyle(3, 0x59606b));
      const rows = Array.from({ length: N }, (_, i) => add(this.add.text(W / 2, 130 + i * 50, '', { ...FONT, fontSize: '24px', color: '#f2c94c' }).setOrigin(0.5), 62));
      const cursor = add(this.add.rectangle(W / 2, 0, 470, 44).setStrokeStyle(3, 0xffffff), 63);
      let at = 0, goal = 0, hits = 0, misses = 0, due = 0, now = 0;
      const flip = () => {
        goal = Math.floor(Math.random() * N); due = now + 3800 - hits * 300;
        const towns = [...TOWNS].sort(() => Math.random() - 0.5);
        rows.forEach((r, i) => r.setText(`17:${String(5 + i * 9).padStart(2, '0')}  ${(i === goal ? 'Genève' : towns[i]).padEnd(9)}  ${'ABCDEFGHJK'[Math.floor(Math.random() * 10)]}`));
      };
      const answer = (right: boolean) => { if (right) { hits++; music.sfx('tick'); } else { misses++; this.ouch(); } flip(); };
      flip();
      this.onKey = c => {
        if (c === 'ArrowUp') at = (at + N - 1) % N;
        if (c === 'ArrowDown') at = (at + 1) % N;
        if (c === 'Space') answer(at === goal);
      };
      return (_, t) => {
        now = t;
        if (t > due) answer(false);
        cursor.y = rows[at].y;
        label.setText(this.tr(TXT.boardHud, hits, rounds, misses, this.lives, Math.max(0, Math.ceil((due - t) / 1000))));
        return hits >= rounds ? true : misses >= this.lives ? false : undefined;
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
        else { misses++; this.ouch(); }
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

  // Pétanque from above: Up/Down aims, hold Space to build power and let go to throw. Closer to the jack than their boule
  // wins the end; win most of them. (The old men in Marseille.)
  boules(ends: number) {
    return this.play<boolean>(0x5a9e4b, (add, label) => {
      label.setColor('#1c1e21');
      const X0 = 80, Y0 = 270, need = Math.ceil(ends / 2);
      add(this.add.rectangle(W / 2 + 20, Y0, 640, 300, 0xd8c79a)); // the gravel
      const line = add(this.add.rectangle(X0, Y0, 620, 2, 0xffffff, 0.6).setOrigin(0, 0.5));
      const jack = add(this.add.circle(0, 0, 7, 0xf2c94c).setStrokeStyle(2, 0x8a6a1a), 62);
      const theirs = add(this.add.circle(0, 0, 13, 0x8a8f98).setStrokeStyle(2, 0x3a3f48), 62);
      const mine = add(this.add.circle(X0, Y0, 13, 0xd5dbe3).setStrokeStyle(3, 0x3d5a80), 63);
      add(this.add.rectangle(30, Y0, 18, 204, 0x0d151e).setStrokeStyle(2, 0x6b7a8a));
      const meter = add(this.add.rectangle(30, Y0 + 100, 12, 1, 0xf2c94c).setOrigin(0.5, 1), 62);
      const verdict = add(this.add.text(0, 0, '', { ...FONT, fontSize: '34px', fontStyle: 'bold' }).setOrigin(0.5), 64);
      let thrown = 0, won = 0, ang = 0, power = 0, armed = false, phase: 'aim' | 'roll' | 'show' = 'aim', since = 0;
      const setUp = () => {
        jack.setPosition(430 + Math.random() * 190, 180 + Math.random() * 180);
        const a = Math.random() * 6.28, r = 26 + Math.random() * 34;
        theirs.setPosition(jack.x + Math.cos(a) * r, jack.y + Math.sin(a) * r);
        mine.setPosition(X0, Y0); power = 0; armed = false; phase = 'aim'; verdict.setText('');
      };
      setUp();
      return (dt, t) => {
        const hold = this.keys.space.isDown || pad.a;
        if (phase === 'aim') {
          ang = Phaser.Math.Clamp(ang + this.held().y * dt * 0.0005, -0.5, 0.5);
          if (!hold) { if (power > 0) { phase = 'roll'; since = t; } armed = true; } // Space still held from the dialogue does not count
          else if (armed) power = Math.min(1, power + dt / 1400);
        } else if (phase === 'roll') {
          const u = Math.min(1, (t - since) / 900), d = power * 620 * (1 - (1 - u) ** 2); // rolls out and slows down
          mine.setPosition(X0 + Math.cos(ang) * d, Y0 + Math.sin(ang) * d);
          if (u >= 1) {
            const mineCloser = Phaser.Math.Distance.BetweenPoints(mine, jack) < Phaser.Math.Distance.BetweenPoints(theirs, jack);
            thrown++; phase = 'show'; since = t;
            if (mineCloser) { won++; music.sfx('tick'); } else this.ouch();
            verdict.setPosition(jack.x, jack.y - 40).setText(mineCloser ? '✓' : '✗').setColor(mineCloser ? '#1e7a3c' : '#b02a2a');
          }
        } else if (t - since > 1100) {
          if (won >= need || thrown - won > ends - need) return won >= need;
          setUp();
        }
        line.setRotation(ang).setVisible(phase === 'aim');
        meter.setSize(12, Math.max(1, 200 * power));
        label.setText(this.tr(TXT.boulesHud, won, need, thrown, ends));
        return undefined;
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

  // Reaction: a fire flares up in one of four spots, press that arrow before it spreads. (The kitchen fire.)
  whack(count: number) {
    return this.play<boolean>(0x2a1c1c, (add, label) => {
      const KEYS = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'], GLYPH = '↑→↓←';
      const SPOT = [[W / 2, 130], [W / 2 + 190, 260], [W / 2, 390], [W / 2 - 190, 260]];
      SPOT.forEach(([x, y], i) => {
        add(this.add.rectangle(x, y, 96, 96, 0x000000, 0.35).setStrokeStyle(2, 0x8a8f98));
        add(this.add.text(x, y, GLYPH[i], { ...FONT, fontSize: '34px', color: '#59606b' }).setOrigin(0.5));
      });
      const thing = add(this.add.image(0, 0, 'flame').setScale(1.7), 62).setVisible(false);
      let hits = 0, misses = 0, spot = -1, due = 700, born = 0, now = 0;
      const miss = () => { misses++; spot = -1; thing.setVisible(false); due = now + 400; this.ouch(); };
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
        label.setText(this.tr(TXT.whackHud, hits, count, misses, this.lives));
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
          if (stun <= 0 && Phaser.Math.Distance.Between(j.x, j.y, rov.x, rov.y) < 40) { stun = 900; this.ouch(); }
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

  // Lights out: Space switches the LED under the cursor and its four neighbours, which are outlined in orange so the rule
  // is visible before you press; light all nine. (The matrix headlight.)
  leds(seconds: number) {
    return this.play<boolean>(0x14161c, (add, label) => {
      const on: boolean[] = Array(9).fill(true);
      const cross = (i: number) => [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]
        .map(([dx, dy]) => [i % 3 + dx, Math.floor(i / 3) + dy])
        .filter(([x, y]) => x >= 0 && x < 3 && y >= 0 && y < 3).map(([x, y]) => y * 3 + x);
      const flip = (i: number) => cross(i).forEach(j => { on[j] = !on[j]; });
      // Three different presses away from solved: never solved already (3x3 presses are independent), and three presses fix it.
      [...on.keys()].sort(() => Math.random() - 0.5).slice(0, 3).forEach(flip);
      const cells = on.map((_, i) => add(this.add.circle(250 + (i % 3) * 110, 160 + Math.floor(i / 3) * 110, 40, 0)));
      const cursor = add(this.add.rectangle(0, 0, 104, 104).setStrokeStyle(4, 0xffffff), 63);
      let at = 4;
      this.onKey = c => {
        const d = ({ ArrowLeft: -1, ArrowRight: 1, ArrowUp: -3, ArrowDown: 3 } as Record<string, number>)[c];
        if (d && at + d >= 0 && at + d < 9 && (Math.abs(d) === 3 || Math.floor((at + d) / 3) === Math.floor(at / 3))) at += d;
        if (c === 'Space') { flip(at); music.sfx('tick'); }
      };
      return (_, t) => {
        const hit = cross(at);
        cells.forEach((cell, i) => cell.setFillStyle(on[i] ? 0xfff3b0 : 0x2a2d35).setStrokeStyle(5, hit.includes(i) ? 0xf28b2c : 0x3a3d45));
        cursor.setPosition(cells[at].x, cells[at].y);
        label.setText(this.tr(TXT.lightsHud, on.filter(Boolean).length, this.left(seconds, t)));
        return on.every(Boolean) ? true : t >= seconds * 1000 ? false : undefined;
      };
    });
  }

  // Sorting: one slip at a time, Left = fine, Right = suspicious, and dithering counts as a mistake. (Bank compliance.)
  sort(count: number) {
    return this.play<boolean>(0x1f2a24, (add, label) => {
      const deck = [...SORT_ITEMS].sort(() => Math.random() - 0.5).slice(0, count);
      add(this.add.text(60, 390, this.tr(TXT.sortOk), { ...FONT, fontSize: '18px', color: '#3fbf7f' }));
      add(this.add.text(W - 60, 390, this.tr(TXT.sortBad), { ...FONT, fontSize: '18px', color: '#ff8a80' }).setOrigin(1, 0));
      add(this.add.rectangle(W / 2, 240, 580, 120, 0xf4efe6).setStrokeStyle(3, 0x1c1e21));
      const slip = add(this.add.text(W / 2, 240, '', { ...FONT, fontSize: '19px', color: '#1c1e21', align: 'center', wordWrap: { width: 540 } }).setOrigin(0.5), 62);
      let i = 0, misses = 0, born = 0, now = 0;
      const next = (wrong: boolean) => { if (wrong) { misses++; this.ouch(); } i++; born = now; };
      this.onKey = c => { if (i < count && (c === 'ArrowLeft' || c === 'ArrowRight')) next((c === 'ArrowRight') !== deck[i].bad); };
      return (_, t) => {
        now = t;
        if (i < count && t - born > 4500) next(true);
        if (i < count) slip.setText(this.tr(deck[i].text));
        label.setText(this.tr(TXT.sortHud, i, count, misses, this.lives));
        return misses >= this.lives ? false : i >= count ? true : undefined;
      };
    });
  }

  // Gliding: hold Up to climb, let go to sink; peaks rise from below, clouds hang from above. (Paragliding.)
  glide(seconds: number) {
    return this.play<boolean>(0x9fd3f0, (add, label) => {
      label.setColor('#1c1e21');
      const wing = add(this.add.image(170, 220, 'glider').setScale(1.4), 63);
      const blocks: { o: Phaser.GameObjects.Rectangle; hit: boolean }[] = [];
      let vy = 0, hits = 0, next = 800;
      return (dt, t) => {
        vy = Phaser.Math.Clamp(vy + (this.held().y < 0 ? -620 : 420) * dt / 1000, -260, 260);
        wing.y = Phaser.Math.Clamp(wing.y + vy * dt / 1000, 90, H - 30);
        if (t > next && t < seconds * 1000 - 2500) { // one obstacle at a time, so there is always a way past
          next = t + 950 + Math.random() * 500;
          const cloud = Math.random() < 0.35, h = 90 + Math.random() * 140;
          blocks.push({ o: add(this.add.rectangle(W + 50, cloud ? 70 + h / 2 : H - h / 2, 70, h, cloud ? 0xffffff : 0x6b7a66)), hit: false });
        }
        for (const b of blocks) {
          b.o.x -= dt * 0.25;
          if (!b.hit && Math.abs(b.o.x - wing.x) < 55 && Math.abs(b.o.y - wing.y) < b.o.height / 2 + 16) { b.hit = true; hits++; this.ouch(); }
        }
        label.setText(this.tr(TXT.glideHud, this.left(seconds, t), Math.min(hits, 3)));
        return hits >= 3 ? false : t >= seconds * 1000 ? true : undefined;
      };
    });
  }

  // Sprint: alternate Left and Right to run; returns your place out of four. (The river race.)
  mash(metres: number) {
    return this.play<number>(0x3d6b4a, (add, label) => {
      const LANE = [160, 230, 300, 370], START = 60, END = W - 80;
      add(this.add.rectangle(END + 26, 265, 6, 290, 0xffffff));
      const who = ['me', 'tourist', 'banker', 'friend'].map((tex, i) => add(this.add.image(START, LANE[i], tex).setScale(1.3), 62));
      const pos = [0, 0, 0, 0], pace = [0, 5.2, 6.1, 5.7]; // rivals' metres per second
      let speed = 0, last = '';
      this.onKey = c => { if ((c === 'ArrowLeft' || c === 'ArrowRight') && c !== last) { last = c; speed += 1.1; } };
      return (dt, t) => {
        speed *= 0.4 ** (dt / 1000); // legs tire: about five alternations a second holds a winning pace
        pos[0] += speed * dt / 1000;
        for (let i = 1; i < 4; i++) pos[i] += pace[i] * (0.85 + 0.3 * Math.sin(t / 700 + i * 2)) * dt / 1000;
        who.forEach((o, i) => { o.x = START + (END - START) * Math.min(1, pos[i] / metres); });
        const ahead = pos.slice(1).filter(p => p > pos[0]).length;
        label.setText(this.tr(TXT.mashHud, Math.max(0, Math.ceil(metres - pos[0])), 1 + ahead));
        return pos[0] >= metres ? 1 + ahead : t > 45000 ? 4 : undefined;
      };
    });
  }

  // Catching: move Left/Right under what falls; ripe ones count, green ones hurt. (The mango tree.)
  gather(n: number) {
    return this.play<boolean>(0x8fd0a0, (add, label) => {
      label.setColor('#1c1e21');
      add(this.add.rectangle(W / 2, 455, W + 80, 70, 0x5a9e4b));
      const me = add(this.add.image(W / 2, 395, 'me').setScale(1.5), 63);
      const fruit: { o: Phaser.GameObjects.Image; bad: boolean; done: boolean }[] = [];
      let got = 0, misses = 0, next = 500;
      return (dt, t) => {
        me.x = Phaser.Math.Clamp(me.x + this.held().x * dt * 0.42, 40, W - 40);
        if (t > next) {
          next = t + 450 + Math.random() * 350;
          const bad = Math.random() < 0.3;
          fruit.push({ o: add(this.add.image(60 + Math.random() * (W - 120), 80, bad ? 'greenmango' : 'mango').setScale(1.1)), bad, done: false });
        }
        for (const f of fruit) {
          if (f.done) continue;
          f.o.y += dt * 0.24;
          const caught = f.o.y > 365 && f.o.y < 425 && Math.abs(f.o.x - me.x) < 42;
          if (!caught && f.o.y < 470) continue;
          f.done = true; f.o.setVisible(false);
          if (caught && f.bad) { misses++; this.ouch(); } else if (caught) got++;
        }
        label.setText(this.tr(TXT.catchHud, got, n, misses, this.lives));
        return got >= n ? true : misses >= this.lives ? false : undefined;
      };
    });
  }

  // Tag: you are it. Kids bolt when you get close and wander otherwise; corner them all in time. (The birthday party.)
  tag(n: number, seconds: number) {
    return this.play<boolean>(0x7fc97f, (add, label) => {
      label.setColor('#1c1e21');
      const me = add(this.add.image(W / 2, 270, 'me').setScale(1.4), 63);
      const kids = Array.from({ length: n }, (_, i) => ({
        o: add(this.add.image(60 + Math.random() * (W - 120), 110 + Math.random() * (H - 160), ['kid', 'kid2', 'kid3'][i % 3]).setScale(0.95), 62),
        dir: Math.random() * 6.28, dash: 0, out: false,
      }));
      return (dt, t) => {
        const h = this.held();
        me.x = Phaser.Math.Clamp(me.x + h.x * dt * 0.3, 30, W - 30);
        me.y = Phaser.Math.Clamp(me.y + h.y * dt * 0.3, 90, H - 30);
        for (const k of kids) {
          if (k.out) continue;
          const d = Phaser.Math.Distance.Between(k.o.x, k.o.y, me.x, me.y);
          if (d < 36) { k.out = true; k.o.setAlpha(0.25); continue; }
          const scared = d < 150, cornered = k.o.x < 45 || k.o.x > W - 45 || k.o.y < 105 || k.o.y > H - 45;
          k.dash -= dt;
          if (k.dash <= 0) {
            // Cornered kids bolt back towards the middle, squealing; otherwise they run from you, or wander.
            if (scared && cornered) { k.dash = 700; k.dir = Math.atan2(270 - k.o.y, W / 2 - k.o.x) + (Math.random() - 0.5) * 1.6; }
            else k.dir = scared ? Math.atan2(k.o.y - me.y, k.o.x - me.x) + Math.sin(t / 300 + k.o.x) * 0.6 : k.dir + (Math.random() - 0.5) * 0.3;
          }
          const step = (k.dash > 0 ? 0.55 : scared ? 0.26 : 0.08) * dt; // tuned by simulation: a perfect chaser needs about 8 s
          k.o.x = Phaser.Math.Clamp(k.o.x + Math.cos(k.dir) * step, 30, W - 30);
          k.o.y = Phaser.Math.Clamp(k.o.y + Math.sin(k.dir) * step, 90, H - 30);
        }
        const free = kids.filter(k => !k.out).length;
        label.setText(this.tr(TXT.tagHud, n - free, n, this.left(seconds, t)));
        return free === 0 ? true : t >= seconds * 1000 ? false : undefined;
      };
    });
  }

  // Route reading: holds run bottom to top, each with an arrow; press them in order before your arms give out. (Bouldering.)
  climb(n: number, seconds = 15) {
    return this.play<boolean>(0x4a4e57, (add, label) => {
      const KEYS = ['ArrowLeft', 'ArrowUp', 'ArrowRight'], GLYPH = '←↑→', X = [W / 2 - 110, W / 2, W / 2 + 110];
      const route = Array.from({ length: n }, () => Math.floor(Math.random() * 3));
      const y = (i: number) => 430 - i * (330 / n);
      route.forEach((r, i) => {
        add(this.add.circle(X[r], y(i), 12, [0xf2c94c, 0xe2574c, 0x3fbf7f][r]));
        add(this.add.text(X[r], y(i), GLYPH[r], { ...FONT, fontSize: '17px', color: '#1c1e21' }).setOrigin(0.5), 62);
      });
      const me = add(this.add.image(W / 2, 455, 'me').setScale(0.85), 63);
      let at = 0, slips = 0;
      this.onKey = c => {
        const k = KEYS.indexOf(c);
        if (k < 0 || at >= n) return;
        if (k !== route[at]) { slips++; this.ouch(); return; }
        me.setPosition(X[route[at]] + 26, y(at));
        at++;
      };
      return (_, t) => {
        label.setText(this.tr(TXT.climbHud, at, n, slips, this.lives, this.left(seconds, t)));
        return at >= n ? true : slips >= this.lives || t >= seconds * 1000 ? false : undefined;
      };
    });
  }

  // Red light, green light: hold Space to creep forward, but only while he is not looking. (The armrest on the flight out.)
  sneak(seconds: number) {
    return this.play<boolean>(0x26324a, (add, label) => {
      add(this.add.image(130, 150, 'me').setOrigin(0).setScale(10 / 3), 62);
      const foe = add(this.add.image(470, 150, 'cryptoman').setOrigin(0).setScale(10 / 3), 62);
      const mood = add(this.add.text(550, 112, '', { ...FONT, fontSize: '44px' }).setOrigin(0.5), 63);
      add(this.add.rectangle(W / 2, 372, 424, 26, 0x0d151e).setStrokeStyle(2, 0x6b7a8a));
      const bar = add(this.add.rectangle(W / 2 - 208, 372, 1, 18, 0x3fbf7f).setOrigin(0, 0.5), 62);
      let progress = 0, caught = 0, looking = false, flip = 1500, grace = 0;
      return (dt, t) => {
        if (t > flip) { looking = !looking; flip = t + (looking ? 700 + Math.random() * 800 : 1200 + Math.random() * 1500); grace = 250; }
        grace -= dt;
        const soon = !looking && flip - t < 400; // a moment's warning before they turn
        mood.setText(looking ? '!' : soon ? '?' : 'z').setColor(looking ? '#ff6b6b' : soon ? '#f2c94c' : '#8a93a6');
        foe.setAlpha(looking ? 1 : 0.6);
        const pushing = this.keys.space.isDown || pad.a;
        if (pushing && looking && grace <= 0) { caught++; progress = Math.max(0, progress - 25); grace = 700; this.ouch(); }
        else if (pushing && !looking) progress += dt * 0.012; // about eight seconds of pushing in total
        bar.setSize(416 * Math.min(1, progress / 100), 18);
        label.setText(this.tr(TXT.sneakHud, Math.floor(Math.min(100, progress)), caught, this.lives, this.left(seconds, t)));
        return progress >= 100 ? true : caught >= this.lives || t >= seconds * 1000 ? false : undefined;
      };
    });
  }

  // Stacking: each tupperware slides to and fro above the pile; Space drops it, and only the part resting on the one below
  // fits, so the pile narrows with every sloppy drop. A miss falls into the aisle. (Mum's care packages in the overhead bin.)
  stack(n: number) {
    return this.play<boolean>(0x2b3245, (add, label) => {
      const ITEMS = ['pão de queijo', 'goiabada', 'doce de leite', 'paçoca', 'requeijão', 'café', 'farofa', 'guaraná', 'Havaianas'];
      const TINT = [0xe2574c, 0x3f8fd0, 0xf2c94c, 0x3fbf7f, 0xc77dff, 0xff8fab], MID = W / 2, FLOOR = 428, BH = 34;
      add(this.add.rectangle(MID, 272, 460, 352, 0x1c2130).setStrokeStyle(4, 0x8a8f98)); // the open bin
      const box = (i: number, x: number, w: number) => {
        const y = FLOOR - i * BH, r = add(this.add.rectangle(x, y, w, BH - 4, TINT[i % TINT.length]).setStrokeStyle(2, 0x1c1e21), 62);
        const tag = add(this.add.text(x, y, ITEMS[i % ITEMS.length], { ...FONT, fontSize: '13px', color: '#1c1e21' }).setOrigin(0.5), 63);
        tag.setVisible(tag.width < w - 6);
        return [r, tag];
      };
      let top = { x: MID, w: 230 }, placed = 0, misses = 0, swing = 0;
      box(0, top.x, top.w); // the first one goes in by itself
      let moving = box(1, MID, top.w);
      this.onKey = c => {
        if (c !== 'Space' || placed >= n) return;
        const x = moving[0].x;
        moving.forEach(o => o.setVisible(false));
        let l = Math.max(x, top.x) - top.w / 2, r = Math.min(x, top.x) + top.w / 2;
        if (Math.abs(x - top.x) < 6) { l = top.x - top.w / 2; r = top.x + top.w / 2; } // near enough counts as perfect
        if (r - l < 10) { misses++; this.ouch(); }
        else { placed++; top = { x: (l + r) / 2, w: r - l }; box(placed, top.x, top.w); music.sfx('tick'); }
        moving = box(placed + 1, MID, top.w);
      };
      return dt => {
        swing += dt * (0.0016 + placed * 0.00018); // a little quicker with every one in
        moving.forEach(o => { o.x = MID + 200 * Math.sin(swing); });
        label.setText(this.tr(TXT.stackHud, placed, n, misses, this.lives));
        return placed >= n ? true : misses >= this.lives ? false : undefined;
      };
    });
  }

  // Formation: three wings weave up and down ahead of you; hold Up to climb and stay level with the one in front. (Flying with the Badgers.)
  formation(seconds: number) {
    return this.play<boolean>(0x9fd3f0, (add, label) => {
      label.setColor('#1c1e21');
      const path = (t: number) => 250 + 115 * Math.sin(t / 1400) + 35 * Math.sin(t / 530);
      const wings = [0, 1, 2].map(i => add(this.add.image(580 - i * 135, 250, 'glider').setScale(1.15), 62));
      const slot = add(this.add.circle(175, 250, 26).setStrokeStyle(2, 0x1c1e21, 0.35));
      const me = add(this.add.image(175, 250, 'glider').setScale(1.3), 63);
      let vy = 0, inside = 0;
      return (dt, t) => {
        wings.forEach((w, i) => { w.y = path(t - (i + 1) * 420); });
        slot.y = path(t - 4 * 420); // your place in the line
        vy = Phaser.Math.Clamp(vy + (this.held().y < 0 ? -620 : 420) * dt / 1000, -260, 260);
        me.y = Phaser.Math.Clamp(me.y + vy * dt / 1000, 90, H - 30);
        const ok = Math.abs(me.y - slot.y) < 42;
        if (ok) inside += dt;
        slot.setStrokeStyle(3, ok ? 0x2bb673 : 0x1c1e21, ok ? 1 : 0.35);
        label.setText(this.tr(TXT.formHud, Math.floor(100 * inside / Math.max(1, t)), this.left(seconds, t)));
        return t >= seconds * 1000 ? inside / t >= 0.6 : undefined;
      };
    });
  }

  // Dance: arrows fall in four columns; press each one as it crosses the line. (The Badgers' Halloween party.)
  dance(n: number) {
    return this.play<boolean>(0x1a1026, (add, label) => {
      const KEYS = ['ArrowLeft', 'ArrowDown', 'ArrowUp', 'ArrowRight'], GLYPH = '←↓↑→', X = [240, 320, 400, 480], LINE = 400;
      const need = Math.ceil(n * 0.7);
      add(this.add.rectangle(W / 2, LINE, 330, 46, 0xffffff, 0.08).setStrokeStyle(2, 0xf28b2c));
      add(this.add.image(110, 300, 'pumpkin').setScale(2.2));
      const me = add(this.add.image(610, 300, 'me').setScale(2.2));
      const notes: { o: Phaser.GameObjects.Text; col: number; done: boolean }[] = [];
      let spawned = 0, hits = 0, next = 700;
      this.onKey = c => {
        const col = KEYS.indexOf(c);
        const note = notes.find(q => !q.done && q.col === col && Math.abs(q.o.y - LINE) < 36);
        if (!note) return;
        note.done = true; note.o.setVisible(false); hits++;
        music.sfx('tick'); me.setFlipX(!me.flipX);
      };
      return (dt, t) => {
        if (spawned < n && t > next) {
          next = t + 520; // the beat
          const col = Math.floor(Math.random() * 4); spawned++;
          notes.push({ o: add(this.add.text(X[col], 80, GLYPH[col], { ...FONT, fontSize: '34px', color: '#f28b2c' }).setOrigin(0.5), 62), col, done: false });
        }
        for (const q of notes) {
          if (q.done) continue;
          q.o.y += dt * 0.2;
          if (q.o.y > LINE + 40) { q.done = true; q.o.setVisible(false); }
        }
        label.setText(this.tr(TXT.danceHud, hits, need, n - spawned + notes.filter(q => !q.done).length));
        return spawned === n && notes.every(q => q.done) ? hits >= need : undefined;
      };
    });
  }

  // Oven watch: four trays bake at their own speed; press a tray's arrow when it is golden, not pale and not burnt. (Christmas cookies.)
  oven(n: number) {
    return this.play<boolean>(0x3b2420, (add, label) => {
      const KEYS = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'], GLYPH = '↑→↓←';
      const SPOT = [[W / 2, 140], [W / 2 + 190, 265], [W / 2, 390], [W / 2 - 190, 265]];
      const trays = SPOT.map(([x, y], i) => {
        add(this.add.rectangle(x, y, 104, 84, 0x1c1210).setStrokeStyle(2, 0x8a8f98));
        add(this.add.text(x, y + 56, GLYPH[i], { ...FONT, fontSize: '20px', color: '#c9ced6' }).setOrigin(0.5));
        return { cookie: add(this.add.circle(x, y, 28, 0xf3e2b3), 62), start: i * 500, time: 3200 + Math.random() * 2200 };
      });
      let good = 0, ruined = 0, now = 0;
      const reset = (tr: typeof trays[number]) => { tr.start = now + 500; tr.time = 3000 + Math.random() * 2400; };
      const phase = (tr: typeof trays[number]) => (now - tr.start) / tr.time;
      this.onKey = c => {
        const tr = trays[KEYS.indexOf(c)];
        if (!tr || phase(tr) < 0.1) return; // empty tray, or only just in
        const p = phase(tr);
        if (p >= 0.55 && p < 0.82) { good++; music.sfx('tick'); } else { ruined++; this.ouch(); }
        reset(tr);
      };
      return (_, t) => {
        now = t;
        for (const tr of trays) {
          const p = phase(tr);
          if (p >= 1) { ruined++; this.ouch(); reset(tr); }
          tr.cookie.setVisible(p >= 0).setFillStyle(p < 0.3 ? 0xf3e2b3 : p < 0.55 ? 0xe9cd8a : p < 0.82 ? 0xd9a441 : 0x4a3220);
        }
        label.setText(this.tr(TXT.ovenHud, good, n, ruined, this.lives + 1));
        return good >= n ? true : ruined > this.lives ? false : undefined;
      };
    });
  }

  // Riding with the Capuns, seen from the side: everyone rides to the right. The peloton surges, eases and drifts across
  // the road; sit in the green slipstream just behind it (all four arrows). Out of it your legs drain; ride into a wheel and you touch.
  paceline(seconds: number) {
    return this.play<boolean>(0x4f8a45, (add, label) => {
      const MID = 285;
      add(this.add.rectangle(W / 2, MID, W + 80, 250, 0x55585f));
      const dashes = [0, 1, 2, 3, 4, 5, 6].map(i => add(this.add.rectangle(i * 130, MID, 46, 5, 0xffffff, 0.7)));
      // The back of the peloton. Tuned by simulation: idle riders are dropped in ~9 s, a 350 ms reaction still finishes.
      const back = (t: number) => ({ x: 330 + 70 * Math.sin(t / 1700) + 22 * Math.sin(t / 600), y: MID + 60 * Math.sin(t / 1300) + 20 * Math.sin(t / 480) });
      const RANKS = [[0, -22], [0, 22], [62, -44], [62, 0], [62, 44], [124, -22], [124, 22]]; // seven riders in three ranks
      const riders = RANKS.map(() => add(this.add.image(0, 0, 'capun').setScale(1.1), 62));
      const zone = add(this.add.rectangle(0, 0, 68, 64, 0x3fbf7f, 0.2).setStrokeStyle(2, 0x3fbf7f, 0.9), 61);
      const me = add(this.add.image(200, MID, 'me_bike').setScale(1.1), 63);
      add(this.add.rectangle(40, MID, 22, 204, 0x0d151e).setStrokeStyle(2, 0x6b7a8a), 64);
      const bar = add(this.add.rectangle(40, MID + 100, 16, 200, 0x3fbf7f).setOrigin(0.5, 1), 65);
      // Cars overtake from behind. Nobody is ever hit: a car whose lane is blocked swerves round at the last moment,
      // honks and has an opinion. If it was you in the way, the fright costs some legs.
      const cars: { o: Phaser.GameObjects.Image; warn: Phaser.GameObjects.Text; lane: number; side: number }[] = [];
      const shout = add(this.add.text(0, 0, '', { ...FONT, fontSize: '15px', color: '#1c1e21', backgroundColor: '#ffffff', padding: { x: 7, y: 4 } }).setOrigin(0.5, 1), 66).setVisible(false);
      let energy = 100, touches = 0, nextCar = 3000, quiet = 0;
      return (dt, t) => {
        if (t > nextCar && t < seconds * 1000 - 3000) {
          nextCar = t + 4200 + Math.random() * 2800;
          const lane = MID + (Math.random() < 0.5 ? -1 : 1) * (30 + Math.random() * 60);
          cars.push({
            o: add(this.add.image(-380, lane, ['car', 'car2', 'car3'][Math.floor(Math.random() * 3)]), 61),
            warn: add(this.add.text(14, lane, '!', { ...FONT, fontSize: '30px', color: '#f2c94c', fontStyle: 'bold' }).setOrigin(0.5), 66),
            lane, side: 0,
          });
        }
        for (const car of cars) {
          car.o.x += dt * 0.46;
          car.warn.setVisible(car.o.x < -40); // a moment's warning at the edge of the road
          const blocking = [me, ...riders].filter(r => r.x > car.o.x - 30 && r.x - car.o.x < 150 && Math.abs(r.y - car.lane) < 40);
          if (blocking.length && !car.side) {
            car.side = blocking[0].y >= car.lane ? -1 : 1; // swerve away from whoever is there
            music.sfx('honk');
            shout.setText(HONKS[Math.floor(Math.random() * HONKS.length)]).setVisible(true);
            quiet = t + 1900;
            if (blocking.includes(me)) { energy -= 8; this.cameras.main.shake(90, 0.006); }
          }
          const alongside = [me, ...riders].some(r => Math.abs(r.x - car.o.x) < 150);
          car.o.y += ((car.side && alongside ? car.lane + car.side * 78 : car.lane) - car.o.y) * Math.min(1, dt / 110);
          if (car.side && t < quiet) shout.setPosition(Phaser.Math.Clamp(car.o.x, 150, W - 150), car.o.y - 26);
        }
        if (t > quiet) shout.setVisible(false);
        dashes.forEach(d => { d.x -= dt * 0.38; if (d.x < -40) d.x += 910; }); // the road rolls past underneath
        const b = back(t), h = this.held();
        riders.forEach((r, i) => r.setPosition(b.x + RANKS[i][0], b.y + RANKS[i][1]));
        zone.setPosition(b.x - 90, b.y);
        me.x = Phaser.Math.Clamp(me.x + h.x * dt * 0.2, 60, W - 60);
        me.y = Phaser.Math.Clamp(me.y + h.y * dt * 0.2, MID - 105, MID + 105);
        if (me.x > b.x - 50 && Math.abs(me.y - b.y) < 44) { touches++; me.x = b.x - 140; this.ouch(); } // wheels touch: you brake hard
        const drafting = Math.abs(me.x - zone.x) < 34 && Math.abs(me.y - zone.y) < 32;
        energy = Phaser.Math.Clamp(energy + (drafting ? 0.006 : -0.013) * dt, 0, 100);
        zone.setFillStyle(0x3fbf7f, drafting ? 0.45 : 0.15);
        bar.setSize(16, 2 * energy).setFillStyle(energy > 35 ? 0x3fbf7f : 0xe2574c);
        label.setText(this.tr(TXT.paceHud, Math.round(energy), touches, this.lives, this.left(seconds, t)));
        return energy <= 0 || touches >= this.lives ? false : t >= seconds * 1000 ? true : undefined;
      };
    });
  }

  // Travel scene behind the dialogue box: a train through hills, or a plane above the clouds.
  backdrop(kind: false | 'train' | 'plane') {
    this.scenery.forEach(o => { this.tweens.killTweensOf(o); o.destroy(); });
    this.scenery = []; this.hills = [];
    music.play(kind ? 'train' : this.s.map);
    if (!kind) return;
    const add = <G extends Obj>(o: G) => { this.scenery.push(o); return this.ui(o, 50); };
    const plane = kind === 'plane';
    add(this.add.rectangle(W / 2, H / 2, W, H, plane ? 0x5fa8e8 : 0x9fd3f0));
    add(this.add.circle(610, 70, 30, 0xffe08a));
    if (plane) { // clouds drift past (they reuse the hills' scrolling), the Atlantic far below
      add(this.add.rectangle(W / 2, 322, W, 30, 0x2a5f93));
      for (let i = 0; i < 6; i++) this.hills.push(add(this.add.ellipse(i * 190, 80 + (i * 67) % 200, 150 + (i % 3) * 40, 44, 0xffffff, 0.92)));
    } else {
      for (let i = 0; i < 5; i++) this.hills.push(add(this.add.ellipse(i * 230, 290, 340, 170 + (i % 2) * 70, i % 2 ? 0x4c8a3f : 0x6bb35a)));
      add(this.add.rectangle(W / 2, 390, W, 200, 0x5a9e4b));
      add(this.add.rectangle(W / 2, 318, W, 6, 0x4a4038));
    }
    const craft = add(this.add.image(W / 2, plane ? 200 : 280, kind));
    this.tweens.add({ targets: craft, y: craft.y - (plane ? 9 : 2), duration: plane ? 900 : 140, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO, parent: 'game', width: W, height: H, backgroundColor: '#101820',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: World,
});
(window as any).game = game;

// Touch controls: the buttons feed the same paths as the keyboard.
const DIR: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
for (const b of document.querySelectorAll<HTMLElement>('#pad [data-key]')) {
  const code = b.dataset.key!;
  const release = () => { if (DIR[code]) pad.x = pad.y = 0; if (code === 'Space') pad.a = false; };
  b.addEventListener('pointerdown', e => {
    e.preventDefault();
    music.unlock();
    const world = game.scene.scenes[0] as World;
    if (code === 'Shift') { pad.shift = !pad.shift; b.classList.toggle('on', pad.shift); }
    else if (code === 'KeyL') world.setLang((world.s.lang + 1) % LANGS.length);
    else if (code === 'KeyM') music.toggleMute();
    else if (code === 'KeyE') world.toggleEllie();
    else if (code === 'KeyI' || (code === 'Escape' && world.boardUi.length)) world.toggleBoard();
    else { if (DIR[code]) [pad.x, pad.y] = DIR[code]; if (code === 'Space') pad.a = true; world.onKey?.(code); }
  });
  for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) b.addEventListener(ev, release);
} // handle for poking at state from the browser console
