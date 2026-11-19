"use client";

import React, { useRef, useState } from 'react';
import { 
  User, LayoutGrid, Download, Wrench, PlayCircle, Mail, QrCode, 
  Smartphone, ChevronRight, ShieldCheck, Globe,
  Monitor, Chrome, Signal, Battery, Sparkles, Play, Pause
} from 'lucide-react';

// Custom Logo Sinyu
const SinyuLogo = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <path d="M20 3L34 11V23L26 28V17L14 10L20 6.5V3Z" fill="url(#logoGrad)" />
    <path d="M20 37L6 29V17L14 12V23L26 30L20 33.5V37Z" fill="url(#logoGrad)" opacity="0.6"/>
  </svg>
);

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Data Tools dengan warna gradasi masing-masing
  const tools = [
    { name: 'Temp Mail', icon: Mail, category: 'MAIL', gradient: 'from-blue-400 to-cyan-400', shadow: 'group-hover:shadow-blue-500/20' },
    { name: 'QR Gen', icon: QrCode, category: 'MAKER', gradient: 'from-violet-400 to-fuchsia-400', shadow: 'group-hover:shadow-violet-500/20' },
    { name: 'Anime', icon: PlayCircle, category: 'MEDIA', gradient: 'from-pink-400 to-rose-400', shadow: 'group-hover:shadow-pink-500/20' },
    { name: 'Downloader', icon: Download, category: 'TOOLS', gradient: 'from-emerald-400 to-teal-400', shadow: 'group-hover:shadow-emerald-500/20' },
    { name: 'Security', icon: ShieldCheck, category: 'SYSTEM', gradient: 'from-amber-400 to-orange-400', shadow: 'group-hover:shadow-amber-500/20' },
    { name: 'Network', icon: Globe, category: 'SYSTEM', gradient: 'from-sky-400 to-indigo-400', shadow: 'group-hover:shadow-sky-500/20' },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="min-h-screen pb-24 relative overflow-hidden bg-[#030305]">
      
      {/* 1. BACKGROUND FOTO (Link Baru) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://imglink.cc/cdn/rmJSmgHFR-.jpg" 
          alt="Kimi Background" 
          className="w-full h-full object-cover opacity-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030305]/80 via-[#030305]/60 to-[#030305]"></div>
      </div>

      {/* 2. HEADER */}
      <header className="relative w-full pt-12 pb-6 px-6 z-10 flex justify-between items-center animate-enter">
        <div className="flex items-center gap-3">
          <SinyuLogo />
          <div>
            <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 leading-none">
              Sinyu<span className="text-cyan-400">.</span>Tool
            </h1>
            <p className="text-[9px] text-cyan-300/70 mt-1.5 font-bold tracking-[0.2em] uppercase">Aether Flux</p>
          </div>
        </div>
        
        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform hover:bg-white/10">
          <User size={18} className="text-slate-200" />
        </button>
      </header>

      {/* 3. INFO BAR (HUD Sci-Fi Style) */}
      <div className="px-6 relative z-10 mb-8 animate-enter" style={{ animationDelay: '0.1s' }}>
        <div className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br from-white/10 to-transparent">
          <div className="relative bg-black/50 backdrop-blur-2xl rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[10px] relative">
              
              {/* Divider Vertikal */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5"></div>
              {/* Divider Horizontal */}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5"></div>

              <div className="flex items-center gap-2.5 pl-1">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20"><Monitor size={12} className="text-cyan-400" /></div>
                <div>
                  <p className="text-[8px] text-slate-400 uppercase tracking-widest font-mono">System</p>
                  <p className="font-bold text-white tracking-wide">Aether Matrix</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2.5 pl-3">
                <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20"><Globe size={12} className="text-blue-400" /></div>
                <div>
                  <p className="text-[8px] text-slate-400 uppercase tracking-widest font-mono">Origin</p>
                  <p className="font-bold text-white tracking-wide">Indonesia</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2.5 pl-1 pt-3">
                <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20"><Smartphone size={12} className="text-violet-400" /></div>
                <div>
                  <p className="text-[8px] text-slate-400 uppercase tracking-widest font-mono">Device</p>
                  <p className="font-bold text-white tracking-wide">Mobile Device</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2.5 pl-3 pt-3">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20"><Chrome size={12} className="text-emerald-400" /></div>
                <div>
                  <p className="text-[8px] text-slate-400 uppercase tracking-widest font-mono">Browser</p>
                  <p className="font-bold text-white tracking-wide">Chrome</p>
                </div>
              </div>
            </div>

            {/* Status Bar Bawah */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
              <div className="flex items-center gap-2 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] text-emerald-400 font-bold tracking-widest font-mono">ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <Battery size={14} className="text-cyan-400" />
                <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[36%] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                </div>
                <span className="text-[9px] text-cyan-300 font-mono">36%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. POSTER VIDEO (Link Baru + Tombol Play/Pause) */}
      <div className="px-6 relative z-10 mb-8 animate-enter" style={{ animationDelay: '0.2s' }}>
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] group bg-black/50">
          
          <video 
            ref={videoRef}
            src="https://imglink.cc/cdn/q88WD4c9RC.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-10"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-20 pointer-events-none"></div>

          {/* Tombol Play/Pause */}
          <button 
            onClick={toggleVideo}
            className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md active:scale-90 transition-transform hover:bg-white/10"
          >
            {isPlaying ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white ml-0.5" />}
          </button>

          <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-end z-20 pointer-events-none">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles size={12} className="text-cyan-400" />
                <span className="text-[9px] font-bold text-cyan-400 tracking-widest uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">System Showcase</span>
              </div>
              <h2 className="text-xl font-black text-white leading-none tracking-tight drop-shadow-md">
                Aether Interface
              </h2>
              <p className="text-[10px] text-slate-300 mt-1 font-medium">Experience the next level</p>
            </div>
            <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg">
              <span className="text-[9px] font-mono text-cyan-300">v1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. KATEGORI */}
      <div className="flex gap-2 overflow-x-auto px-6 pb-6 hide-scrollbar relative z-10 animate-enter" style={{ animationDelay: '0.3s' }}>
        <button className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <LayoutGrid size={12} /> ALL MODULES
        </button>
        <button className="bg-black/30 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white px-5 py-2 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition-all">
          <Download size={12} /> MEDIA
        </button>
        <button className="bg-black/30 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white px-5 py-2 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition-all">
          <Wrench size={12} /> UTILS
        </button>
      </div>

      {/* 6. GRID TOOLS (Kotak Proporsional + Ikon Warna) */}
      <div className="px-6 relative z-10">
        <div className="flex justify-between items-end mb-4 animate-enter" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
            <h2 className="text-[11px] font-black tracking-widest text-white uppercase">Available Tools</h2>
          </div>
          <span className="text-[9px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">{tools.length} MODULES</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {tools.map((tool, index) => (
            <button 
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative flex flex-col items-center justify-center aspect-[3/4] p-2 rounded-[22px] bg-white/[0.02] border border-white/5 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1.5 active:scale-95 overflow-hidden animate-enter hover:shadow-2xl ${tool.shadow}`}
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              {/* Spotlight Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(90px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 80%)`
                }}
              ></div>

              {/* Border Glow on Hover */}
              <div className={`absolute inset-0 rounded-[22px] border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`}></div>

              <div className="relative z-10 flex flex-col items-center w-full mt-1">
                {/* Ikon dengan Warna Gradasi */}
                <div className={`mb-3 p-2.5 rounded-2xl bg-gradient-to-br ${tool.gradient} bg-opacity-10 border border-white/10 group-hover:scale-110 group-hover:border-white/30 transition-all duration-300 shadow-lg`}>
                  <tool.icon size={20} className="text-white" />
                </div>
                
                <h3 className="text-[10px] font-bold text-white text-center leading-tight w-full truncate px-1">
                  {tool.name}
                </h3>
              </div>

              {/* Kategori Badge */}
              <div className="relative z-10 mt-auto w-full flex justify-center mb-0.5">
                <span className="text-[7px] font-mono tracking-widest px-1.5 py-0.5 rounded-md bg-black/40 border border-white/5 text-slate-400 group-hover:text-white group-hover:border-white/20 transition-colors">
                  {tool.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 7. FOOTER */}
      <div className="relative z-10 mt-12 pb-8 flex flex-col items-center justify-center animate-enter" style={{ animationDelay: '1.2s' }}>
        <div className="scale-75 opacity-60 mb-1"><SinyuLogo /></div>
        <p className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">Sinyu.Tool © 2026</p>
      </div>

    </main>
  );
}
