"use client";

import React, { useRef, useState } from 'react';
import { 
  User, LayoutGrid, Download, Wrench, PlayCircle, Mail, QrCode, 
  Smartphone, ChevronRight, ShieldCheck, Globe,
  Monitor, Chrome, Signal, Battery
} from 'lucide-react';

// Custom Logo Sinyu
const SinyuLogo = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
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
    <main className="min-h-screen pb-24 relative overflow-hidden bg-[#050505]">
      
      {/* 1. BACKGROUND FOTO KIMI (Fixed) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://files.catbox.moe/pkwzi8.jpg" 
          alt="Kimi Background" 
          className="w-full h-full object-cover opacity-50 scale-105"
        />
        {/* Overlay Gradient Gelap agar teks terbaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/60 to-[#050505]"></div>
      </div>

      {/* 2. HEADER */}
      <header className="relative w-full pt-12 pb-6 px-6 z-10 flex justify-between items-center animate-enter">
        <div className="flex items-center gap-3">
          <SinyuLogo />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">
              Sinyu<span className="text-cyan-400">.</span>Tool
            </h1>
            <p className="text-[9px] text-slate-300 mt-1 font-medium tracking-widest uppercase">Aether System</p>
          </div>
        </div>
        
        <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-90 transition-transform">
          <User size={18} className="text-slate-200" />
        </button>
      </header>

      {/* 3. INFO BAR (Nexora Style) */}
      <div className="px-6 relative z-10 mb-6 animate-enter" style={{ animationDelay: '0.1s' }}>
        <div className="glass-info-bar rounded-2xl p-3 grid grid-cols-2 gap-y-3 gap-x-2 text-[10px]">
          
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-white/10"><Monitor size={12} className="text-cyan-400" /></div>
            <div>
              <p className="text-[8px] text-slate-400 uppercase tracking-wider">System</p>
              <p className="font-semibold text-white">Aether Matrix</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-white/10"><Globe size={12} className="text-blue-400" /></div>
            <div>
              <p className="text-[8px] text-slate-400 uppercase tracking-wider">Negara</p>
              <p className="font-semibold text-white flex items-center gap-1">ID</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-white/10"><Smartphone size={12} className="text-violet-400" /></div>
            <div>
              <p className="text-[8px] text-slate-400 uppercase tracking-wider">Device</p>
              <p className="font-semibold text-white">Android</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-white/10"><Chrome size={12} className="text-emerald-400" /></div>
            <div>
              <p className="text-[8px] text-slate-400 uppercase tracking-wider">Browser</p>
              <p className="font-semibold text-white">Chrome</p>
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-between mt-1 pt-2 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Signal size={12} className="text-emerald-500" />
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <Battery size={14} className="text-cyan-400" />
              <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-[36%] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
              </div>
              <span className="text-[9px] text-slate-300 font-mono">36%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. POSTER VIDEO (Fixed version) */}
      <div className="px-6 relative z-10 mb-8 animate-enter" style={{ animationDelay: '0.2s' }}>
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.15)] bg-black">
          
          {/* Fallback Hitam di belakang video */}
          <div className="absolute inset-0 flex items-center justify-center z-0 bg-black">
            <span className="text-slate-600 text-[10px] tracking-widest uppercase">Loading Media...</span>
          </div>

          <video 
            src="https://files.catbox.moe/1g8dli.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-10"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20"></div>

          <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-end z-30">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-[8px] font-bold text-red-400 tracking-widest uppercase">Live Preview</span>
              </div>
              <h2 className="text-lg font-black text-white leading-none tracking-tight">
                Sinyu<span className="text-cyan-400">.</span>Tool
              </h2>
              <p className="text-[9px] text-slate-300 mt-1">Explore More Possibilities</p>
            </div>
            <div className="bg-black/50 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md">
              <span className="text-[8px] font-mono text-cyan-300">v1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. KATEGORI */}
      <div className="flex gap-2 overflow-x-auto px-6 pb-6 hide-scrollbar relative z-10 animate-enter" style={{ animationDelay: '0.3s' }}>
        <button className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition-transform">
          <LayoutGrid size={12} /> ALL
        </button>
        <button className="glass-card text-slate-300 hover:text-white px-5 py-2 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition-all">
          <Download size={12} /> MEDIA
        </button>
        <button className="glass-card text-slate-300 hover:text-white px-5 py-2 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition-all">
          <Wrench size={12} /> UTILS
        </button>
      </div>

      {/* 6. GRID TOOLS (3 KOLOM KAPSUL) */}
      <div className="px-6 relative z-10">
        <div className="flex justify-between items-end mb-4 animate-enter" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
            <h2 className="text-[11px] font-bold tracking-widest text-white uppercase">Available Tools</h2>
          </div>
          <span className="text-[9px] font-mono text-cyan-300">{tools.length} MODULES</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {tools.map((tool, index) => (
            <button 
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col items-center aspect-[9/16] p-2.5 rounded-[24px] glass-card transition-all duration-500 ease-out hover:-translate-y-1.5 active:scale-95 overflow-hidden animate-enter"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(100px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,211,238,0.2), transparent 80%)`
                }}
              ></div>

              <div className={`absolute inset-0 rounded-[24px] border border-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`}></div>

              <div className="relative z-10 flex flex-col items-center mt-2 w-full">
                <div className="mb-3 p-2.5 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  <tool.icon size={18} className="text-slate-300 group-hover:text-cyan-400 transition-colors" />
                </div>
                
                <h3 className="text-[10px] font-semibold text-white text-center leading-tight w-full truncate px-1">
                  {tool.name}
                </h3>
              </div>

              <div className="relative z-10 mt-auto w-full flex justify-center mb-1">
                <span className="text-[7px] font-mono tracking-widest px-1.5 py-0.5 rounded-full bg-white/5 text-slate-400 group-hover:text-cyan-300 group-hover:bg-cyan-500/10 transition-colors flex items-center gap-0.5">
                  {tool.category}
                  <ChevronRight size={8} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 7. FOOTER */}
      <div className="relative z-10 mt-12 pb-8 flex flex-col items-center justify-center animate-enter" style={{ animationDelay: '1.2s' }}>
        <div className="scale-75 opacity-50 mb-1"><SinyuLogo /></div>
        <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Sinyu.Tool</p>
      </div>

    </main>
  );
}
