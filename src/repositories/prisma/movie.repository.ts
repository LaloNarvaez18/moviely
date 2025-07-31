import prisma from '../../libs/prisma';
import {
  Movie,
  CreateMovieDto,
  UpdateMovieDto,
  IMovieRepository
} from '../../types/movies';

export default class MoviePrismaRepository implements IMovieRepository {
  async create(data: CreateMovieDto): Promise<Movie> {
    return await prisma.movie.create({ data });
  }

  async findAll(): Promise<Movie[]> {
    return await prisma.movie.findMany();
  }

  async findById(id: number): Promise<Movie | null> {
    return await prisma.movie.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, data: UpdateMovieDto): Promise<Movie> {
    return await prisma.movie.update({
      where: { id },
      data
    });
  }

  async delete(id: number): Promise<Movie> {
    const deleted = await prisma.movie.delete({
      where: { id }
    });

    return deleted;
  }
}
