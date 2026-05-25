"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/quotes", label: "ציטוטים קודמים" },
  { href: "/mission", label: "מי אנחנו" }
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="ניווט ראשי">
      <Link className="brand-link" href="/">
        SparkQuest
      </Link>
      <div className="nav-links">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={isActive ? "active" : undefined}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
