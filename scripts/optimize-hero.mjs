import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SLUG_MAP = [
  { slug: 'hero-nayaab', names: ['nayaab', 'hero-nayaab', '15bc658d-4dda-45cf-ac42-d42c775004b4'] },
  { slug: 'hero-saaz', names: ['saaz', 'hero-saaz', 'cf17127e-7d63-4d14-a475-9944e3a93304'] },
  { slug: 'hero-madhuri', names: ['madhuri', 'hero-madhuri', '65e7ca04-f44c-4df8-815a-da184b47d216'] },
  { slug: 'hero-razmi', names: ['razmi', 'hero-razmi', '34ccc655-c94e-4fb0-915a-2de25bb8ea49'] },
];

const SEARCH_DIRS = ['source-images/hero', 'public/photos', 'hero images', '.'];
const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];
const OUTPUT_DIR = 'public/photos/hero';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function findInputPath(names) {
  for (const dir of SEARCH_DIRS) {
    for (const name of names) {
      for (const ext of EXTENSIONS) {
        const candidate = path.join(dir, `${name}${ext}`);
        if (fs.existsSync(candidate)) {
          return candidate;
        }
      }
    }
  }
  return null;
}

async function optimizeHeroImages() {
  console.log('--- OPTIMIZING HERO IMAGES (PHASE 1.8) ---');
  let totalFiles = 0;

  for (const item of SLUG_MAP) {
    const { slug, names } = item;
    const inputPath = findInputPath(names);

    if (!inputPath) {
      console.warn(`[WARN] Source image for ${slug} not found in search paths. Skipping.`);
      continue;
    }

    const image = sharp(inputPath);
    const meta = await image.metadata();
    const { width: W, height: H } = meta;

    console.log(`Processing ${slug} (${W}x${H}) from ${inputPath}...`);

    // 1. Desktop 2400w and 1600w (Full Frame, No Crop)
    const desktopTargets = [
      { name: `${slug}-desktop-2400w`, width: 2400 },
      { name: `${slug}-desktop-1600w`, width: 1600 },
    ];

    for (const target of desktopTargets) {
      const resized = image.clone().resize({ width: target.width });

      // AVIF
      const avifPath = path.join(OUTPUT_DIR, `${target.name}.avif`);
      await resized.clone().avif({ quality: 78 }).toFile(avifPath);
      const avifSize = (fs.statSync(avifPath).size / 1024).toFixed(1);

      // WebP
      const webpPath = path.join(OUTPUT_DIR, `${target.name}.webp`);
      await resized.clone().webp({ quality: 80 }).toFile(webpPath);
      const webpSize = (fs.statSync(webpPath).size / 1024).toFixed(1);

      console.log(`  ✓ ${target.name}.avif: ${avifSize} KB`);
      console.log(`  ✓ ${target.name}.webp: ${webpSize} KB`);
      totalFiles += 2;
    }

    // 2. Mobile 4:5 Crop (Centred on x = 36%, Bottle Fully Inside Crop)
    // 4:5 aspect ratio -> cropWidth = H * 0.8
    const cropHeight = H;
    const cropWidth = Math.round(H * 0.8);
    const centerX = Math.round(W * 0.36);
    let cropLeft = Math.max(0, Math.min(W - cropWidth, Math.round(centerX - cropWidth / 2)));

    const croppedImage = image.clone().extract({
      left: cropLeft,
      top: 0,
      width: cropWidth,
      height: cropHeight,
    });

    const mobileTargets = [
      { name: `${slug}-mobile-1080w`, width: 1080 },
      { name: `${slug}-mobile-900w`, width: 900 },
    ];

    for (const target of mobileTargets) {
      const resized = croppedImage.clone().resize({ width: target.width });

      // AVIF
      const avifPath = path.join(OUTPUT_DIR, `${target.name}.avif`);
      await resized.clone().avif({ quality: 75 }).toFile(avifPath);
      const avifSize = (fs.statSync(avifPath).size / 1024).toFixed(1);

      // WebP
      const webpPath = path.join(OUTPUT_DIR, `${target.name}.webp`);
      await resized.clone().webp({ quality: 78 }).toFile(webpPath);
      const webpSize = (fs.statSync(webpPath).size / 1024).toFixed(1);

      console.log(`  ✓ ${target.name}.avif: ${avifSize} KB`);
      console.log(`  ✓ ${target.name}.webp: ${webpSize} KB`);
      totalFiles += 2;
    }
  }

  console.log(`--- FINISHED OPTIMIZING ${totalFiles} HERO IMAGE VARIANTS ---`);
}

optimizeHeroImages().catch((err) => {
  console.error('Error optimizing hero images:', err);
  process.exit(1);
});
