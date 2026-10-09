import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = path.resolve('source-images', 'Attra images');
const outputDir = path.resolve('public', 'photos', 'attars');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Primary mapping for product mainImage (slug -> source filename)
const mainImageMap = {
  'sehar-e-gulab': 'Aarsika Sehar E Gulab Attar.png',
  'maati': 'Aarsika Maati Attar Heritage Collection.png',
  'saanjh': 'Aarsika Saanjh Attar Courtyard Collection.png',
  'shaam-ka-noor': 'Aarsika Shaam Ka Noor Attar.png',
  'raat-ki-rani': 'Moonlit Aarsika Raat Ki Rani Attar.png',
  'resham-oudh': 'Aarsika Resham Oudh Attar Collection.png',
  'mehfil': 'Aarsika Mehfil Attar_ Golden Palace Evenings.png',
};

// All 21 files mapping to slug or clean name for gallery/alternate use
const allFilesMap = [
  { slug: 'sehar-e-gulab', name: 'sehar-e-gulab-clean', file: 'Aarsika Sehar E Gulab Attar.png' },
  { slug: 'sehar-e-gulab', name: 'sehar-e-gulab-jaipur', file: 'Sehar E Gulab_ Jaipur in a Drop.png' },
  { slug: 'sehar-e-gulab', name: 'sehar-e-gulab-jaipur-alt', file: 'Sehar-e-Gulab_ Jaipur in a Drop.png' },

  { slug: 'maati', name: 'maati-heritage', file: 'Aarsika Maati Attar Heritage Collection.png' },
  { slug: 'maati', name: 'maati-golden-earth', file: 'Aarsika Maati Attar in Golden Earth tones.png' },
  { slug: 'maati', name: 'maati-first-rain', file: 'Maati_ First Rain in a Bottle.png' },

  { slug: 'saanjh', name: 'saanjh-courtyard', file: 'Aarsika Saanjh Attar Courtyard Collection.png' },
  { slug: 'saanjh', name: 'saanjh-golden-hour', file: 'Aarsika Saanjh Attar at Golden Hour.png' },
  { slug: 'saanjh', name: 'saanjh-quiet-evening', file: 'Saanjh_ A Quiet Evening Ritual.png' },

  { slug: 'shaam-ka-noor', name: 'shaam-ka-noor-main', file: 'Aarsika Shaam Ka Noor Attar.png' },
  { slug: 'shaam-ka-noor', name: 'shaam-ka-noor-collection', file: 'Shaam Ka Noor Attar Collection.png' },
  { slug: 'shaam-ka-noor', name: 'shaam-ka-noor-sunset', file: 'Shaam Ka Noor_ Jaipur Sunset Attar.png' },

  { slug: 'raat-ki-rani', name: 'raat-ki-rani-moonlit', file: 'Moonlit Aarsika Raat Ki Rani Attar.png' },
  { slug: 'raat-ki-rani', name: 'raat-ki-rani-heritage', file: 'Raat Ki Rani Attar Heritage Advertisement.png' },
  { slug: 'raat-ki-rani', name: 'raat-ki-rani-twilight', file: 'Raat Ki Rani Attar at Twilight.png' },

  { slug: 'resham-oudh', name: 'resham-oudh-collection', file: 'Aarsika Resham Oudh Attar Collection.png' },
  { slug: 'resham-oudh', name: 'resham-oudh-ad', file: 'Aarsika Resham Oudh Attar Advertisement.png' },
  { slug: 'resham-oudh', name: 'resham-oudh-sunset', file: 'Aarsika Resham Oudh Attar Sunset Advertisement.png' },
  { slug: 'resham-oudh', name: 'resham-oudh-palace', file: 'Resham Oudh_ A Palace of Fragrance.png' },
  { slug: 'resham-oudh', name: 'resham-oudh-heritage', file: 'Resham Oudh_ Golden Heritage Attar.png' },

  { slug: 'mehfil', name: 'mehfil-palace', file: 'Aarsika Mehfil Attar_ Golden Palace Evenings.png' },
];

async function processImages() {
  console.log('Processing attar images from:', sourceDir);

  // 1. Process main product images (slug.jpg and slug.webp)
  for (const [slug, fileName] of Object.entries(mainImageMap)) {
    const srcPath = path.join(sourceDir, fileName);
    if (!fs.existsSync(srcPath)) {
      console.warn(`Source file missing: ${fileName}`);
      continue;
    }

    const outJpg = path.join(outputDir, `${slug}.jpg`);
    const outWebp = path.join(outputDir, `${slug}.webp`);

    await sharp(srcPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 88, progressive: true })
      .toFile(outJpg);

    await sharp(srcPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 88 })
      .toFile(outWebp);

    console.log(`✓ Processed main image for ${slug} -> ${outJpg}`);
  }

  // 2. Process all 21 detailed gallery files
  for (const item of allFilesMap) {
    const srcPath = path.join(sourceDir, item.file);
    if (!fs.existsSync(srcPath)) continue;

    const outJpg = path.join(outputDir, `${item.name}.jpg`);

    await sharp(srcPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toFile(outJpg);

    console.log(`✓ Gallery image created: ${item.name}.jpg`);
  }

  console.log('Finished processing attar images successfully!');
}

processImages().catch(err => {
  console.error('Error processing attar images:', err);
  process.exit(1);
});
