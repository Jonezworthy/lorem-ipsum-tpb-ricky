class controllerMiddleware {
    /* this constructor gets ran when the server starts up - only put things in init if you need it to run for EVERY request */
    constructor(db, oConfig) {
        require('../utils/staticUtilsArray');
        require('../utils/staticUtilsString');
        require('../utils/staticUtilsObject');
    }
    init(req, res, next) {
        next();
    }
}

module.exports = controllerMiddleware;