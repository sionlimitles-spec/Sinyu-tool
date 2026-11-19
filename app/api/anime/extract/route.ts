import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) return NextResponse.json({ success: false }, { status: 400 });

  try {
    // 1. Bongkar link Pixeldrain (Penyedia file tercepat & support streaming)
    if (url.includes("pixeldrain.com/u/")) {
      const id = url.split("/u/")[1];
      return NextResponse.json({ success: true, url: `https://pixeldrain.com/api/file/${id}` });
    }

    // 2. Bongkar link server lain (seperti Filedon)
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": new URL(url).origin + "/",
      },
    });
    const html = await res.text();

    // Cari link .mp4 di dalam halaman HTML server
    const mp4Match = html.match(/https?:\/\/[^"'\s]+\.mp4[^"'\s]*/i);
    if (mp4Match) {
      return NextResponse.json({ success: true, url: mp4Match[0] });
    }

    return NextResponse.json({ success: false, message: "Direct MP4 not found" });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
