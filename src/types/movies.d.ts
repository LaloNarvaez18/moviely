import Repository from "./repository"

export interface Genre {
  id: number
  name: string
}

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

export interface MovieWithGenres extends Movie {
  genres: Genre[]
}

export interface CreateMovieDto extends Omit<Movie, 'id'> {
  genreIds?: number[]
}

export interface UpdateMovieDto extends Partial<CreateMovieDto>{
  genreRemovedIds?: number[]
}

export interface IMovieRepository extends Repository<CreateMovieDto, UpdateMovieDto, MovieWithGenres>{}

export interface IMovieService {
  createMovie(movie: CreateMovieDto): Promise<MovieWithGenres>
  findMovies(): Promise<MovieWithGenres[]>
  findMovieById(id: number): Promise<MovieWithGenres | null>
  updateMovie(id: number, data: UpdateMovieDto): Promise<MovieWithGenres>
  deleteMovie(id: number): Promise<boolean>
}
