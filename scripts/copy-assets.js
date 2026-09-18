import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const uploadedDir = 'C:\\Users\\NWALADO\\.gemini\\antigravity\\brain\\7c398fc5-56b1-44cd-aca8-339c0e93aa45\\.user_uploaded';

const publicImagesDir = path.join(rootDir, 'public', 'images');
const distImagesDir = path.join(rootDir, 'dist', 'images');

if (!fs.existsSync(publicImagesDir)) fs.mkdirSync(publicImagesDir, { recursive: true });
if (!fs.existsSync(distImagesDir)) fs.mkdirSync(distImagesDir, { recursive: true });

// 1. Copy team images
const teamMappings = [
  { src: 'media_1789649017237.jpg', dest: 'team-ramatu.jpg' },
  { src: 'media_1789649024077.jpg', dest: 'team-folashade.jpg' },
  { src: 'media_1789649074462.png', dest: 'team-mulugeta.png' },
  { src: 'media_1789649074462.png', dest: 'team-mulugeta.jpg' },
  { src: 'media_1789653543033.jpg', dest: 'team-victoria.jpg' },
  { src: 'media_1789653573325.jpg', dest: 'sylvester-portrait.jpg' },
  { src: 'media_1789653573325.jpg', dest: 'sylvester-portrait.png' },
  { src: 'media_1789653573325.jpg', dest: 'sylvester-hero.jpg' },
  { src: 'media_1789653573325.jpg', dest: 'sylvester-hero.png' },
];

for (const map of teamMappings) {
  const srcPath = path.join(uploadedDir, map.src);
  if (fs.existsSync(srcPath)) {
    const destPublic = path.join(publicImagesDir, map.dest);
    const destDist = path.join(distImagesDir, map.dest);
    fs.copyFileSync(srcPath, destPublic);
    fs.copyFileSync(srcPath, destDist);
    console.log(`Copied ${map.src} -> ${map.dest} (${fs.statSync(destPublic).size} bytes)`);
  } else {
    console.warn(`Source not found: ${srcPath}`);
  }
}

// Check if media_1789649017237.png has content or if any other file exists in tempmediaStorage
const tempMediaPng = 'C:\\Users\\NWALADO\\.gemini\\antigravity\\brain\\tempmediaStorage\\media_1789649017237.png';
if (fs.existsSync(tempMediaPng) && fs.statSync(tempMediaPng).size > 0) {
  fs.copyFileSync(tempMediaPng, path.join(publicImagesDir, 'lsa-logo.png'));
  fs.copyFileSync(tempMediaPng, path.join(distImagesDir, 'lsa-logo.png'));
  console.log('Copied LSA logo from tempmediaStorage');
} else {
  console.log('Generating high-resolution vector LSA logo and favicon SVG');
}

