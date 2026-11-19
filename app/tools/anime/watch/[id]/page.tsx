"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Server, Info, Play } from "lucide-react";

export default function AnimeWatchPage() {
  const { id } = useParams();
  const router = useRouter();
  const [episode, setEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [activeServer, setActiveServer] = useState("");
  const [loadingVideo, setLoadingVideo] = useState(false);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const res = await fetch(`/api/anime/episode?id=${id}`);
        const json = await res.json();
        if (json.success) {
          setEpisode(json.data);
          setVideoUrl(json.data.defaultStreamingUrl);
          setActiveServer("default");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisode();
  }, [id]);

  // Fungsi ganti server
  const changeServer = async (serverId: string, serverName: string) => {
    // Jangan ganti jika server sama
    if (activeServer === serverId) return;

    // Cegah error jika user tidak sengaja klik server download
    if (serverName.toLowerCase().includes("mega") || serverName.toLowerCase().includes("gofile")) {
      alert("Server ini khusus untuk Download, tidak bisa diputar langsung di web.");
      return;
    }

    setLoadingVideo(true);
    setActiveServer(serverId);
    try {
      const res = await fetch(`/api/anime/server?id=${serverId}`);
      const json = await res.json();
      if (json.success && json.url) {
        setVideoUrl(json.url);
      } else {
        alert("Gagal memuat server ini. Coba server lain.");
        setVideoUrl(episode.defaultStreamingUrl); // Balikin ke default
        setActiveServer("default");
      }
    } catch (err) {
      alert("Koneksi ke server gagal.");
    } finally {
      setLoadingVideo(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-cyan-500 gap-3">
      <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
      <p className="text-xs font-bold tracking-widest uppercase">Memuat Data...</p>
    </div>
  );
  
  if (!episode) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-red-500 font-bold">Episode tidak ditemukan.</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md px-4 py-3 border-b border-white/5 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-full bg-white/5 active:scale-90 transition-transform">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-sm font-bold truncate flex-1">{episode.title}</h1>
      </header>

      {/* Video Player Area */}
      <div className="w-full aspect-video bg-black relative border-b border-white/5">
        {loadingVideo && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-6 h-6 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        {videoUrl ? (
          <iframe
            src={videoUrl}
            allowFullScreen
            className="absolute inset-0 w-full h-full relative z-10"
            title="Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xs">
            Link video tidak tersedia.
          </div>
        )}
      </div>

      <div className="px-5 pt-6 space-y-8">
        {/* Navigasi Prev / Next */}
        <div className="flex justify-between gap-3">
          {episode.hasPrevEpisode ? (
            <Link href={`/tools/anime/watch/${episode.prevEpisode.episodeId}`} className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-xl text-xs font-bold transition-colors">
              <ChevronLeft size={16} /> Prev
            </Link>
          ) : <div className="flex-1"></div>}

          {episode.hasNextEpisode ? (
            <Link href={`/tools/anime/watch/${episode.nextEpisode.episodeId}`} className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-xl text-xs font-black transition-colors shadow-[0_0_20px_rgba(8,145,178,0.3)]">
              Next <ChevronRight size={16} />
            </Link>
          ) : <div className="flex-1"></div>}
        </div>

        {/* PEMILIH SERVER STREAMING */}
        {episode.server?.qualities && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-cyan-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <Server size={14} /> Pilih Server Streaming
            </h3>
            
            <div className="space-y-3">
              {/* Default Server Button */}
              <div>
                <p className="text-[9px] font-mono text-slate-500 mb-1.5 uppercase">Default</p>
                <button
                  onClick={() => {
                    setVideoUrl(episode.defaultStreamingUrl);
                    setActiveServer("default");
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${
                    activeServer === "default" 
                      ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(8,145,178,0.4)]" 
                      : "bg-black/40 text-slate-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Play size={12} /> Player Utama
                </button>
              </div>

              {/* Map Server Lainnya */}
              {episode.server.qualities.map((q: any, i: number) => {
                if (!q.serverList || q.serverList.length === 0) return null;
                
                // Filter server yang bukan untuk download (seperti Mega)
                const streamServers = q.serverList.filter((s: any) => 
                  !s.title.toLowerCase().includes("mega") && 
                  !s.title.toLowerCase().includes("gofile")
                );

                if (streamServers.length === 0) return null;

                return (
                  <div key={i}>
                    <p className="text-[9px] font-mono text-slate-500 mb-1.5 uppercase">{q.title}</p>
                    <div className="flex flex-wrap gap-2">
                      {streamServers.map((server: any) => (
                        <button
                          key={server.serverId}
                          onClick={() => changeServer(server.serverId, server.title)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${
                            activeServer === server.serverId 
                              ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(8,145,178,0.4)]" 
                              : "bg-black/40 text-slate-300 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          {server.title}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Info Box */}
        <div>
          <h2 className="text-sm font-black text-white flex items-center gap-2 mb-2 uppercase tracking-widest">
            <Info size={16} className="text-cyan-400" /> Sinopsis
          </h2>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <p className="text-xs text-slate-300 leading-relaxed text-justify">
              {episode.synopsis.paragraphs[0]}
            </p>
          </div>
        </div>

        {/* List Download */}
        <div>
          <h2 className="text-sm font-black text-white flex items-center gap-2 mb-4 uppercase tracking-widest">
            <Download size={16} className="text-cyan-400" /> Link Download
          </h2>
          
          <div className="space-y-4">
            {episode.downloadUrl?.formats?.map((format: any, idx: number) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-white/10 px-4 py-2 border-b border-white/10">
                  <h3 className="text-xs font-black text-white tracking-wider">{format.title}</h3>
                </div>
                
                <div className="p-4 space-y-4">
                  {format.qualities.map((quality: any, qIdx: number) => (
                    <div key={qIdx}>
                      <p className="text-[10px] font-mono text-cyan-500 mb-2 uppercase tracking-wider">{quality.title}</p>
                      <div className="flex flex-wrap gap-2">
                        {quality.urls.map((urlObj: any, uIdx: number) => (
                          <a 
                            key={uIdx} 
                            href={urlObj.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-[10px] font-bold text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                          >
                            {urlObj.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
