import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || password !== process.env.STATS_PASSWORD) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set("stats_auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[/api/stats/auth]", err);
    return Response.json({ error: "internal error" }, { status: 500 });
  }
}
