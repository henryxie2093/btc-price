const https = require('https');

function fetchPrice() {
    https.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json', {
        'content-type': 'application/json'
    }, function (res) {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', function (chunk) { rawData += chunk; });
        res.on('end', function () {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData.bpi.USD.rate_float);
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', function (e) {
        console.error(`出现错误: ${e.message}`);
    });
}

fetchPrice()

setInterval(function () {
    fetchPrice()
}, 60 * 1000 * 2);
