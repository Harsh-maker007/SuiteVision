/**
 * Client-side image processing utilities for SuiteVision AI
 * Handles: image validation, resizing, format conversion, preview generation
 */

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp", "image/bmp"];
export const TARGET_SIZE = 512; // ControlNet works best at 512x512

export interface ProcessedImage {
  base64: string;
  width: number;
  height: number;
  originalSize: number;
  format: string;
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported format. Please use: ${SUPPORTED_FORMATS.map(f => f.split("/")[1].toUpperCase()).join(", ")}`,
    };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: `File too large. Maximum size: ${MAX_FILE_SIZE_MB}MB` };
  }
  return { valid: true };
}

export async function processSketchImage(file: File): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = TARGET_SIZE;
      canvas.height = TARGET_SIZE;
      const ctx = canvas.getContext("2d")!;

      // Fill white background (important for sketch processing)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, TARGET_SIZE, TARGET_SIZE);

      // Scale image to fit within TARGET_SIZE while maintaining aspect ratio
      const scale = Math.min(TARGET_SIZE / img.width, TARGET_SIZE / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const offsetX = (TARGET_SIZE - scaledWidth) / 2;
      const offsetY = (TARGET_SIZE - scaledHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

      const base64 = canvas.toDataURL("image/png");
      resolve({
        base64,
        width: TARGET_SIZE,
        height: TARGET_SIZE,
        originalSize: file.size,
        format: file.type,
      });
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function downloadImage(base64: string, filename: string = "suitevision-render.png") {
  const link = document.createElement("a");
  link.href = base64;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
