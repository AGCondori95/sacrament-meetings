"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

const links = [
  {href: "/", label: "Home"},
  {href: "/meetings", label: "All Meetings"},
  {href: "/meetings/current", label: "Current"},
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className='no-print flex gap-1'>
      {links.map(({href, label}) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              active
                ? "border-white text-white"
                : "border-transparent text-white/70 hover:text-white"
            }`}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
