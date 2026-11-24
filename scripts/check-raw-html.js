// Fails if dangerouslySetInnerHTML is used anywhere except the SafeHtml component.
// Run via `npm test`. See src/lib/sanitizeHtml.ts for the security rules.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(rootDir, 'src');
const allowed = new Set([path.join(srcDir, 'components', 'common', 'SafeHtml.tsx')]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(tsx?|jsx?)$/.test(entry.name) && !/\.test\.(tsx?|jsx?)$/.test(entry.name) ? [full] : [];
  });
}

const violations = [];
for (const file of walk(srcDir)) {
  if (allowed.has(file)) continue;
  fs.readFileSync(file, 'utf8').split(/\r?\n/).forEach((line, i) => {
    // Ignore comments that merely mention the prop.
    if (/dangerouslySetInnerHTML\s*=/.test(line)) {
      violations.push(`${path.relative(rootDir, file)}:${i + 1}`);
    }
  });
}

if (violations.length) {
  console.error('Raw HTML rendering is only allowed through <SafeHtml>. Found dangerouslySetInnerHTML in:');
  violations.forEach(v => console.error(`  ${v}`));
  process.exit(1);
}
console.log('check-raw-html: OK (dangerouslySetInnerHTML only used in SafeHtml)');
