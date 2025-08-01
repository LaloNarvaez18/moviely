import { Request, Response, NextFunction } from 'express';
import { IMovieRepository, IMovieService, Movie } from '../types/movies';
import MovieService from '../services/movie.services';
import MoviePrismaRepository from '../repositories/prisma/movie.repository';

const repository: IMovieRepository = new MoviePrismaRepository();
const service: IMovieService = new MovieService(repository);

export const getByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id)
    const movie: Movie | null = await service.findMovieById(id);
    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
}

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies: Movie[] = await service.findMovies();
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
}

export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newMovie: Movie = await service.createMovie({
      ...req.body,
    });
    res.status(201).json(newMovie);
  } catch (err) {
    next(err);
  }
}

export const updateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const movie: Movie | null = await service.updateMovie(id, {
      ...req.body
    });
    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
}

export const deleteMovie = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const movie: Movie = await service.deleteMovie(id);
    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
}
