import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";
import { EditMeetingForm } from "@/app/(admin)/meetings/[id]/edit/EditMeetingForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({ params }: PageProps) {
  const { id } = await params;
  const meetingId = Number(id);
  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return <EditMeetingForm meeting={meeting} />;
}
