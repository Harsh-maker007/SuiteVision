"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Pen, Eraser, RotateCcw, Download, Sparkles, Wand2 } from "lucide-react";

interface SketchCanvasProps {
  onExport: (base64: string) => void;
  disabled?: boolean;
}

export function SketchCanvas({ onExport, disabled }: SketchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [brushSize, setBrushSize] = useState<number>(3);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState<number>(-1);

  // Initialize canvas with white background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(0, historyStep + 1), currentState]);
    setHistoryStep((prev) => prev + 1);
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : "#111827";
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveState();
    triggerExport();
  };

  const undo = () => {
    if (historyStep <= 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const targetStep = historyStep - 1;
    ctx.putImageData(history[targetStep], 0, 0);
    setHistoryStep(targetStep);
    triggerExport();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
    triggerExport();
  };

  const triggerExport = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const base64 = canvas.toDataURL("image/png");
    onExport(base64);
  }, [onExport]);

  // Load a template blueprint sketch (e.g. bed + headboard + lamps + window)
  const loadTemplate = (type: "bed" | "suite") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (type === "bed") {
      // Room perspective lines
      ctx.beginPath();
      // Back wall rectangle
      ctx.strokeRect(100, 80, 312, 220);
      // Perspective ceiling corners
      ctx.moveTo(100, 80); ctx.lineTo(0, 0);
      ctx.moveTo(412, 80); ctx.lineTo(512, 0);
      // Floor corners
      ctx.moveTo(100, 300); ctx.lineTo(0, 512);
      ctx.moveTo(412, 300); ctx.lineTo(512, 512);
      ctx.stroke();

      // Large King Bed in center
      ctx.lineWidth = 4;
      ctx.beginPath();
      // Headboard
      ctx.strokeRect(150, 160, 212, 100);
      // Mattress & Duvet
      ctx.strokeRect(160, 240, 192, 160);
      // Pillows
      ctx.strokeRect(175, 220, 70, 35);
      ctx.strokeRect(267, 220, 70, 35);
      // Nightstands
      ctx.strokeRect(105, 250, 45, 60);
      ctx.strokeRect(362, 250, 45, 60);
      // Lamps
      ctx.arc(127, 235, 12, 0, Math.PI * 2);
      ctx.arc(385, 235, 12, 0, Math.PI * 2);
      ctx.stroke();

      // Window on left wall
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(30, 90); ctx.lineTo(80, 110);
      ctx.lineTo(80, 320); ctx.lineTo(30, 390);
      ctx.closePath();
      ctx.stroke();
    } else {
      // Penthouse Suite with sofa and terrace
      ctx.beginPath();
      ctx.strokeRect(80, 60, 352, 240);
      ctx.moveTo(80, 60); ctx.lineTo(0, 0);
      ctx.moveTo(432, 60); ctx.lineTo(512, 0);
      ctx.moveTo(80, 300); ctx.lineTo(0, 512);
      ctx.moveTo(432, 300); ctx.lineTo(512, 512);
      // Panoramic window frame
      ctx.strokeRect(120, 80, 272, 140);
      // Balcony railing
      ctx.moveTo(120, 180); ctx.lineTo(392, 180);
      // Lounge sofa
      ctx.strokeRect(140, 320, 232, 110);
      // Coffee table
      ctx.strokeRect(180, 440, 152, 45);
      ctx.stroke();
    }

    saveState();
    triggerExport();
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Canvas Tool Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setTool("pen")}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              tool === "pen"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
            title="Pen Tool"
          >
            <Pen className="w-3.5 h-3.5" />
            <span>Sketch Pen</span>
          </button>

          <button
            type="button"
            onClick={() => setTool("eraser")}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              tool === "eraser"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
            title="Eraser Tool"
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>Eraser</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-800 mx-1" />

          {/* Brush Sizes */}
          <div className="flex items-center gap-1">
            {[2, 4, 8].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setBrushSize(size)}
                className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                  brushSize === size ? "bg-slate-700 text-amber-400 font-bold" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <div
                  className="rounded-full bg-current"
                  style={{ width: `${size * 1.5}px`, height: `${size * 1.5}px` }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={undo}
            disabled={historyStep <= 0}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Undo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={clearCanvas}
            className="px-2 py-1 rounded-md text-[11px] font-medium text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all"
          >
            Clear
          </button>

          <div className="h-4 w-[1px] bg-slate-800 mx-0.5" />

          {/* Quick Architect Templates */}
          <button
            type="button"
            onClick={() => loadTemplate("bed")}
            className="px-2.5 py-1 rounded-md text-[11px] font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex items-center gap-1 transition-all"
          >
            <Wand2 className="w-3 h-3" />
            <span>King Suite Blueprint</span>
          </button>
        </div>
      </div>

      {/* Drawing Board */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-white shadow-2xl shadow-black/40 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={512}
          height={512}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full max-w-[512px] aspect-square cursor-crosshair touch-none bg-white"
        />
        <div className="absolute bottom-2 left-3 pointer-events-none text-[10px] text-slate-400 font-mono select-none bg-white/80 px-2 py-0.5 rounded shadow-sm">
          512×512 Neural Input Canvas
        </div>
      </div>
    </div>
  );
}
