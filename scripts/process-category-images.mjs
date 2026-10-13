import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'public/photos/categories';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function processCategories() {
  console.log('Processing category images...');

  // 1. Attars: Aarsika Resham Oudh Crystal Attar Bottle (1122x1402)
  const attarSrc = 'source-images/product card images/attar/Aarsika Resham Oudh Crystal Attar Bottle.png';
  await sharp(attarSrc)
    .resize(800, 1000, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile(path.join(outDir, 'category-attars.webp'));
  await sharp(attarSrc)
    .resize(800, 1000, { fit: 'cover', position: 'center' })
    .avif({ quality: 80 })
    .toFile(path.join(outDir, 'category-attars.avif'));
  console.log('✓ category-attars generated');

  // 2. Eau de Parfums: Clean Amour bottle on sunlit marble (1122x1402)
  const edpSrc = 'source-images/product card images/parfums/Aarsika Amour Perfume Bottle.png';
  await sharp(edpSrc)
    .resize(800, 1000, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile(path.join(outDir, 'category-perfumes.webp'));
  await sharp(edpSrc)
    .resize(800, 1000, { fit: 'cover', position: 'center' })
    .avif({ quality: 80 })
    .toFile(path.join(outDir, 'category-perfumes.avif'));
  console.log('✓ category-perfumes generated');

  // 3. Discovery Set: Trial Set with 7 vials on marble table (1536x1024)
  const discSrc = 'source-images/trial packs/Aarsika Ittra Collection Trial Set.png';
  await sharp(discSrc)
    .extract({ left: 30, top: 40, width: 1100, height: 950 })
    .resize(800, 1000, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile(path.join(outDir, 'category-discovery.webp'));
  await sharp(discSrc)
    .extract({ left: 30, top: 40, width: 1100, height: 950 })
    .resize(800, 1000, { fit: 'cover', position: 'center' })
    .avif({ quality: 80 })
    .toFile(path.join(outDir, 'category-discovery.avif'));
  console.log('✓ category-discovery generated');

  // 4. Gifting: Aarsika Attar Collection Gift Set (1122x1402)
  const giftSrc = 'source-images/product card images/gift set/Aarsika Attar Collection Gift Set.png';
  await sharp(giftSrc)
    .resize(800, 1000, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile(path.join(outDir, 'category-gifting.webp'));
  await sharp(giftSrc)
    .resize(800, 1000, { fit: 'cover', position: 'center' })
    .avif({ quality: 80 })
    .toFile(path.join(outDir, 'category-gifting.avif'));
  console.log('✓ category-gifting generated');
}

processCategories().catch(console.error);
