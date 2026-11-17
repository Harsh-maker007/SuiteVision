import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "SuiteVision AI",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
    timestamp: new Date().toISOString(),
    models: {
      primary: "lllyasviel/sd-controlnet-scribble",
      fallback: "runwayml/stable-diffusion-v1-5",
    },
    huggingfaceConfigured: !!process.env.HUGGINGFACE_API_KEY,
  });
}
