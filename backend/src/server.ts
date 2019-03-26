import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as errorHandler from 'errorhandler';
import * as methodOverride from 'method-override';
import * as path from 'path';
import * as express from 'express';
import { IndexRoute } from './routes/index';
import * as cors from 'cors';
import 'dotenv/config'
import * as mongoose from 'mongoose';
/*
* The Server class
* */

export class Server {
    public app: express.Application;


    // create a static function to init the server

    public static bootstrap(): Server{
        return new Server();
    }

    constructor(){
        this.app = express();
        this.config();
        this.routes();
        this.connectToDB();
    }

    // server config
    public config(){

        // configure logs
        // noinspection TypeScriptValidateTypes
        this.app.use(logger("dev"));

        // configure body as form parser
        this.app.use(bodyParser.json());

        // add cors middleware to all the requests
        this.app.use(cors());

        // body parser for query string
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // configure cookie parser
        this.app.use(cookieParser("MAHESH_Something"));

        //use override middlware
        this.app.use(methodOverride());

        // error handling
        this.app.use(errorHandler());


    }

    public routes(){
        let router: express.Router;
        router = express.Router();

        IndexRoute.create(router);

        this.app.use(router);

    }


    public connectToDB(){
        const MONGO_PATH = process.env.MONGO_PATH;
        mongoose.connect(`${MONGO_PATH}`).then((connected) => {
            console.log("connected to mongo");
        }).catch((err) => {
            console.error(err);
        });


    }
}
