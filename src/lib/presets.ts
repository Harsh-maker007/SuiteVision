import { PresetSample, StyleConfig } from "./types";

export const STYLE_CONFIGS: Record<string, StyleConfig> = {
  "luxury-presidential": {
    id: "luxury-presidential",
    name: "Presidential Luxury",
    badge: "5-Star Ultra Luxury",
    palette: ["#D4AF37", "#1E293B", "#F8FAFC", "#846B2C"],
    description: "Opulent palatial suite with bookmatched Calacatta marble, brushed champagne gold trims, and bespoke Italian velvet upholstery.",
    basePrompt:
      "masterpiece photorealistic luxury 5-star hotel presidential suite, bookmatched Calacatta marble accent wall, warm recessed LED cove lighting, king size bed with plush velvet headboard, floor-to-ceiling panoramic glass windows overlooking city skyline at dusk, brushed brass pendant lights, 8k resolution, architectural digest photography, hyper-detailed textures",
    negativePrompt:
      "sketch, drawing, lineart, amateur, cartoon, distorted geometry, flat lighting, oversaturated, lowres, watermark, text, rendering artifacts",
    sampleRenderUrl:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    features: ["Calacatta Gold Marble", "Custom Velvet Headboard", "Architectural Cove Lighting", "Panoramic Balcony"],
  },
  "modern-minimalist": {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    badge: "Contemporary Nordic",
    palette: ["#E2E8F0", "#475569", "#0F172A", "#94A3B8"],
    description: "Serene architectural lines, white oak slats, hidden flush doors, acoustic felt accents, and warm diffused daylight.",
    basePrompt:
      "hyperrealistic contemporary minimalist luxury hotel bedroom, light natural Japanese white oak vertical wall slats, floating platform bed with crisp linen bedding, hidden diffused LED perimeter illumination, polished terrazzo flooring, large open glass facade showing morning mountain mist, ultra-clean aesthetic, architectural design magazine, 8k",
    negativePrompt:
      "messy, cluttered, antique, ornate, heavy drapery, noisy textures, oversaturated, sketch, pencil lines, watermark, bad proportions",
    sampleRenderUrl:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    features: ["White Oak Wall Paneling", "Floating Platform Bed", "Concealed Track Lighting", "Microcement Flooring"],
  },
  "boutique-heritage": {
    id: "boutique-heritage",
    name: "Boutique Heritage",
    badge: "Artisanal Chic",
    palette: ["#9F1239", "#854D0E", "#FDF2E9", "#164E63"],
    description: "Rich cultural narratives, restored exposed brick or limewash, vintage cane accents, mid-century walnut, and brass detailing.",
    basePrompt:
      "award-winning boutique hotel bedroom interior, textured limewash plaster walls in warm beige, handcrafted curved walnut furnishings, caned wicker accents, jewel-toned emerald velvet armchair, artisanal ceramic bedside lamps casting cozy ambient light, wide-plank chevron parquet oak floors, 8k realistic photo",
    negativePrompt:
      "cold, sterile, generic modern, plastic materials, high glare, cartoon, monochrome, sketch lines, flat shading",
    sampleRenderUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    features: ["Limewash Plaster Finish", "Chevron French Parquet", "Artisan Ceramic Fixtures", "Bespoke Cane Inlay"],
  },
  "tropical-resort": {
    id: "tropical-resort",
    name: "Tropical Resort Villa",
    badge: "Biophilic Eco-Luxury",
    palette: ["#14532D", "#78350F", "#FEF08A", "#0D9488"],
    description: "Indoor-outdoor biophilic paradise with reclaimed teak timber, woven rattan partitions, and a private plunge pool backdrop.",
    basePrompt:
      "luxurious open-air tropical resort private villa suite in Bali or Maldives, open terrace overlooking turquoise ocean waters, thatched bamboo vaulted high ceiling, reclaimed Indonesian teak wood bed frame, sheer white canopy netting blowing in ocean breeze, lush monstera plants, soft sunset golden hour lighting, 8k photorealistic architectural photography",
    negativePrompt:
      "concrete brutalist, dark gloomy room, urban city, synthetic plastic, drawing, sketch, lines, blurry, pixelated",
    sampleRenderUrl:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    features: ["High Vaulted Bamboo Roof", "Reclaimed Teak Wood", "Private Plunge Pool View", "Biophilic Native Plants"],
  },
  "executive-business": {
    id: "executive-business",
    name: "Executive Business Club",
    badge: "Metropolitan Elite",
    palette: ["#1E293B", "#334155", "#0284C7", "#E2E8F0"],
    description: "Ergonomic executive workspace, soundproof acoustic acoustic fluting, integrated leather paneling, and smart automation.",
    basePrompt:
      "luxury 5-star executive business hotel suite in Tokyo or New York, tailored acoustic dark walnut fluted wall paneling with brushed bronze inserts, executive ergonomic Herman Miller desk zone, king bed with charcoal gray sateen duvets, illuminated recessed bar cabinet, skyline night view with glowing city lights bokeh, 8k interior architectural photography",
    negativePrompt:
      "low-end hotel, cartoon, pencil sketch, warped perspectives, blurry furniture, noisy artifact, watermark",
    sampleRenderUrl:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    features: ["Acoustic Fluted Paneling", "Integrated Workstation", "Smart Automated Glass", "Cityscape Night Panorama"],
  },
  "japanese-zen": {
    id: "japanese-zen",
    name: "Japanese Ryokan Zen",
    badge: "Wabi-Sabi Sanctuary",
    palette: ["#713F12", "#D97706", "#F5F5F4", "#292524"],
    description: "Refined Wabi-Sabi harmony with Tatami mats, Shoji lattice screens, Hinoki cedar wood scents, and tranquil Zen garden framing.",
    basePrompt:
      "modern luxury Japanese Ryokan hotel room, authentic woven tatami floor mats, sliding delicate shoji paper screen partition with backlight, low-profile Hinoki cypress wood bed platform with organic cotton futon, raw granite stone basin, view into tranquil bamboo gravel rock Zen garden, soft filtered natural morning light, 8k resolution, serene tranquil atmosphere",
    negativePrompt:
      "western clutter, loud bright colors, neon lights, rough lines, sketch, distortion, oversaturated, 3d render plastic look",
    sampleRenderUrl:
      "https://images.unsplash.com/photo-1540518614846-7ede433c4b13?auto=format&fit=crop&w=1200&q=80",
    features: ["Woven Igusa Tatami", "Hinoki Wood Platform", "Shoji Paper Screens", "Karesansui Rock Garden View"],
  },
};

