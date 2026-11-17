/**
 * SuiteVision AI - Hugging Face Inference API client
 * Uses ControlNet (Stable Diffusion + edge/scribble conditioning)
 * for sketch-to-photoreal hotel room image translation.
 *
 * Architecture:
 * - Base: Stable Diffusion v1.5 (latent diffusion model)
 * - Conditioning: ControlNet scribble/canny for structure preservation
 * - Pipeline: Sketch → Canny Edge Detection → ControlNet Diffusion → Photoreal Render
 */

const HF_API_URL = "https://api-inference.huggingface.co/models";
const DEFAULT_MODEL = "lllyasviel/sd-controlnet-scribble";

interface GenerationOptions {
  prompt?: string;
  negativePrompt?: string;
  numInferenceSteps?: number;
  guidanceScale?: number;
  strength?: number;
}

interface GenerationResult {
  imageBlob: Blob;
  model: string;
  processingTimeMs: number;
}

export async function generatePhotorealFromSketch(
  sketchImageBase64: string,
  options: GenerationOptions = {}
): Promise<GenerationResult> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    throw new Error("HUGGINGFACE_API_KEY environment variable is not set");
  }

  const {
    prompt = "photorealistic luxury hotel room interior, high resolution, professional photography, warm lighting, elegant furniture, 8k, hyperrealistic",
    negativePrompt = "cartoon, sketch, drawing, low quality, blurry, distorted, ugly, deformed",
    numInferenceSteps = 20,
    guidanceScale = 7.5,
  } = options;

  const startTime = Date.now();

  // Convert base64 to binary
  const base64Data = sketchImageBase64.replace(/^data:image\/\w+;base64,/, "");
  const binaryData = Buffer.from(base64Data, "base64");

  // Try ControlNet scribble model first (best for hand-drawn sketches)
  const models = [
    "lllyasviel/sd-controlnet-scribble",
    "lllyasviel/sd-controlnet-canny",
  ];

  let lastError: Error | null = null;

  for (const model of models) {
    try {
      const response = await fetch(`${HF_API_URL}/${model}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "X-Wait-For-Model": "true",
        },
        body: JSON.stringify({
          inputs: sketchImageBase64,
          parameters: {
            prompt,
            negative_prompt: negativePrompt,
            num_inference_steps: numInferenceSteps,
            guidance_scale: guidanceScale,
            image: sketchImageBase64,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HF API error (${response.status}): ${errorText}`);
      }

      const imageBlob = await response.blob();
      return {
        imageBlob,
        model,
        processingTimeMs: Date.now() - startTime,
      };
    } catch (err) {
      lastError = err as Error;
      console.warn(`Model ${model} failed, trying next...`, err);
      continue;
    }
  }

  throw lastError || new Error("All models failed");
}

/**
 * Fallback: Use img2img Stable Diffusion for sketch-to-photoreal when ControlNet unavailable
 * Uses: stabilityai/stable-diffusion-2-1 with high denoising strength
 */
export async function generateWithImg2Img(
  sketchImageBase64: string,
  options: GenerationOptions = {}
): Promise<GenerationResult> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) throw new Error("HUGGINGFACE_API_KEY not set");

  const startTime = Date.now();
  const model = "runwayml/stable-diffusion-v1-5";

  const {
    prompt = "photorealistic luxury hotel room interior, high resolution, professional architectural photography, warm ambient lighting, premium furniture, 8k ultra detailed",
    negativePrompt = "sketch, drawing, cartoon, watermark, text, blurry, low quality",
    numInferenceSteps = 25,
    guidanceScale = 8.5,
    strength = 0.8,
  } = options;

  const response = await fetch(`${HF_API_URL}/${model}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Wait-For-Model": "true",
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        negative_prompt: negativePrompt,
        num_inference_steps: numInferenceSteps,
        guidance_scale: guidanceScale,
        image: sketchImageBase64,
        strength,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HF API error (${response.status}): ${errorText}`);
  }

  const imageBlob = await response.blob();
  return {
    imageBlob,
    model,
    processingTimeMs: Date.now() - startTime,
  };
}

export type { GenerationOptions, GenerationResult };
