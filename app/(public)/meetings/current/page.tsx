import { getMeetingByDate } from "@/lib/meetings-db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

function toIsoDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default async function CurrentMeetingPage() {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());

  const iso = toIsoDate(sunday);
  const meeting = await getMeetingByDate(iso);

  if (meeting) redirect(`/meetings/${meeting.id}`);
  redirect("/meetings");
}
