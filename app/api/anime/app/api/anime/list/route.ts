import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const type = searchParams.get("type") || "recent"; // recent, ongoing, completed, popular

  try {
    let url = `https://www.sankavollerei.web.id/anime/samehadaku/${type}`;
    if (query) {
      url = `https://www.sankavollerei.web.id/anime/samehadaku/search?q=${encodeURIComponent(query)}`;
    }

    const res = await fetch(url, { next: { revalidate: 3600 } });
    const json = await res.json();

    if (json.status !== "success") throw new Error("API Error");

    // Ambil list dari berbagai kemungkinan struktur response API
    const listData = json.data.animeList || json.data.recent?.animeList || [];
    
    // Ambil 18 data agar pas untuk grid 3 kolom
    return NextResponse.json({ success: true, data: listData.slice(0, 18) });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Gagal memuat data" }, { status: 500 });
  }
}
