"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Server, Info, Play, Zap, ExternalLink } from "lucide-react";

export default function AnimeWatchPage() {
  const { id } = useParams();
  const router = useRouter();
  const [episode, setEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [videoUrl, setVideoUrl] = useState("");
  const [isDirectVideo, setIsDirectVideo] = useState(false); // True jika pakai <video>, false jika <iframe>
  const [activeServer, setActiveServer] = useState("default");
  const [loadingVideo, setLoadingVideo] = useState(false);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const res = await fetch(`/api/anime/episode?id=${id}`);
        const json = await res.json();
        if (json.success) {
          setEpisode(json.data);
          setVideoUrl(json.data.defaultStreamingUrl);
          setIsDirectVideo(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisode();
  }, [id]);

  // Fungsi memutar video Direct MP4 (HD)
  const playDirectVideo = async (rawUrl: string, serverName: string) => {
    setLoadingVideo(true);
    setActiveServer(serverName);
    try {
      const res = await fetch(`/api/anime/extract?url=${encodeURIComponent(rawUrl)}`);
      const json = await res.json();
      
      if (json.success && json.url) {
        setVideoUrl(json.url);
        setIsDirectVideo(true); // Aktifkan player <video>
      } else {
        alert("Gagal mengekstrak link video ini. Coba server lain.");
        setActiveServer(isDirectVideo ? "" : "default");
      }
    } catch (err) {
      alert("Koneksi gagal.");
    } finally {
      setLoadingVideo(false);
    }
  };

  // Fungsi memutar video Iframe (Biasanya 360p)
  const changeIframeServer = async (serverId: string, serverName: string) => {
    if (activeServer === serverId) return;
    setLoadingVideo(true);
    setActiveServer(serverId);
    try {
      const res = await fetch(`/api/anime/server?id=${serverId}`);
      const json = await res.json();
      
      if (json.success && json.url) {
        setVideoUrl(json.url);
        setIsDirectVideo(false); // Aktifkan player <iframe>
      } else {
        alert("Gagal memuat server ini.");
        setActiveServer("default");
      }
    } catch (err) {
      alert("Koneksi gagal.");
      setActiveServer("default");
    } finally {
      setLoadingVideo(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-cyan-500 gap-3">
      <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
    </div>
  );
  
  if (!episode) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-red-500 font-bold">Episode tidak ditemukan.</div>;

  // Filter link download MP4 untuk dijadikan tombol Streaming HD
  const hdStreams = episode.downloadUrl?.formats
    ?.find((f: any) => f.title === "MP4") // Hanya ambil MP4 (browser gak support MKV)
    ?.qualities?.map((q: any) => {
      // Cari link Pixeldrain
      const pixeldrain = q.urls.find((u: any) => u.title.toLowerCase().includes("pixeldrain"));
      if (pixeldrain) {
        return { quality: q.title, url: pixeldrain.url };
      }
      return null;
    }).filter(Boolean) || [];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans pb-24">
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md px-4 py-3 border-b border-white/5 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-full bg-white/5 active:scale-90 transition-transform">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-sm font-bold truncate flex-1">{episode.title}</h1>
      </header>

      {/* VIDEO PLAYER AREA */}
      <div className="w-full aspect-video bg-black relative border-b border-white/5 overflow-hidden">
        {loadingVideo && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-6 h-6 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        {videoUrl ? (
          isDirectVideo ? (
            // NATIVE HTML5 PLAYER (Untuk kualitas HD)
            <video
              src={videoUrl}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full object-contain z-10 bg-black"
              controlsList="nodownload"
            />
          ) : (
            // IFRAME PLAYER (Untuk server default/360p)
            <iframe
              src={videoUrl}
              allowFullScreen
              className="absolute inset-0 w-full h-full relative z-10"
              title="Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xs">
            Link video tidak tersedia.
          </div>
        )}
      </div>

      <div className="px-5 pt-6 space-y-8">
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

        {/* STREAMING HD (DARI LINK DOWNLOAD) */}
        {hdStreams.length > 0 && (
          <div className="bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/30 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-cyan-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <Zap size={14} className="fill-cyan-400" /> Streaming Kualitas HD (Direct)
            </h3>
            <div className="flex flex-wrap gap-2">
              {hdStreams.map((stream: any, i: number) => (
                <button
                  key={i}
                  onClick={() => playDirectVideo(stream.url, `hd-${i}`)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black border transition-all flex items-center gap-2 ${
                    activeServer === `hd-${i}`
                      ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(8,145,178,0.5)]" 
                      : "bg-black/50 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20"
                  }`}
                >
                  <Play size={12} /> Putar {stream.quality}
                </button>
              ))}
            </div>
            <p className="text-[9px] text-cyan-300/60 mt-3 italic">
              *Kualitas HD diputar langsung menggunakan player internal (bebas lag).
            </p>
          </div>
        )}

        {/* PEMILIH SERVER IFRAME (360p) */}
        {episode.server?.qualities && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <Server size={14} /> Server Alternatif
            </h3>
            
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => {
                    setVideoUrl(episode.defaultStreamingUrl);
                    setIsDirectVideo(false);
                    setActiveServer("default");
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${
                    activeServer === "default" 
                      ? "bg-slate-700 text-white border-slate-500" 
                      : "bg-black/40 text-slate-400 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Play size={12} /> Player Utama (Blogspot)
                </button>
              </div>

              {episode.server.qualities.map((q: any, i: number) => {
                if (!q.serverList || q.serverList.length === 0) return null;
                return (
                  <div key={i}>
                    <p className="text-[9px] font-mono text-slate-500 mb-1.5 uppercase">{q.title}</p>
                    <div className="flex flex-wrap gap-2">
                      {q.serverList.map((server: any) => (
                        <button
                          key={server.serverId}
                          onClick={() => changeIframeServer(server.serverId, server.title)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                            activeServer === server.serverId 
                              ? "bg-slate-700 text-white border-slate-500" 
                              : "bg-black/40 text-slate-400 border-white/10 hover:bg-white/10"
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
      </div>
    </main>
  );
}
