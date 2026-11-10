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

### Present day

| Place | People and quests |
|---|---|
| Flat | bed (sleep a day), laptop (jobs, dating app, the decision), the box of memories, and Ellie the soft toy elephant: pick her up and E makes her follow you everywhere or stay home |
| Zurich (36x18) | interview at Gletscher Labs; neighbour's wardrobe (one-time CHF 120); lake swimming; paragliding school on the mountain (CHF 300 once); river race (CHF 40); station; airport; tourist, banker, Rösti the dog, the always-late climbing friend, alphorn player, recycling neighbour; the Brazilian expat who wants pão de queijo |
| Marseille (30x13) | birthday cake; ice for the pastis from the fishmonger; pétanque with the old men; the nieces' ball in the harbour (swim for it); boats |
| Brazil (40x16) | return flight CHF 1,200, chocolate CHF 35 at duty-free; Sunday-lunch duel with the aunt (chocolate is the winning move); mother packs pão de queijo after lunch; uncle, cousin, the caramel dog. Quest chain: catch mangoes with the father at the Jewish cemetery where he works -> grandma on the veranda makes the mango sweet -> the friends' birthday party lets you in (big group of friends, lots of kids, balloons, cake table, bouncy castle) -> game of tag -> Parabéns and brigadeiros |

### Memories in the box

Opened in chronological order, each called up by something in the present:

| Memory | Opens after | Play | Reward |
|---|---|---|---|
| Scout camp, 2007 | failing the interview | find rope, arrow-memory knots | BE PREPARED (wins the interview) |
| Svalbard, 2015 | swimming in the lake | polar-night fog, bear guard, fly the robot and collect samples | swim at full speed |
| Vienna, 2016 | getting the job | three tries for a coffee, timing bar | slower crowds in sprints |
| Wiener Neustadt, 2017 | riding 3 km | form A38 runaround between porter and HR, lights-out headlight | faster bike |
| Munich, 2018 | the birthday | dish tracking, then a kitchen-fire reaction game | one extra mistake in timing and reaction games |
| Antarctica, 2019 | paying a month's rent | whiteout flag line, mast balancing, cold-battery quiz | the parka |
| Zurich, 2020 | CHF 5,000 in the account | laptop from IT, flat hunt via the district office, transaction sorting | half-fare train tickets |

The build ends once the box is empty, the job is won, the cake delivered and the Sunday lunch survived.

### Futures

Once the box is empty, the job won, the cake delivered and the lunch survived, the laptop at home offers "Decide what comes next". The answer is computed (`ending()` in `logic.ts`), never picked from a menu, and you can keep playing and decide again.

| Future | How you get it |
|---|---|
| The Lab | commit to the doctorate with the professor (needs three memories), plus Svalbard, Antarctica, Munich, Vienna |
| The Company | put CHF 2,000 into the pão de queijo business (after delivering the pão de queijo), plus wardrobe, bank, Wiener Neustadt |
| Two Streets Away (Marseille) | say yes to the flat near your sister (after the birthday), plus ball, ice, pétanque, trips |
| Home (Brazil) | tell your mother you are coming back (after the pão de queijo), plus lunch, mangoes, sweet, party, trips |
| The City That Grew On You (Zurich) | a second date, plus climbing, pilot licence, medal, swimming. Also the default if you did nothing. |
| Secret: The Box | look into the empty box five times |
| Secret: South | Svalbard and Antarctica done, and 3 km swum |
| Secret: Never Landed | three paragliding flights |
| Secret: Up | doctorate commitment, Munich, race medal and pilot licence |

Scoring for the five ordinary futures: a commitment counts 3, each smaller thing 1 (at most 4); ties go to the most recent commitment. Secret futures win outright, in the order listed.

Dating: the laptop's dating app produces a match who waits by the lake; three questions, one good answer each, two good answers for a second date. Climbing: the always-late friend invites you, then the Boulderhalle has a route-reading game.

