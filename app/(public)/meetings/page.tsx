import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import { MeetingSearch } from "@/components/MeetingSearch";
import MeetingCard from "@/components/MeetingCard";
import { Pagination } from "@/components/Pagination";

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
      <h1>All Meetings</h1>
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
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </section>
  );
}
