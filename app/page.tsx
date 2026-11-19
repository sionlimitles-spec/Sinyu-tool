"use client";

import React from 'react';
import { 
  User, LayoutGrid, Download, Wrench, PlayCircle, Mail, QrCode, 
  Globe, Smartphone, Zap, ShieldCheck, TerminalSquare, Hexagon
} from 'lucide-react';

export default function Home() {
  // Data dirapikan untuk layout 3 kolom
  const tools = [
    { name: 'Temp Mail', icon: Mail, category: 'MAIL', color: 'text-cyan-400', bgGlow: 'from-cyan-500/20' },
    { name: 'QR Gen', icon: QrCode, category: 'MAKER', color: 'text-blue-400', bgGlow: 'from-blue-500/20' },
    { name: 'Anime', icon: PlayCircle, category: 'MEDIA', color: 'text-violet-400', bgGlow: 'from-violet-500/20' },
    // Placeholder untuk tools selanjutnya
    { name: 'Downloader', icon: Download, category: 'TOOLS', color: 'text-slate-400', bgGlow: 'from-slate-500/20' },
    { name: 'Security', icon: ShieldCheck, category: 'SYSTEM', color: 'text-emerald-400', bgGlow: 'from-emerald-500/20' },
    { name: 'Network', icon: Globe, category: 'SYSTEM', color: 'text-rose-400', bgGlow: 'from-rose-500/20' },
  ];

  return (
    <main className="min-h-screen pb-24 bg-[#030305] relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* Latar Belakang Grid & Glow */}
      <div className="absolute inset-0 bg-grid pointer-events-none z-0"></div>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[150%] h-[400px] bg-cyan-600/10 blur-[120px] rounded-full animate-breathe pointer-events-none z-0"></div>

      {/* Header */}
      <header className="relative w-full pt-12 pb-6 px-6 z-10 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Hexagon size={16} className="text-cyan-500" />
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Nexus Core</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tighter text-white leading-none">
            Sinyu<span className="text-cyan-400">.</span>Tool
          </h1>
        </div>
        
        {/* Tombol Profil Mini */}
        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md active:scale-90 transition-transform">
          <User size={18} className="text-slate-300" />
        </button>
      </header>

      {/* Status Bar Terintegrasi */}
      <div className="px-6 relative z-10 mb-8">
        <div className="flex items-center justify-between py-2 px-4 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md text-[10px] font-mono">
          <div className="flex items-center gap-3 text-slate-300">
            <span className="flex items-center gap-1.5"><Zap size={12} className="text-emerald-400" /> ONLINE</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className="flex items-center gap-1.5"><Smartphone size={12} className="text-slate-500" /> MOBILE</span>
          </div>
          <span className="text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 rounded-sm flex items-center gap-1">
            VVIP
          </span>
        </div>
      </div>

      {/* Navigasi Kategori */}
      <div className="flex gap-2 overflow-x-auto px-6 pb-6 hide-scrollbar relative z-10">
        <button className="bg-white text-black px-5 py-2 rounded-full text-[11px] font-bold tracking-widest flex items-center gap-2 whitespace-nowrap shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-95 transition-transform">
          <LayoutGrid size={14} /> ALL MODULES
        </button>
        <button className="border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white px-5 py-2 rounded-full text-[11px] font-medium tracking-widest flex items-center gap-2 whitespace-nowrap transition-colors active:scale-95">
          <Download size={14} /> MEDIA
        </button>
        <button className="border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white px-5 py-2 rounded-full text-[11px] font-medium tracking-widest flex items-center gap-2 whitespace-nowrap transition-colors active:scale-95">
          <Wrench size={14} /> UTILS
        </button>
      </div>

      {/* Grid 3 Kolom */}
      <div className="px-6 relative z-10">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xs font-bold tracking-widest text-slate-200 uppercase">Available Tools</h2>
          <span className="text-[10px] font-mono text-slate-500">{tools.length} MODULES</span>
        </div>

        {/* GRID 3 KOLOM */}
        <div className="grid grid-cols-3 gap-3">
          {tools.map((tool, index) => (
            <button 
              key={index} 
              className="group relative flex flex-col items-center justify-center aspect-[3/4] p-2 rounded-[24px] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl transition-all duration-300 ease-out hover:bg-white/[0.05] hover:border-white/[0.1] active:scale-95 hover:-translate-y-1 overflow-hidden"
            >
              {/* Efek Glow di dalam kartu (Micro-interaction) */}
              <div className={`absolute inset-0 bg-gradient-to-b ${tool.bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Ikon */}
              <div className="relative z-10 mb-3 p-3 rounded-full bg-black/40 border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                <tool.icon className={`${tool.color}`} size={20} strokeWidth={2} />
              </div>
              
              {/* Teks (Dibuat vertikal/sempit agar muat 3 kolom) */}
              <div className="relative z-10 text-center w-full px-1">
                <h3 className="text-[11px] font-bold text-slate-100 truncate w-full">{tool.name}</h3>
                <span className={`mt-1 inline-block text-[8px] font-mono tracking-widest px-1.5 py-0.5 rounded-sm bg-white/5 ${tool.color}`}>
                  {tool.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

    </main>
  );
}
