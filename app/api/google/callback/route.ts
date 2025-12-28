// /api/google/callback

import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new NextResponse("Missing code", { status: 400 });
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  const tokenJson = await tokenRes.json();

  // 여기서 access_token / refresh_token / expires_in 등을 얻게 됨
  const { access_token, refresh_token, expires_in } = tokenJson;
  console.log("Access Token:", access_token);
  console.log("Refresh Token:", refresh_token);
  console.log("Expires In:", expires_in);

  const userinfoRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!userinfoRes.ok) {
    const txt = await userinfoRes.text();
    console.error("Failed to fetch userinfo:", userinfoRes.status, txt);
    return new NextResponse("Failed to fetch userinfo", { status: 500 });
  }

  const userinfo = await userinfoRes.json() as {
    sub: string;
    email?: string;
  };

  const googleEmail = userinfo.email ?? null;
  const googleSub = userinfo.sub;  // 구글 계정 고유 ID

  console.log("Google User ID (googleEmail):", googleEmail);


  // ★ 이 토큰들을 DB에 유저별로 저장해야 함 (user_id와 매핑)
  // 예: await saveUserTokens(userId, { access_token, refresh_token, expires_at: ... });

  // 이후 프론트로 리다이렉트
  return makePopupCloseResponse({ success: true, email: googleEmail }, req.headers.get("origin") || "*");
}

/**
 * popup에서 부모창에 postMessage 보내고 자신을 닫는 HTML 응답
 */
function makePopupCloseResponse(payload: unknown, origin: string) {
  const json = JSON.stringify(payload);

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Google Drive Connected</title>
  </head>
  <body>
    <script>
      (function() {
        try {
          if (window.opener) {
            window.opener.postMessage(
              { source: "maison-de-marie-google-oauth", payload: ${json} },
              "${origin}"
            );
          }
        } catch (e) {
          console.error(e);
        }
        window.close();
      })();
    </script>
    <p>창을 닫으셔도 됩니다.</p>
  </body>
</html>
`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}