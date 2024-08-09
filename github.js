const puppeteer = require('puppeteer');

const BASE_URL = 'https://github.com/';
const LOGIN_URL = 'https://github.com/login';

let browser = null;
let page = null;

const github = {
    initialize: async () => {
        browser = await puppeteer.launch({
            headless: false
        });
        page = await browser.newPage();
        await page.goto(BASE_URL);
    },
    login: async (username, password) => {
        await page.goto(LOGIN_URL);
        await page.waitForSelector('input[class="form-control input-block js-login-field"]');
        await page.type('input[class="form-control input-block js-login-field"]', username, { delay: 100 });
        await page.type('input[class="form-control form-control input-block js-password-field"]', password, { delay: 100 });
        await page.click('input[class="btn btn-primary btn-block js-sign-in-button"]');
    },
    end: async() => {
        await browser.close();
    }
};

module.exports = github;