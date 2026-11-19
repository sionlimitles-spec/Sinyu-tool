"use client";

import React, { useRef, useState } from 'react';
import { 
  User, LayoutGrid, Download, Wrench, PlayCircle, Mail, QrCode, 
  Smartphone, Crown, ChevronRight, ShieldCheck, Globe
} from 'lucide-react';

// Custom Logo Sinyu (SVG Premium dengan Gradasi)
const SinyuLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
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
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tools = [
    { name: 'Temp Mail', icon: Mail, category: 'MAIL' },
    { name: 'QR Gen', icon: QrCode, category: 'MAKER' },
    { name: 'Anime', icon: PlayCircle, category: 'MEDIA' },
    { name: 'Downloader', icon: Download, category: 'TOOLS' },
    { name: 'Security', icon: ShieldCheck, category: 'SYSTEM' },
    { name: 'Network', icon: Globe, category: 'SYSTEM' },
  ];

  // Logika Efek Spotlight (Mengikuti Jari/Kursor)
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <main className="min-h-screen pb-24 bg-[#050505] relative overflow-hidden">
      
      {/* Latar Belakang Grid Sangat Halus */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

      {/* HEADER */}
      <header className="relative w-full pt-12 pb-8 px-6 z-10 flex justify-between items-center animate-enter">
        <div className="flex items-center gap-3">
          <SinyuLogo />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white leading-none">
              Sinyu<span className="text-cyan-400">.</span>Tool
            </h1>
            <p className="text-[10px] text-slate-400 mt-1.5 font-medium tracking-widest uppercase">Aether System</p>
          </div>
        </div>
        
        <button className="w-11 h-11 rounded-full glass-card flex items-center justify-center active:scale-90 transition-transform">
          <User size={18} className="text-slate-300" />
        </button>
      </header>

      {/* STATUS BAR */}
      <div className="px-6 relative z-10 mb-8 animate-enter" style={{ animationDelay: '0.1s' }}>
        <div className="glass-card flex items-center justify-between p-2 rounded-full text-[11px] font-medium tracking-wide">
          <div className="flex items-center gap-4 pl-3">
            <span className="flex items-center gap-2 text-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              ONLINE
            </span>
            <span className="w-[1px] h-3 bg-white/10"></span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Smartphone size={14} /> MOBILE
            </span>
          </div>
          <span className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Crown size={12} /> VVIP
          </span>
        </div>
      </div>

      {/* KATEGORI */}
      <div className="flex gap-3 overflow-x-auto px-6 pb-8 hide-scrollbar relative z-10 animate-enter" style={{ animationDelay: '0.2s' }}>
        <button className="bg-white text-black px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest flex items-center gap-2 whitespace-nowrap active:scale-95 transition-transform">
          <LayoutGrid size={14} /> ALL
        </button>
        <button className="glass-card text-slate-300 hover:text-white px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all">
          <Download size={14} /> MEDIA
        </button>
        <button className="glass-card text-slate-300 hover:text-white px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all">
          <Wrench size={14} /> UTILS
        </button>
      </div>

      {/* GRID TOOLS (3 KOLOM) */}
      <div className="px-6 relative z-10">
        <div className="flex justify-between items-end mb-5 animate-enter" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
            <h2 className="text-xs font-bold tracking-widest text-white uppercase">Available Tools</h2>
          </div>
          <span className="text-[10px] font-mono text-slate-500">{tools.length} MODULES</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {tools.map((tool, index) => (
            <button 
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              // Micro-interactions: Kapsul Vertikal, Sudut Halus, Efek Kaca
              className="group relative flex flex-col items-center aspect-[9/16] p-3 rounded-[32px] glass-card transition-all duration-500 ease-out hover:-translate-y-2 active:scale-95 overflow-hidden animate-enter"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* Efek Spotlight (Sorotan mengikuti jari) */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(120px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,211,238,0.15), transparent 80%)`
                }}
              ></div>

              {/* Efek Border Menyala (Hanya saat di-hover) */}
              <div className={`absolute inset-0 rounded-[32px] border border-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`}></div>

              {/* Ikon & Teks */}
              <div className="relative z-10 flex flex-col items-center mt-3 w-full">
                <div className="mb-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  <tool.icon size={22} className="text-slate-300 group-hover:text-cyan-400 transition-colors" />
                </div>
                
                <h3 className="text-[11px] font-semibold text-white text-center leading-tight w-full truncate px-1">
                  {tool.name}
                </h3>
              </div>

              {/* Tombol Kapsul Bawah */}
              <div className="relative z-10 mt-auto w-full flex justify-center mb-1">
                <span className="text-[8px] font-mono tracking-widest px-2 py-1 rounded-full bg-white/5 text-slate-400 group-hover:text-cyan-300 group-hover:bg-cyan-500/10 transition-colors flex items-center gap-1">
                  {tool.category}
                  <ChevronRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 mt-16 pb-8 flex flex-col items-center justify-center animate-enter" style={{ animationDelay: '1s' }}>
        <div className="scale-75 opacity-50 mb-2"><SinyuLogo /></div>
        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Sinyu.Tool</p>
      </div>

    </main>
  );
}
