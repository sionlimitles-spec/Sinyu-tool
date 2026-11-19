import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ success: false }, { status: 400 });

  try {
    const res = await fetch(`https://www.sankavollerei.web.id/anime/samehadaku/episode/${id}`);
    const json = await res.json();

    if (json.status !== "success") throw new Error("API Error");

    return NextResponse.json({ success: true, data: json.data });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Gagal memuat episode" }, { status: 500 });
  }
}
