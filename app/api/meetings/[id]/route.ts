import { getMeetingById } from "@/lib/meetings-db";
import type { ApiError } from "@/lib/types";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/meetings/6
export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const numericId = Number(id);

  // 400 — not a valid number
  if (!Number.isInteger(numericId)) {
    return NextResponse.json<ApiError>(
      { error: "Invalid meeting id" },
      { status: 400 },
    );
  }

  const meeting = await getMeetingById(numericId);

  // 404 — valid number, but no such meeting
  if (!meeting) {
    return NextResponse.json<ApiError>(
      { error: "Meeting not found" },
      { status: 404 },
    );
  }

  // 200 — found
  return NextResponse.json(meeting);
}
