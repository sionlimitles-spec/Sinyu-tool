"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { 
  User, LayoutGrid, Download, Wrench, PlayCircle, Mail, QrCode, 
  Smartphone, ChevronRight, ShieldCheck, Globe,
  Monitor, Chrome, Signal, Battery, Sparkles, Play, Pause
} from 'lucide-react';

const SinyuLogo = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
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
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const tools = [
    { name: 'Temp Mail', icon: Mail, category: 'MAIL', href: '#', color: 'text-blue-600', bg: 'bg-blue-100/50' },
    { name: 'QR Gen', icon: QrCode, category: 'MAKER', href: '/tools/qr-generator', color: 'text-violet-600', bg: 'bg-violet-100/50' },
    { name: 'Anime', icon: PlayCircle, category: 'MEDIA', href: '/tools/anime', color: 'text-pink-600', bg: 'bg-pink-100/50' }, // <-- LINK ANIME
    { name: 'Downloader', icon: Download, category: 'TOOLS', href: '#', color: 'text-emerald-600', bg: 'bg-emerald-100/50' },
    { name: 'Security', icon: ShieldCheck, category: 'SYSTEM', href: '#', color: 'text-amber-600', bg: 'bg-amber-100/50' },
    { name: 'Network', icon: Globe, category: 'SYSTEM', href: '#', color: 'text-sky-600', bg: 'bg-sky-100/50' },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
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
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="min-h-screen pb-24 relative overflow-hidden bg-[#f8fafc]">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="https://imglink.cc/cdn/rmJSmgHFR-.jpg" alt="Background" className="w-full h-full object-cover opacity-[0.15] scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc]/60 via-[#f8fafc]/80 to-[#f8fafc]"></div>
      </div>

      <header className="relative w-full pt-12 pb-6 px-6 z-10 flex justify-between items-center animate-enter">
        <div className="flex items-center gap-3">
          <SinyuLogo />
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-none">
              Sinyu<span className="text-blue-500">.</span>Tool
            </h1>
            <p className="text-[9px] text-slate-500 mt-1.5 font-bold tracking-[0.2em] uppercase">Aether Flux</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-90 transition-transform">
          <User size={18} className="text-slate-700" />
        </button>
      </header>

      <div className="px-6 relative z-10 mb-8 animate-enter" style={{ animationDelay: '0.1s' }}>
        <div className="glass-info-bar rounded-2xl p-4">
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[10px] relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-200"></div>
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-200"></div>
            <div className="flex items-center gap-2.5 pl-1">
              <div className="p-1.5 rounded-lg bg-cyan-100/50 border border-cyan-200"><Monitor size={12} className="text-cyan-600" /></div>
              <div>
                <p className="text-[8px] text-slate-500 uppercase tracking-widest font-mono">System</p>
                <p className="font-bold text-slate-800">Aether Matrix</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 pl-3">
              <div className="p-1.5 rounded-lg bg-blue-100/50 border border-blue-200"><Globe size={12} className="text-blue-600" /></div>
              <div>
                <p className="text-[8px] text-slate-500 uppercase tracking-widest font-mono">Origin</p>
                <p className="font-bold text-slate-800">Indonesia</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 pl-1 pt-3">
              <div className="p-1.5 rounded-lg bg-violet-100/50 border border-violet-200"><Smartphone size={12} className="text-violet-600" /></div>
              <div>
                <p className="text-[8px] text-slate-500 uppercase tracking-widest font-mono">Device</p>
                <p className="font-bold text-slate-800">Mobile Device</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 pl-3 pt-3">
              <div className="p-1.5 rounded-lg bg-emerald-100/50 border border-emerald-200"><Chrome size={12} className="text-emerald-600" /></div>
              <div>
                <p className="text-[8px] text-slate-500 uppercase tracking-widest font-mono">Browser</p>
                <p className="font-bold text-slate-800">Chrome</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200">
            <div className="flex items-center gap-2 bg-emerald-100/50 px-2.5 py-1 rounded-md border border-emerald-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600"></span>
              </span>
              <span className="text-[9px] text-emerald-700 font-bold tracking-widest font-mono">ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <Battery size={14} className="text-blue-600" />
              <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[36%] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
              </div>
              <span className="text-[9px] text-slate-600 font-mono font-bold">36%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 relative z-10 mb-8 animate-enter" style={{ animationDelay: '0.2s' }}>
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white shadow-lg group bg-slate-100">
          <video ref={videoRef} src="https://imglink.cc/cdn/q88WD4c9RC.mp4" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none"></div>
          <button onClick={toggleVideo} className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-md active:scale-90 transition-transform hover:bg-white/30">
            {isPlaying ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white ml-0.5" />}
          </button>
          <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-end z-20 pointer-events-none">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles size={12} className="text-cyan-300" />
                <span className="text-[9px] font-bold text-cyan-300 tracking-widest uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">System Showcase</span>
              </div>
              <h2 className="text-xl font-black text-white leading-none tracking-tight drop-shadow-md">Aether Interface</h2>
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-lg">
              <span className="text-[9px] font-mono text-white">v1.0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto px-6 pb-6 hide-scrollbar relative z-10 animate-enter" style={{ animationDelay: '0.3s' }}>
        <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition-transform shadow-md">
          <LayoutGrid size={12} /> ALL MODULES
        </button>
        <button className="glass-card text-slate-600 hover:text-slate-900 px-5 py-2 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition-all">
          <Download size={12} /> MEDIA
        </button>
        <button className="glass-card text-slate-600 hover:text-slate-900 px-5 py-2 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition-all">
          <Wrench size={12} /> UTILS
        </button>
      </div>

      <div className="px-6 relative z-10">
        <div className="flex justify-between items-end mb-4 animate-enter" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            <h2 className="text-[11px] font-black tracking-widest text-slate-900 uppercase">Available Tools</h2>
          </div>
          <span className="text-[9px] font-mono text-blue-600 bg-blue-100/50 px-2 py-0.5 rounded border border-blue-200">{tools.length} MODULES</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {tools.map((tool, index) => (
            <Link 
              key={index}
              href={tool.href}
              ref={(el) => { cardRefs.current[index] = el; }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col items-center justify-center aspect-[3/4] p-2 rounded-[22px] bg-white border border-slate-100 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl active:scale-95 overflow-hidden animate-enter"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{ background: `radial-gradient(90px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.08), transparent 80%)` }}
              ></div>
              <div className="relative z-10 flex flex-col items-center w-full mt-1">
                <div className={`mb-3 p-2.5 rounded-2xl ${tool.bg} border border-white/50 group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                  <tool.icon size={20} className={tool.color} />
                </div>
                <h3 className="text-[10px] font-bold text-slate-800 text-center leading-tight w-full truncate px-1">
                  {tool.name}
                </h3>
              </div>
              <div className="relative z-10 mt-auto w-full flex justify-center mb-0.5">
                <span className="text-[7px] font-mono tracking-widest px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                  {tool.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
