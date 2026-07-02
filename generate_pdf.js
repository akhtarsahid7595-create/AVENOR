const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const htmlPath = 'file://' + path.resolve('power_paving_receipt.html');
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: 'power_paving_receipt.pdf',
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });
    await browser.close();
    console.log('PDF generated successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
})();
