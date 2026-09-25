"use client";

import { type MeetingFormState, updateMeeting } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";
import { useActionState } from "react";
import { FormField } from "@/components/FormField";

const initialState: MeetingFormState = { message: null, errors: {} };

export function EditMeetingForm({ meeting }: { meeting: SacramentMeeting }) {
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);
  const [state, formAction, isPending] = useActionState(
    updateMeetingWithId,
    initialState,
  );

  const speakersText = meeting.speakers
    .map((s) => `${s.type}|${s.name}|${s.topic}`)
    .join("\n");

  return (
    <section className="space-y-6">
      <h1>Edit Meeting — {meeting.date}</h1>
      <form action={formAction} className="space-y-4" noValidate>
        {state.message && (
          <p aria-live="polite" className="text-sm font-medium text-red-600">
            {state.message}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Date"
            name="date"
            type="date"
            defaultValue={meeting.date}
            required
            errors={state.errors?.date}
          />

          <div>
            <label htmlFor="meetingType">Meeting Type</label>
            <select
              id="meetingType"
              name="meetingType"
              defaultValue={meeting.meetingType}
              aria-describedby="meetingType-error"
              className="mt-1 w-full rounded border p-2"
            >
              <option value="regular">Regular Sacrament Meeting</option>
              <option value="testimony">Fast &amp; Testimony Meeting</option>
              <option value="stake">Stake Conference</option>
              <option value="general">General Conference</option>
              <option value="special">Special Meeting</option>
            </select>
            <div
              id="meetingType-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.meetingType?.map((msg) => (
                <p key={msg}>{msg}</p>
              ))}
            </div>
          </div>

          <FormField
            label="Presiding"
            name="presiding"
            defaultValue={meeting.presiding}
            required
            errors={state.errors?.presiding}
          />
          <FormField
            label="Conducting"
            name="conducting"
            defaultValue={meeting.conducting}
            required
            errors={state.errors?.conducting}
          />
        </div>

        <div>
          <label htmlFor="announcements">Announcements (one per line)</label>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            defaultValue={(meeting.announcements ?? []).join("\n")}
            aria-describedby="announcements-error"
            className="mt-1 w-full rounded border p-2"
          />
          <div
            id="announcements-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.announcements?.map((msg) => (
              <p key={msg}>{msg}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Opening Hymn #"
            name="openingHymnNumber"
            type="number"
            defaultValue={meeting.openingHymn.number}
            required
            errors={state.errors?.openingHymnNumber}
          />
          <FormField
            label="Opening Hymn Title"
            name="openingHymnTitle"
            defaultValue={meeting.openingHymn.title}
            required
            errors={state.errors?.openingHymnTitle}
          />
        </div>

        <FormField
          label="Opening Prayer"
          name="openingPrayer"
          defaultValue={meeting.openingPrayer}
          required
          errors={state.errors?.openingPrayer}
        />

        <div>
          <label htmlFor="wardBusiness">
            Ward Business (one item per line)
          </label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={2}
            defaultValue={meeting.wardBusiness
              .map((b) => b.description)
              .join("\n")}
            aria-describedby="wardBusiness-error"
            className="mt-1 w-full rounded border p-2"
          />
          <div
            id="wardBusiness-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.wardBusiness?.map((msg) => (
              <p key={msg}>{msg}</p>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="stakeBusiness"
            name="stakeBusiness"
            defaultChecked={meeting.stakeBusiness}
          />
          <label htmlFor="stakeBusiness">Stake business this week</label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Sacrament Hymn #"
            name="sacramentHymnNumber"
            type="number"
            defaultValue={meeting.sacramentHymn.number}
            required
            errors={state.errors?.sacramentHymnNumber}
          />
          <FormField
            label="Sacrament Hymn Title"
            name="sacramentHymnTitle"
            defaultValue={meeting.sacramentHymn.title}
            required
            errors={state.errors?.sacramentHymnTitle}
          />
        </div>

        <div>
          <label htmlFor="speakers">
            Speakers / Musical Numbers — one per line as{" "}
            <code>type|name|topic</code>
          </label>
          <textarea
            id="speakers"
            name="speakers"
            rows={4}
            defaultValue={speakersText}
            aria-describedby="speakers-error"
            className="mt-1 w-full rounded border p-2 font-mono text-sm"
          />
          <div
            id="speakers-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.speakers?.map((msg) => (
              <p key={msg}>{msg}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Closing Hymn #"
            name="closingHymnNumber"
            type="number"
            defaultValue={meeting.closingHymn.number}
            required
            errors={state.errors?.closingHymnNumber}
          />
          <FormField
            label="Closing Hymn Title"
            name="closingHymnTitle"
            defaultValue={meeting.closingHymn.title}
            required
            errors={state.errors?.closingHymnTitle}
          />
        </div>

        <FormField
          label="Closing Prayer"
          name="closingPrayer"
          defaultValue={meeting.closingPrayer}
          required
          errors={state.errors?.closingPrayer}
        />

        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-primary px-4 py-2 text-white disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </section>
  );
}
