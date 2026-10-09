import fs from 'fs';
import path from 'path';

const attarDir = path.resolve('public', 'photos', 'attars');

// Map of slug to ordered 1st, 2nd, 3rd files in public/photos/attars
const attarOrderMap = {
  'sehar-e-gulab': [
    'sehar-e-gulab-clean 1st.jpg',
    'sehar-e-gulab-jaipur-alt 2nd.jpg',
    'sehar-e-gulab-jaipur 3rd.jpg',
  ],
  'maati': [
    'maati-golden-earth 1st.jpg',
    'maati-first-rain 2nd.jpg',
    'maati-heritage 3rd.jpg',
  ],
  'saanjh': [
    'saanjh-courtyard 1st.jpg',
    'saanjh-quiet-evening 2nd.jpg',
    'saanjh-golden-hour 1st.jpg', // fallback 3rd if 3rd not named
  ],
  'shaam-ka-noor': [
    'shaam-ka-noor-main 1st.jpg',
    'shaam-ka-noor-sunset 2nd.jpg',
    'shaam-ka-noor-collection 3rd.jpg',
  ],
  'raat-ki-rani': [
    'raat-ki-rani-heritage 1st.jpg',
    'raat-ki-rani-twilight 2nd.jpg',
    'raat-ki-rani-moonlit 3rd.jpg',
  ],
  'resham-oudh': [
    'resham-oudh-ad 1st.jpg',
    'resham-oudh-palace 2nd.jpg',
    'resham-oudh-collection 3rd.jpg',
  ],
  'mehfil': [
    'mehfil-1st.jpg',
    'mehfil 1st.jpg',
  ],
};

function runSync() {
  for (const [slug, files] of Object.entries(attarOrderMap)) {
    const firstFile = files[0];
    const srcPath = path.join(attarDir, firstFile);
    const destJpg = path.join(attarDir, `${slug}.jpg`);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destJpg);
      console.log(`✓ Copied 1st image (${firstFile}) -> ${slug}.jpg`);
    } else {
      console.warn(`File missing for 1st of ${slug}: ${firstFile}`);
    }
  }
}

runSync();
