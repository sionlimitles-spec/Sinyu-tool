"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star, PlayCircle, Info } from "lucide-react";

export default function AnimeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`/api/anime/detail?id=${id}`);
        const json = await res.json();
        if (json.success) setAnime(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-cyan-500 gap-3">
      <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
      <p className="text-xs font-bold tracking-widest uppercase">Memuat Detail...</p>
    </div>
  );
  
  if (!anime) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-red-500 font-bold">Anime tidak ditemukan.</div>;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
      
      {/* Hero Section */}
      <div className="relative w-full h-[400px] overflow-hidden">
        {/* Background Blur */}
        <img src={anime.poster} alt="bg" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
        
        {/* Header Back Button */}
        <div className="absolute top-6 left-6 z-30">
          <button onClick={() => router.back()} className="p-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md active:scale-90 transition-transform">
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Poster Utama & Info */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-4 items-end">
          <img src={anime.poster} alt={anime.title} className="w-28 h-40 object-cover rounded-xl shadow-2xl border border-white/10" />
          <div className="flex-1 pb-1">
            <h1 className="text-xl font-black leading-tight mb-2 text-white">{anime.title}</h1>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold">
              <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-md border border-yellow-500/30 flex items-center gap-1">
                <Star size={10} className="fill-yellow-400" /> {anime.score.value}
              </span>
              <span className="bg-white/10 text-slate-300 px-2 py-1 rounded-md border border-white/5">{anime.status}</span>
              <span className="bg-white/10 text-slate-300 px-2 py-1 rounded-md border border-white/5">{anime.type}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 mt-2 space-y-8">
        {/* Sinopsis */}
        <div>
          <h2 className="text-sm font-black text-cyan-400 flex items-center gap-2 mb-2 uppercase tracking-widest">
            <Info size={16} /> Sinopsis
          </h2>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <p className="text-xs text-slate-300 leading-relaxed text-justify line-clamp-6">
              {anime.synopsis.paragraphs[0]}
            </p>
          </div>
        </div>

        {/* Daftar Episode */}
        <div>
          <h2 className="text-sm font-black text-cyan-400 flex items-center gap-2 mb-3 uppercase tracking-widest">
            <PlayCircle size={16} /> Daftar Episode
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {anime.episodeList?.map((ep: any) => (
              <Link 
                key={ep.episodeId}
                href={`/tools/anime/watch/${ep.episodeId}`}
                className="bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 text-white text-xs font-bold py-3 rounded-xl text-center transition-all active:scale-95"
              >
                {ep.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
