import express from 'express';
import uploadFile from '../middlewares/upload.handler';
import validateRequestSchema from '../middlewares/validation.handler';
import { MovieCreateSchema, MovieIdSchema, MovieUpdateSchema } from '../schemas/movie.schema';
import * as movies from '../controllers/movie.controller';

const movieRouter = express.Router();

movieRouter.get('/', movies.getAll);

movieRouter.get('/:id',
  validateRequestSchema(MovieIdSchema, 'params'),
  movies.getByID
);

movieRouter.post('/',
  uploadFile.single('poster'),
  validateRequestSchema(MovieCreateSchema, 'body'),
  movies.createMovie
);

movieRouter.patch('/:id',
  uploadFile.single('poster'),
  validateRequestSchema(MovieUpdateSchema, 'body'),
  movies.updateMovie
);

movieRouter.delete('/:id',
  validateRequestSchema(MovieIdSchema, 'params'),
  movies.deleteMovie
);

export default movieRouter;
