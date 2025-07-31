import {
  Movie,
  CreateMovieDto,
  UpdateMovieDto,
  IMovieRepository,
  IMovieService
} from '../types/movies';

export default class MovieService implements IMovieService {
  constructor(
    private readonly repository: IMovieRepository
  ) { }

  async createMovie(movie: CreateMovieDto): Promise<Movie> {
    return await this.repository.create(movie);
  }

  async findMovies(): Promise<Movie[]>{
    return await this.repository.findAll();
  }

  async findMovieById(id: number): Promise<Movie | null> {
    return await this.repository.findById(id);
  }

  async updateMovie(id: number, data: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findMovieById(id);
    if (!movie) {
      throw new Error("Movie not found");
    }
    return await this.repository.update(id, data);
  }

  async deleteMovie(id: number): Promise<Movie> {
    const movie = await this.findMovieById(id);
    if (!movie) {
      throw new Error("Movie not found");
    }
    return await this.repository.delete(id);
  }
}
