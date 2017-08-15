"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PRINT_REQUEST = "request";
const PRINT_EVENT = "event";
const PRINT_SIMPLE = "simple";
function printLog(req, res, next) {
    printLogIfNeed(req);
    next();
}
exports.printLog = printLog;
function printError(err, req, res, next) {
    console.info(err);
    next();
}
exports.printError = printError;
function printLogIfNeed(req) {
    let logStyle = req["aws-config"] ? req["aws-config"]["PRINT_LOG"] : undefined;
    if (logStyle && typeof logStyle === "string")
        logStyle = logStyle.toLowerCase();
    const log = logStyle === PRINT_EVENT ? req.headers["x-apigateway-event"] :
        logStyle === PRINT_SIMPLE ? {
            headers: req.headers,
            body: req.body,
            query: req.query,
            url: req.url,
            params: req.params
        } :
            logStyle === PRINT_REQUEST ? req : undefined;
    if (log)
        console.error(log);
}
