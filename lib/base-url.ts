import {headers} from "next/headers";

/** Absolute base URL for server-side fetches to our own API routes. */
export async function getBaseUrl(): Promise<string> {
  const headerList = await headers();
  const host = headerList.get("host") ?? "localhost:3000";
  const isLocal = host.startsWith("localhost") || host.startsWith("127.");
  const protocol = isLocal ? "http" : "https";
  return `${protocol}://${host}`;
}
