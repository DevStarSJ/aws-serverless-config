"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(req, res, next) {
    let event = req.headers["x-apigateway-event"];
    event = event ? JSON.parse(decodeURIComponent(event)) : {};
    req.headers["x-apigateway-event"] = event;
    next();
}
exports.default = default_1;
