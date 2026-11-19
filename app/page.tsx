"use client";

import React from 'react';
import { 
  User, LayoutGrid, Download, Wrench, PlayCircle, Mail, QrCode, 
  Globe, Smartphone, Zap, ShieldCheck, TerminalSquare
} from 'lucide-react';

export default function Home() {
  const tools = [
    { name: 'Temp Mail', desc: 'Generate disposable inbox', icon: Mail, category: 'MAIL', color: 'text-cyan-400', bgGlow: 'group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]', borderGlow: 'from-cyan-400/50' },
    { name: 'QR Generator', desc: 'Convert data to visual code', icon: QrCode, category: 'MAKER', color: 'text-blue-400', bgGlow: 'group-hover:shadow-[0_0_20px_rgba(96,165,250,0.15)]', borderGlow: 'from-blue-400/50' },
    { name: 'Anime Stream', desc: 'Access media library', icon: PlayCircle, category: 'MEDIA', color: 'text-violet-400', bgGlow: 'group-hover:shadow-[0_0_20px_rgba(167,139,250,0.15)]', borderGlow: 'from-violet-400/50' },
  ];

  return (
    <main className="min-h-screen pb-24 bg-[#050508] relative overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* Signature Background: Grid Samar & Cahaya Atas */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="relative w-full pt-16 pb-6 px-6 z-10">
        <div className="flex items-center gap-2 mb-2">
          <TerminalSquare size={16} className="text-cyan-500" />
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">System.Online</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tighter text-white">
          Sinyu<span className="text-cyan-400">.</span>Tool
        </h1>
      </header>

      {/* Status Bar (Lebih Ramping & Presisi) */}
      <div className="px-6 relative z-10 mb-8">
        <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <User size={16} className="text-slate-300" />
            </div>
            <div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-300">
                <span className="flex items-center gap-1"><Globe size={12} className="text-slate-500" /> ID</span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span className="flex items-center gap-1"><Smartphone size={12} className="text-slate-500" /> Mobile</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono border-l border-white/10 pl-3">
             <span className="text-emerald-400 flex items-center gap-1"><Zap size={10} /> ONLINE</span>
             <span className="text-cyan-400 flex items-center gap-1"><ShieldCheck size={10} /> VVIP</span>
          </div>
        </div>
      </div>

      {/* Navigasi Kategori (Scrollable) */}
      <div className="flex gap-2 overflow-x-auto px-6 pb-6 hide-scrollbar relative z-10">
        <button className="bg-white text-black px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-2 whitespace-nowrap">
          <LayoutGrid size={14} /> ALL
        </button>
        <button className="border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white px-4 py-1.5 rounded-lg text-xs font-medium tracking-wide flex items-center gap-2 whitespace-nowrap transition-colors">
          <Download size={14} /> DOWNLOADER
        </button>
        <button className="border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white px-4 py-1.5 rounded-lg text-xs font-medium tracking-wide flex items-center gap-2 whitespace-nowrap transition-colors">
          <Wrench size={14} /> MAKER
        </button>
      </div>

      {/* Grid Tools (Penerapan Domain & Signature) */}
      <div className="px-6 relative z-10">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-sm font-semibold tracking-wide text-slate-200">MODULES</h2>
          <span className="text-[10px] font-mono text-slate-500">{tools.length} AVAILABLE</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool, index) => (
            <button 
              key={index} 
              className={`group relative flex flex-col items-start text-left p-4 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 hover:bg-white/[0.04] ${tool.bgGlow}`}
            >
              {/* Signature: Garis Atas Menyala */}
              <div className={`absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r ${tool.borderGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              <div className="mb-4 p-2 rounded-lg bg-white/5 border border-white/5">
                <tool.icon className={`${tool.color}`} size={20} strokeWidth={2} />
              </div>
              
              <h3 className="text-sm font-semibold text-slate-100 mb-1">{tool.name}</h3>
              <p className="text-[10px] text-slate-500 leading-relaxed mb-4">{tool.desc}</p>
              
              <span className={`mt-auto text-[9px] font-mono tracking-widest px-2 py-0.5 rounded-sm bg-white/5 border border-white/5 ${tool.color}`}>
                {tool.category}
              </span>
            </button>
          ))}
        </div>
      </div>

    </main>
  );
}
