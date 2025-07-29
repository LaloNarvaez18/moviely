import express, { Application } from 'express';
import authRouter from './auth.router';
import movieRouter from './movies.router';

const routerApi = (app: Application) => {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/auth', authRouter);
  router.use('/movies', movieRouter);
}

export default routerApi;
