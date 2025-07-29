import MoviePrismaRepository from '../repositories/movie.repository';
import {
  Movie,
  IMovieRepository,
  IMovieService
} from '../types/movies';

export default class MovieService implements IMovieService {
  private repository: IMovieRepository

  constructor() {
    this.repository = new MoviePrismaRepository();
  }

  async addMovie(movie: Movie): Promise<Movie> {
    return this.repository.create(movie);
  }

  async findMovies(): Promise<Movie[]>{
    return this.repository.findAll();
  }

  async findMovieById(id: number): Promise<Movie | null> {
    return this.repository.findById(id);
  }

  async updateMovie(id: number, data: Movie): Promise<Movie> {
    return this.repository.update(id, data);
  }

  async deleteMovie(id: number): Promise<Movie> {
    return this.repository.delete(id);
  }
}
