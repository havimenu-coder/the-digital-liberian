import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('=== THE DIGITAL LIBRARIAN VERIFICATION SUITE ===\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failed++;
  }
}

// 1. Verify build output
const distDir = path.join(rootDir, 'dist');
assert(fs.existsSync(distDir), 'dist directory exists');

const indexHtml = path.join(distDir, 'index.html');
assert(fs.existsSync(indexHtml), 'dist/index.html exists');

const htmlContent = fs.readFileSync(indexHtml, 'utf-8');
assert(htmlContent.includes('The Digital Librarian'), 'dist/index.html includes page title');
assert(htmlContent.includes('Newsreader'), 'dist/index.html includes Newsreader serif font');
assert(htmlContent.includes('Plus+Jakarta+Sans'), 'dist/index.html includes Plus Jakarta Sans font');
assert(htmlContent.includes('/assets/index-'), 'dist/index.html includes bundled JS and CSS');

// 2. Verify assets
const assetsDir = path.join(distDir, 'assets');
assert(fs.existsSync(assetsDir), 'dist/assets directory exists');
const assetFiles = fs.readdirSync(assetsDir);
assert(assetFiles.some(f => f.endsWith('.js')), 'JavaScript bundle generated');
assert(assetFiles.some(f => f.endsWith('.css')), 'CSS bundle generated');

// 3. Verify public media and icons
const favicon = path.join(distDir, 'favicon.svg');
assert(fs.existsSync(favicon), 'favicon.svg exists in build output');

const imagesDir = path.join(distDir, 'images');
assert(fs.existsSync(imagesDir), 'dist/images exists');
assert(fs.existsSync(path.join(imagesDir, 'logo.svg')), 'dist/images/logo.svg exists');
assert(fs.existsSync(path.join(imagesDir, 'lsa-logo.svg')), 'dist/images/lsa-logo.svg exists');
assert(fs.existsSync(path.join(imagesDir, 'team-ramatu.jpg')), 'dist/images/team-ramatu.jpg exists');
assert(fs.existsSync(path.join(imagesDir, 'team-folashade.jpg')), 'dist/images/team-folashade.jpg exists');
assert(fs.existsSync(path.join(imagesDir, 'team-mulugeta.png')), 'dist/images/team-mulugeta.png exists');
assert(fs.existsSync(path.join(imagesDir, 'team-victoria.jpg')), 'dist/images/team-victoria.jpg exists');
assert(fs.existsSync(path.join(imagesDir, 'sylvester-hero.jpg')), 'dist/images/sylvester-hero.jpg exists');
assert(fs.existsSync(path.join(imagesDir, 'sylvester-transparent.png')), 'dist/images/sylvester-transparent.png exists');

// 4. Verify Supabase schema file
const schemaSql = path.join(rootDir, 'supabase', 'schema.sql');
assert(fs.existsSync(schemaSql), 'supabase/schema.sql exists with full table definitions');
const sqlContent = fs.readFileSync(schemaSql, 'utf-8');
assert(sqlContent.includes('site_settings'), 'schema defines site_settings');
assert(sqlContent.includes('services'), 'schema defines services');
assert(sqlContent.includes('ai_tools'), 'schema defines ai_tools');
assert(sqlContent.includes('honorees'), 'schema defines honorees');
assert(sqlContent.includes('form_submissions'), 'schema defines form_submissions');

// 5. Verify Pages exist
const pagesDir = path.join(rootDir, 'src', 'pages');
const pages = [
  'HomePage.tsx',
  'AboutPage.tsx',
  'SylvesterProfilePage.tsx',
  'TeamPage.tsx',
  'SolutionsHubPage.tsx',
  'SolutionDetailPage.tsx',
  'UpskillingLibraryPage.tsx',
  'BlogListPage.tsx',
  'BlogPostPage.tsx',
  'InitiativesHubPage.tsx',
  'LibrarianSpotlightAfricaPage.tsx',
  'UpskillConnectVillagePage.tsx',
  'EventsPage.tsx',
  'EventDetailPage.tsx',
  'ContactPage.tsx',
  'DynamicCustomPage.tsx',
  'NotFoundPage.tsx'
];
pages.forEach(p => {
  assert(fs.existsSync(path.join(pagesDir, p)), `Page src/pages/${p} exists`);
});

// 6. Verify Admin modules exist
const adminDir = path.join(rootDir, 'src', 'admin');
const adminModules = [
  'AdminLayout.tsx',
  'AdminLoginPage.tsx',
  'AdminDashboard.tsx',
  'AdminPages.tsx',
  'AdminNavigation.tsx',
  'AdminHomepage.tsx',
  'AdminServices.tsx',
  'AdminResources.tsx',
  'AdminBlog.tsx',
  'AdminEvents.tsx',
  'AdminInitiatives.tsx',
  'AdminTeam.tsx',
  'AdminTestimonials.tsx',
  'AdminPartners.tsx',
  'AdminMediaLibrary.tsx',
  'AdminSubmissions.tsx',
  'AdminSettings.tsx'
];
adminModules.forEach(m => {
  assert(fs.existsSync(path.join(adminDir, m)), `Admin module src/admin/${m} exists`);
});

console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL TESTS PASSED WITH 100% SUCCESS!\n');
}
