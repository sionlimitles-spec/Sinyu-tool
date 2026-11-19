"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import { ArrowLeft, Upload, Link as LinkIcon, Download, Settings2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

// Dynamic import untuk Color Picker
const ColorPickerModal = dynamic(() => import("./components/ColorPickerModal"), { ssr: false });

export default function QRGeneratorPage() {
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  
  const [mode, setMode] = useState<"url" | "file">("url");
  const [url, setUrl] = useState("https://sinyu-tool.sionlimitles.workers.dev");
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  
  const [showColorPicker, setShowColorPicker] = useState<"color1" | "color2" | null>(null);
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [color1, setColor1] = useState("#22d3ee");
  const [color2, setColor2] = useState("#3b82f6");
  const [dotStyle, setDotStyle] = useState<"square" | "dots" | "rounded" | "classy" | "classy-rounded" | "extra-rounded">("rounded");

  // Konfigurasi Awal QR Code
  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      data: url,
      margin: 20, // PENTING: Margin agar QR bisa di-scan
      dotsOptions: { 
        type: dotStyle, 
        gradient: { 
          type: gradientType, 
          rotation: 0, 
          colorStops: [{ offset: 0, color: color1 }, { offset: 1, color: color2 }] 
        } 
      },
      backgroundOptions: { color: "#ffffff" }, // Background wajib putih solid
      cornersDotOptions: { type: "dot" },
      cornersSquareOptions: { type: "extra-rounded" }
    });
    setQrCode(qr);
  }, []);

  // Real-time Update
  useEffect(() => {
    if (!qrCode) return;
    qrCode.update({
      data: mode === "file" && fileData ? fileData : url,
      margin: 20,
      dotsOptions: { 
        type: dotStyle, 
        gradient: { 
          type: gradientType, 
          rotation: 0, 
          colorStops: [{ offset: 0, color: color1 }, { offset: 1, color: color2 }] 
        } 
      },
    });
  }, [qrCode, url, fileData, mode, color1, color2, gradientType, dotStyle]);

  // Render ke DOM
  useEffect(() => {
    if (qrCode && qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
    }
  }, [qrCode]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) { // Batas longgar 5MB
        alert("File terlalu besar! Maksimal 5MB agar QR Code tidak rusak.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileData(event.target?.result as string);
        setFileName(file.name);
        setMode("file");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 pb-24">
      
      {/* HEADER (Diperbaiki agar tidak tertutup) */}
      <header className="px-6 pt-8 pb-4 flex items-center gap-3 sticky top-0 z-40 bg-[#f8fafc]/90 backdrop-blur-md border-b border-slate-200">
        <Link href="/" className="p-2 rounded-full bg-white border border-slate-200 shadow-sm active:scale-90 transition-transform">
          <ArrowLeft size={18} className="text-slate-700" />
        </Link>
        <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
          <Settings2 size={18} className="text-blue-500" /> QR Studio
        </h1>
      </header>

      {/* PREVIEW AREA (Tidak Sticky, Biar Scroll Natural) */}
      <div className="px-6 py-6 flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100 relative group transition-transform duration-300 hover:scale-[1.02]">
          <div className="w-[200px] h-[200px] flex items-center justify-center" ref={qrRef}></div>
        </div>
        <p className="text-[10px] font-bold text-slate-400 mt-4 tracking-widest uppercase flex items-center gap-1">
          <ImageIcon size={12} /> Live Preview
        </p>
      </div>

      {/* CONTROL PANEL */}
      <div className="px-6 pt-6 space-y-8">
        
        {/* 1. Mode Input */}
        <div className="space-y-3">
          <div className="flex gap-2 bg-slate-200/50 p-1 rounded-xl border border-slate-200">
            <button onClick={() => setMode("url")} className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${mode === "url" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
              <LinkIcon size={14} /> Link / URL
            </button>
            <button onClick={() => setMode("file")} className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${mode === "file" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
              <Upload size={14} /> File
            </button>
          </div>

          {mode === "url" ? (
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Masukkan link..." className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all" />
          ) : (
            <div className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm text-center shadow-sm">
              <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} accept="image/*,application/pdf" />
              <label htmlFor="file-upload" className="cursor-pointer text-blue-600 font-bold flex flex-col items-center justify-center gap-2 py-2 group">
                <Upload size={24} className="group-hover:-translate-y-1 transition-transform" /> 
                {fileName || "Pilih File dari Galeri"}
                <span className="text-[10px] text-slate-400 font-normal">Maksimal 5MB (JPG/PNG/PDF)</span>
              </label>
            </div>
          )}
        </div>

        {/* 2. Pilihan Bentuk */}
        <div>
          <h3 className="text-[11px] font-black text-slate-400 mb-3 uppercase tracking-widest">Bentuk Titik</h3>
          <div className="grid grid-cols-3 gap-2">
            {(["square", "dots", "rounded", "classy", "classy-rounded", "extra-rounded"] as const).map((style) => (
              <button key={style} onClick={() => setDotStyle(style)} className={`py-2 px-1 rounded-lg text-[10px] font-bold border transition-all ${dotStyle === style ? "bg-blue-500 border-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                {style.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Warna & Gradasi */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Warna & Gradasi</h3>
          <div className="flex gap-3">
            <button onClick={() => setShowColorPicker("color1")} className="flex-1 flex items-center justify-between bg-white border border-slate-200 shadow-sm rounded-xl p-2.5 active:scale-95 transition-transform hover:border-blue-300">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full border border-slate-200 shadow-inner" style={{ backgroundColor: color1 }}></div>
                <span className="text-xs font-mono font-bold text-slate-700">{color1}</span>
              </div>
              <span className="text-[9px] text-slate-400">Warna 1</span>
            </button>
            <button onClick={() => setShowColorPicker("color2")} className="flex-1 flex items-center justify-between bg-white border border-slate-200 shadow-sm rounded-xl p-2.5 active:scale-95 transition-transform hover:border-blue-300">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full border border-slate-200 shadow-inner" style={{ backgroundColor: color2 }}></div>
                <span className="text-xs font-mono font-bold text-slate-700">{color2}</span>
              </div>
              <span className="text-[9px] text-slate-400">Warna 2</span>
            </button>
          </div>
          
          <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setGradientType("linear")} className={`flex-1 py-2 rounded-lg text-[11px] font-bold transition ${gradientType === "linear" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}>Gradasi Linear</button>
            <button onClick={() => setGradientType("radial")} className={`flex-1 py-2 rounded-lg text-[11px] font-bold transition ${gradientType === "radial" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}>Gradasi Radial</button>
          </div>
        </div>

        {/* 4. Tombol Aksi */}
        <div className="pt-4 space-y-3">
          <button onClick={() => qrCode?.download({ name: "sinyu-qr", extension: "png" })} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-xl shadow-slate-900/20">
            <Download size={18} /> Download PNG
          </button>
          <button onClick={() => qrCode?.download({ name: "sinyu-qr", extension: "svg" })} className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-slate-50">
            <Download size={16} /> Download SVG (Vektor)
          </button>
        </div>

      </div>

      {/* MODAL COLOR PICKER */}
      {showColorPicker && (
        <ColorPickerModal
          color={showColorPicker === "color1" ? color1 : color2}
          onChange={(newColor) => {
            if (showColorPicker === "color1") setColor1(newColor);
            else setColor2(newColor);
          }}
          onClose={() => setShowColorPicker(null)}
        />
      )}
    </main>
  );
          }
