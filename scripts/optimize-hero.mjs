import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SLUGS = ['hero-nayaab', 'hero-saaz', 'hero-madhuri', 'hero-razmi'];
const SOURCE_DIR = 'source-images/hero';
const OUTPUT_DIR = 'public/photos/hero';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeHeroImages() {
  console.log('--- OPTIMIZING HERO IMAGES ---');
  let totalFiles = 0;

  for (const slug of SLUGS) {
    let inputPath = path.join(SOURCE_DIR, `${slug}.jpg`);
    if (!fs.existsSync(inputPath)) {
      inputPath = path.join('public/photos', `${slug}.jpg`);
    }

    if (!fs.existsSync(inputPath)) {
      console.warn(`[WARN] Source image for ${slug} not found at ${inputPath}. Skipping optimization.`);
      continue;
    }

    const image = sharp(inputPath);
    const meta = await image.metadata();
    const { width: W, height: H } = meta;

    console.log(`Processing ${slug} (${W}x${H})...`);

    // 1. Desktop 2400w and 1600w
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

    // 2. Mobile 4:5 Crop (Centred at x = 36%)
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
