import { Request, Response, NextFunction, Router} from 'express';
import { BaseRoute } from './routes';
import AuthController from '../auth/auth.controller';

export class IndexRoute{

    public static create(router: Router){

        console.log("[IndexRoute::Create] Creating index route");
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().index(req, res, next);
        });

        // Defining routes for various modules
        let userRoutes: AuthController = new AuthController();
        router.use("/user", userRoutes.getRoutes());

    }


    public index(req: Request, res: Response, next: NextFunction){
        res.send({
            hostname: req.hostname,
            path: req.path
        })
    }

}
