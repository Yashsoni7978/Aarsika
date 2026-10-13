import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function buildScenes() {
  const outDir = 'public/photos/categories';
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const W = 800;
  const H = 1200;

  console.log('Generating seamless full-canvas continuous photographic scenes with museum negative space...');

  // -------------------------------------------------------------
  // 1. ATTARS (Resham Oudh crystal bottle in sunlit courtyard)
  // -------------------------------------------------------------
  const attarSrc = 'source-images/product card images/attar/Aarsika Resham Oudh Crystal Attar Bottle.png';
  
  // Extract warm sunlit stone / archway background from top-left (rich limestone texture)
  const stoneBg = await sharp(attarSrc)
    .extract({ left: 30, top: 20, width: 600, height: 450 })
    .resize(W, H, { fit: 'cover', position: 'top' })
    .blur(1.5)
    .png()
    .toBuffer();

  // Bottle on chiseled stone plinth: scale down so cap is comfortably below text area (~y=540)
  // Original is 1024x1024. We want bottle height ~680px positioned at bottom.
  const bottleSized = await sharp(attarSrc)
    .resize(W, 720, { fit: 'cover', position: 'bottom' })
    .png()
    .toBuffer();

  const bottleFeather = Buffer.from(`
    <svg width="${W}" height="720">
      <defs>
        <linearGradient id="attarFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="black" stop-opacity="0" />
          <stop offset="25%" stop-color="white" stop-opacity="1" />
          <stop offset="100%" stop-color="white" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="${W}" height="720" fill="url(#attarFade)" />
    </svg>
  `);

  const bottleMasked = await sharp(bottleSized)
    .composite([{ input: bottleFeather, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(stoneBg)
    .composite([{ input: bottleMasked, top: 480, left: 0 }])
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'scene-attars.webp'));

  await sharp(stoneBg)
    .composite([{ input: bottleMasked, top: 480, left: 0 }])
    .avif({ quality: 85 })
    .toFile(path.join(outDir, 'scene-attars.avif'));
  console.log('✓ scene-attars generated (cap at y=540, 480px negative space)');

  // -------------------------------------------------------------
  // 2. EAU DE PARFUMS (Amour bottle on marble with burgundy velvet)
  // -------------------------------------------------------------
  const edpSrc = 'source-images/parfums/Aarsika Amour Luxury Perfume Ad.png';
  
  // Extract deep burgundy backdrop
  const burgundySvg = Buffer.from(`
    <svg width="${W}" height="${H}">
      <defs>
        <radialGradient id="burgundyGlow" cx="25%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#3D0812" />
          <stop offset="50%" stop-color="#240309" />
          <stop offset="100%" stop-color="#150104" />
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#burgundyGlow)" />
    </svg>
  `);
  const burgundyBase = await sharp(burgundySvg).png().toBuffer();

  // Resize Amour bottle & roses to height 680px, composite at bottom
  const amourSized = await sharp(edpSrc)
    .resize(W, 700, { fit: 'cover', position: 'bottom' })
    .png()
    .toBuffer();

  const amourFeather = Buffer.from(`
    <svg width="${W}" height="700">
      <defs>
        <linearGradient id="amourFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="black" stop-opacity="0" />
          <stop offset="26%" stop-color="white" stop-opacity="1" />
          <stop offset="100%" stop-color="white" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="${W}" height="700" fill="url(#amourFade)" />
    </svg>
  `);

  const amourMasked = await sharp(amourSized)
    .composite([{ input: amourFeather, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(burgundyBase)
    .composite([{ input: amourMasked, top: 500, left: 0 }])
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'scene-perfumes.webp'));

  await sharp(burgundyBase)
    .composite([{ input: amourMasked, top: 500, left: 0 }])
    .avif({ quality: 85 })
    .toFile(path.join(outDir, 'scene-perfumes.avif'));
  console.log('✓ scene-perfumes generated (cap at y=560, 500px negative space)');

  // -------------------------------------------------------------
  // 3. DISCOVERY SET (7-vial chest in tall sunlit cathedral arch)
  // -------------------------------------------------------------
  const discSrc = 'source-images/trial packs/Aarsika Ittra Collection Trial Set.png';
  const discH = 1300; // Extra height for taller cathedral arch

  // Extract warm archway architectural background from very top
  const discTopArch = await sharp(discSrc)
    .extract({ left: 100, top: 0, width: 1200, height: 260 })
    .resize(W, discH, { fit: 'cover', position: 'top' })
    .blur(1.2)
    .png()
    .toBuffer();

  // The open 7-vial box: scale so the top lid begins at y=580, leaving 580px for the cathedral arch crest & typography!
  const discBox = await sharp(discSrc)
    .extract({ left: 20, top: 50, width: 1150, height: 950 })
    .resize(W, 720, { fit: 'cover', position: 'bottom' })
    .png()
    .toBuffer();

  const discFeather = Buffer.from(`
    <svg width="${W}" height="720">
      <defs>
        <linearGradient id="discFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="black" stop-opacity="0" />
          <stop offset="25%" stop-color="white" stop-opacity="1" />
          <stop offset="100%" stop-color="white" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="${W}" height="720" fill="url(#discFade)" />
    </svg>
  `);

  const discMasked = await sharp(discBox)
    .composite([{ input: discFeather, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(discTopArch)
    .composite([{ input: discMasked, top: 580, left: 0 }])
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'scene-discovery.webp'));

  await sharp(discTopArch)
    .composite([{ input: discMasked, top: 580, left: 0 }])
    .avif({ quality: 85 })
    .toFile(path.join(outDir, 'scene-discovery.avif'));
  console.log('✓ scene-discovery generated (lid at y=580, 580px negative space)');

  // -------------------------------------------------------------
  // 4. GIFTING (Aarsika Royal Gift Set chest in burgundy velvet)
  // -------------------------------------------------------------
  const giftSrc = 'source-images/gifting-desktop.png';

  // Deep burgundy velvet backdrop with warm right-side accent
  const giftSvg = Buffer.from(`
    <svg width="${W}" height="${H}">
      <defs>
        <radialGradient id="giftingGlow" cx="65%" cy="25%" r="75%">
          <stop offset="0%" stop-color="#420A14" />
          <stop offset="45%" stop-color="#26040A" />
          <stop offset="100%" stop-color="#140104" />
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#giftingGlow)" />
    </svg>
  `);
  const giftBase = await sharp(giftSvg).png().toBuffer();

  // Extract gift chest, scale to height 700px, composite at bottom
  const giftSized = await sharp(giftSrc)
    .extract({ left: 0, top: 80, width: 1312, height: 1100 })
    .resize(W, 700, { fit: 'cover', position: 'bottom' })
    .png()
    .toBuffer();

  const giftFeather = Buffer.from(`
    <svg width="${W}" height="700">
      <defs>
        <linearGradient id="giftFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="black" stop-opacity="0" />
          <stop offset="26%" stop-color="white" stop-opacity="1" />
          <stop offset="100%" stop-color="white" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="${W}" height="700" fill="url(#giftFade)" />
    </svg>
  `);

  const giftMasked = await sharp(giftSized)
    .composite([{ input: giftFeather, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(giftBase)
    .composite([{ input: giftMasked, top: 500, left: 0 }])
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'scene-gifting.webp'));

  await sharp(giftBase)
    .composite([{ input: giftMasked, top: 500, left: 0 }])
    .avif({ quality: 85 })
    .toFile(path.join(outDir, 'scene-gifting.avif'));
  console.log('✓ scene-gifting generated (chest at y=500, 500px negative space)');
}

buildScenes().catch(console.error);
