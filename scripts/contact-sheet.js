const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const previewDir = path.resolve(__dirname, '../output/previews');
  const files = fs.readdirSync(previewDir)
    .filter(f => f.endsWith('.png'))
    .sort()
    .map(f => path.resolve(previewDir, f));

  if (!files.length) {
    console.error('No preview PNGs found. Run `npm run render` first.');
    process.exit(1);
  }

  const COLS = 5;
  const THUMB_W = 384;
  const THUMB_H = 216;
  const GAP = 16;
  const ROWS = Math.ceil(files.length / COLS);
  const CANVAS_W = COLS * THUMB_W + (COLS + 1) * GAP;
  const CANVAS_H = ROWS * THUMB_H + (ROWS + 1) * GAP + 60;

  // Embed each PNG as a base64 data URI so Playwright can render them cross-origin
  const imgTags = files.map((f, i) => {
    const b64 = fs.readFileSync(f).toString('base64');
    const uri = `data:image/png;base64,${b64}`;
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = GAP + col * (THUMB_W + GAP);
    const y = 60 + GAP + row * (THUMB_H + GAP);
    return `
      <div style="position:absolute;left:${x}px;top:${y}px;width:${THUMB_W}px">
        <img src="${uri}" width="${THUMB_W}" height="${THUMB_H}"
             style="display:block;border-radius:6px;border:1px solid #1E293B"/>
        <div style="font-size:11px;color:#64748B;text-align:center;margin-top:4px;font-family:sans-serif">
          ${String(i + 1).padStart(2, '0')}
        </div>
      </div>`;
  }).join('');

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: CANVAS_W, height: CANVAS_H });

  await page.setContent(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"/>
<style>
  body { margin:0; background:#0F172A; width:${CANVAS_W}px; height:${CANVAS_H}px; position:relative; }
  h1 { position:absolute; top:16px; left:${GAP}px; font-size:18px; font-weight:700;
       color:#F8FAFC; font-family:sans-serif; letter-spacing:1px; margin:0; }
</style>
</head><body>
<h1>Product Engineering OKRs — Contact Sheet</h1>
${imgTags}
</body></html>`, { waitUntil: 'networkidle' });

  await page.waitForTimeout(300);

  await page.screenshot({
    path: path.resolve(__dirname, '../output/contact-sheet.png'),
    clip: { x: 0, y: 0, width: CANVAS_W, height: CANVAS_H }
  });

  await browser.close();
  console.log('Contact sheet saved: output/contact-sheet.png');
})();
