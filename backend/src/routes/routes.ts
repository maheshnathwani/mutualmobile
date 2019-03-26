import {NextFunction, Request, Response} from 'express';

/*
* Constructor
*
* @class BaseClass
* */

export class BaseRoute{
    protected title: String;

    constructor() {
        this.title = "Gallery Backend";
    }

    public render(req: Request, res: Response, view: String, options?: Object){

        // add constants
        res.locals.BASE_URL = '/';

        res.send(this.title);

    }

}
