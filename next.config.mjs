/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Wajib untuk Cloudflare Workers
    remotePatterns: [
      { protocol: "https", hostname: "**" } // Mengizinkan semua domain gambar
    ]
  },
};

export default nextConfig;
