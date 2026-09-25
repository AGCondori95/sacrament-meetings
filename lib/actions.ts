"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from "@/lib/meetings-db";
import {
  MeetingFormSchema,
  type MeetingFormValues,
} from "@/lib/meeting-schema";
import type { SacramentMeeting, SpeakerItem } from "@/lib/types";

export type MeetingFormState = {
  errors?: Record<string, string[]>;
  message?: string | null;
};

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSpeakers(raw: string): SpeakerItem[] {
  return linesToArray(raw).map((line) => {
    const [type, name, ...topicParts] = line.split("|").map((p) => p.trim());
    return {
      type: type === "musical-number" ? "musical-number" : "speaker",
      name: name ?? "",
      topic: topicParts.join("|") ?? "",
    };
  });
}

function toMeetingRecord(
  values: MeetingFormValues,
): Omit<SacramentMeeting, "id"> {
  return {
    date: values.date,
    meetingType: values.meetingType,
    presiding: values.presiding,
    conducting: values.conducting,
    announcements: linesToArray(values.announcements),
    openingHymn: {
      number: values.openingHymnNumber,
      title: values.openingHymnTitle,
    },
    openingPrayer: values.openingPrayer,
    wardBusiness: linesToArray(values.wardBusiness).map((description) => ({
      description,
    })),
    stakeBusiness: values.stakeBusiness === "on",
    sacramentHymn: {
      number: values.sacramentHymnNumber,
      title: values.sacramentHymnTitle,
    },
    speakers: parseSpeakers(values.speakers),
    closingHymn: {
      number: values.closingHymnNumber,
      title: values.closingHymnTitle,
    },
    closingPrayer: values.closingPrayer,
  };
}

export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const validated = MeetingFormSchema.safeParse(Object.fromEntries(formData));

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
      message: "Please fix the errors below.",
    };
  }

  try {
    await addMeeting(toMeetingRecord(validated.data));
  } catch (error) {
    console.error("createMeeting: database insert failed", error);
    return { message: "We could not save this meeting. Please try again." };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const validated = MeetingFormSchema.safeParse(Object.fromEntries(formData));

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
      message: "Please fix the errors below.",
    };
  }

  let updated;
  try {
    updated = await updateMeetingInDb(id, toMeetingRecord(validated.data));
  } catch (error) {
    console.error(`updateMeeting: database update failed for #${id}`, error);
    return {
      message: "We could not save changes to this meeting. Please try again.",
    };
  }

  if (!updated) {
    return { message: `Meeting #${id} was not found.` };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));

  try {
    await deleteMeetingInDb(id);
  } catch (error) {
    console.error(`deleteMeeting: database delete failed for #${id}`, error);
    throw new Error("We could not delete this meeting. Please try again.");
  }

  revalidatePath("/meetings");
}
