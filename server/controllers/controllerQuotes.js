module.exports = class controllerQuote {
    constructor(oModel) {
        this.oModel = oModel;
    }
    getQuotes(callback, req) {
        const shuffle = require('shuffle-array');
        let {actor, paragraphs, linesPerParagraph} = req;
        let ipsum = '';
        let aIpsum = [];
        this.oModel.selectQuotes(actor).then((aQuotes) => {
            shuffle(aQuotes);
            paragraphs = parseInt(paragraphs) <= 40 ? parseInt(paragraphs) : 40;
            linesPerParagraph = parseInt(linesPerParagraph) <= 10 ? parseInt(linesPerParagraph) : 10;

            let paragraphsDone = 0;
            let quotesDone = 0;
            for (let i = 0; i < aQuotes.length; i++) {
                let thisQuote = aQuotes[i]['quote'];

                ipsum += ' ' + thisQuote;
                if (linesPerParagraph === (quotesDone + 1)) {
                    aIpsum.push(ipsum);
                    ipsum = '';
                    paragraphsDone++;
                    quotesDone = 0;
                }

                quotesDone++;
                
                if (paragraphs === paragraphsDone) {
                    return void callback({aIpsum});
                }
            }
            callback(ipsum);
        });
    }
};