### Minigames

User direction 2026-11-10: they are a big part of the fun, so vary them; each kind appears once, twice at most with a different theme.

| Kind | Call | Used for |
|---|---|---|
| Arrow memory | `c.simon(n)` | scout knots |
| Card matching | `c.pairs(seconds)` | the neighbour's wardrobe |
| Lane dodger | `c.dodge(seconds)` | changing trains in Geneva |
| Reaction | `c.whack(count, tex)` | platform changes in Lyon, kitchen fire in Munich |
| Timing bar | `c.timing(rounds)` | Vienna flight computer, pétanque |
| Tracking | `c.aim(seconds)` | Munich satellite dish |
| Free-move collecting | `c.collect(n, seconds)` | Svalbard robot |
| Balance | `c.balance(seconds)` | Antarctic mast |
| Lights out | `c.leds(seconds)` | Wiener Neustadt headlight |
| Sorting | `c.sort(count)` | bank compliance |
| Gliding | `c.glide(seconds)` | paragliding |
| Sprint | `c.mash(metres)` | river race |
| Catching | `c.gather(n)` | mango tree |
| Tag | `c.tag(n, seconds)` | kids at the birthday party |
| Route reading | `c.climb(n)` | bouldering |
| Red light, green light | `c.sneak(seconds, theme)` | the armrest on the flight out, the sleeping baby on the flight back |
| Formation | `c.formation(seconds)` | flying with the Badgers |
| Rhythm | `c.dance(n)` | the Badgers' Halloween party |
| Oven watch | `c.oven(n)` | the Badgers' Christmas cookies |
| Paceline | `c.paceline(seconds)` | riding with the Capuns |
| Conversation choices | plain `c.choose` | the date |
| Turn-based duel | `c.duel(kind)` | job interview, Sunday lunch |

All arcade games run on the shared `play()` stage in `main.ts`; a new kind is about 25 lines. Duels are data in `logic.ts`: the ordinary moves can never win, the special move (earned elsewhere) can, and a test proves both. Other building blocks: `c.backdrop("train" | "plane")` travel scenes, map `fog`, `spawn`.

Also: touch controls (on-screen pad on phones and tablets), sound effects for dialogue, success and mistakes, a two-frame walk; activity tracker (10 tiles = 1 km) in a side column with a fitness-feed style card after each walk, ride or swim; one soft music-box tune per place (M mutes); four languages (picked at start, L switches); autosave.

Tests cover: map shape, every character reachable from the spawn point, a tune for every place, every line in four languages, duel balance, and a scripted playthrough of the whole game.

Known gaps:
- Art is drawn in code, not CC0 packs.
- Touch controls are checked in an emulated phone only, not on a real device.
- The date and the individual Zurich friends are invented composites. From Michel (2026-11-10): his paragliding friends are "the Badgers" (met after the licence; they gather for flying, Christmas cookie baking and Halloween parties) and his cycling friends are "the Capuns". Individual members are unnamed and their lines invented.
- Assumed two nieces; family unnamed. From Michel (2026-11-10): parents and grandma are in Brazil; his father works in the Jewish cemeteries; a big group of friends there, with lots of kids, gathers for birthday parties. The aunt, uncle, cousin and every personality are still invented.
- FR/PT/DE text is AI-translated and not yet proofread by Michel.
- Memory order follows the years, not the original chapter numbering.
- Minigame difficulty is tuned by estimate and simulation, not by play.
- Bun gotcha: an elephant emoji in `index.html` made `bun run dev` fail with "Failed to load bundled module" (production build was fine); the touch button for Ellie is a plain "E" for that reason.
- Phaser gotcha: a scene method named like a Phaser plugin (`load`, `lights`, `time`...) is silently shadowed; `create()` now throws at startup if that happens.

## Open

- A weekly rhythm (work days, energy), real pixel art, São Paulo university years, the UK, a friends' dinner, a nicer ending screen.
