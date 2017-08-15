# aws-serverless-config

[![Build Status](https://travis-ci.org/DevStarSJ/aws-serverless-config.svg?branch=master)](https://travis-ci.org/DevStarSJ/aws-serverless-config)

make aws-config in aws-serverless-express

Merge Lambda environment varaiables and API Gateway stagevariables to Request["aws-config"].

If you want to local test, use [dotenv](https://www.npmjs.com/package/dotenv).

If there is same variable between Lambda environment varaiables and API Gateway stagevariables, save API Gateway's.


## install

```
npm install aws-serverless-config --save
```

## usage

in app.js

```JavaScript
const awsConfig = require("aws-serverless-express");

app.use(awsConfig);
```

in app.ts
```TypeScript
import awsConfig from "aws-serverless-express";

app.use(awsConfig);
```

using `aws-config`
```JavaScript
const config = req["aws-config"]
console.info(JSON.stringify(config,null,2));
```
