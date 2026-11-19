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

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-cyan-500">Memuat data...</div>;
  if (!anime) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-red-500">Anime tidak ditemukan.</div>;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
      <div className="relative w-full h-[300px]">
        <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover opacity-30 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
        
        <div className="absolute top-6 left-6 z-20">
          <button onClick={() => router.back()} className="p-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md active:scale-90 transition-transform">
            <ArrowLeft size={18} />
          </button>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-4">
          <img src={anime.poster} alt={anime.title} className="w-24 h-32 object-cover rounded-xl shadow-2xl border border-white/10" />
          <div className="flex-1">
            <h1 className="text-xl font-black leading-tight mb-1">{anime.title}</h1>
            <p className="text-xs text-slate-400 mb-2">{anime.status} • {anime.type} • {anime.duration}</p>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded border border-yellow-500/30">
                <Star size={10} className="fill-yellow-400" /> {anime.score.value}
              </span>
              <span className="text-slate-300">Studio: {anime.studios}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-4 space-y-6">
        <div>
          <h2 className="text-sm font-bold text-cyan-400 flex items-center gap-2 mb-2">
            <Info size={16} /> Sinopsis
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed text-justify">
            {anime.synopsis.paragraphs[0]}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-cyan-400 flex items-center gap-2 mb-3">
            <PlayCircle size={16} /> Daftar Episode
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {anime.episodeList?.map((ep: any) => (
              <Link 
                key={ep.episodeId}
                href={`/tools/anime/watch/${ep.episodeId}`}
                className="bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 text-white text-xs font-bold py-2 rounded-lg text-center transition-colors"
              >
                Eps {ep.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
      }
