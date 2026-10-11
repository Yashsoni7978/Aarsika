import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const HERO_SRC_DIR = path.resolve('source-images/hero');
const TRIAL_SRC_DIR = path.resolve('source-images/trial packs');
const HERO_OUT_DIR = path.resolve('public/photos/hero');
const TRIAL_OUT_DIR = path.resolve('public/photos/trial-packs');

if (!fs.existsSync(HERO_OUT_DIR)) {
  fs.mkdirSync(HERO_OUT_DIR, { recursive: true });
}
if (!fs.existsSync(TRIAL_OUT_DIR)) {
  fs.mkdirSync(TRIAL_OUT_DIR, { recursive: true });
}

async function run() {
  console.log('Inspecting source-images/hero:');
  const heroFiles = fs.readdirSync(HERO_SRC_DIR).filter(f => !f.startsWith('.'));
  
  for (const f of heroFiles) {
    const filePath = path.join(HERO_SRC_DIR, f);
    try {
      const meta = await sharp(filePath).metadata();
      console.log(`- ${f}: ${meta.width}x${meta.height} (${meta.format})`);
      
      // Let's create an optimized webp version for high performance and fast load
      const baseName = f.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const outWebp = path.join(HERO_OUT_DIR, `${baseName}.webp`);
      const outJpg = path.join(HERO_OUT_DIR, `${baseName}.jpg`);
      
      // Save full-res webp (quality 85) and standard jpg
      await sharp(filePath).webp({ quality: 86 }).toFile(outWebp);
      await sharp(filePath).jpeg({ quality: 86 }).toFile(outJpg);
      console.log(`  -> Saved ${baseName}.webp & ${baseName}.jpg`);
    } catch (err) {
      console.error(`Error processing ${f}:`, err);
    }
  }

  console.log('\nInspecting trial packs:');
  if (fs.existsSync(TRIAL_SRC_DIR)) {
    const trialFiles = fs.readdirSync(TRIAL_SRC_DIR).filter(f => !f.startsWith('.'));
    for (const f of trialFiles) {
      const filePath = path.join(TRIAL_SRC_DIR, f);
      const meta = await sharp(filePath).metadata();
      console.log(`- ${f}: ${meta.width}x${meta.height} (${meta.format})`);
      const baseName = f.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const outWebp = path.join(TRIAL_OUT_DIR, `${baseName}.webp`);
      const outJpg = path.join(TRIAL_OUT_DIR, `${baseName}.jpg`);
      await sharp(filePath).webp({ quality: 86 }).toFile(outWebp);
      await sharp(filePath).jpeg({ quality: 86 }).toFile(outJpg);
      console.log(`  -> Saved ${baseName}.webp & ${baseName}.jpg`);
    }
  }
}

run();
