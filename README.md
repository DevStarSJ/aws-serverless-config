# aws-serverless-config

make aws-config in aws-serverless-express


## install

```
npm install aws-serverless-config --save
```

## usage

in app.js

```JavaScript
const awsServerlessConfig = require("aws-serverless-express");

app.use(awsServerlessExpress);
```

in app.ts
```TypeScript
import awsServerlessConfig from "aws-serverless-express";

app.use(awsServerlessExpress);
```

using `aws-config`
```JavaScript
const config = req["aws-config"]
console.info(JSON.stringify(config,null,2));
```


* If you want to local test, use [dotenv](https://www.npmjs.com/package/dotenv).
* If there is same variable between Lambda environment varaiables and API Gateway stagevariables, save API Gateway's.
