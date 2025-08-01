import prisma from '../../libs/prisma';
import {
  MovieWithGenres,
  CreateMovieDto,
  UpdateMovieDto,
  IMovieRepository,
} from '../../types/movies';


export default class MoviePrismaRepository implements IMovieRepository {
  async create(movie: CreateMovieDto): Promise<MovieWithGenres> {
    const { genreIds, ...data } = movie;
    return await prisma.movie.create({
      data: {
        ...data,
        genres: {
          connect: genreIds?.map((id) => ({ id }))
        }
      },
      include: {
        genres: true
      }
    });
  }

  async findAll(): Promise<MovieWithGenres[]> {
    return await prisma.movie.findMany({
      include: {
        genres: true
      }
    });
  }

  async findById(id: number): Promise<MovieWithGenres | null> {
    return await prisma.movie.findUnique({
      where: { id },
      include: {
        genres: true
      }
    });
  }

  async update(id: number, movie: UpdateMovieDto): Promise<MovieWithGenres> {
    const { genreIds, genreRemovedIds, ...data } = movie;
    return await prisma.movie.update({
      where: { id },
      data: {
        ...data,
        genres: {
          disconnect: genreRemovedIds?.map((id) => ({ id })),
          connect: genreIds?.map((id) => ({ id }))
        }
      },
      include: {
        genres: true
      }
    });
  }

  async delete(id: number): Promise<MovieWithGenres> {
    return await prisma.movie.delete({
      where: { id },
      include: {
        genres: true
      }
    });
  }
}
