// app/api/google/auth-url/route.ts

import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;

export async function GET(req: NextRequest) {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/drive.file",
      "openid",
      "email",
    ].join(" "),
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  return NextResponse.json({ url });
}