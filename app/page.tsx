"use client";

import React from 'react';
import { 
  User, 
  LayoutGrid, 
  Download, 
  Wrench, 
  PlayCircle, 
  Mail, 
  QrCode, 
  Globe, 
  Smartphone, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';

export default function Home() {
  const tools = [
    { name: 'Temp Mail', desc: 'Generate disposable email', icon: Mail, color: 'text-indigo-400', category: 'MAIL', glow: 'bg-indigo-500/20' },
    { name: 'QR Generator', desc: 'Convert link to QR', icon: QrCode, color: 'text-cyan-400', category: 'MAKER', glow: 'bg-cyan-500/20' },
    { name: 'Anime Stream', desc: 'Watch anime sub indo', icon: PlayCircle, color: 'text-emerald-400', category: 'MEDIA', glow: 'bg-emerald-500/20' },
  ];

  return (
    <main className="pb-24 min-h-screen">
      <header className="relative w-full h-56 flex items-end p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900/10 to-transparent z-0"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 blur-[100px] rounded-full"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-cyan-400">
            Sinyu Tool
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-medium">Premium Utilities & Media</p>
        </div>
      </header>

      <div className="px-4 -mt-10 relative z-20">
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-[1px]">
              <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                <User className="text-white" size={20} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 text-slate-300 text-xs font-medium">
                <span className="flex items-center gap-1.5"><Globe size={14} className="text-slate-400" /> Indonesia</span>
                <span className="flex items-center gap-1.5"><Smartphone size={14} className="text-slate-400" /> Android</span>
              </div>
              <div className="flex gap-4 mt-2 text-slate-400 text-[10px] items-center font-semibold tracking-wide">
                <span className="text-emerald-400 flex items-center gap-1"><Zap size={12} /> Online</span>
                <span className="text-indigo-300 flex items-center gap-1"><ShieldCheck size={12} /> VVIP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto px-4 py-8 hide-scrollbar">
        <button className="bg-white text-slate-900 px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2 whitespace-nowrap transition-all">
          <LayoutGrid size={16} /> All Tools
        </button>
        <button className="glass-card text-slate-300 px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 whitespace-nowrap">
          <Download size={16} /> Downloader
        </button>
        <button className="glass-card text-slate-300 px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 whitespace-nowrap">
          <Wrench size={16} /> Maker
        </button>
      </div>

      <div className="px-4">
        <h2 className="text-lg font-bold text-white mb-5 tracking-wide">Available Tools</h2>
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool, index) => (
            <div key={index} className="glass-card group rounded-2xl p-5 flex flex-col items-center text-center cursor-pointer relative overflow-hidden">
              <div className={`absolute top-0 w-full h-1/2 ${tool.glow} blur-2xl group-hover:opacity-100 opacity-50 transition-opacity`}></div>
              <div className={`relative w-14 h-14 rounded-2xl bg-slate-800/80 border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon className={`${tool.color}`} size={26} strokeWidth={2} />
              </div>
              <h3 className="text-sm font-bold text-white relative z-10">{tool.name}</h3>
              <p className="text-[11px] text-slate-400 mt-1.5 mb-4 relative z-10 leading-relaxed">{tool.desc}</p>
              <span className={`text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-md bg-slate-800/50 border border-white/5 ${tool.color} relative z-10`}>
                {tool.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
