import {Request , Response , NextFunction}  from 'express';

const PRINT_REQUEST: string = "request";
const PRINT_EVENT: string = "event";
const PRINT_SIMPLE: string = "simple";

export function printLog(req: Request, res: Response, next: NextFunction) {
    printLogIfNeed(req);
    next();
}

export function printError(err: any, req: Request, res: Response, next: NextFunction) {
    console.info(err);
    next();
}

function printLogIfNeed(req: Request) {
    let logStyle = req["aws-config"] ? req["aws-config"]["PRINT_LOG"] : undefined;
    if (logStyle && typeof logStyle === "string")
        logStyle = logStyle.toLowerCase();

    const log: any = logStyle === PRINT_EVENT ? req.headers["x-apigateway-event"] :
        logStyle === PRINT_SIMPLE ? {
                headers: req.headers,
                body: req.body,
                query: req.query,
                url: req.url,
                params: req.params,
                "aws-config": req["aws-config"]
            } :
            logStyle === PRINT_REQUEST ? req : undefined;

    if (log)
        console.error(log);
}

