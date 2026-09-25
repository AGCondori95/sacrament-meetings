import Link from "next/link";

export default function EditMeetingNotFound() {
  return (
    <section className="space-y-4 rounded-card border border-dashed border-border bg-surface/50 p-10 text-center">
      <h1>Meeting not found</h1>
      <p className="text-muted">
        We couldn&apos;t find a meeting with that ID. It may have been deleted,
        or the link you followed might be incorrect.
      </p>
      <Link href="/meetings" className="text-sm text-primary underline">
        Back to all meetings
      </Link>
    </section>
  );
}
