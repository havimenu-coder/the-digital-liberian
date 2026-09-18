import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedPhoto = 'C:\\Users\\NWALADO\\.gemini\\antigravity\\brain\\7c398fc5-56b1-44cd-aca8-339c0e93aa45\\.user_uploaded\\media_1789653573325.jpg';
const publicDir = path.resolve('public/images');
const distDir = path.resolve('dist/images');

async function createMasterCutout() {
  const { data, info } = await sharp(uploadedPhoto)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  console.log(`Generating master cutout: ${w}x${h}`);

  const rgba = Buffer.alloc(w * h * 4);
  const alphaMap = new Float32Array(w * h);

  function isStudioBackdrop(x, y) {
    const idx = (y * w + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    const diffBR = b - r;
    const diffGR = g - r;

    // Top area above hair
    if (y < 165) return true;

    // ECO MEDIA watermark area on bottom right outside arm
    if (y > 640 && x > 635) return true;
    if (y > 880 && x > 570) return true; // bottom right edge below cuff

    // Studio backdrop: Slate-blue with strong green & blue excess over red
    if (diffBR >= 16 && diffGR >= 8 && b >= 38) return true;
    if (diffBR >= 22 && b >= 35) return true;

    // Outer corners
    if (x < 60 && y < 530) return true;
    if (x > 700) return true;

    return false;
  }

  // 1. Flood-fill from outer boundaries
  const visited = new Uint8Array(w * h);
  const queue = [];

  // Seed top row
  for (let x = 0; x < w; x++) {
    queue.push(x, 0);
    visited[0 * w + x] = 1;
  }
  // Seed left edge down to y=530
  for (let y = 0; y < 530; y++) {
    queue.push(0, y);
    visited[y * w + 0] = 1;
  }
  // Seed right edge all the way down
  for (let y = 0; y < h; y++) {
    queue.push(w - 1, y);
    visited[y * w + (w - 1)] = 1;
  }
  // Seed bottom right edge below sleeve
  for (let x = 560; x < w; x++) {
    queue.push(x, h - 1);
    visited[(h - 1) * w + x] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nIdx = ny * w + nx;
        if (!visited[nIdx]) {
          visited[nIdx] = 1;
          if (isStudioBackdrop(nx, ny)) {
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // Base alpha: ONLY pixels reached by flood-fill are background (0.0)
  // Everything inside Sylvester is 100% solid (1.0)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (visited[idx]) {
        alphaMap[idx] = 0.0;
      } else {
        alphaMap[idx] = 1.0;
      }
    }
  }

  // 2. Smooth edge transitions: 3x3 anti-aliasing feathering along boundary
  const smoothed = new Float32Array(w * h);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;
      if (alphaMap[idx] === 0 && 
          alphaMap[idx-1] === 0 && alphaMap[idx+1] === 0 && 
          alphaMap[idx-w] === 0 && alphaMap[idx+w] === 0) {
        smoothed[idx] = 0;
        continue;
      }
      if (alphaMap[idx] === 1 && 
          alphaMap[idx-1] === 1 && alphaMap[idx+1] === 1 && 
          alphaMap[idx-w] === 1 && alphaMap[idx+w] === 1) {
        smoothed[idx] = 1.0;
        continue;
      }

      let sum = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          sum += alphaMap[(y + dy) * w + (x + dx)];
        }
      }
      smoothed[idx] = sum / 9.0;
    }
  }

  // Dissolve bottom 5% gently so it blends into navy base
  const fadeStart = Math.floor(h * 0.95);
  for (let y = fadeStart; y < h; y++) {
    const factor = 1.0 - (y - fadeStart) / (h - fadeStart);
    for (let x = 0; x < w; x++) {
      smoothed[y * w + x] *= factor;
    }
  }

  // 3. Assemble RGBA
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const srcIdx = idx * 3;
      const dstIdx = idx * 4;

      const a = Math.round(smoothed[idx] * 255);
      rgba[dstIdx] = data[srcIdx];
      rgba[dstIdx + 1] = data[srcIdx + 1];
      rgba[dstIdx + 2] = data[srcIdx + 2];
      rgba[dstIdx + 3] = a;
    }
  }

  const transparentPng = await sharp(rgba, {
    raw: { width: w, height: h, channels: 4 }
  })
    .png({ quality: 98, compressionLevel: 7 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'sylvester-transparent.png'), transparentPng);
  fs.writeFileSync(path.join(distDir, 'sylvester-transparent.png'), transparentPng);
  fs.writeFileSync(path.join(publicDir, 'sylvester-hero.png'), transparentPng);
  fs.writeFileSync(path.join(distDir, 'sylvester-hero.png'), transparentPng);

  console.log(`Saved pristine transparent PNG (${transparentPng.length} bytes)`);

  // 4. Also generate the hero composite
  const svgAura = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="aura" cx="50%" cy="40%" r="52%">
          <stop offset="0%" stop-color="#009DF6" stop-opacity="0.38" />
          <stop offset="55%" stop-color="#00184E" stop-opacity="0.65" />
          <stop offset="100%" stop-color="#00003F" stop-opacity="1.0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="#00003F" />
      <circle cx="${Math.floor(w * 0.5)}" cy="${Math.floor(h * 0.38)}" r="${Math.floor(w * 0.52)}" fill="url(#aura)" />
    </svg>
  `);

  const heroBackground = await sharp(svgAura).png().toBuffer();
  const compositeHero = await sharp(heroBackground)
    .composite([{ input: transparentPng, blend: 'over' }])
    .jpeg({ quality: 95 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'sylvester-hero.jpg'), compositeHero);
  fs.writeFileSync(path.join(distDir, 'sylvester-hero.jpg'), compositeHero);
  console.log(`Saved composite sylvester-hero.jpg (${compositeHero.length} bytes)`);

  console.log('✓ Master cutout complete!');
}

createMasterCutout().catch(console.error);
