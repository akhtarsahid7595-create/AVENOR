const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 }
  });

  console.log('Taking screenshot of B Collins Plumbing...');
  await page.goto('https://bcollinsplumbing.com/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'assets/portfolio/bcollins.png' });

  console.log('Taking screenshot of Secret Society...');
  await page.goto('https://the-secret-society.netlify.app/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'assets/portfolio/secret_society.png' });

  console.log('Taking screenshot of Raivan...');
  await page.goto('https://raivan.netlify.app/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'assets/portfolio/raivan.png' });

  await browser.close();
  console.log('Done!');
})();
