import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedPhoto = 'C:\\Users\\NWALADO\\.gemini\\antigravity\\brain\\7c398fc5-56b1-44cd-aca8-339c0e93aa45\\.user_uploaded\\media_1789653573325.jpg';

async function run() {
  const metadata = await sharp(uploadedPhoto).metadata();
  console.log('Image dimensions:', metadata.width, 'x', metadata.height);

  const { data, info } = await sharp(uploadedPhoto)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const channels = info.channels;

  // Sample top-left corner
  function getPixel(x, y) {
    const idx = (y * w + x) * channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  }

  console.log('Top-left (10, 10):', getPixel(10, 10));
  console.log('Top-right (w-10, 10):', getPixel(w - 10, 10));
  console.log('Mid-left (10, h/2):', getPixel(10, Math.floor(h / 2)));
  console.log('Mid-right (w-10, h/2):', getPixel(w - 10, Math.floor(h / 2)));
  console.log('Bottom-left (10, h-10):', getPixel(10, h - 10));
  console.log('Bottom-right (w-10, h-10):', getPixel(w - 10, h - 10));

  // Sylvester's suit is black/very dark navy
  // His skin is warm brown
  // His shirt is white
  // His tie is dark red
  // The studio background is slate grey-blue
  console.log('Center face (w/2, h/3):', getPixel(Math.floor(w / 2), Math.floor(h / 3)));
  console.log('Suit shoulder left (w/4, h*0.6):', getPixel(Math.floor(w / 4), Math.floor(h * 0.6)));
}

run().catch(console.error);
