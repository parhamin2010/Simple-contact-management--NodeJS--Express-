const {constants} = require('../constants');
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode){
        case constants.VALIDATE_ERROR:
            res.json({title: "validation failed", message: err.message, stackTrace: err.stack})
            break;
        case constants.NOT_FOUND:
            res.json({title: "Not Found", message: err.message, stackTrace: err.stack})
            break;
        case constants.UNAUTHORIZED:
            res.json({title: "UNAUTHORIZED", message: err.message, stackTrace: err.stack})
            break;
        case constants.FORBIDDEN:
            res.json({title: "FORBIDDEN", message: err.message, stackTrace: err.stack})
            break;
        case constants.SERVER_ERROR:
            res.json({title: "SERVER ERROR", message: err.message, stackTrace: err.stack})
            break;
        default:
            console.log("no error")
            break;

    }
};

module.exports = errorHandler;