import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_MOBILE_DIR = 'C:/Users/HP/Downloads/projects/Mehraab/source-images/Hero images folder/Mobile hero images';
const TARGET_HERO_DIR = 'public/photos/hero';
const TARGET_PHOTOS_DIR = 'public/photos';

const MOBILE_ASSET_MAPPINGS = [
  {
    id: 'amour',
    sourceFile: 'Aarsika Amour in Golden Palace Light.png',
    destPrefix: 'hero-amour',
    section: 'Main Hero Slide 1 (AMOUR)',
  },
  {
    id: 'atlas',
    sourceFile: 'Royal Courtyard Atlas Perfume Ad.png',
    destPrefix: 'hero-atlas',
    section: 'Main Hero Slide 2 (ATLAS)',
  },
  {
    id: 'perfume-collection',
    sourceFile: 'Aarsika Royal Perfume Collection.png',
    destPrefix: 'hero-perfume-collection',
    section: 'Main Hero Slide 3 (PERFUME COLLECTION)',
  },
  {
    id: 'house-collection',
    sourceFile: 'Aarsika Perfumes in a Regal Courtyard.png',
    destPrefix: 'hero-house-collection',
    section: 'Main Hero Slide 4 (HOUSE COLLECTION)',
  },
  {
    id: 'discovery-set-10',
    sourceFile: 'Aarsika Royal Sunset Discovery Set.png',
    destPrefix: 'hero-discovery-set-10',
    section: 'Main Hero Slide 5 (DISCOVERY SET: 10 VIALS)',
  },
  {
    id: 'discovery-set-5',
    sourceFile: 'Aarsika Discovery Set at Sunset.png',
    destPrefix: 'hero-discovery-set-5',
    section: 'Main Hero Slide 6 (DISCOVERY SET: 5 VIALS) & Discovery Section',
  },
  {
    id: 'attar-collection',
    sourceFile: 'Opulent Attar Collection at Sunset.png',
    destPrefix: 'hero-attar-collection',
    section: 'Main Hero Slide 8 (ATTAR COLLECTION)',
  },
  {
    id: 'amber-crimson-navy',
    sourceFile: 'Opulent Palace Attar Collection.png',
    destPrefix: 'hero-amber-crimson-navy',
    section: 'Main Hero Slide 9 (AMBER, CRIMSON & NAVY ATTARS) & Attar Collection',
  },
];

async function processMobileAssets() {
  console.log('--- PROCESSING MOBILE & TABLET CAMPAIGN ARTWORK ---');

  if (!fs.existsSync(TARGET_HERO_DIR)) {
    fs.mkdirSync(TARGET_HERO_DIR, { recursive: true });
  }

  for (const item of MOBILE_ASSET_MAPPINGS) {
    const srcPath = path.join(SOURCE_MOBILE_DIR, item.sourceFile);
    if (!fs.existsSync(srcPath)) {
      console.error(`[ERROR] Missing source file: ${srcPath}`);
      continue;
    }

    const image = sharp(srcPath);
    const meta = await image.metadata();
    const { width: W, height: H } = meta;

    console.log(`Processing: ${item.sourceFile} (${W}x${H})...`);

    // 1. Mobile Portrait Asset (< 768px, width ~750-800px)
    const mobileWidth = Math.min(W, 800);
    const mobileWebpPath = path.join(TARGET_HERO_DIR, `${item.destPrefix}-mobile.webp`);
    await image
      .clone()
      .resize({ width: mobileWidth })
      .webp({ quality: 86, effort: 5 })
      .toFile(mobileWebpPath);

    const mobileSize = (fs.statSync(mobileWebpPath).size / 1024).toFixed(1);
    console.log(`  ✓ Mobile WebP: ${mobileWebpPath} (${mobileSize} KB)`);

    // 2. Tablet Portrait Asset (768px - 1024px, width ~1080px)
    const tabletWidth = Math.min(W, 1080);
    const tabletWebpPath = path.join(TARGET_HERO_DIR, `${item.destPrefix}-tablet.webp`);
    await image
      .clone()
      .resize({ width: tabletWidth })
      .webp({ quality: 88, effort: 5 })
      .toFile(tabletWebpPath);

    const tabletSize = (fs.statSync(tabletWebpPath).size / 1024).toFixed(1);
    console.log(`  ✓ Tablet WebP: ${tabletWebpPath} (${tabletSize} KB)`);

    // 4. Special Section mappings
    if (item.id === 'discovery-set-5') {
      // Wire into discovery-set-mobile.webp for Discovery Set component
      const discMobileWebp = path.join(TARGET_PHOTOS_DIR, 'discovery-set-mobile.webp');
      await image
        .clone()
        .resize({ width: 800 })
        .webp({ quality: 86 })
        .toFile(discMobileWebp);
      console.log(`  ✓ Discovery Set Section Mobile WebP: ${discMobileWebp}`);
    }

    if (item.id === 'amber-crimson-navy') {
      // Wire into attar collection trio
      const attarTrioWebp = path.join(TARGET_PHOTOS_DIR, 'attar-trio-mobile.webp');
      await image
        .clone()
        .resize({ width: 800 })
        .webp({ quality: 86 })
        .toFile(attarTrioWebp);
      console.log(`  ✓ Attar Collection Section Mobile WebP: ${attarTrioWebp}`);
    }
  }

  // Also ensure Sehar-e-Gulab has tablet asset matching its mobile asset
  const seharMobilePath = path.join(TARGET_HERO_DIR, 'hero-sehar-e-gulab-mobile.webp');
  const seharTabletPath = path.join(TARGET_HERO_DIR, 'hero-sehar-e-gulab-tablet.webp');
  if (fs.existsSync(seharMobilePath)) {
    fs.copyFileSync(seharMobilePath, seharTabletPath);
    console.log(`  ✓ Sehar-e-Gulab Tablet WebP: ${seharTabletPath}`);
  }

  console.log('--- ALL MOBILE & TABLET ASSETS PROCESSED SUCCESSFULLY ---');
}

processMobileAssets().catch(console.error);
