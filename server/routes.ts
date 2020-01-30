import express from 'express';

export const routes = express.Router();

routes.get('/', (req: any, res: any) => res.send({ hello: 'world' }));
routes.get('/users', (req: any, res: any) => res.send(['Steph', 'Untel']));
routes.post('/users', (req: any, res: any) => res.send({ body: req.body }));
