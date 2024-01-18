import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer';

async function pdfMaker(receiptHTML) {
  const browser = await chromium.puppeteer.launch({
    args: [
      ...chromium.args,
      "--no-sandbox",
      "--disable-extensions",
    ],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
  });

  const page = await browser.newPage();

  await page.setContent(receiptHTML);

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  return pdfBuffer;
}

export default pdfMaker;
