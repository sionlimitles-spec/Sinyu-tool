"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Settings } from "lucide-react";

export default function AnimeWatchPage() {
  const { id } = useParams();
  const router = useRouter();
  const [episode, setEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [activeServer, setActiveServer] = useState("");

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const res = await fetch(`/api/anime/episode?id=${id}`);
        const json = await res.json();
        if (json.success) {
          setEpisode(json.data);
          setVideoUrl(json.data.defaultStreamingUrl);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisode();
  }, [id]);

  // Fungsi untuk mengganti server/kualitas
  const changeServer = async (serverId: string) => {
    setActiveServer(serverId);
    try {
      const res = await fetch(`/api/anime/server?id=${serverId}`);
      const json = await res.json();
      if (json.success) {
        setVideoUrl(json.url);
      } else {
        alert("Gagal memuat server ini. Coba kualitas lain.");
      }
    } catch (err) {
      alert("Koneksi gagal.");
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500">Memuat video...</div>;
  if (!episode) return <div className="min-h-screen bg-black flex items-center justify-center text-red-500">Video tidak ditemukan.</div>;

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-10">
      <header className="absolute top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between">
        <button onClick={() => router.back()} className="p-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md active:scale-90 transition-transform">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-sm font-bold truncate max-w-[200px]">{episode.title}</h1>
        <div className="w-8"></div>
      </header>

      {/* Video Player */}
      <div className="w-full aspect-video bg-black relative mt-16">
        {videoUrl ? (
          <iframe
            src={videoUrl}
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            title="Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500">
            Link video tidak tersedia.
          </div>
        )}
      </div>

      <div className="px-6 py-6 space-y-6">
        <div className="flex justify-between gap-4">
          {episode.hasPrevEpisode ? (
            <Link href={`/tools/anime/watch/${episode.prevEpisode.episodeId}`} className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-xl text-xs font-bold transition-colors">
              <ChevronLeft size={16} /> Prev
            </Link>
          ) : <div className="flex-1"></div>}

          {episode.hasNextEpisode ? (
            <Link href={`/tools/anime/watch/${episode.nextEpisode.episodeId}`} className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 py-3 rounded-xl text-xs font-black transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]">
              Next <ChevronRight size={16} />
            </Link>
          ) : <div className="flex-1"></div>}
        </div>

        {/* PEMILIH KUALITAS & SERVER */}
        <div>
          <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
            <Settings size={16} className="text-cyan-400" /> Pilih Kualitas & Server
          </h3>
          <div className="space-y-4">
            {episode.server?.qualities?.map((q: any, i: number) => (
              // Sembunyikan jika serverList kosong (seperti di "unknown")
              q.serverList.length > 0 && (
                <div key={i}>
                  <p className="text-[10px] font-mono text-slate-500 mb-2 uppercase">{q.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {q.serverList.map((server: any) => (
                      <button
                        key={server.serverId}
                        onClick={() => changeServer(server.serverId)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                          activeServer === server.serverId 
                            ? "bg-cyan-500 text-black border-cyan-400" 
                            : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {server.title}
                      </button>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 mb-2">Sinopsis</h3>
          <p className="text-[11px] text-slate-300 leading-relaxed text-justify line-clamp-4">
            {episode.synopsis.paragraphs[0]}
          </p>
        </div>
      </div>
    </main>
  );
}
