/**
 * AARSIKA — Art-Directed Responsive Photo Pipeline (Phase 5.2)
 * scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const SOURCE_DIR = path.join(ROOT_DIR, 'source-images');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'photos');
const MANIFEST_PATH = path.join(ROOT_DIR, 'src', 'data', 'photoManifest.json');
const DOCS_PATH = path.join(ROOT_DIR, 'docs', 'PHOTO_SLOTS.md');

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 30 Expected Image Slots Specification
export const EXPECTED_SLOTS = [
  // 10 Hero Slots
  {
    slot: 'hero-amour-mobile',
    family: 'hero-mobile',
    expectedFile: 'hero-amour-mobile.png',
    altNames: ['Aarsika Amour Mobile.png', 'hero-amour-portrait.png'],
    intendedMobile: '1080 × 1350 px',
    intendedDesktop: '—',
    aspect: '4:5',
    targetWidths: [640, 828, 1080],
    isHero: true,
  },
  {
    slot: 'hero-amour-desktop',
    family: 'hero-desktop',
    expectedFile: 'hero-amour-desktop.png',
    altNames: ['hero/Aarsika Amour Golden Rose Still Life.png', 'Aarsika Amour Golden Rose Still Life.png'],
    intendedMobile: '—',
    intendedDesktop: '2400 × 1350 px (16:9)',
    aspect: '16:9',
    targetWidths: [1280, 1920, 2400],
    isHero: true,
  },
  {
    slot: 'hero-raat-ki-rani-mobile',
    family: 'hero-mobile',
    expectedFile: 'hero-raat-ki-rani-mobile.png',
    altNames: ['Raat Ki Rani Mobile.png', 'hero-raat-ki-rani-portrait.png'],
    intendedMobile: '1080 × 1350 px',
    intendedDesktop: '—',
    aspect: '4:5',
    targetWidths: [640, 828, 1080],
    isHero: true,
  },
  {
    slot: 'hero-raat-ki-rani-desktop',
    family: 'hero-desktop',
    expectedFile: 'hero-raat-ki-rani-desktop.png',
    altNames: ['hero/Aarsika Raat Ki Rani.png', 'hero-raat-ki-rani-wide.png'],
    intendedMobile: '—',
    intendedDesktop: '2400 × 1350 px (16:9)',
    aspect: '16:9',
    targetWidths: [1280, 1920, 2400],
    isHero: true,
  },
  {
    slot: 'hero-noor-mobile',
    family: 'hero-mobile',
    expectedFile: 'hero-noor-mobile.png',
    altNames: ['hero-noor-portrait.png'],
    intendedMobile: '1080 × 1350 px',
    intendedDesktop: '—',
    aspect: '4:5',
    targetWidths: [640, 828, 1080],
    isHero: true,
  },
  {
    slot: 'hero-noor-desktop',
    family: 'hero-desktop',
    expectedFile: 'hero-noor-desktop.png',
    altNames: ['hero/Noor.png', 'hero-noor-wide.png'],
    intendedMobile: '—',
    intendedDesktop: '2400 × 1350 px (16:9)',
    aspect: '16:9',
    targetWidths: [1280, 1920, 2400],
    isHero: true,
  },
  {
    slot: 'hero-resham-oudh-mobile',
    family: 'hero-mobile',
    expectedFile: 'hero-resham-oudh-mobile.png',
    altNames: ['hero-resham-oudh-portrait.png'],
    intendedMobile: '1080 × 1350 px',
    intendedDesktop: '—',
    aspect: '4:5',
    targetWidths: [640, 828, 1080],
    isHero: true,
  },
  {
    slot: 'hero-resham-oudh-desktop',
    family: 'hero-desktop',
    expectedFile: 'hero-resham-oudh-desktop.png',
    altNames: ['hero/Resham Oudh.png', 'hero-resham-oudh-wide.png'],
    intendedMobile: '—',
    intendedDesktop: '2400 × 1350 px (16:9)',
    aspect: '16:9',
    targetWidths: [1280, 1920, 2400],
    isHero: true,
  },
  {
    slot: 'hero-atlas-mobile',
    family: 'hero-mobile',
    expectedFile: 'hero-atlas-mobile.png',
    altNames: ['parfums/Aarsika Atlas Luxury Perfume Poster.png', 'hero-atlas-portrait.png'],
    intendedMobile: '1080 × 1350 px',
    intendedDesktop: '—',
    aspect: '4:5',
    targetWidths: [640, 828, 1080],
    isHero: true,
  },
  {
    slot: 'hero-atlas-desktop',
    family: 'hero-desktop',
    expectedFile: 'hero-atlas-desktop.png',
    altNames: ['hero/Aarsika Atlas Perfume by the Sea.png', 'hero-atlas-wide.png'],
    intendedMobile: '—',
    intendedDesktop: '2400 × 1350 px (16:9)',
    aspect: '16:9',
    targetWidths: [1280, 1920, 2400],
    isHero: true,
  },

  // 6 Editorial Slots
  {
    slot: 'gifting-mobile',
    family: 'editorial-mobile',
    expectedFile: 'gifting-mobile.png',
    altNames: [],
    intendedMobile: '1080 × 1350 px',
    intendedDesktop: '—',
    aspect: '4:5',
    targetWidths: [640, 828, 1080],
  },
  {
    slot: 'gifting-desktop',
    family: 'editorial-desktop',
    expectedFile: 'gifting-desktop.png',
    altNames: ['gift sets/Aarsika Royal Attar Gift Set.png'],
    intendedMobile: '—',
    intendedDesktop: '2400 × 1350 px (16:9)',
    aspect: '16:9',
    targetWidths: [1280, 1920, 2400],
  },
  {
    slot: 'discovery-set-mobile',
    family: 'editorial-mobile',
    expectedFile: 'discovery-set-mobile.png',
    altNames: [],
    intendedMobile: '1080 × 810 px (4:3)',
    intendedDesktop: '—',
    aspect: '4:3',
    targetWidths: [640, 828, 1080],
  },
  {
    slot: 'discovery-set-desktop',
    family: 'editorial-desktop',
    expectedFile: 'discovery-set-desktop.png',
    altNames: ['trial packs/Aarsika Ittra Collection Trial Set.png'],
    intendedMobile: '—',
    intendedDesktop: '1920 × 1280 px (3:2)',
    aspect: '3:2',
    targetWidths: [1280, 1920, 2400],
  },
  {
    slot: 'house',
    family: 'house',
    expectedFile: 'house.jpg',
    altNames: ['house.png'],
    intendedMobile: '750 × 1000 px (3:4)',
    intendedDesktop: '1200 × 1600 px (3:4)',
    aspect: '3:4',
    targetWidths: [480, 800, 1200],
  },
  {
    slot: 'og',
    family: 'og',
    expectedFile: 'og.png',
    altNames: ['og.jpg'],
    intendedMobile: '—',
    intendedDesktop: '1200 × 630 px (1.91:1)',
    aspect: '1.91:1',
    targetWidths: [1200],
  },

  // 14 Product Card Slots
  {
    slot: 'sehar-e-gulab-card',
    family: 'product-card',
    expectedFile: 'sehar-e-gulab-card.png',
    altNames: ['Attra images/Aarsika Sehar E Gulab Attar.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
  {
    slot: 'maati-card',
    family: 'product-card',
    expectedFile: 'maati-card.png',
    altNames: ['Attra images/Aarsika Maati Attar in Golden Earth tones.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
  {
    slot: 'saanjh-card',
    family: 'product-card',
    expectedFile: 'saanjh-card.png',
    altNames: ['Attra images/Aarsika Saanjh Attar at Golden Hour.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
  {
    slot: 'shaam-ka-noor-card',
    family: 'product-card',
    expectedFile: 'shaam-ka-noor-card.png',
    altNames: ['Attra images/Aarsika Shaam Ka Noor Attar.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
  {
    slot: 'raat-ki-rani-card',
    family: 'product-card',
    expectedFile: 'raat-ki-rani-card.png',
    altNames: ['Attra images/Moonlit Aarsika Raat Ki Rani Attar.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
  {
    slot: 'resham-oudh-card',
    family: 'product-card',
    expectedFile: 'resham-oudh-card.png',
    altNames: ['Attra images/Resham Oudh_ Golden Heritage Attar.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
  {
    slot: 'mehfil-card',
    family: 'product-card',
    expectedFile: 'mehfil-card.png',
    altNames: ['Attra images/Aarsika Mehfil Attar_ Golden Palace Evenings.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
  {
    slot: 'amour-card',
    family: 'product-card',
    expectedFile: 'amour-card.png',
    altNames: ['parfums/Aarsika Amour Luxury Perfume Ad.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
  {
    slot: 'roman-card',
    family: 'product-card',
    expectedFile: 'roman-card.png',
    altNames: ['parfums/Aarsika Roman Luxury Perfume Advertisement.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
  {
    slot: 'atlas-card',
    family: 'product-card',
    expectedFile: 'atlas-card.png',
    altNames: ['parfums/Aarsika Atlas Luxury Perfume Poster.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
  {
    slot: 'noor-card',
    family: 'product-card',
    expectedFile: 'noor-card.png',
    altNames: ['parfums/Noor_ Light in Every Moment.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
  {
    slot: 'saira-card',
    family: 'product-card',
    expectedFile: 'saira-card.png',
    altNames: ['parfums/Saira Luxury Rose Perfume Advertisement.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
  {
    slot: 'andaaz-e-khaas-card',
    family: 'product-card',
    expectedFile: 'andaaz-e-khaas-card.png',
    altNames: ['parfums/Aarsika Andaaz-E-Khaas Luxury Perfume Ad.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
  {
    slot: 'mehfil-edp-card',
    family: 'product-card',
    expectedFile: 'mehfil-edp-card.png',
    altNames: ['parfums/Aarsika Mehfil_ Unforgettable Nights.png'],
    intendedMobile: '720 × 900 px',
    intendedDesktop: '1080 × 1350 px',
    aspect: '4:5',
    targetWidths: [480, 720, 1080],
  },
];

// Locate original file in source-images
function findOriginalFile(slotDef) {
  const directPath = path.join(SOURCE_DIR, slotDef.expectedFile);
  if (fs.existsSync(directPath)) return directPath;

  for (const alt of slotDef.altNames || []) {
    const altPath = path.join(SOURCE_DIR, alt);
    if (fs.existsSync(altPath)) return altPath;
  }

  // Check subdirectories for expectedFile
  const subdirs = ['hero', 'parfums', 'Attra images', 'gift sets', 'trial packs'];
  for (const sub of subdirs) {
    const candidate = path.join(SOURCE_DIR, sub, slotDef.expectedFile);
    if (fs.existsSync(candidate)) return candidate;
  }

  return null;
}

export async function optimizeAllImages(options = {}) {
  const { quiet = false } = options;
  if (!quiet) {
    console.log('\n============================================================');
    console.log('   AARSIKA — ART-DIRECTED RESPONSIVE PHOTO PIPELINE');
    console.log('============================================================\n');
  }

  const manifestData = {
    generatedAt: new Date().toISOString(),
    totalExpectedSlots: EXPECTED_SLOTS.length,
    slots: {},
  };

  const reportRows = [];
  let totalOptimizedFiles = 0;
  let totalBytesWritten = 0;

  for (const slotDef of EXPECTED_SLOTS) {
    const originalPath = findOriginalFile(slotDef);
    const availability = originalPath ? 'have it' : 'missing';
    let resolutionWarning = 'None';
    let optimizationWarning = 'None';
    let originalDims = null;
    const variants = { avif: [], webp: [] };

    if (!originalPath) {
      if (!quiet) {
        console.log(`[-] [MISSING] Slot "${slotDef.slot}" -> Expected "${slotDef.expectedFile}" not found in source-images/.`);
      }
      reportRows.push({
        slot: slotDef.slot,
        expectedFile: slotDef.expectedFile,
        availability: 'missing',
        originalDimensions: '—',
        intendedMobile: slotDef.intendedMobile,
        intendedDesktop: slotDef.intendedDesktop,
        aspectRatio: slotDef.aspect,
        avifVariants: 'None',
        webpVariants: 'None',
        resolutionWarning: 'Source missing',
        optimizationWarning: 'Skipped (missing)',
      });

      manifestData.slots[slotDef.slot] = {
        slot: slotDef.slot,
        available: false,
        family: slotDef.family,
        expectedFile: slotDef.expectedFile,
        aspectRatio: slotDef.aspect,
        variants: { avif: [], webp: [] },
        fallback: null,
      };
      continue;
    }

    // Inspect metadata
    const image = sharp(originalPath);
    const meta = await image.metadata();
    const origW = meta.width;
    const origH = meta.height;
    originalDims = `${origW} × ${origH} px`;

    // Check resolution warning
    if (slotDef.family === 'hero-mobile' && origW < 1080) {
      resolutionWarning = `LOW RESOLUTION (${origW}px < 1080px)`;
    } else if (slotDef.family === 'hero-desktop' && origW < 1920) {
      resolutionWarning = `LOW RESOLUTION (${origW}px < 1920px)`;
    }

    if (!quiet) {
      console.log(`[+] [HAVE IT] Slot "${slotDef.slot}" -> ${originalDims} (${meta.format})`);
      if (resolutionWarning !== 'None') {
        console.warn(`    ⚠️  ${resolutionWarning}`);
      }
    }

    // Determine target widths without upscaling
    const targetWidths = slotDef.targetWidths.filter((w) => w <= origW);
    if (targetWidths.length === 0) {
      // If original is smaller than smallest target, output at original width
      targetWidths.push(origW);
    }

    const avifList = [];
    const webpList = [];

    for (const width of targetWidths) {
      const calcH = Math.round((origH / origW) * width);
      const baseName = `${slotDef.slot}-${width}w`;

      // 1. AVIF variant
      const avifFileName = `${baseName}.avif`;
      const avifOutPath = path.join(OUTPUT_DIR, avifFileName);
      await image
        .clone()
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: 78, effort: 4 })
        .toFile(avifOutPath);

      const avifStat = fs.statSync(avifOutPath);
      const avifSizeKB = +(avifStat.size / 1024).toFixed(1);
      totalBytesWritten += avifStat.size;
      totalOptimizedFiles++;

      avifList.push(`${width}w (${avifSizeKB} KB)`);
      variants.avif.push({
        width,
        height: calcH,
        path: `/photos/${avifFileName}`,
        sizeKB: avifSizeKB,
      });

      // 2. WebP variant
      const webpFileName = `${baseName}.webp`;
      const webpOutPath = path.join(OUTPUT_DIR, webpFileName);
      await image
        .clone()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(webpOutPath);

      const webpStat = fs.statSync(webpOutPath);
      const webpSizeKB = +(webpStat.size / 1024).toFixed(1);
      totalBytesWritten += webpStat.size;
      totalOptimizedFiles++;

      webpList.push(`${width}w (${webpSizeKB} KB)`);
      variants.webp.push({
        width,
        height: calcH,
        path: `/photos/${webpFileName}`,
        sizeKB: webpSizeKB,
      });

      // Target size checks:
      // Mobile at 828px: under 140 KB
      // Desktop at 1920px: under 260 KB
      // Product card at 720px: under 110 KB
      if (slotDef.family.includes('mobile') && width === 828 && webpSizeKB > 140) {
        optimizationWarning = `Exceeds target size at 828px (${webpSizeKB} KB > 140 KB)`;
      } else if (slotDef.family.includes('desktop') && width === 1920 && webpSizeKB > 260) {
        optimizationWarning = `Exceeds target size at 1920px (${webpSizeKB} KB > 260 KB)`;
      } else if (slotDef.family === 'product-card' && width === 720 && webpSizeKB > 110) {
        optimizationWarning = `Exceeds target size at 720px (${webpSizeKB} KB > 110 KB)`;
      }

      if (!quiet) {
        console.log(`    ↳ ${width}w -> AVIF: ${avifSizeKB} KB | WebP: ${webpSizeKB} KB`);
      }
    }

    const fallbackVariant = variants.webp[variants.webp.length - 1] || variants.avif[variants.avif.length - 1];

    manifestData.slots[slotDef.slot] = {
      slot: slotDef.slot,
      available: true,
      family: slotDef.family,
      originalFile: path.relative(ROOT_DIR, originalPath).replace(/\\/g, '/'),
      originalDimensions: { width: origW, height: origH },
      aspectRatio: slotDef.aspect,
      variants,
      fallback: fallbackVariant ? fallbackVariant.path : null,
      resolutionWarning,
      optimizationWarning,
    };

    reportRows.push({
      slot: slotDef.slot,
      expectedFile: slotDef.expectedFile,
      availability: 'have it',
      originalDimensions: originalDims,
      intendedMobile: slotDef.intendedMobile,
      intendedDesktop: slotDef.intendedDesktop,
      aspectRatio: slotDef.aspect,
      avifVariants: avifList.join(', '),
      webpVariants: webpList.join(', '),
      resolutionWarning,
      optimizationWarning,
    });
  }

  // Write Manifest
  const manifestDir = path.dirname(MANIFEST_PATH);
  if (!fs.existsSync(manifestDir)) fs.mkdirSync(manifestDir, { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifestData, null, 2), 'utf8');

  // Write Docs: PHOTO_SLOTS.md
  const docsContent = generateMarkdownDocs(reportRows, totalOptimizedFiles, totalBytesWritten);
  fs.writeFileSync(DOCS_PATH, docsContent, 'utf8');

  if (!quiet) {
    console.log('\n============================================================');
    console.log(`   PIPELINE COMPLETE: ${totalOptimizedFiles} images generated (${(totalBytesWritten / 1024 / 1024).toFixed(2)} MB total)`);
    console.log(`   Manifest written: ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
    console.log(`   Registry written: ${path.relative(ROOT_DIR, DOCS_PATH)}`);
    console.log('============================================================\n');
  }

  return { totalOptimizedFiles, totalBytesWritten, reportRows, manifestData };
}

function generateMarkdownDocs(rows, totalFiles, totalBytes) {
  let md = `# Aarsika Fine Fragrance — Photo Slot Registry & Manifest (Phase 5.2)\n\n`;
  md += `This registry documents every photography slot across the Aarsika flagship website, detailing expected asset names, real filesystem availability, dimensions, format variants (AVIF & WebP), and quality warnings.\n\n`;
  md += `**Pipeline Summary:**\n`;
  md += `- **Total Defined Slots:** 30\n`;
  md += `- **Available Originals:** ${rows.filter((r) => r.availability === 'have it').length}\n`;
  md += `- **Missing Originals:** ${rows.filter((r) => r.availability === 'missing').length}\n`;
  md += `- **Total Generated Variants:** ${totalFiles} (${(totalBytes / 1024 / 1024).toFixed(2)} MB)\n\n`;
  md += `| Slot | Expected original filename | Availability | Original dimensions | Intended mobile dimensions | Intended desktop dimensions | Aspect ratio | AVIF variants generated | WebP variants generated | Resolution warnings | Optimization warnings |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  for (const r of rows) {
    md += `| \`${r.slot}\` | \`${r.expectedFile}\` | **${r.availability}** | ${r.originalDimensions} | ${r.intendedMobile} | ${r.intendedDesktop} | ${r.aspectRatio} | ${r.avifVariants} | ${r.webpVariants} | ${r.resolutionWarning} | ${r.optimizationWarning} |\n`;
  }

  md += `\n---\n\n`;
  md += `## Fallback Rules\n\n`;
  md += `1. **Mobile Fallback:** If a mobile slot (\`-mobile\`) is missing or unavailable, \`ResponsivePhoto\` seamlessly falls back to the corresponding desktop asset (\`-desktop\`).\n`;
  md += `2. **Placeholder Fallback:** If neither the mobile nor desktop asset is available, \`ResponsivePhoto\` renders the existing \`Photo\` flat placeholder with slot metadata. Never displays broken image icons.\n`;
  md += `3. **Quality & Layout Protection:** Outputs are never cropped or upscaled during optimization. Exact aspect ratios are reserved in the DOM to guarantee zero Cumulative Layout Shift (CLS).\n`;

  return md;
}

// Watch Mode
function watchMode() {
  console.log(`[WATCH] Watching ${SOURCE_DIR} and nested directories for additions/changes...`);
  let debounceTimer = null;
  fs.watch(SOURCE_DIR, { recursive: true }, (eventType, filename) => {
    if (!filename || !/\.(png|jpe?g|webp)$/i.test(filename)) return;
    console.log(`[WATCH] Detected ${eventType} on ${filename}. Debouncing build...`);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      optimizeAllImages().catch(console.error);
    }, 400);
  });
}

// CLI execution
const isWatch = process.argv.includes('--watch') || process.argv.includes('-w');
if (isWatch) {
  optimizeAllImages()
    .then(() => watchMode())
    .catch(console.error);
} else {
  optimizeAllImages().catch((err) => {
    console.error('Pipeline failed:', err);
    process.exit(1);
  });
}
