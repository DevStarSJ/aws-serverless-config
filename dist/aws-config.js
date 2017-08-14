"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(req, res, next) {
    const env = process.env;
    const stageVariables = getApigatewayEvent(req).stageVariables;
    const config = Object.assign({}, env, stageVariables);
    req["aws-config"] = config;
    next();
}
exports.default = default_1;
function getApigatewayEvent(req) {
    let event = req.headers["x-apigateway-event"];
    if (!event)
        event = {};
    if (typeof event === "string")
        event = JSON.parse(decodeURIComponent(event));
    return event;
}
