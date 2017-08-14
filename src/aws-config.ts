import {Request , Response , NextFunction}  from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
    const env = process.env;
    const stageVariables = getApigatewayEvent(req).stageVariables;

    const config: any = Object.assign({}, env, stageVariables);

    req["aws-config"] = config;

    next();
}

function getApigatewayEvent(req: Request): any {
    let event: any = req.headers["x-apigateway-event"];
    if (!event)
        event = {};

    if (typeof event === "string")
        event = JSON.parse(decodeURIComponent(event));
    return event;
}
