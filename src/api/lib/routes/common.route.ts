import { Application, Request, Response } from 'express';

export class CommonRoute {

    public route(app: Application) {

        app.get('/', (req: Request, res: Response) => {
            res.send('Get is working');
        });

        app.post('/post', (req: Request, res: Response) => {
            res.send('Post is working');
        });
    }
}