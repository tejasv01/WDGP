(async () => {
  let chromium;

  try {
    ({ chromium } = await import('playwright'));
  } catch (error) {
    console.error(
      "Missing dependency: 'playwright'. Add it to frontend/package.json devDependencies and install dependencies before running this script."
    );
    throw error;
  }
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', exception => console.error('PAGE ERROR:', exception));
  
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(2000);
  await browser.close();
})();
