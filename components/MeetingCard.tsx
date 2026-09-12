import Link from "next/link";
import type {SacramentMeeting} from "@/lib/types";
import {MEETING_TYPE_LABELS, NON_SACRAMENT_TYPES} from "@/lib/types";
import {formatMeetingDate} from "@/lib/format";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({meeting}: MeetingCardProps) {
  const speakerCount = meeting.speakers.filter(
    (s) => s.type === "speaker",
  ).length;
  const isNonSacrament = NON_SACRAMENT_TYPES.includes(meeting.meetingType);

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className='block rounded-card border border-border bg-surface p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md'>
      <div className='flex items-center justify-between gap-3'>
        <span className='rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
          {MEETING_TYPE_LABELS[meeting.meetingType]}
        </span>
        {meeting.stakeBusiness && (
          <span className='text-xs font-medium text-accent'>
            Stake business
          </span>
        )}
      </div>

      <h2 className='mt-3 text-foreground'>
        {formatMeetingDate(meeting.date)}
      </h2>

      <p className='mt-1 text-sm text-muted'>
        Presiding: {meeting.presiding} · Conducting: {meeting.conducting}
      </p>

      {!isNonSacrament && (
        <p className='mt-2 text-sm text-muted'>
          {speakerCount} speaker{speakerCount === 1 ? "" : "s"}
        </p>
      )}
    </Link>
  );
}
