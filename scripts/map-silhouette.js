import sharp from 'sharp';
import fs from 'fs';

const uploadedPhoto = 'C:\\Users\\NWALADO\\.gemini\\antigravity\\brain\\7c398fc5-56b1-44cd-aca8-339c0e93aa45\\.user_uploaded\\media_1789653573325.jpg';

async function mapSilhouette() {
  const { data, info } = await sharp(uploadedPhoto)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;

  // For a given row, determine if pixel (x, y) is background or Sylvester
  // Background has B-R >= 16 or G-R >= 12, or luminance slate-blue
  function isBackground(r, g, b) {
    // Sylvester's suit is pure dark: r < 30, g < 30, b < 35, and NOT bluish: b - r < 12
    // Sylvester's skin: r > g, r > b
    // Background: b - r >= 15 || (g > r + 10 && b > r + 10) || (r > 25 && g > 35 && b > 45 && b - r >= 12)
    const diffBR = b - r;
    const diffGR = g - r;
    if (diffBR >= 14 && diffGR >= 8) return true;
    if (diffBR >= 18) return true;
    if (r >= 25 && g >= 35 && b >= 45 && diffBR >= 12) return true;
    return false;
  }

  for (let y = 150; y < 950; y += 50) {
    let minX = -1;
    let maxX = -1;
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (!isBackground(r, g, b)) {
        if (minX === -1) minX = x;
        maxX = x;
      }
    }
    console.log(`y=${y}: minX=${minX}, maxX=${maxX}, width=${maxX - minX}`);
  }
}

mapSilhouette().catch(console.error);
