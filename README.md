# The Archaeology of Sports Scores

An interactive visual essay about the history, oddity and evolution of scoring in sport.

It opens with tennis (“Thirty–love.”) and follows one idea through fourteen chapters:
**a score begins as memory, becomes language, becomes display, and eventually becomes a tool for redesigning the sport itself.**

| | Chapter | Main interactive |
|---|---|---|
| P | Thirty–love | Scroll-driven opening with “hold” moments (*l’œuf* → 0, 15-30-40, an endless deuce, the tie-break), then the 1980 Borg–McEnroe tie-break on film |
| 1 | Before scores | Order, state, measure |
| 2 | The cut in the stick | Carve a cricket notcher’s tally stick, then read it as a number |
| 3 | Ancient scoreboards | Maya ballgame stone (schematic), the ulama *urra*, Roman lap counter with eggs and dolphins, the pentathlon puzzle |
| 4 | When the match becomes data | Kent v All England, 1744: stick → scorecard → scorebook → database |
| 5 | Every sport invents its own language | Nine playable score displays: tennis, cricket, golf, darts, bowling, rugby, AFL, Gaelic football, baseball |
| 6 | The scoreboard becomes an object | Flip board, Wrigley-style line score, half-time A/B/C board with programme key, curling board |
| 7 | The score starts designing the game | Rugby points chart, basketball court (2/3/4 points), 2 vs 3 points for a win, Gaelic two-point arc |
| 8 | Television arrives | Reform timeline; side-out vs rally scoring simulation |
| 9 | The clock becomes part of the score | 24-second arithmetic; live basketball/korfball shot clock |
| 10 | Scores that translate the incomparable | Speed-skating samalog calculator, decathlon formula, Nordic combined start gaps and race |
| 11 | Strange but useful | NHL shootout goal, pickleball 0–0–2, cornhole, shuffleboard, sailing, roller derby, kabaddi |
| 12 | When the scoreboard changes the rules | Quadball’s proposed 10 → 1 scoring |
| 13 | The score moves onto television | From the stadium board to the score bug |
| 14 | The score behind the score | xG replay simulation, Elo update |
| C | Two cuts in a stick | Scroll-driven coda |

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

## Tech

- Next.js 16 (App Router, `output: "export"`), React 19, TypeScript
- Hand-written CSS with design tokens (`app/styles/tokens.css`), light and dark themes, no CSS framework
- Custom SVG for every visual; no chart or animation library
- Fonts self-hosted through Fontsource: Newsreader (the “spoken” voice), Big Shoulders Display (numbers “shown” on boards), IBM Plex Mono (“recorded” data and labels), plus IM FELL English and Homemade Apple for the 1744 scorecard reconstruction
- No backend. The only external requests are the embedded YouTube clips (loaded lazily from youtube-nocookie.com)

```
app/
  layout.tsx, page.tsx
  styles/         tokens, base layout, one stylesheet per group of exhibits
components/
  chapters/       one file per chapter, with the essay copy
  interactives/   the exhibits (tally stick, lap counter, boards, simulations…)
  ui.tsx          Chapter, Exhibit, Cite, Certainty stamps, PullLine
  Scrolly.tsx     sticky-stage scrollytelling used by the opening and the coda
  TopBar.tsx      progress bar and contents dialog
lib/
  sources.ts      the bibliography; citations are numbered from this list
  chapters.ts     chapter list for the contents dialog
  hooks.ts        reduced motion, scroll steps, element width, seeded PRNG
```

## Editorial rules used

- Every factual claim cites a source from `lib/sources.ts` with `<Cite id="…" />`. The number shown is the source’s position in that list.
- Uncertainty is kept, not smoothed over. Claims that are theories, disputed, folklore, proposals or unknown carry a small stamp (`<Certainty level="theory" />` etc.).
- No archival images are reproduced. Historical objects (the Maya stone, the Roman spina, the 1744 scorecard, the Wrigley board) are original, schematic reconstructions, labelled as such. The Maya stone deliberately shows no glyphs or figures. Links to the real objects are in the sources.
- Video clips are embedded from the rights holders’ own YouTube uploads, never re-cut. `docs/media-plan.md` lists the clips in use, what still needs checking and the archive photos still to add.
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
- State changes are announced through `aria-live` regions.
- `prefers-reduced-motion` turns off decorative motion and shows end states instead.
- Colour is never the only carrier of meaning in charts (direct labels, dash patterns, data tables).
