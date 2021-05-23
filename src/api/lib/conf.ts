import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as bearerToken from 'express-bearer-token';
import { Request, Response } from 'express';
import {MongoConnection } from './mongo';
import env from './env';
import crypto from './crypto';


class App {
    public app: express.Application;
    private mongoConnection: MongoConnection = new MongoConnection();


    constructor() {
        this.app = express();
        this.configuration();
        this.mongoConnection.connect();
        crypto.encrypt('Vishwajith Weerasinghe');
    }

    private configuration(): void {
        this.app.use(express.json({ limit: '2mb' }));
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(bearerToken());

        this.app.use((req: Request, res: Response, next: any) => {

            const allowedOrigins = [
                `http://localhost:${env.PORT}`,
                'http://localhost:4200'
            ];

            const origin = req.header.host;

            if (allowedOrigins.indexOf(origin) > -1) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            } else {
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            }

            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
            res.setHeader('Access-Control-Allow-Credentials', 'true');

            if (req.url.substr(0, 4) == '/api') {
                req.url = req.url.substr(4);
            }




            next();
        });
    }

}

export default new App().app;

