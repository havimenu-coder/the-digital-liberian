import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedLogo = 'C:\\Users\\NWALADO\\.gemini\\antigravity\\brain\\7c398fc5-56b1-44cd-aca8-339c0e93aa45\\.user_uploaded\\media_1789657954059.png';

async function checkLogo() {
  const metadata = await sharp(uploadedLogo).metadata();
  console.log('New Logo metadata:', metadata.width, 'x', metadata.height, 'channels:', metadata.channels, 'hasAlpha:', metadata.hasAlpha);

  const { data, info } = await sharp(uploadedLogo)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const channels = info.channels;

  // Check corner pixels
  function getPixel(x, y) {
    const idx = (y * w + x) * channels;
    if (channels === 4) {
      return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
    }
    return [data[idx], data[idx + 1], data[idx + 2]];
  }

  console.log('Top-left corner:', getPixel(5, 5));
  console.log('Center:', getPixel(Math.floor(w / 2), Math.floor(h / 2)));
}

checkLogo().catch(console.error);
