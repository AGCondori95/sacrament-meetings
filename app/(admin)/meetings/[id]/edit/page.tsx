import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";
import { updateMeeting } from "@/lib/actions";

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

  const updateMeetingWithId = updateMeeting.bind(null, meetingId);
  const speakersText = meeting.speakers
    .map((s) => `${s.type}|${s.name}|${s.topic}`)
    .join("\n");

  return (
    <section className="space-y-6">
      <h1>Edit Meeting — {meeting.date}</h1>
      <form action={updateMeetingWithId} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            Date
            <input
              type="date"
              name="date"
              defaultValue={meeting.date}
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="block">
            Meeting Type
            <select
              name="meetingType"
              defaultValue={meeting.meetingType}
              required
              className="mt-1 w-full rounded border p-2"
            >
              <option value="regular">Regular Sacrament Meeting</option>
              <option value="testimony">Fast &amp; Testimony Meeting</option>
              <option value="stake">Stake Conference</option>
              <option value="general">General Conference</option>
              <option value="special">Special Meeting</option>
            </select>
          </label>
          <label className="block">
            Presiding
            <input
              name="presiding"
              defaultValue={meeting.presiding}
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="block">
            Conducting
            <input
              name="conducting"
              defaultValue={meeting.conducting}
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
        </div>

        <label className="block">
          Announcements (one per line)
          <textarea
            name="announcements"
            rows={3}
            defaultValue={(meeting.announcements ?? []).join("\n")}
            className="mt-1 w-full rounded border p-2"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            Opening Hymn #
            <input
              type="number"
              name="openingHymnNumber"
              defaultValue={meeting.openingHymn.number}
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="block">
            Opening Hymn Title
            <input
              name="openingHymnTitle"
              defaultValue={meeting.openingHymn.title}
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
        </div>

        <label className="block">
          Opening Prayer
          <input
            name="openingPrayer"
            defaultValue={meeting.openingPrayer}
            required
            className="mt-1 w-full rounded border p-2"
          />
        </label>

        <label className="block">
          Ward Business (one item per line)
          <textarea
            name="wardBusiness"
            rows={2}
            defaultValue={meeting.wardBusiness
              .map((b) => b.description)
              .join("\n")}
            className="mt-1 w-full rounded border p-2"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="stakeBusiness"
            defaultChecked={meeting.stakeBusiness}
          />
          Stake business this week
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            Sacrament Hymn #
            <input
              type="number"
              name="sacramentHymnNumber"
              defaultValue={meeting.sacramentHymn.number}
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="block">
            Sacrament Hymn Title
            <input
              name="sacramentHymnTitle"
              defaultValue={meeting.sacramentHymn.title}
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
        </div>

        <label className="block">
          Speakers / Musical Numbers — one per line as{" "}
          <code>type|name|topic</code>
          <textarea
            name="speakers"
            rows={4}
            defaultValue={speakersText}
            className="mt-1 w-full rounded border p-2 font-mono text-sm"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            Closing Hymn #
            <input
              type="number"
              name="closingHymnNumber"
              defaultValue={meeting.closingHymn.number}
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="block">
            Closing Hymn Title
            <input
              name="closingHymnTitle"
              defaultValue={meeting.closingHymn.title}
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
        </div>

        <label className="block">
          Closing Prayer
          <input
            name="closingPrayer"
            defaultValue={meeting.closingPrayer}
            required
            className="mt-1 w-full rounded border p-2"
          />
        </label>

        <button
          type="submit"
          className="rounded bg-primary px-4 py-2 text-white"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
}
