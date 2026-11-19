"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Star, Flame } from "lucide-react";

export default function AnimePage() {
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchAnime = async (query = "") => {
    setLoading(true);
    try {
      const url = query ? `/api/anime/list?q=${query}` : `/api/anime/list?type=recent`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) setAnimeList(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAnime(search);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans selection:bg-cyan-500/30">
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md px-6 pt-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/" className="p-2 rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-lg font-bold tracking-tight">Anime Stream</h1>
        </div>
        
        <form onSubmit={handleSearch} className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari anime..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-cyan-500/50 text-white placeholder:text-slate-500 transition-colors"
          />
        </form>
      </header>

      <div className="px-6 mt-6 mb-4 flex justify-between items-end">
        <h2 className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
          <Flame size={16} className="text-red-500" /> {search ? `Hasil: ${search}` : "New Update Anime"}
        </h2>
      </div>

      <div className="px-6">
        {loading ? (
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3/4] bg-white/5 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {animeList.map((anime) => (
              <Link 
                key={anime.animeId} 
                href={`/tools/anime/detail/${anime.animeId}`}
                className="group relative flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/5 bg-[#151515]">
                  <img
                    src={anime.poster}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  <div className="absolute top-0 left-0 bg-cyan-500 text-black text-[9px] font-black px-2 py-0.5 rounded-br-lg z-10 shadow-lg">
                    NEW
                  </div>

                  {anime.score && (
                    <div className="absolute top-1.5 right-1.5 flex items-center gap-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] z-10">
                      <Star size={11} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-[10px] font-black text-white">{anime.score.replace("★ ", "")}</span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 pt-8 z-10">
                    <span className="text-[10px] font-black text-white drop-shadow-md">Eps {anime.episodes || "?"}</span>
                  </div>
                </div>

                <h3 className="text-[10px] font-bold text-slate-200 mt-2 line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">
                  {anime.title}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
