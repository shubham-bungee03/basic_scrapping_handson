const amazon = require('./amazon');

(async () => {

    await amazon.initialize();

    let details = await amazon.getProductDetails('https://www.amazon.in/Apple-24-inch-8%E2%80%91core-10%E2%80%91core-Unified/dp/B0CM5J5QXD/ref=sr_1_1_sspa');

    debugger;
})();