"use client";

import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, X, AlertCircle, Wand2, CheckCircle2 } from "lucide-react";
import { validateImageFile, processSketchImage, type ProcessedImage } from "@/lib/imageProcessing";

interface ImageUploaderProps {
  onImageProcessed: (base64: string) => void;
  disabled?: boolean;
}

const SAMPLE_SKETCHES = [
  {
    title: "King Bedroom Perspective",
    url: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80",
    desc: "Bed, side tables, large window",
  },
  {
    title: "Minimalist Wall Slats",
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
    desc: "Architectural line drawing",
  },
  {
    title: "Resort Open Terrace",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    desc: "Indoor-outdoor terrace concept",
  },
];

export function ImageUploader({ onImageProcessed, disabled }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [activeSample, setActiveSample] = useState<number | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error || "Invalid file format");
        return;
      }

      setProcessing(true);
      try {
        const processed = await processSketchImage(file);
        setPreview(processed.base64);
        setActiveSample(null);
        onImageProcessed(processed.base64);
      } catch (err) {
        setError("Failed to process sketch. Please try another image.");
      } finally {
        setProcessing(false);
      }
    },
    [onImageProcessed]
  );

  const loadSample = async (index: number, url: string) => {
    setProcessing(true);
    setError(null);
    setActiveSample(index);
    try {
      // Fetch image and convert to base64
      const res = await fetch(url);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onImageProcessed(base64);
        setProcessing(false);
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      setError("Failed to load sample sketch. Please try drawing or uploading.");
      setProcessing(false);
    }
  };

  const clearImage = () => {
    setPreview(null);
    setActiveSample(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      {!preview ? (
        <div className="relative border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-2xl p-6 transition-all duration-200 bg-slate-900/40 hover:bg-slate-900/70 text-center flex flex-col items-center justify-center min-h-[200px]">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            disabled={disabled || processing}
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3">
            {processing ? (
              <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-7 h-7 text-amber-400" />
            )}
          </div>
          <p className="text-sm font-semibold text-slate-200">
            Upload Concept Sketch or Floor Blueprint
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Drag & drop or click to browse • PNG, JPG, WEBP (Max 10MB)
          </p>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center p-2">
          <img
            src={preview}
            alt="Uploaded Concept Sketch"
            className="max-h-[300px] w-auto object-contain rounded-xl bg-white"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 hover:bg-red-500 text-white backdrop-blur-md border border-slate-700 transition-all shadow-lg"
            title="Remove sketch"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick Sample Selector */}
      <div>
        <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
          <Wand2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Or load a curated hotel sketch sample:</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SAMPLE_SKETCHES.map((sample, idx) => (
            <button
              key={sample.title}
              type="button"
              onClick={() => loadSample(idx, sample.url)}
              disabled={disabled || processing}
              className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                activeSample === idx
                  ? "border-amber-500 bg-amber-500/15 shadow-md shadow-amber-500/20"
                  : "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800/50"
              }`}
            >
              <img
                src={sample.url}
                alt={sample.title}
                className="w-10 h-10 rounded-lg object-cover bg-white border border-slate-700"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-200 truncate">{sample.title}</p>
                <p className="text-[10px] text-slate-400 truncate">{sample.desc}</p>
              </div>
              {activeSample === idx && (
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
