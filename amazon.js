const puppeteer = require('puppeteer');

const BASE_URL = 'https://amazon.in/';

let browser = null;
let page = null;

const github = {
    initialize: async () => {
        console.log("Starting the scrapper..")

        browser = await puppeteer.launch({
            headless: false
        });
        page = await browser.newPage();
        await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

        console.log("Initialization completed..")
    },
    getProductDetails: async (link) => {
        console.log(`Going to the product page..( ${link} )`);

        await page.goto(link, { waitUntil: 'networkidle2' });

        let details = await page.evaluate(() => {
            let title = document.querySelector('#productTitle').innerText;
            let currentPrice = document.querySelector('.a-price-whole').innerText;
            let rating = document.querySelector('a[class="a-popover-trigger a-declarative"] > span[class="a-size-base a-color-base"]').innerText.trim();
            let totalRating = document.querySelector('#acrCustomerReviewText').innerText;

            return {
                title,
                currentPrice,
                rating,
                totalRating
            };
        });

        return details;
    },
    end: async() => {
        console.log("Stopping the scrapper..")

        await browser.close();
    }
};

module.exports = github;