"use client";

import Link from "next/link";
import { Sparkles, Building2, Github, Cpu, BookOpen, Layers } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-navy-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Project Meta */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/35 transition-all">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-white tracking-tight">SuiteVision</span>
                  <span className="text-xs px-2 py-0.5 rounded-md font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Hotel Sketch-to-Photoreal Engine</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-slate-800">
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 font-mono border border-slate-700/60">
                S.No: 4
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-mono border border-amber-500/30">
                Team ID: 17
              </span>
              <span className="text-xs text-slate-400 font-medium">Hospitality Domain</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <a
              href="#studio"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Studio</span>
            </a>
            <a
              href="#presets"
              className="hidden sm:flex px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Case Studies</span>
            </a>
            <Link
              href="/docs"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>GenAI Docs</span>
            </Link>
            <a
              href="https://github.com/n-niharika1/SuiteVision"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span className="hidden md:inline">GitHub</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
