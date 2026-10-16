import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = 'C:/Users/HP/Downloads/projects/Mehraab/source-images/Hero images folder';
const TARGET_DIR = 'public/photos/hero';

const SLIDE_MAPPINGS = [
  {
    id: 'amour',
    sourceFile: 'Aarsika Amour Perfume in Golden Courtyard.png',
    destBase: 'hero-amour',
    // bottle on right (x: ~75%)
    mobileCenterX: 0.72,
  },
  {
    id: 'atlas',
    sourceFile: 'Aarsika Atlas in a Golden Palace Courtyard.png',
    destBase: 'hero-atlas',
    // bottle on right (x: ~75%)
    mobileCenterX: 0.75,
  },
  {
    id: 'perfume-collection',
    sourceFile: 'Aarsika Perfume Collection at Sunset.png',
    destBase: 'hero-perfume-collection',
    // box on right (x: ~68%)
    mobileCenterX: 0.68,
  },
  {
    id: 'house-collection',
    sourceFile: 'Aarsika Perfumes combo in Golden Palace Light.png',
    destBase: 'hero-house-collection',
    // 5 bottles span across (x: ~60%)
    mobileCenterX: 0.62,
  },
  {
    id: 'discovery-set-10',
    sourceFile: 'Aarsika Perfume Discovery Set at Sunset 10 piece.png',
    destBase: 'hero-discovery-set-10',
    // box on right (x: ~60%)
    mobileCenterX: 0.62,
  },
  {
    id: 'discovery-set-5',
    sourceFile: 'Aarsika Perfume Discovery Set at Sunset.png',
    destBase: 'hero-discovery-set-5',
    // box on right (x: ~65%)
    mobileCenterX: 0.65,
  },
  {
    id: 'sehar-e-gulab',
    sourceFile: 'Aarsika Sehar Gulab Attar at Sunset.png',
    destBase: 'hero-sehar-e-gulab',
    // bottle on right (x: ~72%)
    mobileCenterX: 0.72,
  },
  {
    id: 'attar-collection',
    sourceFile: 'Aarsika Attar Collection at Sunset.png',
    destBase: 'hero-attar-collection',
    // bottles on right (x: ~68%)
    mobileCenterX: 0.68,
  },
  {
    id: 'amber-crimson-navy',
    sourceFile: 'Luxury Amber, Crimson & Navy Attars.png',
    destBase: 'hero-amber-crimson-navy',
    // bottles on right (x: ~70%)
    mobileCenterX: 0.70,
  },
];

async function processImages() {
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  for (const item of SLIDE_MAPPINGS) {
    const srcPath = path.join(SOURCE_DIR, item.sourceFile);
    if (!fs.existsSync(srcPath)) {
      console.error(`Missing source image: ${srcPath}`);
      continue;
    }

    console.log(`Processing: ${item.sourceFile}...`);

    // 1. Copy exact source PNG as fallback
    const destPng = path.join(TARGET_DIR, `${item.destBase}.png`);
    fs.copyFileSync(srcPath, destPng);

    const image = sharp(srcPath);
    const meta = await image.metadata();
    const { width: W, height: H } = meta;

    // 2. High-quality WebP desktop (Full Frame 16:9)
    const destWebp = path.join(TARGET_DIR, `${item.destBase}.webp`);
    await image
      .clone()
      .webp({ quality: 88, effort: 5 })
      .toFile(destWebp);

    const webpSize = (fs.statSync(destWebp).size / 1024).toFixed(1);
    console.log(`  -> Desktop WebP: ${destWebp} (${webpSize} KB)`);

    // 3. Mobile portrait crop (e.g. 4:5 or 3:4 aspect ratio focusing on the product bottle)
    // 4:5 aspect ratio on mobile -> width = H * 0.8
    const cropHeight = H;
    const cropWidth = Math.min(W, Math.round(H * 0.85));
    const targetCenterX = Math.round(W * item.mobileCenterX);
    let cropLeft = Math.max(0, Math.min(W - cropWidth, Math.round(targetCenterX - cropWidth / 2)));

    const mobileCropped = image.clone().extract({
      left: cropLeft,
      top: 0,
      width: cropWidth,
      height: cropHeight,
    });

    const destMobileWebp = path.join(TARGET_DIR, `${item.destBase}-mobile.webp`);
    await mobileCropped
      .resize({ width: 900 })
      .webp({ quality: 85, effort: 5 })
      .toFile(destMobileWebp);

    const mobileSize = (fs.statSync(destMobileWebp).size / 1024).toFixed(1);
    console.log(`  -> Mobile WebP: ${destMobileWebp} (${mobileSize} KB)`);
  }

  console.log('All 9 hero slides successfully processed!');
}

processImages().catch(console.error);
