import sharp from 'sharp';

const uploadedPhoto = 'C:\\Users\\NWALADO\\.gemini\\antigravity\\brain\\7c398fc5-56b1-44cd-aca8-339c0e93aa45\\.user_uploaded\\media_1789653573325.jpg';

async function checkPockets() {
  const { data, info } = await sharp(uploadedPhoto)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width;

  // Pocket 1: left of neck (x=180, y=460)
  const p1 = (460 * w + 180) * 3;
  console.log('Left pocket (180, 460):', [data[p1], data[p1+1], data[p1+2]], 'diffBR:', data[p1+2] - data[p1]);

  // Pocket 2: right of neck (x=530, y=460)
  const p2 = (460 * w + 530) * 3;
  console.log('Right pocket (530, 460):', [data[p2], data[p2+1], data[p2+2]], 'diffBR:', data[p2+2] - data[p2]);

  // Top of head (x=410, y=140)
  const p3 = (140 * w + 410) * 3;
  console.log('Top backdrop (410, 140):', [data[p3], data[p3+1], data[p3+2]], 'diffBR:', data[p3+2] - data[p3]);

  // Sylvester's hair (x=410, y=200)
  const p4 = (200 * w + 410) * 3;
  console.log('Hair (410, 200):', [data[p4], data[p4+1], data[p4+2]], 'diffBR:', data[p4+2] - data[p4]);

  // Sylvester's suit shoulder (x=120, y=600)
  const p5 = (600 * w + 120) * 3;
  console.log('Suit shoulder (120, 600):', [data[p5], data[p5+1], data[p5+2]], 'diffBR:', data[p5+2] - data[p5]);
}

checkPockets().catch(console.error);
