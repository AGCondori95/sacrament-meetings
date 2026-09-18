import {notFound} from "next/navigation";
import Link from "next/link";
import MeetingDetail from "@/components/MeetingDetail";
import type {SacramentMeeting} from "@/lib/types";
import {getBaseUrl} from "@/lib/base-url";
import PrintButton from "@/components/PrintButton";

interface PageProps {
  params: Promise<{id: string}>;
}

export default async function MeetingDetailPage({params}: PageProps) {
  const {id} = await params;
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/meetings/${id}`, {cache: "no-store"});

  if (res.status === 400 || res.status === 404) notFound();
  if (!res.ok) throw new Error("Failed to load meeting");

  const meeting: SacramentMeeting = await res.json();

  return (
    <div className='space-y-4'>
      <div className='no-print flex items-center justify-between'>
        <Link
          href='/meetings'
          className='no-print inline-block text-sm font-medium text-primary hover:underline'>
          ← Back to all meetings
        </Link>
        <PrintButton />
      </div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
