// Bibliography. Every factual claim in the essay points at one of these ids
// through <Cite id="…" />. Numbering follows the order of this list, which is
// grouped by chapter so the printed bibliography reads in story order.

export type Source = {
  id: string;
  chapter: string;
  title: string;
  publisher: string;
  url: string;
  note?: string;
};

export const SOURCES: Source[] = [
  // Prologue: tennis
  {
    id: "mw-love",
    chapter: "Prologue",
    title: "Why ‘Love’ Means “Nothing” in Tennis",
    publisher: "Merriam-Webster, Wordplay",
    url: "https://www.merriam-webster.com/wordplay/word-origin-of-love-in-tennis",
    note: "Treats l’oeuf as folk etymology; favours ‘playing for love’ (for nothing).",
  },
  {
    id: "npr-love",
    chapter: "Prologue",
    title: "How having zero points in tennis — or ‘love’ — came to sound so sweet",
    publisher: "NPR, June 2026",
    url: "https://www.npr.org/2026/06/04/nx-s1-5843257/tennis-love-french-open",
  },
  {
    id: "time-tennis",
    chapter: "Prologue",
    title: "Tennis Scoring Rules: Origins of a Strange System",
    publisher: "TIME",
    url: "https://time.com/5040182/tennis-scoring-system-history/",
  },
  {
    id: "wiki-tennis-scoring",
    chapter: "Prologue",
    title: "Tennis scoring system (history section: Charles d’Orléans, 1522 Latin reference, clock-face theory)",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Tennis_scoring_system",
  },
  {
    id: "usopen-tiebreak",
    chapter: "Prologue",
    title: "The US Open introduced the tiebreak set 50 years ago today",
    publisher: "US Open / USTA, 2 September 2020",
    url: "https://www.usopen.org/amp/en_US/news/articles/2020-09-02/the_us_open_introduced_the_tiebreak_set_50_years_ago_today.html",
  },
  {
    id: "ithf-vanalen",
    chapter: "Prologue",
    title: "Jimmy Van Alen",
    publisher: "International Tennis Hall of Fame",
    url: "https://www.tennisfame.com/hall-of-famers/inductees/jimmy-van-alen",
  },

  // Chapter 2: the cut in the stick
  {
    id: "etym-score",
    chapter: "2 · The cut in the stick",
    title: "score (n.)",
    publisher: "Online Etymology Dictionary",
    url: "https://www.etymonline.com/word/score",
    note: "Old Norse skor ‘notch, incision’; ‘twenty’; game sense recorded from 1742 (whist).",
  },
  {
    id: "oed-score",
    chapter: "2 · The cut in the stick",
    title: "score, n.",
    publisher: "Oxford English Dictionary",
    url: "https://www.oed.com/dictionary/score_n",
  },
  {
    id: "etym-scoreboard",
    chapter: "2 · The cut in the stick",
    title: "scoreboard (n.)",
    publisher: "Online Etymology Dictionary",
    url: "https://www.etymonline.com/word/scoreboard",
    note: "1826, a tavern blackboard for chalked debts; sporting sense by 1884.",
  },
  {
    id: "smg-tally",
    chapter: "2 · The cut in the stick",
    title: "Medieval Exchequer tally sticks",
    publisher: "Science Museum Group Collection",
    url: "https://collection.sciencemuseumgroup.org.uk/objects/co60506/medieval-exchequer-tally-sticks",
  },
  {
    id: "earlycricket-officials",
    chapter: "2 · The cut in the stick",
    title: "Officials",
    publisher: "Early Cricket (earlycricket.uk)",
    url: "https://www.earlycricket.uk/index.php/officials/",
  },
  {
    id: "antigone-goldwin",
    chapter: "2 · The cut in the stick",
    title: "The First Cricket Match Report: Goldwin’s In Certamen Pilae",
    publisher: "Antigone, 2022",
    url: "https://antigonejournal.com/2022/09/certamen-pilae-cricket/",
  },
  {
    id: "wisden-scoring",
    chapter: "2 · The cut in the stick",
    title: "We’ll Get Them In Signals: A History Of Cricket Scoring",
    publisher: "Wisden Cricketers’ Almanack",
    url: "https://www.wisden.com/wisden-cricketers-almanack/well-get-them-in-signals-a-history-of-cricket-scoring-wisden-almanack",
    note: "Notchers; deeper nick at twenty; Lord’s scoreboard 1846; Lillywhite’s portable press 1848.",
  },
  {
    id: "wiki-1783",
    chapter: "2 · The cut in the stick",
    title: "1783 English cricket season (Hampshire v Kent and the scorer Pratt)",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/1783_English_cricket_season",
  },
  {
    id: "cricinfo-1783",
    chapter: "2 · The cut in the stick",
    title: "Hampshire XI v Kent XI, Hambledon, 8–9 July 1783 — scorecard",
    publisher: "ESPNcricinfo",
    url: "https://www.espncricinfo.com/series/england-domestic-season-1783-535342/hampshire-xi-vs-kent-xi-535355/full-scorecard",
  },

  // Chapter 3: ancient scoreboards
  {
    id: "fifa-meso",
    chapter: "3 · Ancient scoreboards",
    title: "Origins – Meso-American ball games",
    publisher: "FIFA Museum Editorials",
    url: "https://editorial.fifamuseum.com/en/read/origins-meso-american-ball-games/",
    note: "Volcanic-rock scoreboard, 650–850; race to nine; the ulama ‘urra’.",
  },
  {
    id: "mexicolore-ulama",
    chapter: "3 · Ancient scoreboards",
    title: "Ulama: the pre-Columbian ballgame survives today",
    publisher: "Mexicolore",
    url: "https://www.mexicolore.co.uk/maya/ballgame/ulama-the-pre-columbian-ballgame-survives-today",
  },
  {
    id: "wiki-ulama",
    chapter: "3 · Ancient scoreboards",
    title: "Ulama (game)",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Ulama_(game)",
    note: "Points called rayas, ‘lines’, after the tally marks used to keep count.",
  },
  {
    id: "mnd-chichen",
    chapter: "3 · Ancient scoreboards",
    title: "Pre-Hispanic ball game marker disc found in Chichén Itzá",
    publisher: "Mexico News Daily, 2023",
    url: "https://mexiconewsdaily.com/news/pre-hispanic-ball-game-marker-disc-found-chichen-itza/",
  },
  {
    id: "yucatan-scoreboard",
    chapter: "3 · Ancient scoreboards",
    title: "Let’s talk about that ‘Mayan scoreboard’ found at Chichén Itzá",
    publisher: "Yucatán Magazine",
    url: "https://yucatanmagazine.com/lets-talk-about-that-mayan-scoreboard-found-at-chichen-itza/",
  },
  {
    id: "lacus-circus",
    chapter: "3 · Ancient scoreboards",
    title: "Circus Maximus, in S. B. Platner & T. Ashby, A Topographical Dictionary of Ancient Rome (1929)",
    publisher: "LacusCurtius, University of Chicago",
    url: "http://penelope.uchicago.edu/Thayer/E/Gazetteer/Places/Europe/Italy/Lazio/Roma/Rome/_Texts/PLATOP*/Circus_Maximus.html",
    note: "Eggs set up by the censors of 174 BC (Livy 41.27); Agrippa’s dolphins, 33 BC.",
  },
  {
    id: "spectacles-circus",
    chapter: "3 · Ancient scoreboards",
    title: "The Circus Maximus (with Cassius Dio 49.43 on Agrippa’s dolphins and eggs)",
    publisher: "Spectacles in the Roman World: A Sourcebook (BCcampus)",
    url: "https://pressbooks.bccampus.ca/spectaclesintheromanworldsourcebook/chapter/locations-circuses-circuses-circuses/",
  },
  {
    id: "lugdunum-mosaic",
    chapter: "3 · Ancient scoreboards",
    title: "The circus games mosaic",
    publisher: "Lugdunum – Musée et théâtres romains, Lyon",
    url: "https://lugdunum.grandlyon.com/en/Highlighted-work/14016-The-circus-games-mosaic",
  },
  {
    id: "openlearn-pentathlon",
    chapter: "3 · Ancient scoreboards",
    title: "The Ancient Olympics: 6.2 Pentathlon",
    publisher: "The Open University, OpenLearn",
    url: "https://www.open.edu/openlearn/history-the-arts/the-ancient-olympics-bridging-past-and-present/content-section-6.2",
  },
  {
    id: "jhs-philostratos",
    chapter: "3 · Ancient scoreboards",
    title: "Philostratos and the Pentathlon",
    publisher: "The Journal of Hellenic Studies (Cambridge Core)",
    url: "https://www.cambridge.org/core/journals/journal-of-hellenic-studies/article/abs/philostratos-and-the-pentathlon/277E3A292D8B12AE5596C780ED12F594",
  },
  {
    id: "fifa-cuju",
    chapter: "3 · Ancient scoreboards",
    title: "Origins – Cuju in China",
    publisher: "FIFA Museum Editorials",
    url: "https://editorial.fifamuseum.com/en/read/origins-cuju-in-china/",
  },

  // Chapter 4: when the match becomes data
  {
    id: "wiki-1744",
    chapter: "4 · When the match becomes data",
    title: "1744 English cricket season",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/1744_English_cricket_season",
    note: "Slindon v London (2 June) and Kent v England (18 June) scorecards.",
  },
  {
    id: "earlycricket-slindon",
    chapter: "4 · When the match becomes data",
    title: "Slindon",
    publisher: "Early Cricket (earlycricket.uk)",
    url: "https://www.earlycricket.uk/index.php/slindon/",
  },
  {
    id: "earlycricket-laws",
    chapter: "4 · When the match becomes data",
    title: "The Laws of Cricket",
    publisher: "Early Cricket (earlycricket.uk)",
    url: "https://www.earlycricket.uk/index.php/rules/",
  },

  // Chapter 5: numerical languages
  {
    id: "britannica-afl",
    chapter: "5 · Every sport invents its own language",
    title: "Australian rules football: Play of the game",
    publisher: "Encyclopaedia Britannica",
    url: "https://www.britannica.com/sports/Australian-rules-football/Play-of-the-game",
  },
  {
    id: "wiki-gaelic-scoring",
    chapter: "5 · Every sport invents its own language",
    title: "Scoring in Gaelic games",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Scoring_in_Gaelic_games",
    note: "Goal given a value of five points in 1892, three in 1896.",
  },
  {
    id: "wrm-points",
    chapter: "5 · Every sport invents its own language",
    title: "Points Scoring Through The Ages",
    publisher: "World Rugby Museum",
    url: "https://worldrugbymuseum.com/from-the-vaults/evolution-of-rugby/points-scoring-through-the-ages",
  },

  // Chapter 6: the scoreboard becomes an object
  {
    id: "mlb-wrigley",
    chapter: "6 · The scoreboard becomes an object",
    title: "Wrigley Field Scoreboard History",
    publisher: "MLB.com / Chicago Cubs",
    url: "https://www.mlb.com/cubs/guide/wrigley-field-scoreboard",
  },
  {
    id: "wbez-wrigley",
    chapter: "6 · The scoreboard becomes an object",
    title: "The Design of the Wrigley Scoreboard: Revolutionary, Retro or Both?",
    publisher: "WBEZ Chicago, 2015",
    url: "https://www.wbez.org/curious-city/2015/09/11/the-design-of-the-wrigley-scoreboard-revolutionary-retro-or-both",
  },
  {
    id: "arsenal-halftime",
    chapter: "6 · The scoreboard becomes an object",
    title: "How did we used to get the half time scores?",
    publisher: "The History of Arsenal",
    url: "https://blog.woolwicharsenal.co.uk/archives/2237",
  },
  {
    id: "gotnotgot-halftime",
    chapter: "6 · The scoreboard becomes an object",
    title: "The Lost World of Football: H is for Half Time Scoreboard",
    publisher: "Got, Not Got",
    url: "https://gotnotgot.wordpress.com/2013/11/29/the-lost-world-of-football-h-is-for-half-time-scoreboard/",
  },
  {
    id: "curlingbasics",
    chapter: "6 · The scoreboard becomes an object",
    title: "Scoring",
    publisher: "Curling Basics",
    url: "https://www.curlingbasics.com/en/scoring.html",
  },
  {
    id: "seattle-curling",
    chapter: "6 · The scoreboard becomes an object",
    title: "Scoreboards",
    publisher: "Granite Curling Club of Seattle",
    url: "https://curlingseattle.org/scoreboards",
  },

  // Chapter 7: the score starts designing the game
  {
    id: "rugby365-scoring",
    chapter: "7 · The score designs the game",
    title: "Scoring down the years",
    publisher: "Rugby365",
    url: "https://rugby365.com/laws-referees/news/scoring-down-the-years/",
  },
  {
    id: "hoopsgeek-3pt",
    chapter: "7 · The score designs the game",
    title: "The History and Evolution of the Three-Point Shot",
    publisher: "The Hoops Geek",
    url: "https://www.thehoopsgeek.com/history-three-pointer/",
  },
  {
    id: "globetrotters-4pt",
    chapter: "7 · The score designs the game",
    title: "Harlem Globetrotters Revolutionized Game with 4-Point Shot in 2010",
    publisher: "Business Wire, 2014",
    url: "https://www.businesswire.com/news/home/20140226006609/en/Harlem-Globetrotters-Revolutionized-Game-with-4-Point-Shot-in-2010",
  },
  {
    id: "pba-4pt",
    chapter: "7 · The score designs the game",
    title: "PBA officially adopts four-point shot for next season",
    publisher: "Spin.ph, July 2024",
    url: "https://www.spin.ph/basketball/pba/pba-officially-adopts-four-point-shot-for-next-season-a793-20240722",
  },
  {
    id: "tandf-3pts",
    chapter: "7 · The score designs the game",
    title: "Sports administration on the hoof: the three points for a win ‘experiment’ in English soccer",
    publisher: "Soccer & Society 9 (1), 2008",
    url: "https://www.tandfonline.com/doi/abs/10.1080/14660970701616688",
  },
  {
    id: "wiki-3pts",
    chapter: "7 · The score designs the game",
    title: "Three points for a win",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Three_points_for_a_win",
  },
  {
    id: "gaa-frc",
    chapter: "7 · The score designs the game",
    title: "Football Review Committee Rule Enhancements explainer",
    publisher: "GAA.ie",
    url: "https://www.gaa.ie/article/football-review-committee-rule-enhancements-explainer",
  },
  {
    id: "rte-congress",
    chapter: "7 · The score designs the game",
    title: "Football changes sail into GAA rule book",
    publisher: "RTÉ Sport, 4 October 2025",
    url: "https://www.rte.ie/sport/football/2025/1004/1536804-football-changes-sail-into-gaa-rule-book/",
  },

  // Chapter 8: television arrives
  {
    id: "tennis-com-1970",
    chapter: "8 · Television arrives",
    title: "1970: The Tiebreaker Is Introduced",
    publisher: "Tennis.com",
    url: "https://www.tennis.com/news/articles/1970-the-tiebreaker-is-introduced",
  },
  {
    id: "tennis-com-2022",
    chapter: "8 · Television arrives",
    title: "All Grand Slams to use 10-point tiebreaker at 6-6 in final set",
    publisher: "Tennis.com, March 2022",
    url: "https://www.tennis.com/news/articles/all-grand-slams-to-use-10-point-tiebreaker-in-final-set",
  },
  {
    id: "fivb-game",
    chapter: "8 · Television arrives",
    title: "The Game",
    publisher: "FIVB",
    url: "https://www.fivb.com/volleyball/the-game/",
  },
  {
    id: "badminton-asia",
    chapter: "8 · Television arrives",
    title: "The Evolution of the Badminton Scoring System",
    publisher: "Badminton Asia, 2020",
    url: "https://badmintonasia.org/2020/11/27/the-evolution-of-the-badminton-scoring-system/",
  },
  {
    id: "megaspin-11",
    chapter: "8 · Television arrives",
    title: "Table tennis game changed from 21 points to 11 points",
    publisher: "Megaspin",
    url: "https://www.megaspin.net/rules/newrules2001.asp",
  },

  // Chapter 9: the clock
  {
    id: "hmdb-shotclock",
    chapter: "9 · The clock becomes part of the score",
    title: "The 24-Second ‘Shot Clock’ historical marker, Syracuse",
    publisher: "The Historical Marker Database",
    url: "https://www.hmdb.org/m.asp?m=145115",
  },
  {
    id: "lemoyne-shotclock",
    chapter: "9 · The clock becomes part of the score",
    title: "The 24-Second Shot Clock — The NBA in Central New York",
    publisher: "Noreen Reale Falcone Library, Le Moyne College",
    url: "https://resources.library.lemoyne.edu/c.php?g=1251716&p=9172875",
  },
  {
    id: "wbur-shotclock",
    chapter: "9 · The clock becomes part of the score",
    title: "Basketball’s Shot Clock: A Brief History",
    publisher: "WBUR, Only A Game, 2015",
    url: "https://www.wbur.org/onlyagame/2015/04/22/nba-shot-clock-history-basketball",
  },
  {
    id: "sportsmuseum-shotclock",
    chapter: "9 · The clock becomes part of the score",
    title: "From Slow Time to Show Time",
    publisher: "The Sports Museum, Boston",
    url: "https://www.sportsmuseum.org/curators-corner/from-slow-time-to-show-time/",
  },
  {
    id: "ikf-rules",
    chapter: "9 · The clock becomes part of the score",
    title: "The Rules of Korfball (valid from 1 September 2024)",
    publisher: "International Korfball Federation",
    url: "https://korfball.sport/wp-content/uploads/2024/05/The-Rules-of-Korfball-2024.pdf",
  },

  // Chapter 10: translating incomparable things
  {
    id: "isu-samalog",
    chapter: "10 · Scores that translate",
    title: "How sprint and allround work: format, history and the samalog system",
    publisher: "International Skating Union",
    url: "https://isu-skating.com/news/how-sprint-and-allround-work-format-history-and-the-samalog-system/",
  },
  {
    id: "wa-tables",
    chapter: "10 · Scores that translate",
    title: "IAAF Scoring Tables for Combined Events",
    publisher: "World Athletics",
    url: "https://worldathletics.org/download/download?filename=c651eeb3-0f9d-47c0-9314-a3bd001e0960.pdf&urlslug=IAAF+Scoring+Tables+for+Combined+Events",
  },
  {
    id: "fis-nc101",
    chapter: "10 · Scores that translate",
    title: "Nordic Combined 101 – Individual Competition Formats",
    publisher: "FIS, 2025–26",
    url: "https://www.fis-ski.com/nordic-combined/news/2025-26/nordic-combined-101-individual-competition-formats",
  },
  {
    id: "nbc-nc",
    chapter: "10 · Scores that translate",
    title: "Nordic combined 101: competition format",
    publisher: "NBC Olympics",
    url: "https://www.nbcolympics.com/news/nordic-combined-101-competition-format",
  },

  // Chapter 11: edge cases
  {
    id: "nhl-rules",
    chapter: "11 · Strange but useful",
    title: "National Hockey League rules (shootout, Rule 84)",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/National_Hockey_League_rules",
  },
  {
    id: "usap-scoring",
    chapter: "11 · Strange but useful",
    title: "How to keep your score in pickleball",
    publisher: "PlayPickleball (USA Pickleball)",
    url: "https://www.playpickleball.com/pickleball-rules-how-to-keep-score/",
  },
  {
    id: "acl-rules",
    chapter: "11 · Strange but useful",
    title: "Official Cornhole Rules",
    publisher: "American Cornhole League",
    url: "https://www.playcornhole.org/pages/rules",
  },
  {
    id: "shuffleboard",
    chapter: "11 · Strange but useful",
    title: "Shuffleboard",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Shuffleboard",
  },
  {
    id: "ws-appendix-a",
    chapter: "11 · Strange but useful",
    title: "Racing Rules of Sailing, Appendix A: Scoring",
    publisher: "World Sailing",
    url: "https://www.sailing.org/tools/documents/Appendices%20A%20-%20C-%5B444%5D.pdf",
  },
  {
    id: "wftda-rules",
    chapter: "11 · Strange but useful",
    title: "The Rules of Flat Track Roller Derby — summary",
    publisher: "Women’s Flat Track Derby Association",
    url: "https://rules.wftda.com/summary.html",
  },
  {
    id: "pkl-kabaddi",
    chapter: "11 · Strange but useful",
    title: "Understanding the game of kabaddi",
    publisher: "Pro Kabaddi League",
    url: "https://www.prokabaddi.com/features/understanding-the-game-of-kabaddi",
  },

  // Chapter 12: quadball
  {
    id: "iqa-consult",
    chapter: "12 · The scoreboard changes the rules",
    title: "Community Consultation: Proposed Updates to the 2026 IQA Rulebook",
    publisher: "International Quadball Association",
    url: "https://www.iqasport.org/news/community-consultation-proposed-updates-to-the-2026-iqa-rulebook/",
  },
  {
    id: "iqa-2026",
    chapter: "12 · The scoreboard changes the rules",
    title: "New rulebook and simultaneous translations released",
    publisher: "International Quadball Association",
    url: "https://www.iqasport.org/news/new-rulebook-and-simultaneous-translations-released/",
  },

  // Chapter 13: television graphics
  {
    id: "wiki-scorebug",
    chapter: "13 · The score moves onto television",
    title: "Score bug",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Score_bug",
  },
  {
    id: "wiki-supersunday",
    chapter: "13 · The score moves onto television",
    title: "Super Sunday (British TV programme)",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Super_Sunday_(British_TV_programme)",
  },
  {
    id: "forbes-foxbox",
    chapter: "13 · The score moves onto television",
    title: "The FOX Box Enters Its 30th Year As Part Of NFL Broadcasts",
    publisher: "Forbes, September 2024",
    url: "https://www.forbes.com/sites/jefffedotin/2024/09/04/revolutionary-fox-box-enters-its-30th-year-as-part-of-nfl-broadcasts/",
  },

  // Chapter 14: the score behind the score
  {
    id: "opta-xg",
    chapter: "14 · The score behind the score",
    title: "What Is Expected Goals (xG)?",
    publisher: "The Analyst (Opta)",
    url: "https://theanalyst.com/articles/what-is-expected-goals-xg",
  },
  {
    id: "fangraphs-war",
    chapter: "14 · The score behind the score",
    title: "What is WAR?",
    publisher: "FanGraphs Sabermetrics Library",
    url: "https://library.fangraphs.com/misc/war/",
  },
  {
    id: "fide-elo",
    chapter: "14 · The score behind the score",
    title: "Anniversary of Arpad Elo – rating system that changed chess world",
    publisher: "FIDE",
    url: "https://www.fide.com/anniversary-of-arpad-elo-rating-system-that-changed-chess-world/",
  },
  {
    id: "wiki-football-elo",
    chapter: "14 · The score behind the score",
    title: "World Football Elo Ratings",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/World_Football_Elo_Ratings",
  },
];

const INDEX = new Map(SOURCES.map((s, i) => [s.id, i + 1]));

export function sourceNumber(id: string): number {
  const n = INDEX.get(id);
  if (!n) throw new Error(`Unknown source id: ${id}`);
  return n;
}
