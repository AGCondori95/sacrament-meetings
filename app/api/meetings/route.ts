import {getMeetings} from "@/lib/meetings-db";
import type {SacramentMeeting} from "@/lib/types";
import {NextRequest, NextResponse} from "next/server";

// GET /api/meetings
// GET /api/meetings?date=2026-09-06
export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date"); // string | null
  const meetings: SacramentMeeting[] = getMeetings(date);
  return NextResponse.json(meetings);
}
