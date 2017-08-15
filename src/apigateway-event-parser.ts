import {Request , Response , NextFunction}  from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
    let event: any = req.headers["x-apigateway-event"];
    event = event ? JSON.parse(decodeURIComponent(event)) : {};
    req.headers["x-apigateway-event"] = event;

    next();
}
