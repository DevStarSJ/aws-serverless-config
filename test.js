"use strict";
const assert = require("assert");
const httpMocks = require("express-mocks-http");
const awsConfig = require("./index");

let request, response;

function prepare() {
  request  = httpMocks.createRequest();
  response = httpMocks.createResponse();
  process.env = {"A": 1, "B": 2};
  request.headers = {};
  request.headers["x-apigateway-event"] = JSON.stringify({stageVariables: {C: 3}});
}

describe("aws-serverless-config", function() {
  it('Working Test', function() {
    prepare();
    function next() {
      let result = request["aws-config"].A + request["aws-config"].B + request["aws-config"].C;
      assert.equal(result, 6);
    }
    awsConfig(request, response, next);
  });
});