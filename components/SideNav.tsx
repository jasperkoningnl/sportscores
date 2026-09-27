import Link from "next/link";

const PAGES = [
  { href: "/quiz", label: "Quiz" },
  { href: "/timeline", label: "Timeline" },
  { href: "/poster", label: "Poster" },
];

/** The way back to the essay, and across to the other pages beside it. */
export default function SideNav({ current }: { current: string }) {
  return (
    <nav className="side-nav mono" aria-label="The essay and the pages beside it">
      <Link href="/" className="side-nav__essay">
        <span aria-hidden="true">←</span> The Archaeology of Sports Scores
      </Link>
      <span className="side-nav__pages">
        {PAGES.map((p) => (
          <Link key={p.href} href={p.href} aria-current={p.href === current ? "page" : undefined}>
            {p.label}
          </Link>
        ))}
      </span>
    </nav>
  );
}
