"use client";

import { STYLE_CONFIGS } from "@/lib/presets";
import { RoomStyleId } from "@/lib/types";
import { Sparkles, Check } from "lucide-react";

interface StyleSelectorProps {
  selected: RoomStyleId;
  onChange: (id: RoomStyleId) => void;
  disabled?: boolean;
}

export function StyleSelector({ selected, onChange, disabled }: StyleSelectorProps) {
  const styles = Object.values(STYLE_CONFIGS);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interior Design Aesthetic</span>
        </label>
        <span className="text-[11px] text-amber-400 font-mono">
          {STYLE_CONFIGS[selected]?.badge || "Custom"}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {styles.map((item) => {
          const isSelected = selected === item.id;
          return (
            <button
              key={item.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(item.id as RoomStyleId)}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden group flex flex-col justify-between ${
                isSelected
                  ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50"
                  : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-xs font-bold text-white tracking-tight">{item.name}</span>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-navy-950">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2">
                  {item.description}
                </p>
              </div>

              {/* Color Palette preview dots */}
              <div className="flex items-center gap-1.5 pt-1 border-t border-slate-800/80">
                {item.palette.map((color, i) => (
                  <span
                    key={i}
                    className="w-3 h-3 rounded-full border border-black/30 shadow-xs"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                <span className="text-[9px] text-slate-500 font-mono ml-auto">
                  {item.features[0]?.split(" ")[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
