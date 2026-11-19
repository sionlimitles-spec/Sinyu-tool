"use client";

import React from 'react';
import { User, LayoutGrid, Download, Wrench, PlayCircle, Mail, QrCode } from 'lucide-react';
import './globals.css';

export default function Home() {
  // Data Tools (Nanti tinggal tambah di sini)
  const tools = [
    { name: 'Temp Mail', desc: 'Email sementara', icon: Mail, color: 'text-blue-400', category: 'MAIL', glow: 'bg-blue-900/50' },
    { name: 'QR Generator', desc: 'Ubah link jadi QR', icon: QrCode, color: 'text-cyan-400', category: 'MAKER', glow: 'bg-cyan-900/50' },
    { name: 'Nonton Anime', desc: 'Streaming Sub Indo', icon: PlayCircle, color: 'text-purple-400', category: 'MEDIA', glow: 'bg-purple-900/50' },
  ];

  return (
    <main className="pb-24 min-h-screen">
      {/* Header dengan Nama Baru */}
      <header className="relative w-full h-48 flex items-end p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-transparent z-0"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Sinyu Tool
          </h1>
          <p className="text-xs text-gray-400 mt-1">by Vyan</p>
        </div>
      </header>

      {/* Profil */}
      <div className="px-4 -mt-8 relative z-20">
        <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center icon-glow">
            <User className="text-white" size={24} />
          </div>
          <div className="text-sm">
            <div className="flex gap-4 text-gray-300 text-xs">
              <span>🇮🇩 Indonesia</span>
              <span>📱 Android</span>
            </div>
            <div className="flex gap-4 mt-2 text-gray-400 text-[10px] items-center">
              <span className="text-green-400">● Online</span>
              <span>31%</span>
              <span className="text-yellow-500 font-bold border border-yellow-500 px-1 rounded">VVIP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kategori Menu */}
      <div className="flex gap-3 overflow-x-auto px-4 py-6 hide-scrollbar">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center gap-2 whitespace-nowrap">
          <LayoutGrid size={16} /> All
        </button>
        <button className="glass-card text-gray-300 px-4 py-2 rounded-full text-sm flex items-center gap-2 whitespace-nowrap">
          <Download size={16} /> Downloader
        </button>
        <button className="glass-card text-gray-300 px-4 py-2 rounded-full text-sm flex items-center gap-2 whitespace-nowrap">
          <Wrench size={16} /> Maker
        </button>
      </div>

      {/* Grid Tools */}
      <div className="px-4">
        <h2 className="text-lg font-semibold mb-4">Semua Tools</h2>
        <div className="grid grid-cols-2 gap-4">
          
          {/* Render Data Array */}
          {tools.map((tool, index) => (
            <div key={index} className="glass-card rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer">
              <div className={`w-12 h-12 rounded-full ${tool.glow} flex items-center justify-center mb-3`}>
                <tool.icon className={`${tool.color} icon-glow`} size={24} />
              </div>
              <h3 className="text-sm font-bold">{tool.name}</h3>
              <p className="text-[10px] text-gray-400 mt-1 mb-3">{tool.desc}</p>
              <span className={`text-[10px] bg-opacity-50 px-2 py-1 rounded ${tool.color} ${tool.glow}`}>
                {tool.category}
              </span>
            </div>
          ))}

        </div>
      </div>
    </main>
  );
          }
