module.exports = class controllerRoutes {
    constructor(express, db) {
        const oApiHandler = new (require('../controllers/controllerApi'))(express, db);
        
        express.all('/api/:endpoint/', oApiHandler.dynController);
        express.all('/api/:endpoint/:params', oApiHandler.dynController);
        
        express.get('*', function (req, res) {
            console.log('bad');
            res.status(404).send(JSON.stringify({status: 'error', error: '404 Not found'}));
        });
    }
}