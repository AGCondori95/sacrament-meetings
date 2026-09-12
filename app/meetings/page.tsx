import type {Metadata} from "next";
import MeetingCard from "@/components/MeetingCard";
import {getBaseUrl} from "@/lib/base-url";
import type {SacramentMeeting} from "@/lib/types";

export const metadata: Metadata = {
  title: "All Meetings · Sacrament Meeting Planner",
};

export default async function MeetingsPage() {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/meetings`, {cache: "no-store"});

  if (!res.ok) throw new Error("Failed to load meetings");
  const meetings: SacramentMeeting[] = await res.json();

  // API returns insertion order; show newest first.
  const sorted = [...meetings].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className='space-y-4'>
      <h1>All Meetings</h1>

      {meetings.length === 0 ? (
        <p className='text-muted'>No meetings have been scheduled yet.</p>
      ) : (
        <div className='grid gap-4 sm:grid-cols-2'>
          {sorted.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </section>
  );
}
