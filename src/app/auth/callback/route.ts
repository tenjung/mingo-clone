import { NextResponse, type NextRequest } from "next/server";
import { serverClient } from "@/lib/supabase/server";
import { safeReturnPath } from "@/domain/cafe";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const client = await serverClient();
  if (code && client) {
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (!error)
      return NextResponse.redirect(
        new URL(
          safeReturnPath(request.nextUrl.searchParams.get("next")),
          request.url,
        ),
      );
  }
  return NextResponse.redirect(
    new URL("/sign-in?message=callback-failed", request.url),
  );
}
