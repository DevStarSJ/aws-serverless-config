"use strict";
const assert = require("assert");
const httpMocks = require("express-mocks-http");
const index = require("./index");
const awsConfig = index.awsConfig;
const apigatewayEventParser = index.apigatewayEventParser;
const printLog = index.printLog;
const printError = index.printError;

let request, response;

function prepare(logStyle = null) {
  request  = httpMocks.createRequest();
  response = httpMocks.createResponse();
  process.env = {"A": 1, "B": 2};
  if (logStyle)
    process.env["PRINT_LOG"] = logStyle;
  request.headers = {};
  request.headers["x-apigateway-event"] = JSON.stringify({stageVariables: {C: 3}});
}

describe("aws-serverless-config", function() {
  it('aws-config', function() {
    prepare();
    function next() {
      let result = request["aws-config"].A + request["aws-config"].B + request["aws-config"].C;
      assert.equal(result, 6);
    }
    awsConfig(request, response, next);
  });

  it('apigateway-event-parser', function() {
    prepare();
    function next() {
      assert.equal(request.headers["x-apigateway-event"].stageVariables.C, 3);
    }
    apigatewayEventParser(request, response, next);
  });

  it('print-log : none', function() {
    prepare();
    function next() {
    }
    awsConfig(request, response, next);
    printLog(request, response, next);
  });

  it('print-log : event', function() {
    prepare("EVENT");
    function next() {
    }
    awsConfig(request, response, next);
    printLog(request, response, next);
  });

  it('print-log : request', function() {
    prepare("REQUEST");
    function next() {
    }
    awsConfig(request, response, next);
    printLog(request, response, next);
  });

  it('print-log : simple', function() {
    prepare("SIMPLE");
    function next() {
    }
    awsConfig(request, response, next);
    printLog(request, response, next);
  });

  it('print-error', function() {
    prepare();
    function next() {
    }
    const error = new Error("TEST");
    error.statusCode = 500;
    printError(error, request, response, next);
  });
});
