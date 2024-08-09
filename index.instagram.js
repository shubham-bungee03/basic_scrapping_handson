const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/');

    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', 'Shubham', {delay: 100});
    await page.type('input[name="password"]', '12345678');
    await page.click('button[type="submit"]');
    await page.waitForDevicePrompt();

    debugger;
    // await browser.close();

})();