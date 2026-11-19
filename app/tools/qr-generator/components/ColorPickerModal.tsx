"use client";

import { HexColorPicker, HexColorInput } from "react-colorful";
import { X } from "lucide-react";

interface Props {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
}

export default function ColorPickerModal({ color, onChange, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-enter">
      {/* Container Modal */}
      <div className="bg-white border-t border-slate-200 rounded-t-3xl p-6 w-full max-w-md shadow-2xl animate-slide-up">
        
        {/* Header Modal dengan Tombol X yang Jelas */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-black text-slate-800">Pilih Warna</h3>
            <p className="text-[10px] text-slate-500">Sesuaikan gradasi QR Code Anda</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 active:scale-90 transition-all border border-slate-200"
          >
            <X size={20} className="text-slate-700" />
          </button>
        </div>
        
        {/* Color Wheel */}
        <div className="flex justify-center mb-6 p-2 bg-slate-50 rounded-2xl border border-slate-100">
          <HexColorPicker color={color} onChange={onChange} style={{ width: "100%", height: "250px" }} />
        </div>
        
        {/* Input Hex & Preview */}
        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-6">
          <div className="w-12 h-12 rounded-lg border border-slate-300 shadow-inner" style={{ backgroundColor: color }}></div>
          <div className="flex-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Kode Hex</label>
            <div className="flex items-center bg-white border border-slate-300 rounded-lg px-3 py-2">
              <span className="text-slate-400 font-mono text-sm mr-1">#</span>
              <HexColorInput 
                color={color} 
                onChange={onChange} 
                className="w-full font-mono text-sm font-bold text-slate-800 focus:outline-none" 
                prefixed={false}
              />
            </div>
          </div>
        </div>
        
        {/* Tombol Selesai */}
        <button 
          onClick={onClose} 
          className="w-full bg-blue-600 text-white font-black py-3.5 rounded-xl active:scale-[0.98] transition-transform shadow-lg shadow-blue-500/30"
        >
          Terapkan Warna
        </button>
      </div>
    </div>
  );
}
