import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) return new NextResponse("URL required", { status: 400 });

  try {
    // Ambil HTML dari server video (VIP, Mega, dll)
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": new URL(targetUrl).origin + "/",
      },
    });

    const html = await res.text();
    const baseUrl = new URL(targetUrl).origin;

    // 1. Ubah semua link relatif (/css/style.css) menjadi absolut (https://server.com/css/style.css)
    // agar desain video player tetap muncul
    let modifiedHtml = html.replace(/(href|src)="\/(?!\/)/g, `$1="${baseUrl}/`);
    modifiedHtml = modifiedHtml.replace(/(href|src)='\/(?!\/)/g, `$1='${baseUrl}/`);

    // 2. Kembalikan HTML yang sudah dimodifikasi
    // TANPA header X-Frame-Options, sehingga browser mengizinkan iframe
    return new NextResponse(modifiedHtml, {
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
        // Kita sengaja TIDAK mengirim X-Frame-Options
      },
    });
  } catch (error) {
    return new NextResponse("Gagal memuat proxy", { status: 500 });
  }
}
