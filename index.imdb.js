const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const request = require('request');

const URLS = [
    { 
        url: 'https://www.imdb.com/title/tt0111161/?ref_=nv_sr_1',
        id: 'the_shawshank_redemption'
    },
    { 
        url: 'https://www.imdb.com/title/tt0102926/?ref_=nv_sr_1',
        id: 'the_silence_of_the_lamps'
    }
];

(async () => {
    let movies = [];

    for (let movie of URLS) {
        const response = await requestPromise({
            uri: movie.url,
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-encoding": "gzip, deflate, br, zstd",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "max-age=0",
                "upgrade-insecure-requests": "1",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
            },
            gzip: true
        });
    
        let $ = cheerio.load(response);
    
        let title = $('span[class="hero__primary-text"]').text();
        let rating = $('span[class="sc-eb51e184-1 ljxVSS"]').first().text();
        let poster = $('div[class="ipc-media ipc-media--poster-27x40 ipc-image-media-ratio--poster-27x40 ipc-media--baseAlt ipc-media--poster-l ipc-poster__poster-image ipc-media__img"] > img').attr('src');
        let totalRating = $('div[class="sc-eb51e184-3 kgbSIj"]').first().text();
        let popularity = $('#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c41b9732-0.llaHBP > section > div:nth-child(5) > section > section > div.sc-491663c0-4.ILcwq > div.sc-491663c0-6.bvzCJs > div.sc-491663c0-11.hFWIYv > div.sc-3a4309f8-0.jJkxPn.sc-1f50b7c-5.dSyyea > div > div:nth-child(3) > a > span > div > div.sc-f958c278-0.cjTDKo').text().trim();

        movies.push({
            title,
            rating,
            poster,
            totalRating
        });

        let file = fs.createWriteStream(`${movie.id}.jpg`);

        await new Promise((resolve, reject) => {
            let stream = request({
                uri: poster ? poster : "sq",
                headers: {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-encoding": "gzip, deflate, br, zstd",
                    "accept-language": "en-US,en;q=0.9",
                    "cache-control": "max-age=0",
                    "upgrade-insecure-requests": "1",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
                },
                gzip: true
            })
            .pipe(file)
            .on('finish', () => {
                console.log(`${movie.id} has finished downloading the image.`);
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            })
        })
        .catch(error => {
            console.log(`${movie.id} has an error on download: ${error}`);
        });
    }
    
    // const fields = ['title', 'rating'];

    // const json2csvParser = new Json2csvParser();
    // const csv = json2csvParser.parse(movies);

    // fs.writeFileSync('./data.csv', csv, 'utf-8');
    // console.log(csv);

})();