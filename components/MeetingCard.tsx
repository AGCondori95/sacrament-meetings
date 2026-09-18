import Link from "next/link";
import type {SacramentMeeting} from "@/lib/types";
import {
  MEETING_TYPE_LABELS,
  MEETING_TYPE_COLORS,
  NON_SACRAMENT_TYPES,
} from "@/lib/types";
import {formatMeetingDate} from "@/lib/format";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({meeting}: MeetingCardProps) {
  const speakerCount = meeting.speakers.filter(
    (s) => s.type === "speaker",
  ).length;
  const isNonSacrament = NON_SACRAMENT_TYPES.includes(meeting.meetingType);
  const typeColor = MEETING_TYPE_COLORS[meeting.meetingType];

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      style={{borderLeftColor: typeColor}}
      className='block rounded-card border border-l-4 border-border bg-surface p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md'>
      <div className='flex items-center justify-between gap-3'>
        <span
          style={{color: typeColor, backgroundColor: `color-mix(in srgb, ${typeColor} 12%, transparent)`}}
          className='rounded-full px-3 py-1 text-xs font-semibold'>
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
