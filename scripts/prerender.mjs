// Renders the app to static HTML and injects it into dist/index.html, so crawlers
// that don't execute JavaScript still get the page content. Runs after the client
// build and the SSR build of src/entry-server.tsx (see "build" in package.json).
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
await writeFile(indexPath, template.replace(placeholder, `<div id="root">${appHtml}</div>`));
await rm(ssrDir, { recursive: true, force: true });

console.log(`Prerendered dist/index.html (${(appHtml.length / 1024).toFixed(1)} KB of markup)`);
