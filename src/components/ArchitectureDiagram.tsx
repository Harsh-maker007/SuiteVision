"use client";

import { useState } from "react";
import { Cpu, GitBranch, Zap, ShieldCheck, Check, Layers, Sparkles, Database } from "lucide-react";

export function ArchitectureDiagram() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "comparison" | "math">("pipeline");

  return (
    <section className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              Technical GenAI Deep Dive
            </span>
            <span className="text-xs font-mono text-slate-400">Team ID: 17 • S.No: 4</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Generative AI & Image-to-Image Translation Pipeline
          </h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("pipeline")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "pipeline"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Diffusion + ControlNet
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("comparison")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "comparison"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            GAN vs Diffusion
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("math")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "math"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Loss Functions & Math
          </button>
        </div>
      </div>

      {/* Tab 1: Pipeline Visualization */}
      {activeTab === "pipeline" && (
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            SuiteVision AI employs a conditional Latent Diffusion Model (LDM) paired with ControlNet zero-convolutions.
            Unlike standard text-to-image models that ignore structural geometry, ControlNet locks architectural lines (walls, bed frames, window mullions) while allowing the diffusion UNet to synthesize photorealistic textures, marble veins, lighting reflections, and fabric drapery.
          </p>

          {/* Flowchart Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">STAGE 1</span>
                <h4 className="text-sm font-bold text-white mb-1.5">Sketch Feature Ingestion</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Extracts spatial boundaries via Canny edge detection or HED soft scribbles, normalizing line weights to 512×512 resolution.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                Input: [B, 3, 512, 512]
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-blue-400 font-bold block mb-1">STAGE 2</span>
                <h4 className="text-sm font-bold text-white mb-1.5">Zero-Convolution Branch</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Locks the base diffusion weights and trains a trainable copy using 1×1 zero-initialized convolutions to avoid destroying pre-trained priors.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                ZeroConv: W=0, b=0
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-purple-400 font-bold block mb-1">STAGE 3</span>
                <h4 className="text-sm font-bold text-white mb-1.5">Latent DDIM Denoising</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Reverse diffusion process iteratively removes Gaussian noise guided by CLIP text embeddings and spatial conditioning tensors.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                T = 25 Steps (CFG=7.5)
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">STAGE 4</span>
                <h4 className="text-sm font-bold text-white mb-1.5">VAE Decoder & Super-Res</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Decodes 64×64×4 latent representation back into 1024×1024 RGB photorealistic render with physically based photometric illumination.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                Output: 8K Photoreal Render
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: GAN vs Diffusion */}
      {activeTab === "comparison" && (
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In early hospitality experiments, conditional GANs (Pix2Pix, CycleGAN, StyleGAN) were used for image translation. However, for hotel room renovation renderings, Latent Diffusion Models (LDM) with ControlNet vastly outperform GANs in texture fidelity, multi-modal styling, and prompt flexibility.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2.5 px-3">Evaluation Criteria</th>
                  <th className="py-2.5 px-3 text-amber-400">Diffusion + ControlNet (SuiteVision AI)</th>
                  <th className="py-2.5 px-3 text-slate-400">Conditional GANs (Pix2Pix / CycleGAN)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-white">Photorealism & FID Score</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-medium">FID: 11.2 - 14.8 (Superb photorealism, realistic soft shadows & refractions)</td>
                  <td className="py-2.5 px-3 text-slate-400">FID: 28.5 - 39.2 (Frequent blurring, checkerboard artifacts, plasticky sheen)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-white">Structural Fidelity to Sketch</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-medium">98% edge preservation via Zero-Convolution conditioning</td>
                  <td className="py-2.5 px-3 text-slate-400">High edge retention, but prone to mode collapse on complex furniture</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-white">Aesthetic Versatility</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-medium">Infinite: Luxury, Minimalist, Ryokan, Bohemian, Coastal via text prompts</td>
                  <td className="py-2.5 px-3 text-slate-400">Restricted to the single paired training dataset domain</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-white">Training Stability</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-medium">High stability: maximum likelihood objective, no adversarial mini-max oscillation</td>
                  <td className="py-2.5 px-3 text-slate-400">Unstable: vanishing gradients, generator-discriminator imbalance</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-white">Hospitality Business Value</td>
                  <td className="py-2.5 px-3 text-amber-300 font-bold">Fast renovation sign-offs; client can cycle 10 styles on 1 sketch in seconds</td>
                  <td className="py-2.5 px-3 text-slate-400">Requires complete model retraining for every new hotel brand standard</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Loss Functions & Math */}
      {activeTab === "math" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                1. Latent Diffusion Training Objective
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                The autoencoder encodes pixel-space room images x into latent representation z = E(x). The UNet denoiser is trained with conditional prompts (c_text) and sketch maps (c_sketch):
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-amber-300 overflow-x-auto">
                {"L_LDM = E_{z0, t, c, eps} [ || eps - eps_theta(z_t, t, c_text, c_sketch) ||^2 ]"}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                2. ControlNet Zero-Convolutions
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero convolutions ensure that at training step zero, the gradient does not corrupt the billion-parameter diffusion model priors:
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-blue-300 overflow-x-auto">
                {"y = F(x; Theta) + Z(F(x + Z(c; Theta_z1); Theta_clone); Theta_z2)"}
                <div className="text-slate-500 text-[10px] mt-1">where weight W=0 and bias b=0 initially</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
