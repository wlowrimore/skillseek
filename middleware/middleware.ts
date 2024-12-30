import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();

  // Protect /studio routes
  if (request.nextUrl.pathname.startsWith("/studio")) {
    if (!session) {
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
