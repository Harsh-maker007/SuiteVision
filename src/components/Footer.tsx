import Link from "next/link";
import { Building2, Github, BookOpen, Layers } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-navy-950/80 mt-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">SuiteVision AI</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Team ID: 17
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              **Sketch-to-Photoreal Hotel Room Renderer** (S.No: 4, Team ID: 17).
              An advanced Image-to-Image Translation system using Deep Learning, ControlNet, and Latent Diffusion Models to accelerate renovation planning, material ideation, and owner approvals across global hospitality brands.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Project Quick Links</h4>
            <ul className="space-y-1.5">
              <li>
                <a href="#studio" className="hover:text-amber-400 transition-colors">
                  Interactive Studio
                </a>
              </li>
              <li>
                <a href="#presets" className="hover:text-amber-400 transition-colors">
                  Hotel Renovation Gallery
                </a>
              </li>
              <li>
                <Link href="/docs" className="hover:text-amber-400 transition-colors">
                  GenAI Architecture Docs
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/n-niharika1/SuiteVision"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">AI Technology Stack</h4>
            <ul className="space-y-1.5 font-mono text-[11px] text-slate-400">
              <li>• Latent Diffusion Models (SD v1.5 / SDXL)</li>
              <li>• ControlNet Zero-Convolutions (Scribble/Canny)</li>
              <li>• Conditional GAN Comparative Architecture</li>
              <li>• Hugging Face Inference API / Vercel Edge</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© 2026 SuiteVision AI Team 17. All rights reserved.</p>
          <p className="font-mono">Ready for one-click deployment on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
