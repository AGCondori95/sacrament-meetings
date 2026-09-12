import type {ReactNode} from "react";
import type {SacramentMeeting, Hymn} from "@/lib/types";
import {MEETING_TYPE_LABELS, NON_SACRAMENT_TYPES} from "@/lib/types";
import {formatMeetingDate} from "@/lib/format";

function HymnLine({label, hymn}: {label: string; hymn: Hymn}) {
  return (
    <p className='text-muted'>
      <span className='font-medium text-foreground'>{label}: </span>
      {hymn.number > 0 ? `#${hymn.number} — ` : ""}
      {hymn.title}
    </p>
  );
}

function Section({title, children}: {title: string; children: ReactNode}) {
  return (
    <section className='border-t border-border pt-4'>
      <h2 className='mb-2 font-sans text-sm font-semibold uppercase tracking-wide text-accent'>
        {title}
      </h2>
      {children}
    </section>
  );
}

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({meeting}: MeetingDetailProps) {
  const isNonSacrament = NON_SACRAMENT_TYPES.includes(meeting.meetingType);
  const talks = meeting.speakers.filter((s) => s.type === "speaker");
  const musical = meeting.speakers.filter((s) => s.type === "musical-number");

  return (
    <article className='space-y-6 rounded-card border border-border bg-surface p-6 shadow-sm'>
      {/* Title block */}
      <header className='space-y-1'>
        <p className='text-sm font-semibold uppercase tracking-wide text-primary'>
          {MEETING_TYPE_LABELS[meeting.meetingType]}
        </p>
        <h1>{formatMeetingDate(meeting.date)}</h1>
        <p className='text-sm text-muted'>
          Presiding: {meeting.presiding} &nbsp;·&nbsp; Conducting:{" "}
          {meeting.conducting}
        </p>
      </header>

      {/* Announcements */}
      {meeting.announcements && meeting.announcements.length > 0 && (
        <Section title='Announcements'>
          <ul className='list-disc space-y-1 pl-5 text-muted'>
            {meeting.announcements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Program order */}
      <Section title='Program'>
        <div className='space-y-2'>
          <HymnLine label='Opening Hymn' hymn={meeting.openingHymn} />
          <p className='text-muted'>
            <span className='font-medium text-foreground'>
              Opening Prayer:{" "}
            </span>
            {meeting.openingPrayer}
          </p>

          {meeting.wardBusiness.length > 0 && (
            <div>
              <p className='font-medium text-foreground'>Ward Business:</p>
              <ul className='list-disc space-y-1 pl-5 text-muted'>
                {meeting.wardBusiness.map((b, i) => (
                  <li key={i}>{b.description}</li>
                ))}
              </ul>
            </div>
          )}

          <p className='text-muted'>
            <span className='font-medium text-foreground'>
              Stake Business:{" "}
            </span>
            {meeting.stakeBusiness ? "Yes" : "No"}
          </p>

          {!isNonSacrament && (
            <HymnLine label='Sacrament Hymn' hymn={meeting.sacramentHymn} />
          )}
        </div>
      </Section>

      {/* Speakers */}
      {talks.length > 0 && (
        <Section title={isNonSacrament ? "Speakers / Program" : "Speakers"}>
          <ol className='list-decimal space-y-1 pl-5 text-muted'>
            {talks.map((s, i) => (
              <li key={i}>
                <span className='text-foreground'>{s.name}</span>
                {s.topic ? ` — ${s.topic}` : ""}
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* Musical numbers */}
      {musical.length > 0 && (
        <Section title='Musical Numbers'>
          <ul className='list-disc space-y-1 pl-5 text-muted'>
            {musical.map((m, i) => (
              <li key={i}>
                <span className='text-foreground'>{m.name}</span>
                {m.topic ? ` — ${m.topic}` : ""}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Closing */}
      <Section title='Closing'>
        <div className='space-y-2'>
          <HymnLine label='Closing Hymn' hymn={meeting.closingHymn} />
          <p className='text-muted'>
            <span className='font-medium text-foreground'>
              Closing Prayer:{" "}
            </span>
            {meeting.closingPrayer}
          </p>
        </div>
      </Section>
    </article>
  );
}
