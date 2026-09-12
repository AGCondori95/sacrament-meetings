import {redirect} from "next/navigation";
import {getMeetings} from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

/** Format a Date as 'YYYY-MM-DD' using local (not UTC) calendar parts. */
function toIsoDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function CurrentMeetingPage() {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay()); // roll back to most recent Sunday

  const iso = toIsoDate(sunday);
  const [meeting] = getMeetings(iso);

  // redirect() throws internally, so nothing after it runs.
  if (meeting) redirect(`/meetings/${meeting.id}`);
  redirect("/meetings");
}
