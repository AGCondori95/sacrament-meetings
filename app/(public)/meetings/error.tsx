"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Meetings route error:", error);
  }, [error]);

  return (
    <section className="space-y-4 rounded-card border border-dashed border-border bg-surface/50 p-10 text-center">
      <h1>Something went wrong</h1>
      <p className="text-muted">
        {error.message || "We ran into a problem loading this page."}
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="rounded bg-primary px-4 py-2 text-white"
        >
          Try Again
        </button>
        <Link href="/meetings" className="text-sm text-primary underline">
          Back to all meetings
        </Link>
      </div>
    </section>
  );
}
