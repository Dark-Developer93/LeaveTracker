// scripts/updateRedirectUris.ts
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  // process.env.GOOGLE_REFRESH_TOKEN,
);

google.options({ auth: oauth2Client });

async function updateRedirectUris() {
  const redirectUris = [
    `${process.env.VERCEL_URL}/api/auth/callback/google`,
    `${process.env.VERCEL_BRANCH_URL}/api/auth/callback/google`,
    "http://localhost:3000/api/auth/callback/google",
  ];

  const res = await oauth2Client.request({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "POST",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uris: redirectUris,
    },
  });

  console.log("Updated redirect URIs:", res.data);
}

updateRedirectUris().catch(console.error);
