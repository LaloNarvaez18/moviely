import { Request, Response, NextFunction } from 'express';
import { IMovieService, Movie } from '../types/movies';
import MovieService from '../services/movie.services';

const service: IMovieService = new MovieService();

export const getUniqueMovie = async (
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

export const getAllMovies = async (
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
    const { body, file } = req;
    const newMovie: Movie = await service.addMovie({
      ...body,
      duration: Number(body.duration),
      release_date: new Date(body.release_date),
      poster: file?.filename || null
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
      ...req.body,
      poster: req.file?.filename
    });
    res.status(201).json(movie);
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
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
}
