"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import QRCodeStyling, { Options } from "qr-code-styling";
import { ArrowLeft, Upload, Link as LinkIcon, Palette, Play, Download } from "lucide-react";
import Link from "next/link";

// Komponen Color Picker Modal (dynamic import untuk menghindari SSR)
const ColorPickerModal = dynamic(() => import("./components/ColorPickerModal"), { ssr: false });

export default function QRGeneratorPage() {
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const [qrRef, setQrRef] = useState<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<"url" | "file">("url");
  const [url, setUrl] = useState("https://sinyu-tool.sionlimitles.workers.dev");
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [showColorPicker, setShowColorPicker] = useState<"color1" | "color2" | null>(null);
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [color1, setColor1] = useState("#22d3ee");
  const [color2, setColor2] = useState("#3b82f6");
  const [dotStyle, setDotStyle] = useState<"square" | "dots" | "rounded" | "classy" | "classy-rounded" | "extra-rounded">("rounded");

  // Inisialisasi QRCode
  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      data: url,
      imageOptions: { crossOrigin: "anonymous", margin: 10 },
      dotsOptions: {
        type: dotStyle,
        gradient: {
          type: gradientType,
          rotation: 0,
          colorStops: [
            { offset: 0, color: color1 },
            { offset: 1, color: color2 },
          ],
        },
      },
      backgroundOptions: { color: "#ffffff" },
    });
    setQrCode(qr);
  }, []);

  // Render ulang QR setiap ada perubahan
  useEffect(() => {
    if (!qrCode) return;
    qrCode.update({
      data: mode === "file" && fileData ? fileData : url,
      dotsOptions: {
        type: dotStyle,
        gradient: {
          type: gradientType,
          rotation: 0,
          colorStops: [
            { offset: 0, color: color1 },
            { offset: 1, color: color2 },
          ],
        },
      },
    });
  }, [qrCode, url, fileData, mode, color1, color2, gradientType, dotStyle]);

  // Muat QR ke dalam div
  useEffect(() => {
    if (qrCode && qrRef) {
      qrCode.append(qrRef);
    }
  }, [qrCode, qrRef]);

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

  const handleDownload = () => {
    if (qrCode) {
      qrCode.download({ name: "sinyu-qr", extension: "png" });
    }
  };

  return (
    <main className="min-h-screen bg-[#030305] text-white pb-20">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 flex items-center gap-3 border-b border-white/10">
        <Link href="/" className="p-2 rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-lg font-bold">QR Code Studio</h1>
      </header>

      {/* Pratinjau QR (Sticky di atas) */}
      <div className="sticky top-0 z-30 bg-[#030305]/90 backdrop-blur-md px-6 py-4 border-b border-white/10 flex flex-col items-center">
        <div className="w-[200px] h-[200px] bg-white rounded-xl p-2 shadow-2xl" ref={setQrRef}></div>
        <p className="text-[10px] text-slate-500 mt-2">Live Preview</p>
      </div>

      {/* Kontrol Panel */}
      <div className="px-6 pt-6 space-y-6">
        {/* Mode Input */}
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
          <button onClick={() => setMode("url")} className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${mode === "url" ? "bg-cyan-500 text-black" : "text-slate-400"}`}>
            <LinkIcon size={12} className="inline mr-1" /> Link
          </button>
          <button onClick={() => setMode("file")} className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${mode === "file" ? "bg-cyan-500 text-black" : "text-slate-400"}`}>
            <Upload size={12} className="inline mr-1" /> File
          </button>
        </div>

        {mode === "url" ? (
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Masukkan link..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-cyan-500" />
        ) : (
          <div className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-center">
            <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} accept="image/*,application/pdf" />
            <label htmlFor="file-upload" className="cursor-pointer text-cyan-400 font-bold">
              {fileName || "Pilih File (Maks 2MB)"}
            </label>
          </div>
        )}

        {/* Pilihan Bentuk */}
        <div>
          <h3 className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Bentuk Titik</h3>
          <div className="flex flex-wrap gap-2">
            {(["square", "dots", "rounded", "classy", "classy-rounded", "extra-rounded"] as const).map((style) => (
              <button key={style} onClick={() => setDotStyle(style)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition ${dotStyle === style ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" : "bg-white/5 border-white/10 text-slate-400"}`}>
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Pilihan Warna & Gradasi */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Warna & Gradasi</h3>
          <div className="flex gap-3">
            <button onClick={() => setShowColorPicker("color1")} className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2 active:scale-95 transition-transform">
              <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: color1 }}></div>
              <span className="text-[10px] font-mono">{color1}</span>
            </button>
            <button onClick={() => setShowColorPicker("color2")} className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2 active:scale-95 transition-transform">
              <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: color2 }}></div>
              <span className="text-[10px] font-mono">{color2}</span>
            </button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setGradientType("linear")} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition ${gradientType === "linear" ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" : "bg-white/5 border-white/10 text-slate-400"}`}>Linear</button>
            <button onClick={() => setGradientType("radial")} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition ${gradientType === "radial" ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" : "bg-white/5 border-white/10 text-slate-400"}`}>Radial</button>
          </div>
        </div>

        {/* Tombol Aksi */}
        <button onClick={handleDownload} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-black py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.4)]">
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
