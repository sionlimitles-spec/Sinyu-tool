"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Server, Info, PlayCircle } from "lucide-react";

export default function AnimeWatchPage() {
  const { id } = useParams();
  const router = useRouter();
  const [episode, setEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const res = await fetch(`/api/anime/episode?id=${id}`);
        const json = await res.json();
        if (json.success) setEpisode(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisode();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-cyan-500 gap-3">
      <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
      <p className="text-xs font-bold tracking-widest uppercase">Memuat Player...</p>
    </div>
  );
  
  if (!episode) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-red-500 font-bold">Episode tidak ditemukan.</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans pb-24">
      {/* Header Clean */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md px-4 py-3 border-b border-white/5 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-full bg-white/5 active:scale-90 transition-transform">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-sm font-bold truncate flex-1">{episode.title}</h1>
      </header>

      {/* Video Player */}
      <div className="w-full aspect-video bg-black relative border-b border-white/5">
        {episode.defaultStreamingUrl ? (
          <iframe
            src={episode.defaultStreamingUrl}
            allowFullScreen
            className="absolute inset-0 w-full h-full"
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
        {/* Navigasi Prev / Next (Lebih Modern) */}
        <div className="flex justify-between gap-3">
          {episode.hasPrevEpisode ? (
            <Link href={`/tools/anime/watch/${episode.prevEpisode.episodeId}`} className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-xl text-xs font-bold transition-colors">
              <ChevronLeft size={16} /> Prev Episode
            </Link>
          ) : <div className="flex-1"></div>}

          {episode.hasNextEpisode ? (
            <Link href={`/tools/anime/watch/${episode.nextEpisode.episodeId}`} className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-black py-3 rounded-xl text-xs font-black transition-colors shadow-[0_0_20px_rgba(8,145,178,0.3)]">
              Next Episode <ChevronRight size={16} />
            </Link>
          ) : <div className="flex-1"></div>}
        </div>

        {/* Info Box */}
        <div>
          <h2 className="text-sm font-black text-cyan-400 flex items-center gap-2 mb-2 uppercase tracking-widest">
            <Info size={16} /> Sinopsis
          </h2>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <p className="text-xs text-slate-300 leading-relaxed text-justify">
              {episode.synopsis.paragraphs[0]}
            </p>
          </div>
        </div>

        {/* List Download (Menggantikan tombol kualitas yang error) */}
        <div>
          <h2 className="text-sm font-black text-cyan-400 flex items-center gap-2 mb-4 uppercase tracking-widest">
            <Download size={16} /> Link Download
          </h2>
          
          <div className="space-y-4">
            {episode.downloadUrl?.formats?.map((format: any, idx: number) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                {/* Header Format (MKV/MP4/x265) */}
                <div className="bg-white/10 px-4 py-2 border-b border-white/10">
                  <h3 className="text-xs font-black text-white tracking-wider">{format.title}</h3>
                </div>
                
                {/* List Kualitas */}
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
