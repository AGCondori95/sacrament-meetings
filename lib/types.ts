/** The four kinds of Sunday meeting the planner supports. */
export type MeetingType = "testimony" | "regular" | "stake" | "general";

/** a hymn reference: hymnbook number + title */
export interface Hymn {
  number: number;
  title: string;
}

/** A program item that is either a spoken talk or a musical number. */
export interface SpeakerItem {
  name: string;
  topic: string;
  type: "speaker" | "musical-number";
}

/** A single item of a ward business (e.g. a sustaining or release). */
export interface WardBusinessItem {
  description: string;
}

/** A full sacrament meeting agenda for one Sunday. */
export interface SacramentMeeting {
  id: number;
  date: string;
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements?: string[];
  openingHymn: Hymn;
  openingPrayer: string;
  wardBusiness: WardBusinessItem[];
  stakeBusiness: boolean;
  sacramentHymn: Hymn;
  speakers: SpeakerItem[];
  closingHymn: Hymn;
  closingPrayer: string;
}

/** Lightweight shape for list/card views (avoids passing whole agendas). */
export interface MeetingSummary {
  id: number;
  date: string;
  meetingType: MeetingType;
  speakerCount: number;
}

/** Standard error body returned by the API routes. */
export interface ApiError {
  error: string;
}

/** Human-readable labels for each meeting type. */
export const MEETING_TYPE_LABELS: Record<MeetingType, string> = {
  testimony: "Fast & Testimony Meeting",
  regular: "Regular Sacrament Meeting",
  stake: "Stake Conference",
  general: "General Conference",
};

/** Non-sacrament meeting types (no sacrament ordinance / speaker). */
export const NON_SACRAMENT_TYPES: MeetingType[] = ["stake", "general"];
