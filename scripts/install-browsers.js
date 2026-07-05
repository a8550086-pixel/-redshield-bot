// Skips the (slow) Playwright browser download when we are building on top of
// the official mcr.microsoft.com/playwright Docker image, which already ships
// with Chromium + all OS dependencies preinstalled.
//
// Locally (outside Docker) this will run `npx playwright install --with-deps chromium`
// so `npm install` "just works" on a normal dev machine too.

const { execSync } = require('child_process');

if (process.env.PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD === '1') {
  console.log('[postinstall] PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 -> skipping browser download (using preinstalled Docker browsers).');
  process.exit(0);
}

try {
  console.log('[postinstall] Installing Playwright Chromium + OS deps...');
  execSync('npx playwright install --with-deps chromium', { stdio: 'inherit' });
} catch (err) {
  console.error('[postinstall] Playwright browser install failed. If you are inside a container without root/apt access, set PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 and use the provided Dockerfile instead.');
  console.error(err.message);
  process.exit(1);
}
