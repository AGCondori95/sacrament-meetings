import { z } from "zod";

const MEETING_TYPES = [
  "testimony",
  "regular",
  "stake",
  "general",
  "special",
] as const;

const HymnSchema = z.object({
  number: z.coerce.number().int().positive("Hymn number must be positive"),
  title: z.string().min(1, "Hymn title is required"),
});

const SpeakerItemSchema = z.object({
  name: z.string().min(1, "Speaker/number name is required"),
  topic: z.string(),
  type: z.enum(["speaker", "musical-number"]),
});

export const MeetingFormSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  meetingType: z.enum(MEETING_TYPES),
  presiding: z.string().min(1, "Presiding officer is required"),
  conducting: z.string().min(1, "Conducting officer is required"),
  announcements: z.array(z.string()).default([]),
  openingHymn: HymnSchema,
  openingPrayer: z.string().min(1, "Opening prayer is required"),
  wardBusiness: z
    .array(z.object({ description: z.string().min(1) }))
    .default([]),
  stakeBusiness: z.boolean().default(false),
  sacramentHymn: HymnSchema,
  speakers: z.array(SpeakerItemSchema).default([]),
  closingHymn: HymnSchema,
  closingPrayer: z.string().min(1, "Closing prayer is required"),
});
