import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedLogo = 'C:\\Users\\NWALADO\\.gemini\\antigravity\\brain\\7c398fc5-56b1-44cd-aca8-339c0e93aa45\\.user_uploaded\\media_1789657954059.png';
const publicImagesDir = path.resolve('public/images');
const distImagesDir = path.resolve('dist/images');

async function processLogo() {
  console.log('Reading uploaded logo...');
  const metadata = await sharp(uploadedLogo).metadata();
  console.log(`Dimensions: ${metadata.width}x${metadata.height}, channels: ${metadata.channels}`);

  const { data, info } = await sharp(uploadedLogo)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const channels = info.channels;

  // Let's check corner pixel to see if background is white or transparent
  const cornerR = data[0];
  const cornerG = data[1];
  const cornerB = data[2];
  const cornerA = channels === 4 ? data[3] : 255;
  console.log(`Corner pixel: R=${cornerR}, G=${cornerG}, B=${cornerB}, A=${cornerA}`);

  // Create transparent RGBA buffer
  const rgba = Buffer.alloc(w * h * 4);
  const darkRgba = Buffer.alloc(w * h * 4); // For dark backgrounds (white/bright mark)

  // Bounding box calculation for trim
  let minX = w, minY = h, maxX = 0, maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const srcIdx = (y * w + x) * channels;
      const dstIdx = (y * w + x) * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];
      const srcA = channels === 4 ? data[srcIdx + 3] : 255;

      // If pixel is near white (R,G,B > 240) or alpha == 0, make it transparent
      const isWhiteBg = (r > 245 && g > 245 && b > 245) || srcA < 20;

      if (isWhiteBg) {
        rgba[dstIdx] = 0;
        rgba[dstIdx + 1] = 0;
        rgba[dstIdx + 2] = 0;
        rgba[dstIdx + 3] = 0;

        darkRgba[dstIdx] = 0;
        darkRgba[dstIdx + 1] = 0;
        darkRgba[dstIdx + 2] = 0;
        darkRgba[dstIdx + 3] = 0;
      } else {
        // Logo pixel (Vibrant blue)
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;

        rgba[dstIdx] = r;
        rgba[dstIdx + 1] = g;
        rgba[dstIdx + 2] = b;
        rgba[dstIdx + 3] = srcA;

        // In dark version, the blue looks radiant! We can also keep original blue or boost vibrance
        darkRgba[dstIdx] = r;
        darkRgba[dstIdx + 1] = g;
        darkRgba[dstIdx + 2] = b;
        darkRgba[dstIdx + 3] = srcA;
      }
    }
  }

  console.log(`Logo bounds: (${minX}, ${minY}) to (${maxX}, ${maxY}), size: ${maxX - minX + 1}x${maxY - minY + 1}`);

  // 1. Save full transparent image
  const fullTransparent = await sharp(rgba, {
    raw: { width: w, height: h, channels: 4 }
  }).png().toBuffer();

  // 2. Save trimmed transparent image (cropped tightly to content with small 5% padding)
  const pad = Math.round((maxX - minX) * 0.05);
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(w - cropX, (maxX - minX) + pad * 2);
  const cropH = Math.min(h - cropY, (maxY - minY) + pad * 2);

  const trimmed = await sharp(rgba, {
    raw: { width: w, height: h, channels: 4 }
  })
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png()
    .toBuffer();

  // Write trimmed logo to public and dist
  fs.writeFileSync(path.join(publicImagesDir, 'logo.png'), trimmed);
  fs.writeFileSync(path.join(distImagesDir, 'logo.png'), trimmed);
  fs.writeFileSync(path.join(publicImagesDir, 'lsa-logo.png'), trimmed);
  fs.writeFileSync(path.join(distImagesDir, 'lsa-logo.png'), trimmed);

  // 3. Also create a square badge version for favicons and square icon slots
  // Place the trimmed logo centered in a square canvas
  const squareSize = Math.max(cropW, cropH);
  const squareLogo = await sharp(trimmed)
    .resize({
      width: squareSize,
      height: squareSize,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicImagesDir, 'logo-square.png'), squareLogo);
  fs.writeFileSync(path.join(distImagesDir, 'logo-square.png'), squareLogo);

  // 4. Create high-res favicon (128x128 and 64x64)
  const favicon128 = await sharp(squareLogo)
    .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync(path.resolve('public/favicon.png'), favicon128);
  fs.writeFileSync(path.resolve('dist/favicon.png'), favicon128);

  // Also create a modern dark-rounded favicon (like Apple touch icon / modern browser tab)
  const faviconWithBg = await sharp({
    create: {
      width: 128,
      height: 128,
      channels: 4,
      background: { r: 0, g: 0, b: 63, alpha: 1 } // #00003F
    }
  })
    .composite([{
      input: await sharp(trimmed).resize(100, 100, { fit: 'contain' }).toBuffer(),
      blend: 'over'
    }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.resolve('public/favicon-badge.png'), faviconWithBg);
  fs.writeFileSync(path.resolve('dist/favicon-badge.png'), faviconWithBg);

  console.log('✓ Successfully processed and deployed new logo to public and dist!');
  process.exit(0);
}

processLogo().catch(err => {
  console.error(err);
  process.exit(1);
});
