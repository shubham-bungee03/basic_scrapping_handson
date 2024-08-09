const Nightmare = require('nightmare');
const nightmare = Nightmare({
    show: true
});

(async () => {
    await nightmare.goto('https://news.ycombinator.com/news');

    let articles = await nightmare.evaluate(() => {
        let tableRows = document.querySelector('table[class="itemlist"] > tbody > tr');

        let articles = [];
        for (row of tableRows) {
            if (row.getAttribute('class') == 'spacer') continue;

            if (row.getAttribute('class') == 'athing') {
                let title = row.querySelector('td[class="title"] > a').innerText;
                let url = row.querySelector('td[class="title"] > a').getAttribute('href');
                let source = row.querySelector('td[class="title"] > a') ? row.querySelector('td[class="title"] > a').innerText : false;

                articles.push({
                    title,
                    url,
                    source
                });
            }
        }
        return articles;
    });

    console.log(articles);

    debugger;
})();
