import Repository from "./repository"

export interface Movie {
  id: number
  title: string
  description: string | null
  duration: number
  releaseDate: Date
  rate: string
  director: string | null
  cast: string | null
  poster: string | null
  trailer: string | null
  active: boolean | null
}

export interface CreateMovieDto extends Omit<Movie, 'id'>{}
export interface UpdateMovieDto extends Partial<CreateMovieDto>{}

export interface IMovieRepository extends Repository<CreateMovieDto, UpdateMovieDto, Movie>{}

export interface IMovieService {
  createMovie(movie: CreateMovieDto): Promise<Movie>
  findMovies(): Promise<Movie[]>
  findMovieById(id: number): Promise<Movie | null>
  updateMovie(id: number, data: UpdateMovieDto): Promise<Movie>
  deleteMovie(id: number): Promise<Movie>
}
