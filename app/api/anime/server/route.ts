import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serverId = searchParams.get("id");

  if (!serverId) return NextResponse.json({ success: false }, { status: 400 });

  try {
    const res = await fetch(`https://www.sankavollerei.web.id/anime/samehadaku/server/${serverId}`, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const json = await res.json();

    if (json.status !== "success") throw new Error("API Error");

    return NextResponse.json({ success: true, url: json.data.url });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Gagal memuat server video" }, { status: 500 });
  }
}
