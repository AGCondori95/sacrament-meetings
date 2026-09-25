"use server";

import type { SpeakerItem } from "@/lib/types";
import { z } from "zod";
import {
  addMeeting,
  deleteMeeting as deleteMeetingInDb,
  updateMeeting as updateMeetingInDb,
} from "@/lib/meetings-db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MeetingFormSchema } from "@/lib/meeting-schema";

function parseLines(raw: FormDataEntryValue | null): string[] {
  return (raw?.toString() ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSpeakers(raw: FormDataEntryValue | null): SpeakerItem[] {
  return parseLines(raw).map((line) => {
    const [type, name, ...topicParts] = line.split("|").map((p) => p.trim());
    return {
      type: type === "musical-number" ? "musical-number" : "speaker",
      name: name ?? "",
      topic: topicParts.join("|") ?? "",
    };
  });
}

const HymnSchema = z.object({
  number: z.coerce.number().int().positive("Hymn number must be positive"),
  title: z.string().min(1, "Hymn title is required"),
});

const SpeakerItemSchema = z.object({
  name: z.string().min(1, "Speaker/number name is required"),
  topic: z.string(),
  type: z.enum(["speaker", "musical-number"]),
});

function buildPayload(formData: FormData) {
  return {
    date: formData.get("date")?.toString() ?? "",
    meetingType: formData.get("meetingType")?.toString() ?? "",
    presiding: formData.get("presiding")?.toString() ?? "",
    conducting: formData.get("conducting")?.toString() ?? "",
    announcements: parseLines(formData.get("announcements")),
    openingHymn: {
      number: formData.get("openingHymnNumber")?.toString() ?? "",
      title: formData.get("openingHymnTitle")?.toString() ?? "",
    },
    openingPrayer: formData.get("openingPrayer")?.toString() ?? "",
    wardBusiness: parseLines(formData.get("wardBusiness")).map(
      (description) => ({
        description,
      }),
    ),
    stakeBusiness: formData.get("stakeBusiness") === "on",
    sacramentHymn: {
      number: formData.get("sacramentHymnNumber")?.toString() ?? "",
      title: formData.get("sacramentHymnTitle")?.toString() ?? "",
    },
    speakers: parseSpeakers(formData.get("speakers")),
    closingHymn: {
      number: formData.get("closingHymnNumber")?.toString() ?? "",
      title: formData.get("closingHymnTitle")?.toString() ?? "",
    },
    closingPrayer: formData.get("closingPrayer")?.toString() ?? "",
  };
}

export async function createMeeting(formData: FormData): Promise<void> {
  const validated = MeetingFormSchema.safeParse(buildPayload(formData));

  if (!validated.success) {
    throw new Error(
      "Invalid meeting data: " +
        validated.error.issues.map((i) => i.message).join("; "),
    );
  }

  await addMeeting(validated.data);
  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  formData: FormData,
): Promise<void> {
  const validated = MeetingFormSchema.safeParse(buildPayload(formData));

  if (!validated.success) {
    throw new Error(
      "Invalid meeting data: " +
        validated.error.issues.map((i) => i.message).join("; "),
    );
  }

  const updated = await updateMeetingInDb(id, validated.data);
  if (!updated) {
    throw new Error(`Meeting #${id} was not found.`);
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  await deleteMeetingInDb(id);
  revalidatePath("/meetings");
}
