# The Archaeology of Sports Scores

An interactive visual essay about the history, oddity and evolution of scoring in sport.

It opens with tennis (“Thirty–love.”) and follows one idea through five parts and fourteen chapters:
**a score begins as memory, becomes language, becomes display, turns into a tool for redesigning the sport itself, and ends up being scored in its turn.**

| | Chapter | Main interactive |
|---|---|---|
| P | Thirty–love | Scroll-driven opening with short animations (*l’œuf* → 0, 15-30-40, an endless deuce, the tie-break), then the 1980 Borg–McEnroe tie-break on film |
| **I** | **Memory** | |
| 1 | Before scores | Order, state, measure |
| 2 | The cut in the stick | Carve a cricket notcher’s tally stick, then read it as a number |
| 3 | Ancient scoreboards | Maya ballgame stone (schematic), the ulama *urra*, Roman lap counter with eggs and dolphins, the pentathlon puzzle |
| 4 | When the match becomes data | Kent v All England, 1744: stick → scorecard → scorebook → database |
| **II** | **Language** | |
| 5 | Every sport invents its own language | Nine playable score displays: tennis, cricket, golf, darts, bowling, rugby, AFL, Gaelic football, baseball |
| 6 | Scores that translate the incomparable | Speed-skating samalog calculator, decathlon formula, Nordic combined start gaps and race |
| 7 | Strange but useful | NHL shootout goal, pickleball 0–0–2, cornhole, shuffleboard, sailing, roller derby, kabaddi |
| **III** | **Display** | |
| 8 | The scoreboard becomes an object | Flip board, Wrigley-style line score, half-time A/B/C board with programme key, curling board |
| 9 | The score moves onto television | From the stadium board to the score bug |
| **IV** | **Redesign** | |
| 10 | The score starts designing the game | Rugby points chart, basketball court (2/3/4 points), 2 vs 3 points for a win, Gaelic two-point arc |
| 11 | The score learns to stop | Reform timeline; side-out vs rally scoring simulation |
| 12 | The clock becomes part of the score | 24-second arithmetic; live basketball/korfball shot clock |
| 13 | When the scoreboard changes the rules | Quadball’s proposed 10 → 1 scoring |
| **V** | **Scoring the score** | |
| 14 | The score behind the score | xG replay simulation, Elo update |
| C | Two cuts in a stick | Scroll-driven coda |

Each chapter card names its part. Scrolling down pauses at a card for about half a second before carrying on (“stop and go”); scrolling up and the contents links are never stopped. Each card has a **Copy link** button that copies a link straight to that chapter.

### Ways in

- **Contents** (the top bar) has three tabs:
  - *Chapters*, headed by the **reading score**: a line score with one column per part, like innings, and a total. The top row is the essay’s minutes of reading; the “You” row fills in with the minutes already behind the reader. Words are counted from the page itself at 238 a minute (the average silent reading rate for non-fiction found by Brysbaert, 2019).
  - *By sport*: every sport, the parts it appears in, and the exhibits that show it.
  - *Short route*: seven exhibits, one for each step of the thesis. Starting it shows a bar at the bottom of the screen that takes the reader from stop to stop.
- **Four ways in** at the end of the prologue: read it all, the short route, find your sport, or the quiz.
- **The quiz**, “Read the scoreboard” (`/quiz`): ten scores from ten sports, played against the board. Each answer shows the essay’s own explanation, its sources, and a link to where the essay shows it.
- A returning reader is offered a jump back to where they stopped; the position is kept only in that browser (`localStorage`).

### Stable addresses

Every chapter and exhibit has an address that names its subject, not its position: `/#cut-in-the-stick`, `/#tally-stick`, `/#line-score`, and for the tabs of the notation gallery `/#notation-afl`. Moving or renumbering chapters does not break links. The numbered addresses of the first version (`/#ch-06` and so on) are sent on to the chapter they meant (`LEGACY_IDS` in `lib/chapters.ts`).

Exhibit numbers such as “2.3” are not written anywhere: they are worked out from the order of `lib/places.ts`.

### One source for the facts

The facts that more than one part of the site needs live in `lib/`, once, with the ids of their sources:

| File | Holds | Used by |
|---|---|---|
| `chapters.ts` | parts and chapters, with their stable ids | title cards, contents, reading score |
| `places.ts` | every exhibit in reading order, its short name and sports | exhibit numbers, index by sport, route, quiz links |
| `notations.ts` | how each sport writes its score and what it means | chapter 5 gallery headers, chapter 7 cases, the quiz |
| `events.ts` | 50 dated moments told in the essay | the timeline page and chapter 11’s reform timeline |
| `route.ts` | the short route | contents, route bar, four ways in |
| `quiz.ts` | the quiz questions (explanations come from `notations.ts`) | `/quiz` |

A numbered bibliography with every source sits at the bottom of the page.

## Running it

Requirements: Node.js 20 or newer (tested on Node 22).

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build (fully static, no server needed):

```bash
npm run build      # writes the site to ./out
npm run preview    # serves ./out on http://localhost:3000
npm run typecheck  # TypeScript only
```

### Deploying

The build output in `out/` is plain HTML, CSS and JavaScript, so any static host works.

- **Vercel**: import the repository; the Next.js preset works as is.
- **Netlify / Cloudflare Pages**: build command `npm run build`, publish directory `out`.
- **GitHub Pages under a sub-path** (e.g. `/sportscores/`): add `basePath: "/sportscores"` to `next.config.ts` before building.

