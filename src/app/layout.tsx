import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SuiteVision AI — Sketch-to-Photoreal Hotel Room Renderer | Team ID: 17",
  description:
    "Next-generation Image-to-Image Generative AI system translating hotel room concept sketches into photorealistic renders for accelerated renovation planning and approvals.",
  keywords: [
    "Hotel Renovation",
    "Generative AI",
    "ControlNet",
    "Diffusion Models",
    "GANs",
    "Image-to-Image Translation",
    "Interior Design AI",
    "Hospitality Tech",
    "Deep Learning",
  ],
  authors: [{ name: "SuiteVision AI Engineering Team (Team 17)" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-navy-950 text-slate-100 antialiased selection:bg-gold-500 selection:text-navy-950">
        {children}
      </body>
    </html>
  );
}
