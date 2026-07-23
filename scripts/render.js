const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  fs.mkdirSync(path.resolve(__dirname, '../output/previews'), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  const htmlPath = path.resolve(__dirname, '../src/index.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  const slideCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
  console.log(`Found ${slideCount} slides`);

  for (let i = 0; i < slideCount; i++) {
    await page.evaluate((idx) => {
      document.querySelectorAll('.slide')[idx].scrollIntoView({ behavior: 'instant', block: 'start' });
    }, i);
    await page.waitForTimeout(150);

    const num = String(i + 1).padStart(2, '0');
    await page.screenshot({
      path: path.resolve(__dirname, `../output/previews/slide-${num}.png`),
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    console.log(`  Rendered slide ${num}`);
  }

  await browser.close();
  console.log('Done — PNGs in output/previews/');
})();
