import sharp from 'sharp';

const uploadedPhoto = 'C:\\Users\\NWALADO\\.gemini\\antigravity\\brain\\7c398fc5-56b1-44cd-aca8-339c0e93aa45\\.user_uploaded\\media_1789653573325.jpg';

async function testFlood() {
  const { data, info } = await sharp(uploadedPhoto)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  // Let's trace from (0, 300) horizontally to (250, 300)
  for (let x = 0; x < 260; x += 20) {
    const idx = (300 * w + x) * 3;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    console.log(`(x=${x}, y=300): [${r}, ${g}, ${b}] B-R=${b-r} G-R=${g-r}`);
  }

  // And trace from (200, 300) down to (200, 500)
  for (let y = 300; y <= 500; y += 20) {
    const idx = (y * w + 200) * 3;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    console.log(`(x=200, y=${y}): [${r}, ${g}, ${b}] B-R=${b-r} G-R=${g-r}`);
  }
}

testFlood().catch(console.error);
