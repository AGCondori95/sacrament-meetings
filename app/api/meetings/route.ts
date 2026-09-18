import { NextRequest, NextResponse } from "next/server";
import { getMeetingByDate, getMeetings } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

// GET /api/meetings
// GET /api/meetings?date=2026-09-06
// GET /api/meetings?query=smith&page=1
export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (date) {
    const meeting = await getMeetingByDate(date);
    return NextResponse.json(meeting ? [meeting] : []);
  }

  const query = request.nextUrl.searchParams.get("query") ?? "";
  const page = Number(request.nextUrl.searchParams.get("page")) || 1;
  const meetings: SacramentMeeting[] = await getMeetings(query, page);
  return NextResponse.json(meetings);
}
