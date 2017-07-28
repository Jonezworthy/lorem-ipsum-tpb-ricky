module.exports = function (express, db) {

    this.dynController = function (req, res) {
        try {
            if ('method' in req) {
                let method = req['method'];
                var controllerPrefix = method.toLowerCase();
            }
            if ('params' in req && 'endpoint' in req['params']) {
                let endpoint = req['params']['endpoint'];
                var controllerLabel = endpoint.toUppercaseFirst();
            }

            var oParams;
            if (typeof req['body'] === 'object' && Object.keys(req['body']).length) { //Using the method: Post
                oParams = req['body'];
                if ('params' in req && req['params']['params']) {
                    oParams['params'] = req['params']['params'];
                }
            } else if (Object.keys(req['query']).length) { //Using the method: Get (with querystring)
                oParams = req['query'];
            } else if ('params' in req['params']) { //Using the method :Get (no querystring)
                oParams = req['params']['params'];
            }

            if (req['params']['subcategory']) { //if a subcategory endpoint - /api/client/xxxxx/quotes
                var subcategory = req['params']['subcategory'].toUppercaseFirst();
            } else {
                var subcategory = '';
            }
            var controllerFilename = 'controller' + controllerLabel + subcategory; //controllerWelcomehome;
            var controllerFunction = controllerPrefix + controllerLabel + subcategory;//getWelcomeHome;
            var controllerSubFolder = controllerFilename.match(/([A-Z]+)/g).length > 1 ? (controllerFilename.match(/([A-Z]+)([a-z]+)/g)[0] + '/').toLowerCase() : ''; //leads/leadsStats
            var modelFilename = controllerSubFolder + 'model' + controllerLabel + subcategory;//modelWelcomehome;

            const path = require('path');

            const fs = require('fs');
            const modelFilePath = path.dirname(__dirname) + '/models/' + modelFilename;

            fs.readFile(modelFilePath + '.js', function (err, file) {
                if (!err) {
                    var dynModel = require(modelFilePath);
                    var oDynModel = new dynModel(db);
                } else {
                    var oDynModel = global.db;
                }

                try {

                    var dynController = require('./' + controllerSubFolder + controllerFilename);
                    var oDynController = new dynController(oDynModel, req, res);

                    if (controllerFunction in oDynController && typeof oDynController[controllerFunction] === 'function') {
                        oDynController[controllerFunction](function (oData) {
                            res.send(JSON.stringify(oData));
                        }, oParams);
                    } else {
                        console.log('No method');
                        res.status(405).send('Method Not Allowed');
                    }
                } catch (e) {
                    console.log(e);
                    console.log('Controller not found');
                    res.status(400).send('Bad Request');
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).send('500 Error');
        }
    };
}