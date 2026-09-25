import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import { MeetingSearch } from "@/components/MeetingSearch";
import MeetingCard from "@/components/MeetingCard";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { deleteMeeting } from "@/lib/actions";

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1>All Meetings</h1>
        <Link
          href="/meetings/new"
          className="rounded bg-primary px-3 py-1.5 text-sm text-white"
        >
          + New Meeting
        </Link>
      </div>

      <MeetingSearch />

      {meetings.length === 0 ? (
        <div className="rounded-card border border-dashed border-border bg-surface/50 p-10 text-center">
          <p className="font-serif text-lg text-foreground">
            No meetings match your search
          </p>
          <p className="mt-1 text-sm text-muted">
            Try a different name, meeting type, or clear the search box.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="space-y-2">
              <MeetingCard meeting={meeting} />
              <div className="flex items-center gap-4 px-1">
                <Link
                  href={`/meetings/${meeting.id}/edit`}
                  className="text-sm text-primary underline"
                >
                  Edit
                </Link>
                <form action={deleteMeeting}>
                  <input type="hidden" name="id" value={meeting.id} />
                  <button
                    type="submit"
                    className="text-sm text-red-600 underline"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </section>
  );
}
