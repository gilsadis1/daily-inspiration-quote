import Link from "next/link";

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="ניווט ראשי">
      <Link className="brand-link" href="/">
        SparkQuest
      </Link>
      <Link href="/mission">מי אנחנו</Link>
    </nav>
  );
}