Link previews (Open Graph and X cards) need the site’s full address. It defaults to the public production address, `https://sportscores-history.vercel.app`; on any other host, build with `NEXT_PUBLIC_SITE_URL` set to the real address (including a sub-path, if any). The share image is `app/opengraph-image.png`, rendered from `docs/og-image.html`.

## Tech

- Next.js 16 (App Router, `output: "export"`), React 19, TypeScript
- Hand-written CSS with design tokens (`app/styles/tokens.css`), light and dark themes, no CSS framework
- Custom SVG for every visual; no chart or animation library
- Fonts self-hosted through Fontsource: Newsreader (the “spoken” voice), Big Shoulders Display (numbers “shown” on boards), IBM Plex Mono (“recorded” data and labels), plus IM FELL English and Homemade Apple for the 1744 scorecard reconstruction
- No backend. The only external requests are the embedded YouTube clips (loaded lazily from youtube-nocookie.com)

```
app/
  layout.tsx, page.tsx
  styles/         tokens, base layout, one stylesheet per group of exhibits, wayfinding, quiz
components/
  chapters/       one file per chapter, with the essay copy
  interactives/   the exhibits (tally stick, lap counter, boards, simulations…)
  ui.tsx          Chapter, Exhibit, Cite, Certainty stamps, PullLine
  Scrolly.tsx     sticky-stage scrollytelling used by the opening and the coda
  TopBar.tsx      progress bar and the contents dialog with its three tabs
  ReadingScore.tsx   reading time as a line score
  SportIndex.tsx  the index by sport
  ShortRoute.tsx  the short route: list and bar
  WaysIn.tsx      “four ways in” at the end of the prologue
  Quiz.tsx        the quiz (page: app/quiz/page.tsx)
  StopAndGo.tsx   the brief pause at each chapter title card
  ShareLink.tsx   “Copy link” on each chapter card
  ResumeReading.tsx  “continue where you left off”
  LegacyLinks.tsx sends old #ch-NN links on
  Media.tsx       archive photographs with credits, embedded YouTube clips (with a link-card fallback)
lib/
  sources.ts      the bibliography; citations are numbered from this list
  chapters.ts, places.ts, notations.ts, events.ts, route.ts, quiz.ts, sports.ts
                  the shared facts (see “One source for the facts”)
  reading.ts      counts reading time from the page
  hooks.ts        reduced motion, scroll steps, element width, seeded PRNG
docs/
  media-plan.md   photos and clips in use, and how each was checked
  og-image.html   source of the share image
```

## Editorial rules used

- Every factual claim cites a source from `lib/sources.ts` with `<Cite id="…" />`. The number shown is the source’s position in that list.
- Uncertainty is kept, not smoothed over. Claims that are theories, disputed, folklore, proposals or unknown carry a small stamp (`<Certainty level="theory" />` etc.).
- Photographs are only reproduced when they are public domain or CC0, CC BY or CC BY-SA. They live in `media/`, are imported by the chapters (so the build hashes them and respects a `basePath`), and carry their credit, licence and any cropping underneath (`Photo` in `components/Media.tsx`). The file page of each one is in `lib/sources.ts`.
- Historical objects that cannot be photographed freely (the Maya stone, the 1744 scorecard) and the interactives (the Roman spina, the Wrigley line score) are original, schematic reconstructions, labelled as such. The Maya stone deliberately shows no glyphs or figures. Links to the real objects are in the sources.
- Video clips are embedded from the rights holders’ own YouTube uploads, never re-cut. `docs/media-plan.md` lists the clips and photos in use, how each was checked, and what is still open.
- Teams, players and matches in the interactive examples are invented and labelled as such. The volleyball and xG simulations are simple models, not match data.
- Chart colours were checked for colour-blind separation and contrast in both themes.

## Research notes

Sources were checked in September 2026. The research environment could not open most web pages directly, so claims were verified through web search results that summarise and link the original pages (museum sites, governing bodies, dictionaries, newspapers, and in some places Wikipedia). Before publishing widely, it is worth spot-checking the handful of claims that rest only on Wikipedia or on a single secondary source; they are listed in the bibliography under each chapter.

Points worth knowing:

- **“Love” from *l’œuf*** is presented as folklore; dictionary sources prefer “playing for love”.
- **15-30-40 from a clock face** is presented as a theory.
- **The FIFA Museum stone** (c. 650–850 CE) is described as the museum presents it; its exact use is unknown. The 2023 Chichén Itzá “scoreboard” is presented as a marker whose scoring role is unproven.
- **The ancient pentathlon** scoring method is presented as disputed.
- **The 24-second shot clock arithmetic** is presented as the story told by Danny Biasone and Leo Ferris.
- **Quadball’s 1-and-3 scoring** is presented as a 2026 proposal that was not adopted in the 2026 rulebook.
- **Gaelic football’s two-point arc** is presented as introduced for 2025 and made permanent at a Special Congress in October 2025.

## Accessibility

- All interactives work with a keyboard; the basketball court and Gaelic pitch take arrow keys and Enter.
- Running text, labels and instructions are at least 13 px; on phones the line score and the curling board fit the screen without sideways scrolling.
- State changes are announced through `aria-live` regions.
- `prefers-reduced-motion` turns off decorative motion and shows end states instead.
- Colour is never the only carrier of meaning in charts (direct labels, dash patterns, data tables).