// Preset samples matching hotel renovation concepts
export const PRESET_SAMPLES: PresetSample[] = [
  {
    id: "presidential-suite-concept",
    title: "The Grand Horizon Presidential Suite",
    category: "master-suite",
    style: "luxury-presidential",
    description:
      "Concept sketch for a 120 sq.m flagship renovation converting tired 1990s hospitality rooms into an ultra-luxury penthouse suite.",
    sketchUrl:
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80",
    renderedUrl:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    tags: ["Renovation 2026", "Penthouse Tier", "Marble & Gold"],
    metrics: {
      inferenceTime: "6.4s",
      fidScore: 14.2,
      clipScore: 0.88,
      resolution: "2048 x 1536 (Super-Res VAE)",
    },
  },
  {
    id: "minimalist-coastal-deluxe",
    title: "Nordic Minimalist Oceanfront King",
    category: "deluxe-king",
    style: "modern-minimalist",
    description:
      "Fast ideation sketch showing slatted acoustic oak wall and recessed ceiling cove for coastal boutique chain standard guestroom.",
    sketchUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    renderedUrl:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    tags: ["High Velocity Approval", "White Oak", "Acoustic Slats"],
    metrics: {
      inferenceTime: "5.8s",
      fidScore: 12.8,
      clipScore: 0.91,
      resolution: "2048 x 1536 (Super-Res VAE)",
    },
  },
  {
    id: "biophilic-resort-villa",
    title: "Private Overwater Pool Villa",
    category: "penthouse",
    style: "tropical-resort",
    description:
      "Preliminary architectural marker sketch translated into a photorealistic Maldives water bungalow rendering within seconds.",
    sketchUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    renderedUrl:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    tags: ["Biophilic Architecture", "Resort Flagship", "Overwater"],
    metrics: {
      inferenceTime: "7.1s",
      fidScore: 15.6,
      clipScore: 0.89,
      resolution: "2048 x 1536 (Super-Res VAE)",
    },
  },
  {
    id: "metropolitan-executive-suite",
    title: "Skyline Executive Club Suite",
    category: "executive-lounge",
    style: "executive-business",
    description:
      "Interior designer sketch of an urban business hotel room optimized for both restorative sleep and high-productivity corporate travel.",
    sketchUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    renderedUrl:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    tags: ["Business Elite", "Smart Automation", "Acoustic Comfort"],
    metrics: {
      inferenceTime: "6.1s",
      fidScore: 13.4,
      clipScore: 0.87,
      resolution: "2048 x 1536 (Super-Res VAE)",
    },
  },
];
