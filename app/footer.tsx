import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        <Link href="/mission">למה בנינו את זה?</Link>
      </p>
      <p>
        שאלות, רעיונות או בעיות?{" "}
        <a href="mailto:gilwillread@gmail.com">כתבו לי</a>
      </p>
    </footer>
  );
}
