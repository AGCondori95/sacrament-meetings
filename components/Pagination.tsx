"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-4 pt-2"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10"
        >
          Previous
        </Link>
      ) : (
        <span className="px-3 py-1.5 text-sm text-muted">Previous</span>
      )}
      <span className="text-sm text-muted">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10"
        >
          Next
        </Link>
      ) : (
        <span className="px-3 py-1.5 text-sm text-muted">Next</span>
      )}
    </nav>
  );
}
