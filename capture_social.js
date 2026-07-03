const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1080 },
    deviceScaleFactor: 2 // High res
  });
  
  const fileUrl = 'file:///' + path.resolve(__dirname, 'social_post.html').replace(/\\/g, '/');
  console.log('Navigating to', fileUrl);
  await page.goto(fileUrl);
  
  const targetPath = 'C:\\Users\\sahid\\.gemini\\antigravity\\brain\\b5264c55-9e19-43ea-beb6-7ced815c8e99\\social_post.png';
  await page.screenshot({ path: targetPath });
  console.log('Saved screenshot to', targetPath);
  
  await browser.close();
})();
