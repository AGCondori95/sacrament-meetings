import { z } from "zod";

const MEETING_TYPES = [
  "testimony",
  "regular",
  "stake",
  "general",
  "special",
] as const;

export const MeetingFormSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  meetingType: z.enum(MEETING_TYPES, { message: "Select a meeting type" }),
  presiding: z.string().trim().min(1, "Presiding officer is required"),
  conducting: z.string().trim().min(1, "Conducting officer is required"),
  announcements: z.string().default(""),
  openingHymnNumber: z.coerce
    .number()
    .int()
    .positive("Enter a valid hymn number"),
  openingHymnTitle: z.string().trim().min(1, "Opening hymn title is required"),
  openingPrayer: z.string().trim().min(1, "Opening prayer is required"),
  wardBusiness: z.string().default(""),
  stakeBusiness: z.string().optional(),
  sacramentHymnNumber: z.coerce
    .number()
    .int()
    .positive("Enter a valid hymn number"),
  sacramentHymnTitle: z
    .string()
    .trim()
    .min(1, "Sacrament hymn title is required"),
  speakers: z.string().default(""),
  closingHymnNumber: z.coerce
    .number()
    .int()
    .positive("Enter a valid hymn number"),
  closingHymnTitle: z.string().trim().min(1, "Closing hymn title is required"),
  closingPrayer: z.string().trim().min(1, "Closing prayer is required"),
});

export type MeetingFormValues = z.infer<typeof MeetingFormSchema>;
