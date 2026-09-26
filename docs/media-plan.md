# Media plan

Status of photos, film and video for the essay, and what still needs doing.
Agreed direction: rights-free archive photos and film hosted in the repo, plus official clips embedded directly from YouTube.

## Rules

- Never cut GIFs or clips from broadcast footage (US Open, Wimbledon, NBA…). Embed the rights holder’s own upload instead.
- Only copy files into `public/` when the licence allows reuse: public domain, CC0, CC BY or CC BY-SA. Record the credit and licence next to the image, and add the file page to `lib/sources.ts`.
- If the licence is unclear, link to the source instead of copying it.
- Every embed keeps its “Watch on YouTube” fallback link (`components/Media.tsx`).

## Embedded clips (in the page now)

The research session could not open YouTube itself. Channel and availability come from search results, so check each one in a browser.

| Where | Video ID | Title | Published by | Checked |
|---|---|---|---|---|
| Prologue, P.1 | `UnwYdF8a5ws` | Bjorn Borg vs John McEnroe, the 1980 tie-break in full | Wimbledon (to confirm) | no |
| Chapter 6, 6.3 | `2F5ovxn0ZdY` | Inside One of Baseball’s Last Manual Scoreboards | Great Big Story (to confirm) | no |
| Chapter 8, 8.1 | `J9M-XwUhYH4` | John Isner v Nicolas Mahut, Wimbledon 2010, extended highlights | Wimbledon | no |

Candidates not yet used:

- `_90PPjyGBgk`, “How I Play Tennis” by Suzanne Lenglen (1925). A 1925 film is public domain in the United States; if a clean copy exists on the Internet Archive or Wikimedia Commons, host that instead of embedding.
- `hKWj8OkHp2A`, an explainer of the Gaelic football scoring proposals. Confirm it is the GAA’s own upload before using it in chapter 7.

## Archive photos and film to fetch (needs network access)

These hosts were blocked in the first session: `commons.wikimedia.org`, `upload.wikimedia.org`, `www.loc.gov`, `tile.loc.gov`, `archive.org`, `www.youtube.com`.

| Chapter | What | Where to look | Licence to check |
|---|---|---|---|
| Prologue / 1 | Early lawn tennis photographs | Library of Congress, “Tennis: Free to Use and Reuse” (https://www.loc.gov/free-to-use/tennis/) | Marked free to use |
| Prologue | Suzanne Lenglen in play, 1920 | Wikimedia Commons, `File:Suzanne_Lenglen_playing_1920_(cropped).jpg` | Check the file page |
| 2 | Exchequer tally sticks | Science Museum Group collection (co60506) | Often CC BY-NC-SA; check before use |
| 3 | Circus Games mosaic, Lyon (eggs and dolphins on the spina) | Wikimedia Commons, “Circus Games Mosaic” category | Photographer’s licence, usually CC BY-SA |
| 3 | Early sport films (1890s) | Internet Archive, Edison Motion Pictures Collection | Public domain |
| 4 | 1744 scorecard | West Sussex Record Office | Probably not reusable; link only |
| 6 | Wrigley Field scoreboard | Wikimedia Commons, “Wrigley Field scoreboard” category | Usually CC BY-SA |
| 9 | Syracuse shot-clock historical marker | HMdb page 145115 | Contributor photos; check |
| 13 | Early TV score graphics | Broadcasters | Not reusable; describe and link |

## How to add an image

1. Save the file in `public/media/` with a descriptive name.
2. Add the file page (not the image URL) to `lib/sources.ts`.
3. Show it inside an `Exhibit` with a caption, the credit, the licence and a `Cite`.
4. Give it `alt` text that says what the picture shows, not what it is for.
