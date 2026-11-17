"use client";

import { PRESET_SAMPLES, STYLE_CONFIGS } from "@/lib/presets";
import { PresetSample, RoomStyleId } from "@/lib/types";
import { Sparkles, ArrowRight, Clock, Award, Layers } from "lucide-react";

interface PresetsGalleryProps {
  onSelectPreset: (preset: PresetSample) => void;
}

export function PresetsGallery({ onSelectPreset }: PresetsGalleryProps) {
  return (
    <section id="presets" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              Validated Hospitality Benchmarks
            </span>
            <span className="text-xs text-slate-400">Real Hotel Case Studies</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Renovation Planning Gallery
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Compare hand-drawn hotel architect sketches against their photorealistic zero-shot AI renderings across luxury tiers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PRESET_SAMPLES.map((sample) => {
          const style = STYLE_CONFIGS[sample.style];
          return (
            <div
              key={sample.id}
              className="group rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/40 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
            >
              <div>
                {/* Images Preview: Sketch & Render */}
                <div className="grid grid-cols-2 gap-2 mb-3.5">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-white border border-slate-700">
                    <img
                      src={sample.sketchUrl}
                      alt={`${sample.title} sketch`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-navy-950/80 text-white backdrop-blur-sm">
                      Sketch
                    </span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 border border-amber-500/30 group-hover:border-amber-500/60 transition-colors">
                    <img
                      src={sample.renderedUrl}
                      alt={`${sample.title} photoreal render`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                      Render
                    </span>
                  </div>
                </div>

                {/* Header & Meta */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {sample.title}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 whitespace-nowrap">
                    {style?.name}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {sample.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {sample.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics & Load Button */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Clock className="w-3 h-3" />
                    <span>{sample.metrics.inferenceTime}</span>
                  </span>
                  <span>FID: {sample.metrics.fidScore}</span>
                  <span>CLIP: {sample.metrics.clipScore}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPreset(sample)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-amber-400 hover:text-slate-950 bg-amber-500/10 hover:bg-amber-400 border border-amber-500/30 transition-all flex items-center gap-1 group/btn"
                >
                  <span>Load in Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
