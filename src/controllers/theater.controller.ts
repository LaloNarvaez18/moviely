import { Request, Response, NextFunction } from 'express';
import { ITheaterRepository, ITheaterService, Theater, TheaterWithSeats } from '../types/theaters';
import TheaterService from '../services/theater.services';
import TheaterPrismaRepository from '../repositories/prisma/theater.repository';

const repository: ITheaterRepository = new TheaterPrismaRepository();
const service: ITheaterService = new TheaterService(repository);

export const getByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id)
    const movie: Theater | null = await service.findTheaterById(id);
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
    const movies: Theater[] = await service.findTheaters();
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
}

export const createTheater = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTheater: TheaterWithSeats = await service.createTheater({
      ...req.body,
    });
    res.status(201).json(newTheater);
  } catch (err) {
    next(err);
  }
}

export const updateTheater = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const movie: Theater | null = await service.updateTheater(id, {
      ...req.body
    });
    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
}

export const deleteTheater = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const deleted: boolean = await service.deleteTheater(id);
    res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
}
