module.exports = class modelQuote {
    constructor(db) {
        this.db = db;
        this.oQuotes = db.collection('quotes');
    }
    selectQuotes(actor) {
        return new Promise((fulfill, reject) => {

            if (!actor) {
                reject({status: 'warning', warning: 'There should be an actor'});
            }
            try {
                this.oQuotes.find({actor}).toArray((err, aQuotes) => {
                    fulfill(aQuotes);
                });
            } catch (e) {
                reject({status: 'error', error: 'Fatal error in DB call', trace: e});
            }

        });
    }
};