"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import { ArrowLeft, Upload, Link as LinkIcon, Download } from "lucide-react";
import Link from "next/link";

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

  // Inisialisasi Awal
  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      data: url,
      dotsOptions: { type: dotStyle, gradient: { type: gradientType, rotation: 0, colorStops: [{ offset: 0, color: color1 }, { offset: 1, color: color2 }] } },
      backgroundOptions: { color: "#ffffff" },
    });
    setQrCode(qr);
  }, []);

  // Update Real-time
  useEffect(() => {
    if (!qrCode) return;
    qrCode.update({
      data: mode === "file" && fileData ? fileData : url,
      dotsOptions: { type: dotStyle, gradient: { type: gradientType, rotation: 0, colorStops: [{ offset: 0, color: color1 }, { offset: 1, color: color2 }] } },
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
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      <header className="px-6 pt-8 pb-4 flex items-center gap-3">
        <Link href="/" className="p-2 rounded-full bg-white border border-slate-200 shadow-sm active:scale-90 transition-transform">
          <ArrowLeft size={18} className="text-slate-700" />
        </Link>
        <h1 className="text-lg font-black tracking-tight">QR Studio</h1>
      </header>

      {/* Pratinjau QR */}
      <div className="sticky top-0 z-30 bg-[#f8fafc]/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex flex-col items-center shadow-sm">
        <div className="w-[180px] h-[180px] bg-white rounded-2xl p-2 shadow-lg border border-slate-100 flex items-center justify-center" ref={qrRef}></div>
        <p className="text-[9px] font-bold text-slate-400 mt-3 tracking-widest uppercase">Live Preview</p>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {/* Mode Input */}
        <div className="flex gap-2 bg-slate-200/50 p-1 rounded-xl border border-slate-200">
          <button onClick={() => setMode("url")} className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${mode === "url" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}>
            <LinkIcon size={14} /> Link
          </button>
          <button onClick={() => setMode("file")} className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${mode === "file" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}>
            <Upload size={14} /> File
          </button>
        </div>

        {mode === "url" ? (
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Masukkan link..." className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 shadow-sm" />
        ) : (
          <div className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-center shadow-sm">
            <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} accept="image/*,application/pdf" />
            <label htmlFor="file-upload" className="cursor-pointer text-blue-600 font-bold flex items-center justify-center gap-2">
              <Upload size={16} /> {fileName || "Pilih File (Maks 2MB)"}
            </label>
          </div>
        )}

        {/* Pilihan Bentuk */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Bentuk Titik</h3>
          <div className="flex flex-wrap gap-2">
            {(["square", "dots", "rounded", "classy", "classy-rounded", "extra-rounded"] as const).map((style) => (
              <button key={style} onClick={() => setDotStyle(style)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition ${dotStyle === style ? "bg-blue-100 border-blue-300 text-blue-700 shadow-sm" : "bg-white border-slate-200 text-slate-500"}`}>
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Warna & Gradasi */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Warna & Gradasi</h3>
          <div className="flex gap-3">
            <button onClick={() => setShowColorPicker("color1")} className="flex-1 flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-xl p-2 active:scale-95 transition-transform">
              <div className="w-6 h-6 rounded-full border border-slate-200" style={{ backgroundColor: color1 }}></div>
              <span className="text-[10px] font-mono text-slate-600">{color1}</span>
            </button>
            <button onClick={() => setShowColorPicker("color2")} className="flex-1 flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-xl p-2 active:scale-95 transition-transform">
              <div className="w-6 h-6 rounded-full border border-slate-200" style={{ backgroundColor: color2 }}></div>
              <span className="text-[10px] font-mono text-slate-600">{color2}</span>
            </button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setGradientType("linear")} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition ${gradientType === "linear" ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-white border-slate-200 text-slate-500"}`}>Linear</button>
            <button onClick={() => setGradientType("radial")} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition ${gradientType === "radial" ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-white border-slate-200 text-slate-500"}`}>Radial</button>
          </div>
        </div>

        {/* Tombol Download */}
        <button onClick={() => qrCode?.download({ name: "sinyu-qr", extension: "png" })} className="w-full bg-slate-900 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-slate-900/20 mt-4">
          <Download size={16} /> Download PNG
        </button>
      </div>

      {/* Modal Color Picker */}
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
