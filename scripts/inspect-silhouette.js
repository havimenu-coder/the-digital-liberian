import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedPhoto = 'C:\\Users\\NWALADO\\.gemini\\antigravity\\brain\\7c398fc5-56b1-44cd-aca8-339c0e93aa45\\.user_uploaded\\media_1789653573325.jpg';

async function testExtraction() {
  const { data, info } = await sharp(uploadedPhoto)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;

  // Let's inspect rows from top to bottom to find where Sylvester's head starts
  // Sylvester's hair is dark (low R, G, B) and warm/neutral, unlike the background which is slate-blue
  console.log('Image dimensions:', w, 'x', h);

  // Check center column at different y
  for (let y = 50; y < 350; y += 25) {
    const idx = (y * w + Math.floor(w / 2)) * 3;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    console.log(`y=${y}, center pixel: [${r}, ${g}, ${b}], B-R=${b - r}`);
  }
}

testExtraction().catch(console.error);
