import {
  CreateMovieDto,
  UpdateMovieDto,
  IMovieRepository,
  IMovieService,
  MovieWithGenres
} from '../types/movies';

export default class MovieService implements IMovieService {
  constructor(
    private readonly repository: IMovieRepository
  ) { }

  async createMovie(data: CreateMovieDto): Promise<MovieWithGenres> {
    return await this.repository.create(data);
  }

  async findMovies(): Promise<MovieWithGenres[]>{
    return await this.repository.findAll();
  }

  async findMovieById(id: number): Promise<MovieWithGenres | null> {
    return await this.repository.findById(id);
  }

  async updateMovie(id: number, data: UpdateMovieDto): Promise<MovieWithGenres> {
    const movie = await this.findMovieById(id);
    if (!movie) {
      throw new Error("Movie not found");
    }

    return await this.repository.update(id, data);
  }

  async deleteMovie(id: number): Promise<boolean> {
    const movie = await this.findMovieById(id);
    if (!movie) {
      throw new Error("Movie not found");
    }

    await this.repository.delete(id);
    return true;
  }
}
