import sharp from 'sharp';
import fs from 'fs';

const uploadedPhoto = 'C:\\Users\\NWALADO\\.gemini\\antigravity\\brain\\7c398fc5-56b1-44cd-aca8-339c0e93aa45\\.user_uploaded\\media_1789653573325.jpg';

async function checkPoints() {
  const { data, info } = await sharp(uploadedPhoto)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  // Let's check right edge of Sylvester's arm from y=480 to 900
  for (let y = 480; y <= 900; y += 40) {
    let armX = -1;
    // scan from right (x=763) towards left until we hit suit/watch
    for (let x = w - 1; x >= 0; x--) {
      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // suit or watch or cuff:
      // watch cuff white: r > 160, g > 160, b > 160
      // suit: r < 35, g < 35, b < 40 and b - r < 10
      const isForeground = (r < 35 && g < 35 && b < 42 && b - r < 12) || 
                           (r > 120 && g > 110 && b > 100 && Math.abs(r-g) < 25) || // white cuff / watch
                           (r > g && r > b && r > 60); // skin
      if (isForeground) {
        armX = x;
        break;
      }
    }
    console.log(`y=${y}: outer foreground x=${armX}`);
  }
}

checkPoints().catch(console.error);
