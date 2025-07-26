import express, { Application } from 'express';
import authRouter from './auth.router';

const routerApi = (app: Application) => {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/auth', authRouter);
}

export default routerApi;
