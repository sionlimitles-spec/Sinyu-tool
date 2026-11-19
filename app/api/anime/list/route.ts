import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const type = searchParams.get("type") || "recent"; 

  try {
    let url = `https://www.sankavollerei.web.id/anime/samehadaku/${type}`;
    if (query) {
      url = `https://www.sankavollerei.web.id/anime/samehadaku/search?q=${encodeURIComponent(query)}`;
    }

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json"
      },
      cache: "no-store"
    });

    const json = await res.json();

    if (json.status !== "success") {
      return NextResponse.json({ success: false, message: "API Gagal" }, { status: 200 });
    }

    let listData = json.data.animeList || json.data.recent?.animeList || [];
    
    // PERBAIKAN: Membersihkan URL untuk mendapatkan gambar resolusi tinggi (HD)
    // Menghapus akhiran seperti -300x167 sebelum ekstensi file
    listData = listData.map((anime: any) => {
      if (anime.poster) {
        anime.poster = anime.poster.replace(/-\d+x\d+(?=\.(jpg|png|webp|jpeg))/i, "");
      }
      return anime;
    });

    return NextResponse.json({ success: true, data: listData.slice(0, 18) });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Gagal koneksi" }, { status: 500 });
  }
}
