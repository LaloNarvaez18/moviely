import express from 'express';
import cors from 'cors';

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  return app;
}
