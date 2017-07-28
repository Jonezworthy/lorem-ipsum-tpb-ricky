const MongoClient = require('mongodb').MongoClient;
const https = require('https');
const cheerio = require('cheerio');


MongoClient.connect("mongodb://localhost:27017/tpb", function (err, db) {
    if (err) {
        throw err;
    }
    const options = {
        host: 'en.wikiquote.org',
        port: 443,
        path: '/w/api.php?action=query&titles=Trailer+Park+Boys&format=json&prop=extracts',
        method: 'GET'
    };

    const oQuotes = db.collection('quotes');
    oQuotes.deleteMany({}); //truncate


    https.get(options, (res) => {
        let rawRes = '';
        res.on('data', (chunk) => rawRes += chunk);
        res.on('end', () => {
            let aResponse = JSON.parse(rawRes);
            let wikiPage = aResponse['query']['pages']['11216']['extract'];
            let $ = cheerio.load(wikiPage);
            let position = 0;

            $('dd').each(function () {
                if ($(this).children().html()) {
                    let fullquote = $(this).text();
                    let actor = $(this).children().html().replace(':', '') || "";
                    let quote = fullquote.replace(actor + ':', '').replace(new RegExp('"', 'g'), '').replace(/\(([a-z \!\?]+)\)/gi, '').trim();
                    let dateCreated = new Date();

                    if (quote.length > 30 && actor.indexOf('[') === -1 && actor.indexOf('(') === -1 && quote.indexOf('[') === -1 && quote.indexOf('(') === -1) {
                        console.log(position + ' | ' + actor + ':' + quote);

                        oQuotes.insert({
                            position
                            , actor
                            , quote
                            , dateCreated
                        });

                        position++;
                    }
                }
            });
        });
    });
});


//https://en.wikiquote.org/w/api.php?action=query&titles=Trailer+Park+Boys&format=json&prop=extracts