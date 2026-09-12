/**
 * Format an ISO date ('YYYY-MM-DD') as a long, human-readable date.
 * Parses the parts manually to avoid UTC timezone off-by-one errors
 * that happen with new Date('2026-08-02')
 */
export function formatMeetingDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
