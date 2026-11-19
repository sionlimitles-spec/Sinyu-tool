"use client";

import { HexColorPicker } from "react-colorful";
import { X } from "lucide-react";

interface Props {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
}

export default function ColorPickerModal({ color, onChange, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-4 pb-8 animate-enter">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 w-full max-w-sm shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-slate-200">Pilih Warna</h3>
          <button onClick={onClose} className="p-1 rounded-full bg-white/5 active:scale-90 transition-transform">
            <X size={16} />
          </button>
        </div>
        <HexColorPicker color={color} onChange={onChange} style={{ width: "100%", height: "200px" }} />
        <div className="mt-4 flex items-center gap-2 bg-white/5 p-2 rounded-lg">
          <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: color }}></div>
          <span className="text-xs font-mono">{color}</span>
        </div>
      </div>
    </div>
  );
}
