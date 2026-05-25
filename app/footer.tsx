import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-brand" href="/">
          SparkQuest
        </Link>
        <p>רגע יומי של השראה וסקרנות לילדים.</p>
      </div>
      <nav className="footer-links" aria-label="ניווט תחתון">
        <Link href="/quotes">ציטוטים קודמים</Link>
        <Link href="/mission">למה בנינו את זה?</Link>
        <a href="mailto:gilwillread@gmail.com">כתבו לי</a>
      </nav>
    </footer>
  );
}
