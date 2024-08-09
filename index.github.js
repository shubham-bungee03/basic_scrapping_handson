const puppeteer = require('puppeteer');
const github = require('./github');

(async () => {
    
    const USERNAME = 'your_email';
    const PASSWORD = 'your_password';

    await github.initialize();
    await github.login(USERNAME, PASSWORD);

    // await page.setRequestInterception(true);

    // page.on('request', (request) => {
    //     if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
    //         request.abort();
    //     } else {
    //         request.continue();
    //     }
    // });

    // await page.authenticate({ username: 'user', password: '1234' });
    // await page.goto('https://httpbin.org/basic-auth/user/1234');
    // await page.waitForDevicePrompt();
    
    debugger;
    // await browser.close();

})();