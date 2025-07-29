import { BaseRepository } from "./repository"

export type MovieRate = 'G' | 'PG' | 'PG-13' | 'R' | 'X' | 'NC-17'

export interface Movie {
  title: string
  description: string | null
  duration: number
  release_date: Date
  rate: string
  director: string | null
  cast: string | null
  poster: string | null
  trailer: string | null
  active: boolean | null
}

export interface IMovieRepository extends BaseRepository<Movie>{}

export interface IMovieService {
  addMovie(movie: Movie): Promise<Movie>
  findMovies(): Promise<Movie[]>
  findMovieById(id: number): Promise<Movie | null>
  updateMovie(id: number, data: Movie): Promise<Movie>
  deleteMovie(id: number): Promise<Movie>
}
