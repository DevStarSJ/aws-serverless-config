const awsConfig = require("./dist/aws-config");
const apigatewayEventParser = require("./dist/apigateway-event-parser");
const printLog = require("./dist/print-log");

exports.awsConfig = awsConfig.default;
exports.apigatewayEventParser = apigatewayEventParser.default;
exports.printLog = printLog.printLog;
exports.printError = printLog.printError;