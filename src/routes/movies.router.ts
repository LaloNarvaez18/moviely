import express from 'express';
import uploadRequestFile from '../middlewares/upload.handler';
import validateRequestSchema from '../middlewares/validation.handler';
import {
  MovieCreateSchema,
  MovieIdSchema,
  MovieUpdateSchema
} from '../schemas/movie.schema';
import {
  getAllMovies,
  getUniqueMovie,
  createMovie,
  updateMovie,
  deleteMovie
} from '../controllers/movie.controller';

const movieRouter = express.Router();

movieRouter.get('/', getAllMovies);

movieRouter.get('/:id',
  validateRequestSchema(MovieIdSchema, 'params'),
  getUniqueMovie
);

movieRouter.post('/',
  uploadRequestFile.single('poster'),
  validateRequestSchema(MovieCreateSchema, 'body'),
  createMovie
);

movieRouter.patch('/:id',
  uploadRequestFile.single('poster'),
  validateRequestSchema(MovieUpdateSchema, 'body'),
  updateMovie
)

movieRouter.delete('/:id',
  validateRequestSchema(MovieIdSchema, 'params'),
  deleteMovie
)

export default movieRouter;