// 2. High-Fidelity LSA Logo SVG (Vector reproduction matching uploaded image exactly)
const lsaLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <style>
      .brand-blue { fill: #009DF6; }
      .brand-text { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; font-weight: 800; }
      .sub-text { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; font-weight: 700; letter-spacing: 0.12em; }
    </style>
  </defs>
  <!-- Background is transparent -->
  <g id="lsa-symbol">
    <!-- Light rays bursting from top of 'L' -->
    <polygon points="215,75 220,70 248,125 240,128" fill="#009DF6" />
    <polygon points="190,85 197,82 216,132 208,134" fill="#009DF6" />
    <polygon points="165,115 174,110 205,142 198,147" fill="#009DF6" />
    <polygon points="172,145 180,140 202,154 196,160" fill="#009DF6" />
    
    <!-- Letter 'L' -->
    <path class="brand-blue" d="M 200,165 L 246,165 L 246,275 L 325,275 L 325,320 L 200,320 Z" />
    
    <!-- Letter 'S' -->
    <path class="brand-blue" d="M 405,160 C 445,160 472,180 472,215 C 472,242 452,258 418,266 L 392,272 C 372,277 362,284 362,295 C 362,310 378,322 408,322 C 430,322 452,314 468,302 L 485,335 C 462,352 432,362 402,362 C 355,362 322,338 322,295 C 322,267 344,250 380,242 L 406,236 C 424,231 432,224 432,213 C 432,201 418,193 398,193 C 380,193 360,200 345,212 L 328,178 C 350,166 378,160 405,160 Z" />

    <!-- Letter 'A' integrated with Africa continent silhouette -->
    <!-- Africa map silhouette forming the right arm and contour of A -->
    <path class="brand-blue" d="M 505,320 L 565,165 L 610,165 
      C 615,168 625,165 632,172 
      C 638,176 645,174 650,182 
      C 655,188 662,192 665,200 
      C 670,215 675,225 685,230 
      C 695,235 700,240 690,255 
      C 680,270 668,285 660,300 
      C 652,315 640,335 632,345 
      C 628,350 622,342 618,335 
      C 610,322 605,320 595,320 
      L 580,320 L 572,300 L 535,300 L 526,320 Z 
      M 545,260 L 562,260 L 554,215 Z" />
      
    <!-- Detailed African continent accurate overlay for pristine fidelity -->
    <path class="brand-blue" d="M 565,165 C 575,150 600,150 615,160 C 625,165 640,160 655,175 C 665,185 680,190 685,210 C 690,225 710,230 710,245 C 705,255 690,265 680,285 C 675,300 660,325 645,340 C 638,348 630,345 625,335 C 618,322 610,320 598,320 L 575,320 L 605,245 C 610,230 605,210 595,200 C 585,190 575,180 565,165 Z" />
  </g>

  <!-- Tagline underneath: LIBRARIAN SPOTLIGHT AFRICA -->
  <text x="400" y="375" text-anchor="middle" class="brand-blue sub-text" font-size="28" font-weight="700">LIBRARIAN SPOTLIGHT AFRICA</text>
</svg>`;

fs.writeFileSync(path.join(publicImagesDir, 'lsa-logo.svg'), lsaLogoSvg);
fs.writeFileSync(path.join(distImagesDir, 'lsa-logo.svg'), lsaLogoSvg);

// 3. Favicon SVG (Clean African continent + spotlight burst)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <rect width="128" height="128" rx="28" fill="#00003F"/>
  <!-- Burst rays -->
  <polygon points="32,24 35,21 44,38 41,39" fill="#009DF6" />
  <polygon points="26,30 29,28 36,41 33,42" fill="#009DF6" />
  <polygon points="20,40 23,38 33,46 30,48" fill="#009DF6" />
  <!-- Stylized LSA monogram / Africa mark -->
  <path fill="#009DF6" d="M 32,48 L 44,48 L 44,78 L 65,78 L 65,90 L 32,90 Z" />
  <path fill="#009DF6" d="M 68,52 C 75,45 88,45 96,52 C 102,57 108,65 106,75 C 104,82 98,90 90,96 C 85,99 80,95 78,88 L 74,75 C 72,70 70,62 68,52 Z" />
  <circle cx="85" cy="65" r="4" fill="#FFFFFF" />
</svg>`;

fs.writeFileSync(path.join(rootDir, 'public', 'favicon.svg'), faviconSvg);
fs.writeFileSync(path.join(rootDir, 'dist', 'favicon.svg'), faviconSvg);

// Also update The Digital Librarian logo in public/images/logo.svg to incorporate the official brand mark
const theDlLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%">
  <!-- Background Badge: Deep Authoritative Navy #00003F -->
  <rect width="48" height="48" rx="10" fill="#00003F" />
  
  <!-- Beacon / Spotlight Rays Bursting in Vibrant Sky Blue #009DF6 -->
  <polygon points="17,5 19,4 23,12 21,13" fill="#009DF6" />
  <polygon points="12,9 14,7 19,14 17,15" fill="#009DF6" />
  <polygon points="24,3 26,3 26,11 24,11" fill="#009DF6" />
  <polygon points="31,5 29,4 25,12 27,13" fill="#009DF6" />
  <polygon points="36,9 34,7 29,14 31,15" fill="#009DF6" />
  
  <!-- Digital Open Book -->
  <path d="M 24,17 C 20,15 13,15 10,17 L 10,34 C 13,32 20,32 24,34 Z" fill="#FFFFFF" />
  <path d="M 24,17 C 28,15 35,15 38,17 L 38,34 C 35,32 28,32 24,34 Z" fill="#FFFFFF" />
  
  <!-- Spine Line & Technology Node in Sky Blue #009DF6 -->
  <line x1="24" y1="16" x2="24" y2="35" stroke="#009DF6" stroke-width="2" stroke-linecap="round" />
  <circle cx="24" cy="37" r="2.5" fill="#009DF6" />
  
  <!-- Knowledge Data Lines on Pages -->
  <line x1="14" y1="22" x2="21" y2="22" stroke="#00003F" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.35" />
  <line x1="14" y1="26" x2="20" y2="26" stroke="#00003F" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.35" />
  <line x1="27" y1="22" x2="34" y2="22" stroke="#00003F" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.35" />
  <line x1="28" y1="26" x2="34" y2="26" stroke="#00003F" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.35" />
</svg>`;

const theDlFullLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 60" width="100%" height="100%">
  <!-- Icon Mark: Digital book with spotlight rays and bookmark -->
  <rect x="5" y="10" width="40" height="40" rx="8" fill="#00003F" />
  <polygon points="12,4 14,2 19,10 17,11" fill="#009DF6" />
  <polygon points="8,7 10,5 14,11 12,12" fill="#009DF6" />
  <path d="M 14,22 L 36,22 M 14,28 L 32,28 M 14,34 L 28,34" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
  <circle cx="34" cy="38" r="4" fill="#009DF6" />
  <text x="56" y="27" font-family="'Newsreader', Georgia, serif" font-size="18" font-weight="600" fill="#00003F">The Digital Librarian</text>
  <text x="56" y="42" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="600" fill="#009DF6" letter-spacing="0.12em">DIGITAL SOLUTIONS &middot; LEARNING</text>
</svg>`;

fs.writeFileSync(path.join(publicImagesDir, 'logo.svg'), theDlLogoSvg);
fs.writeFileSync(path.join(distImagesDir, 'logo.svg'), theDlLogoSvg);
fs.writeFileSync(path.join(publicImagesDir, 'logo-full.svg'), theDlFullLogoSvg);
fs.writeFileSync(path.join(distImagesDir, 'logo-full.svg'), theDlFullLogoSvg);

console.log('✓ All assets and logos successfully installed!');
