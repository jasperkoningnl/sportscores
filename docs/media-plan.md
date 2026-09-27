# Media plan

Status of photos, film and video for the essay, and what still needs doing.
Agreed direction: rights-free archive photos and film hosted in the repo, plus official clips embedded directly from YouTube.

## Rules

- Never cut GIFs or clips from broadcast footage (US Open, Wimbledon, NBA…). Embed the rights holder’s own upload instead.
- Only copy files into the repo when the licence allows reuse: public domain, CC0, CC BY or CC BY-SA. Record the credit and licence next to the image, and add the file page to `lib/sources.ts`.
- If the licence is unclear, or carries NC/ND terms, link to the source instead of copying it.
- Every embed keeps its “Watch on YouTube” fallback link (`components/Media.tsx`).

## Embedded clips (in the page now)

Checked on 26 September 2026 through YouTube’s oEmbed endpoint, which answers only for public videos whose owner allows embedding. It confirms the channel and that embedding is allowed; it cannot see regional blocks, so a last look in a browser before publishing does no harm.

| Where | Video ID | Title (as published) | Published by | Checked |
|---|---|---|---|---|
| Prologue, P.1 | `UnwYdF8a5ws` | Bjorn Borg vs John McEnroe \| The 1980 tie-break in full | Wimbledon (@Wimbledon) | yes, 26 Sep 2026 |
| Chapter 8, 8.5 | `2F5ovxn0ZdY` | Inside One of Baseball’s Last Manual Scoreboards | Great Big Story (@GreatBigStory) | yes, 26 Sep 2026 |
| Chapter 11, 11.1 | `J9M-XwUhYH4` | John Isner v Nicolas Mahut \| Wimbledon 2010 first round \| Extended Highlights | Wimbledon (@Wimbledon) | yes, 26 Sep 2026 |

Candidates not yet used:

- `_90PPjyGBgk`, “How I Play Tennis - By Mlle. Suzanne Lenglen (1925)”. Published by **British Pathé**, which holds the archive, so embedding it fits the rules. Hosting a copy instead is not straightforward: the film is public domain in the US, but British Pathé is a UK company and UK film copyright runs on different terms, so embed rather than host. The essay has no passage about Lenglen yet; it needs a reason to be there.
- `hKWj8OkHp2A`, “Proposed football rules explained - Scoring system”. Published by **RTÉ Sport**, not the GAA. RTÉ made the explainer, so it is the rights holder’s own upload, but it explains the rules as *proposed*; check it still matches the rules that were adopted before using it in chapter 10.

## Archive photos (in the page now)

Files live in `media/`, cropped and resized from the originals.

| Where | File | What | Credit and licence | Source page |
|---|---|---|---|---|
| 2.1 | `winchester-medieval-tally-sticks.jpg` | Medieval tally sticks (not identified as Exchequer tallies) | Winchester City Council Museums, CC BY-SA 2.0 | [Commons](https://commons.wikimedia.org/wiki/File:Medieval_tally_sticks.jpg) |
| 3.2 | `lyon-circus-mosaic-spina.jpg`, `lyon-circus-mosaic-lap-counters.jpg` | Circus games mosaic, Lyon: the spina with both lap counters | Romainbehar (2022), CC0; cropped. The mosaic itself is 2nd century. | [Commons](https://commons.wikimedia.org/wiki/File:Lyon_5e_-_Mus%C3%A9e_Lugdunum_-_Mosa%C3%AFque_du_cirque_-_D%C3%A9tail_01.jpg) |
| 8.1 | `davis-cup-1914-forest-hills.jpg`, `davis-cup-1914-scoreboard-detail.jpg` | Davis Cup doubles, Forest Hills, 14 Aug 1914, with a hand-hung sets/games board | Bain News Service, Library of Congress, no known restrictions; made from the master TIFF | [LoC](https://www.loc.gov/item/2014697051/) |
| 8.3 | `wrigley-field-scoreboard-2012.jpg` | Wrigley Field centre-field scoreboard, 1 Aug 2012 | TonyTheTiger, CC BY-SA 3.0; cropped | [Commons](https://commons.wikimedia.org/wiki/File:201200801_Wrigley_Field_scoreboard.JPG) |
| 12.2 | `syracuse-shot-clock-monument-2013.jpg` | Shot clock monument, Syracuse, Oct 2013 | Kai Brinker, CC BY-SA 2.0; cropped | [Commons](https://commons.wikimedia.org/wiki/File:Shot_Clock_Monument_in_Armory_Square_in_Syracuse,_New_York_(2013).jpg) |

Notes:

- The tally-stick photo came to Commons from the museum’s Flickr account under CC BY-SA 2.0; Commons marks that the Flickr licence was changed later. A CC licence cannot be withdrawn for copies already released, so the CC BY-SA 2.0 grant still applies.
- The old museum link for the Lyon mosaic (`/en/Highlighted-work/14016-…`) now redirects to a general page. `lib/sources.ts` points to the current collection record. That record describes “rows of dolphins and wooden balls” that count the laps, without the number seven, so the chapter 3 text now says only that.
- The shot clock monument moved in April 2026 from the park at 290 W. Jefferson St. to the entrance of the Museum of Science and Technology (source: This Is CNY, 13 April 2026). The 2013 photo shows the old spot; the caption says so.

## Still open

| Chapter | What | Status |
|---|---|---|
| Prologue | Suzanne Lenglen in play, 1920 (`File:Suzanne_Lenglen_playing_1920_(cropped).jpg`) | Checked: public domain in France, the EU and the US (Agence Meurisse, via Gallica/BnF). Not added: the essay does not mention Lenglen, so the photo would be decoration. Add it together with a sentence that gives it a job. |
| 2 | Exchequer tally sticks, Science Museum Group (co60506) | **Link only.** The museum’s licence is CC BY-NC-SA 4.0 (non-commercial), which the rules exclude. The British Museum Exchequer tally on Commons (`Britmustallystickcern.jpg`, CC BY-SA 3.0) is only 250 × 968 px, too small to use. |
| 3 | Early sport films (1890s), Edison collection | Not added to chapter 3: an 1890s film has no link to ancient scoreboards. Better fit: chapter 11. The Leonard–Cushing fight (1894), filmed for Edison’s Kinetoscope in a small ring with rounds of about a minute and sold by the round, is an early case of a sport reshaped for a camera. A public-domain fragment is at the [Library of Congress](https://www.loc.gov/item/00694127) and on Commons. Needs new text and sources before it goes in. |
| 4 | 1744 scorecard, West Sussex Record Office | Link only (no reusable copy found). |
| 9 | Early TV score graphics | Not reusable; describe and link. |
| 12 | Syracuse shot-clock historical marker, HMdb page 145115 | HMdb photos belong to their contributors, and the site blocks automated access. Replaced by the free photo of the shot clock monument (12.2). |

## How to add an image

1. Check the licence on the file page itself (for Commons: the licence template in the page source, not only the summary).
2. Resize or crop the file and save it in `media/` with a descriptive name (JPEG, about 1400–1800 px wide).
3. Import it in the chapter (`import photo from "@/media/…jpg"`) and show it with `<Photo>` from `components/Media.tsx`, inside an `Exhibit` with `kind="Photograph"`. The credit line (author, source link, licence link, “cropped” if changed) is required.
4. Add the file page (not the image URL) to `lib/sources.ts` and cite it next to the caption.
5. Give it `alt` text that says what the picture shows, not what it is for.
