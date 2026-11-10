# Life Game

A top-down adventure about one real life: Zurich rent, trains to family in Marseille, a box of memories, and the job hunt in between. Playable in English, French, Portuguese and German.

**Play:** https://michelkluger.github.io/life-game/

## Controls

| Key | Action |
|---|---|
| Arrow keys | Move; walk into people and things to interact |
| Space | Continue, confirm |
| Shift (outdoors) | Ride the bike |
| L | Switch language |
| M | Mute music |

On a phone or tablet, on-screen buttons appear: a direction pad, A to confirm, a bike toggle, L and mute.

## Run locally

Needs [Bun](https://bun.sh).

```
bun install
bun run dev     # http://localhost:3000
bun test
bun run build   # static files in dist/
```

## Where things live

- `src/strings.ts`: every line of text, in four languages
- `src/content.ts`: maps (ASCII) and what each character does
- `src/logic.ts`: money, rent and interview rules
- `src/music.ts`: the chiptune sequencer and one tune per place
- `src/main.ts`: rendering, input, minigames (Phaser)
- `DESIGN.md`: design decisions and what comes next
