const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  const htmlPath = path.resolve(__dirname, '../src/index.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.emulateMedia({ media: 'print' });

  await page.pdf({
    path: path.resolve(__dirname, '../Ntegra_Product_Engineering_OKRs_Keynote.pdf'),
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  await browser.close();
  console.log('PDF exported: Ntegra_Product_Engineering_OKRs_Keynote.pdf');
})();
