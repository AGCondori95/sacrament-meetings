import type {SacramentMeeting} from "./types";

/**
 * TEMPORARY in-memory data store for Week 02.
 * This will be replaced by a real database in a later week.
 * Data resets whenever the dev server restarts.
 */
const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-08-02",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Bishop Smith",
    announcements: [
      "Fast offerings collected today",
      "Ward temple night: Aug 12",
    ],
    openingHymn: {number: 2, title: "The Spirit of God"},
    openingPrayer: "Sister Williams",
    wardBusiness: [
      {description: "Sustaining of Brother Allen as Elders Quorum instructor"},
    ],
    stakeBusiness: false,
    sacramentHymn: {number: 169, title: "As Now We Take the Sacrament"},
    speakers: [
      {
        name: "Open Testimony Meeting",
        topic: "Congregation bears testimony",
        type: "speaker",
      },
    ],
    closingHymn: {number: 152, title: "God Be with You Till We Meet Again"},
    closingPrayer: "Brother Davis",
  },
  {
    id: 2,
    date: "2026-08-09",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Youth activity Wednesday at 7pm"],
    openingHymn: {number: 19, title: "We Thank Thee, O God, for a Prophet"},
    openingPrayer: "Brother Nelson",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {number: 174, title: "While of These Emblems We Partake"},
    speakers: [
      {name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker"},
      {name: "Youth Choir", topic: "", type: "musical-number"},
      {name: "Brother Clark", topic: "The Power of Covenants", type: "speaker"},
    ],
    closingHymn: {number: 31, title: "O God, Our Help in Ages Past"},
    closingPrayer: "Sister Reed",
  },
  {
    id: 3,
    date: "2026-08-16",
    meetingType: "regular",
    presiding: "President Young (Stake)",
    conducting: "Bishop Smith",
    announcements: ["Ward conference next month"],
    openingHymn: {number: 66, title: "Rejoice, the Lord Is King!"},
    openingPrayer: "Brother Hall",
    wardBusiness: [{description: "Release of Sister Moore from Primary"}],
    stakeBusiness: true,
    sacramentHymn: {
      number: 177,
      title: "'Tis Sweet to Sing the Matchless Love",
    },
    speakers: [
      {name: "Brother Perry", topic: "Missionary Work", type: "speaker"},
      {name: "Sister Kim", topic: "Temple Blessings", type: "speaker"},
    ],
    closingHymn: {number: 100, title: "Nearer, My God, to Thee"},
    closingPrayer: "Brother Ito",
  },
  {
    id: 4,
    date: "2026-08-23",
    meetingType: "stake",
    presiding: "President Young",
    conducting: "President Young",
    announcements: [
      "Stake conference — general session at 10:00am in the stake center",
    ],
    openingHymn: {number: 62, title: "All Creatures of Our God and King"},
    openingPrayer: "Brother Fielding",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {number: 0, title: "N/A — no sacrament (stake conference)"},
    speakers: [
      {
        name: "Stake Presidency & Visiting Authority",
        topic: "Stake conference addresses",
        type: "speaker",
      },
    ],
    closingHymn: {number: 30, title: "Come, Come, Ye Saints"},
    closingPrayer: "Sister Grant",
  },
  {
    id: 5,
    date: "2026-08-30",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: {number: 85, title: "How Firm a Foundation"},
    openingPrayer: "Sister Park",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {number: 193, title: "I Stand All Amazed"},
    speakers: [
      {name: "Brother Wells", topic: "Service and Charity", type: "speaker"},
      {name: "Duet: Sisters Cook & Lane", topic: "", type: "musical-number"},
      {name: "Sister Adams", topic: "Enduring to the End", type: "speaker"},
    ],
    closingHymn: {number: 152, title: "God Be with You Till We Meet Again"},
    closingPrayer: "Brother Ruiz",
  },
  {
    id: 6,
    date: "2026-09-06",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Bishop Smith",
    announcements: ["Fast Sunday", "Primary program rehearsal Sept 20"],
    openingHymn: {number: 3, title: "Now Let Us Rejoice"},
    openingPrayer: "Brother Tanner",
    wardBusiness: [{description: "Sustaining of new Ward Mission Leader"}],
    stakeBusiness: false,
    sacramentHymn: {number: 170, title: "God, Our Father, Hear Us Pray"},
    speakers: [
      {
        name: "Open Testimony Meeting",
        topic: "Congregation bears testimony",
        type: "speaker",
      },
    ],
    closingHymn: {number: 152, title: "God Be with You Till We Meet Again"},
    closingPrayer: "Sister Young",
  },
  {
    id: 7,
    date: "2026-10-04",
    meetingType: "general",
    presiding: "The First Presidency",
    conducting: "The First Presidency",
    announcements: [
      "General Conference — no local meetings; watch broadcast sessions",
    ],
    openingHymn: {number: 19, title: "We Thank Thee, O God, for a Prophet"},
    openingPrayer: "Assigned",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 0,
      title: "N/A — no sacrament (general conference)",
    },
    speakers: [
      {
        name: "General Authorities & Officers",
        topic: "Conference addresses",
        type: "speaker",
      },
    ],
    closingHymn: {number: 22, title: "We Listen to a Prophet’s Voice"},
    closingPrayer: "Assigned",
  },
];

/** Return all meetings, or only those on a given date. */
export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

/** Return all meetings sorted newest-first by date. */
export function getSortedMeetings(): SacramentMeeting[] {
  return [...meetings].sort((a, b) => b.date.localeCompare(a.date));
}

/** Find one meeting by id, or null if not found. */
export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}

/**
 * Return the "current" meeting: the most recent one whose date is
 * on or before today. Falls back to the earliest meeting if none qualify.
 */
export function getCurrentMeeting(
  today: string = new Date().toISOString().slice(0, 10),
): SacramentMeeting | null {
  const past = getSortedMeetings().filter((m) => m.date <= today);
  if (past.length > 0) return past[0];
  const all = getSortedMeetings();
  return all.length > 0 ? all[all.length - 1] : null;
}

/* ------------------------------------------------------------------ *
 * Mutation stubs — FUTURE WORK (later weeks, once a DB is added).
 * Left here to show intended API surface; not wired to the UI yet.
 * ------------------------------------------------------------------ */

let nextId = meetings.length + 1;

export function addMeeting(
  meeting: Omit<SacramentMeeting, "id">,
): SacramentMeeting {
  const created: SacramentMeeting = {...meeting, id: nextId++};
  meetings.push(created);
  return created;
}

export function updateMeeting(
  id: number,
  patch: Partial<Omit<SacramentMeeting, "id">>,
): SacramentMeeting | null {
  const meeting = meetings.find((m) => m.id === id);
  if (!meeting) return null;
  Object.assign(meeting, patch);
  return meeting;
}

export function deleteMeeting(id: number): boolean {
  const index = meetings.findIndex((m) => m.id === id);
  if (index === -1) return false;
  meetings.splice(index, 1);
  return true;
}
