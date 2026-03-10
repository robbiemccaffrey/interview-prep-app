import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

// All routes to prerender
const staticRoutes = [
  '/',
  '/learn',
  '/practice',
  '/real-world',
  '/big-o',
  '/debug',
  '/gotchas',
];

const learnTopics = [
  'big-o-notation', 'hash-tables', 'arrays-strings', 'linked-lists',
  'stacks-queues', 'trees-bst', 'graphs', 'recursion-dp',
  'sorting-searching', 'bit-manipulation', 'interview-patterns',
];

const practiceProblems = [
  'palindrome-permutation', 'string-compression', 'remove-dups', 'stack-min',
  'triple-step', 'one-away', 'rotate-matrix', 'partition-list', 'sum-lists',
  'sort-stack', 'bfs-path', 'balanced-bst', 'magic-index', 'coin-change',
  'topological-sort', 'loop-detection', 'list-of-depths', 'validate-bst',
  'first-common-ancestor', 'permutations', 'event-log-analyzer',
  'rate-limiter', 'agent-workflow',
];

const debugExercises = [
  ...['a', 'b', 'c', 'd', 'e'].map((x) => `dispatch-${x}`),
  ...['a', 'b', 'c', 'd'].map((x) => `support-agent-${x}`),
  ...Array.from({ length: 12 }, (_, i) => `course-catalog-${i + 1}`),
  ...Array.from({ length: 12 }, (_, i) => `expense-tracker-${i + 1}`),
  ...Array.from({ length: 12 }, (_, i) => `react-fitness-${i + 1}`),
  ...Array.from({ length: 12 }, (_, i) => `issue-triage-${i + 1}`),
  ...Array.from({ length: 12 }, (_, i) => `music-streamer-${i + 1}`),
];

const gotchaTopics = ['python', 'typescript', 'react'];

const allRoutes = [
  ...staticRoutes,
  ...learnTopics.map((id) => `/learn/${id}`),
  ...practiceProblems.map((id) => `/practice/${id}`),
  ...debugExercises.map((id) => `/debug/${id}`),
  ...gotchaTopics.map((id) => `/gotchas/${id}`),
];

// Simple static file server for the dist directory
function startServer(port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.woff2': 'font/woff2',
  };

  const server = createServer((req, res) => {
    let filePath = join(DIST_DIR, req.url === '/' ? '/index.html' : req.url);

    // SPA fallback: serve index.html for routes that don't match a file
    if (!existsSync(filePath)) {
      filePath = join(DIST_DIR, 'index.html');
    } else if (existsSync(filePath) && !filePath.includes('.')) {
      // Directory - try index.html inside it
      const indexPath = join(filePath, 'index.html');
      if (existsSync(indexPath)) {
        filePath = indexPath;
      } else {
        filePath = join(DIST_DIR, 'index.html');
      }
    }

    const ext = '.' + filePath.split('.').pop();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    try {
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch {
      // Final fallback to index.html for SPA routing
      const content = readFileSync(join(DIST_DIR, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function prerender() {
  const PORT = 4173;
  const server = await startServer(PORT);
  console.log(`Static server running on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const total = allRoutes.length;
  let completed = 0;

  // Process routes in batches to avoid overwhelming the system
  const BATCH_SIZE = 5;
  for (let i = 0; i < allRoutes.length; i += BATCH_SIZE) {
    const batch = allRoutes.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (route) => {
      const page = await browser.newPage();
      try {
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: 'networkidle0',
          timeout: 15000,
        });

        // Wait for React to render content into #root
        await page.waitForSelector('#root > *', { timeout: 10000 });

        // Wait for react-helmet-async to inject route-specific canonical URL
        const expectedCanonical = `https://codinginterviewguide.com${route === '/' ? '/' : route}`;
        await page.waitForFunction(
          (expected) => {
            const link = document.querySelector('link[rel="canonical"][data-rh="true"]');
            return link && link.getAttribute('href') === expected;
          },
          { timeout: 5000 },
          expectedCanonical
        ).catch(() => {});

        // Extra wait for all helmet mutations to flush
        await new Promise((r) => setTimeout(r, 100));

        const html = await page.content();

        // Write the prerendered HTML
        const outputPath = route === '/'
          ? join(DIST_DIR, 'index.html')
          : join(DIST_DIR, route, 'index.html');

        const outputDir = dirname(outputPath);
        if (!existsSync(outputDir)) {
          mkdirSync(outputDir, { recursive: true });
        }

        writeFileSync(outputPath, html);
        completed++;
        process.stdout.write(`\r  Prerendered ${completed}/${total} routes`);
      } catch (err) {
        completed++;
        console.error(`\n  Failed to prerender ${route}: ${err.message}`);
      } finally {
        await page.close();
      }
    }));
  }

  console.log('\n  All routes prerendered!');
  await browser.close();
  server.close();
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
