# aws-serverless-config

[![Build Status](https://travis-ci.org/DevStarSJ/aws-serverless-config.svg?branch=master)](https://travis-ci.org/DevStarSJ/aws-serverless-config)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/DevStarSJ/aws-serverless-config/blob/master/LICENSE)


## install

```
npm install aws-serverless-config --save
```


Four useful middleware are provided in [aws-serverless-express](https://github.com/awslabs/aws-serverless-express).


## 1. apigateway-event-parser

Event information received from the API Gateway in Request.headers.x-apigateway-event is stored in an encoded state.
This middleware decodes this into a JSON Object.


in app.js
```JavaScript
const apigatewayEventParser = require("aws-serverless-express").apigatewayEventParser;

app.use(apigatewayEventParser);
```

in app.ts
```TypeScript
import {apigatewayEventParser} from "aws-serverless-express";

app.use(apigatewayEventParser);
```

using `apigateway-event-parser`
```JavaScript
const event = req.headers["x-apigateway-event"];
console.info(JSON.stringify(event, null, 2));
```

## 2. aws-config

Make aws-config in aws-serverless-express.

Merge Lambda environment varaiables and API Gateway stagevariables to `Request["aws-config"]`.
If you want to local test, use [dotenv](https://www.npmjs.com/package/dotenv).
If there is same variable between Lambda environment varaiables and API Gateway stagevariables, keep API Gateway's and drop Lambda's.
Using this does not include the value decoded in Request.headers.x-apigateway-event.
If you need to do this, you can declare it as `app.use(apigatewayEventParser, awsConfig)`.


in app.js
```JavaScript
const awsConfig = require("aws-serverless-express").awsConfig;

app.use(awsConfig);
```

in app.ts
```TypeScript
import {awsConfig} from "aws-serverless-express";

app.use(awsConfig);
```

using `aws-config`
```JavaScript
const config = req["aws-config"]
console.info(JSON.stringify(config, null, 2));
```

## 3. print-log

This is a middleware that provides a function to output the log so that CloudWatch can check it if it is declared as one of EVENT, REQUEST and SIMPLE in PRINT_LOG in Lambda Environment Variables or API Gateway StageVariables.

- EVENT : Print apigateway event.
- REQUEST : Print express request.
- SIMPLE : Print body, headers, query, url, params from express request.

To do this you need to run aws-config first.

`app.use(awsConfig, printLog);`

in app.js
```JavaScript
const awsConfig = require("aws-serverless-express").awsConfig;
const printLog = require("aws-serverless-express").printLog;

app.use(awsConfig, printLog);
```

in app.ts
```TypeScript
import {awsConfig, pringLog} from "aws-serverless-express";

app.use(awsConfig, pringLog);
```

## 3. print-error

This will cause CloudWatch to display the resulting Error.
If you do not do anything, CloudWatch will show an error. If you use another ErrorHandler, you may not want to print it. In this case, it is possible to print using this.
`app.use(awsConfig, printLog);`

in app.js
```JavaScript
const printError = require("aws-serverless-express").printError;

function yourErrorHandler(err, req, res, next) { ... };

app.use(printError, yourErrorHandler);
```

in app.ts
```TypeScript
import {Request , Response , NextFunction}  from 'express';
import {printError} from "aws-serverless-express";

function yourErrorHandler(err: any, req: Request, res: Response, next: NextFunction) { ... };

app.use(awsConfig, yourErrorHandler);
```


## Author
[Yun.Seok-Joon](http://DevStarSJ.github.io)

## License
Toggler is available under the MIT license. See the LICENSE file for more info.