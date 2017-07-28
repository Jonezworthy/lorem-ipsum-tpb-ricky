var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var routes = require("./routes/routes");
var bodyParser = require("body-parser");

MongoClient.connect("mongodb://localhost:27017/tpb", function (err, db) {
    if (err) {
        throw err;
    }
    app.use(bodyParser.json());
    app.use(new (require('./controllers/controllerMiddleware'))().init); //Middleware loader
    new routes(app, db);

    app.listen(4201);
    console.log('Listening on ' + 4201);
});