import express from 'express';
import cors from 'cors';
import routerApi from './routes/index';
import { handleZodError, handleError } from './middlewares/error.handler';

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  routerApi(app);

  app.use(handleZodError);
  app.use(handleError);

  return app;
}
