import express, { Application } from 'express';
import authRouter from './auth.router';
import movieRouter from './movies.router';
import userRouter from './users.router';

const routerApi = (app: Application) => {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/auth', authRouter);
  router.use('/movies', movieRouter);
  router.use('/users', userRouter)
}

export default routerApi;
