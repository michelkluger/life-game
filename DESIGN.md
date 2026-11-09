# Life game: design decisions

Working title pending. Decisions are logged per grilling round.

## Settled (round 1, 2026-11-09)

- **Genre**: top-down tile RPG in the style of classic handheld monster-RPGs: overworld exploration, NPC dialogue, turn-based encounters. Mechanics of the genre only; all art, names, characters and maps are original.
- **Structure**: biography told as levels (chapters), ending in the present.
- **Future**: after the present-day chapter the story branches into multiple possible futures.
- **Cast**: Michel (player), family, friends. Names decided later.
- **Platform**: runs both locally and in a browser.
- **Tone**: warm and funny, with real-life pressure as material: job hunting, money, living far from everyone, dating.
- **Must include**: Zurich, Marseille (sister, partner, nieces), Brazil (parents, family), money, trains, paragliding, cycling, running.

## Settled (round 2)

- **Encounters**: life situations instead of creatures (job interview, landlord, migration office, headwind on the bike, first date). Resolution mechanic is the designer's call per encounter: turn-based with skill moves (Python, German, Charm, Endurance) or a minigame, whichever fits.

- **Party**: none. Solo adventure: travel, meet characters, receive items, gain experience and knowledge (adventure-game feel: talk, fetch, unlock). Family and friends are characters you meet, not companions.

- **Chapters**: 1 São Paulo, 2 Vienna/Wiener Neustadt, 3 Svalbard, 4 Munich, 5 Antarctica, 6 Zurich (present), 7 branching future. Zurich is built first as the playable slice; earlier chapters follow as shorter levels.

- **Endings**: five grounded branches (Science, Founder, Marseille, Brazil, Zurich) decided by play in the Zurich chapter, not a menu. Plus crazier secret endings, designer's call.

- **Travel and sports**: bike = fast overworld movement, owned from start of Zurich. Trains = paid fast travel between cities, with an on-board scene (Zurich to Marseille). Brazil = expensive flight only. Paragliding = licence unlock, glide minigame and shortcut from peaks. Running = races and training that raise stamina. Climbing = gates mountain areas.

- **Money**: one currency (CHF), always visible. Earned from jobs won via interview encounters and small gigs. Drained by scheduled rent, train tickets, the Brazil flight, gear. Zero is not game over: it locks travel and triggers funny odd jobs. Unemployment is a real state in Zurich (no income, rent continues).

- **Audience**: adult game, honest and unfiltered, for Michel and friends. Scenes involving the nieces stay wholesome regardless.

- **Authoring**: everything is AI-coded; Michel directs. So maps, dialogue and quests live as text/data files in the repo, no visual editor workflow.
- **Tech**: Phaser + TypeScript, bundled with Bun, static output, no backend, saves in browser storage. (Chosen over Godot because all content is AI-authored; Bevy and pygame each fail one of local/browser in practice.)

- **Art** (designer's call): CC0 16x16 pixel packs for world tiles, custom pixel characters for the cast, custom landmarks (Zurich HB, Marseille harbour, Antarctic station). Revisit if the mix looks inconsistent in the first slice.

- **Language**: fully playable in English only. Characters drop small bits of Swiss German, Portuguese, French, Danish as optional jokes; missing them never blocks progress. Michel's French is fluent, so the garbling joke applies to Swiss German and Danish, not French.

- **Frame**: the game starts in present-day Zurich (between jobs, rent due, family far away). Past chapters (childhood through to the present) are reached as callbacks from the present, in chronological order. Supersedes the linear chapter order; the chapter list itself stands.
- **Zurich spine**: main quest "figure out what's next" across three threads (Work, People, Body); how time and money are split decides the ending.

- **Doorway to the past** (designer's call): a box of objects in the Zurich flat; each object plays one past chapter as a memory, unlocked chronologically by present-day events. Finishing a memory grants a skill or item usable in the present. Time machine reserved for a secret ending.

- **Fiction level**: real cities and public places; employers, institutions and interviewers are fictional parodies. No precision needed in names; no confidential work details.

- **People**: family appear as themselves (names and details refined later). Friends are invented archetypes; dates are invented composites. Real friends added only when Michel describes them.

## Design principle (2026-11-09)

Exploring is nice, but every stage must mix in puzzles and action. Money is never free: each payout is one-time or gated behind a puzzle or minigame.

## Current build

Run: `bun run dev` then open http://localhost:3000. Tests: `bun test`. Hosted on GitHub Pages from `main` (repo michelkluger/life-game).

In: flat, Zurich, Marseille, scout-camp memory; money and rent; bike (Shift); swimming in the lake; interview encounter; animated train ride with a platform-sprint action minigame; arrow-memory puzzle (wardrobe, tent knots); birthday-cake quest; building signs; one chiptune per place (M mutes); four languages (picked at start, L switches); autosave.

Building blocks for new stages: `c.simon(n)` puzzle, `c.dodge(seconds)` action, `c.interview()`, `c.backdrop()`.

Known gaps:
- Art is drawn in code, not CC0 packs.
- Keyboard only, no touch controls.
- Assumed two nieces; family unnamed.
- FR/PT/DE text is AI-translated and not yet proofread by Michel.

## Open

- Brazil, paragliding, running, climbing, dating, friends, remaining memories, all endings.
