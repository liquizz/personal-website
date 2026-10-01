// Renders the app to static HTML and injects it into dist/index.html, so crawlers
// that don't execute JavaScript still get the page content. Runs after the client
// build and the SSR build of src/entry-server.tsx (see "build" in package.json).
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const indexPath = `${root}dist/index.html`;
const ssrDir = `${root}dist-ssr`;

const { render } = await import(`${ssrDir}/entry-server.js`);

const template = await readFile(indexPath, 'utf-8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`Placeholder ${placeholder} not found in dist/index.html`);
}

const appHtml = render();
const html = template.replace(placeholder, `<div id="root">${appHtml}</div>`);
await writeFile(indexPath, html);
await rm(ssrDir, { recursive: true, force: true });

console.log(`Prerendered dist/index.html (${(appHtml.length / 1024).toFixed(1)} KB of markup)`);

// The CSP (set in Cloudflare, not in this repo) allows inline scripts by hash only.
// If this changes, update script-src there or the theme script will be blocked.
for (const [, body] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
  const hash = createHash('sha256').update(body).digest('base64');
  console.log(`Inline script CSP hash: 'sha256-${hash}'`);
}

// lastmod is the date content last changed in git, not the build date, so it only
// moves when the page does. Needs full history (fetch-depth: 0 in CI).
const contentPaths = ['index.html', 'src', 'public/assets'];
let lastmod = '';
try {
  lastmod = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...contentPaths], { cwd: root })
    .toString()
    .trim();
} catch {
  console.warn('git unavailable: writing sitemap without lastmod');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://liquiz.dev/</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
  </url>
</urlset>
`;
await writeFile(`${root}dist/sitemap.xml`, sitemap);
console.log(`Wrote dist/sitemap.xml (lastmod ${lastmod || 'omitted'})`);
