"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Star, Flame } from "lucide-react";

interface Anime {
  id: string;
  title: string;
  image: string;
  rating: string;
  episodes: string;
  status: string;
  link: string;
}

export default function AnimePage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch("/api/anime");
        const json = await res.json();
        if (json.success) setAnimeList(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, []);

  const filteredAnime = animeList.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans selection:bg-cyan-500/30">
      {/* Header Sticky */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md px-6 pt-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/" className="p-2 rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-lg font-bold tracking-tight">Anime Stream</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari anime di sini..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-cyan-500/50 text-white placeholder:text-slate-500 transition-colors"
          />
        </div>
      </header>

      {/* Section Title */}
      <div className="px-6 mt-6 mb-4 flex justify-between items-end">
        <h2 className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
          <Flame size={16} className="text-red-500" /> New Update Anime
        </h2>
        <span className="text-[10px] font-mono text-slate-500">{filteredAnime.length} JUDUL</span>
      </div>

      {/* Grid Poster Anime */}
      <div className="px-6">
        {loading ? (
          // Skeleton Loading
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3/4] bg-white/5 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {filteredAnime.map((anime) => (
              <a 
                key={anime.id} 
                href={anime.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col cursor-pointer"
              >
                {/* Poster Container */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/5 bg-[#151515]">
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Badge "NEW" */}
                  <div className="absolute top-0 left-0 bg-cyan-500 text-black text-[9px] font-black px-2 py-0.5 rounded-br-lg z-10 shadow-lg">
                    NEW
                  </div>

                  {/* Rating Bintang (Tanpa Background Kotak) */}
                  <div className="absolute top-1.5 right-1.5 flex items-center gap-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] z-10">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-black text-white">{anime.rating}</span>
                  </div>

                  {/* Episode Badge (Gradient dari bawah) */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 pt-8 z-10">
                    <span className="text-[10px] font-black text-white drop-shadow-md">Eps {anime.episodes}</span>
                  </div>
                </div>

                {/* Judul Anime */}
                <h3 className="text-[10px] font-bold text-slate-200 mt-2 line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">
                  {anime.title}
                </h3>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-6 mt-10 flex flex-col items-center justify-center">
        <div className="h-[1px] w-12 bg-white/10 mb-3"></div>
        <p className="text-[9px] text-slate-500 uppercase tracking-widest">Source: Samehadaku</p>
      </div>
    </main>
  );
}
