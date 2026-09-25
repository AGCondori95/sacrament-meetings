import { createMeeting } from "@/lib/actions";

export default function NewMeetingPage() {
  return (
    <section className="space-y-6">
      <h1>Create Meeting</h1>
      <form action={createMeeting} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            Date
            <input
              type="date"
              name="date"
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="block">
            Meeting Type
            <select
              name="meetingType"
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
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="block">
            Conducting
            <input
              name="conducting"
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
            className="mt-1 w-full rounded border p-2"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            Opening Hymn #
            <input
              type="number"
              name="openingHymnNumber"
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="block">
            Opening Hymn Title
            <input
              name="openingHymnTitle"
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
        </div>

        <label className="block">
          Opening Prayer
          <input
            name="openingPrayer"
            required
            className="mt-1 w-full rounded border p-2"
          />
        </label>

        <label className="block">
          Ward Business (one item per line)
          <textarea
            name="wardBusiness"
            rows={2}
            className="mt-1 w-full rounded border p-2"
          />
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="stakeBusiness" />
          Stake business this week
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            Sacrament Hymn #
            <input
              type="number"
              name="sacramentHymnNumber"
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="block">
            Sacrament Hymn Title
            <input
              name="sacramentHymnTitle"
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
        </div>

        <label className="block">
          Speakers / Musical Numbers — one per line as{" "}
          <code>type|name|topic</code> (type is <code>speaker</code> or{" "}
          <code>musical-number</code>)
          <textarea
            name="speakers"
            rows={4}
            placeholder="speaker|Jane Doe|Faith in Christ&#10;musical-number|Ward Choir|How Great Thou Art"
            className="mt-1 w-full rounded border p-2 font-mono text-sm"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            Closing Hymn #
            <input
              type="number"
              name="closingHymnNumber"
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="block">
            Closing Hymn Title
            <input
              name="closingHymnTitle"
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
        </div>

        <label className="block">
          Closing Prayer
          <input
            name="closingPrayer"
            required
            className="mt-1 w-full rounded border p-2"
          />
        </label>

        <button
          type="submit"
          className="rounded bg-primary px-4 py-2 text-white"
        >
          Create Meeting
        </button>
      </form>
    </section>
  );
}
