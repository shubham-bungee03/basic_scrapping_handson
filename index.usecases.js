const puppeteer = require('puppeteer');

(async () => {
    /* 1. Creating a PDF from the website */
    // const browser = await puppeteer.launch({
    //     headless: true
    // });
    // const page = await browser.newPage();
    // await page.goto('https://example.com/');
    // await page.pdf({
    //     path: './page.pdf',
    //     format: 'A4'
    // });
    // console.log("PDF generated successfully");
    // await browser.close();


    /* 2. Getting the URL and title of the current page */
    // const browser = await puppeteer.launch({
    //     headless: false
    // });
    
    // const page = await browser.newPage();
    // await page.goto('https://learnscraping.com/');
    
    // let title = await page.title();
    // console.log(`Title of the page: ${title}`);

    // let url = await page.url();
    // console.log(`URL of the page: ${url}`);
    // await browser.close();


    /* 2. Emulate a phone */
    const browser = await puppeteer.launch({ 
        headless: false
    });
    const page = await browser.newPage();
    await page.emulate(puppeteer.KnownDevices['iPhone 6']);
    await page.goto('https://example.com/');
    await page.waitForDevicePrompt();
    browser.close();


    // const browser = await puppeteer.launch({
    //     headless: false
    // });
    // const page = await browser.newPage();
    // await page.goto('https://google.com/');
    // await page.waitForSelector('textarea[class="gLFyf"]');
    // await page.type('textarea[class="gLFyf"]', 'Paris Olympics 2024', { delay: 100 });
    // await page.keyboard.press('Enter');
    // await page.waitForNavigation();

    // await page.screenshot({path: 'example.png'});

    // await browser.close();
})();