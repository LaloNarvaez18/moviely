import express from 'express';
import validateRequestSchema from '../middlewares/validation.handler';
import { TheaterCreateSchema, TheaterIdSchema, TheaterUpdateSchema } from '../schemas/theater.schema';
import * as theaters from '../controllers/theater.controller';

const theaterRouter = express.Router();

theaterRouter.get('/', theaters.getAll);

theaterRouter.get('/:id',
  validateRequestSchema(TheaterIdSchema, 'params'),
  theaters.getByID
);

theaterRouter.post('/',
  validateRequestSchema(TheaterCreateSchema, 'body'),
  theaters.createTheater
);

theaterRouter.patch('/:id',
  validateRequestSchema(TheaterUpdateSchema, 'body'),
  theaters.updateTheater
);

theaterRouter.delete('/:id',
  validateRequestSchema(TheaterIdSchema, 'params'),
  theaters.deleteTheater
);

export default theaterRouter;
