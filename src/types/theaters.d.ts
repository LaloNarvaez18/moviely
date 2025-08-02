import Repository from "./repository"

export type SeatType = 'standard' | 'premium' | 'D-BOX'
export type TheaterExperience = 'normal' | 'premier' | '4DX'

export interface Seat {
  id: number
  label: string
  number: number
  type: string
}

export interface Theater {
  id: number
  name: string
  rows: number | null
  columns: number | null
  price: number | null
  experience: string
  active: boolean | null
}

export interface TheaterWithSeats extends Theater {
  seats?: Seat[]
}

export interface CreateTheaterDto extends Omit<TheaterWithSeats, 'id'>{}
export interface UpdateTheaterDto extends Partial<Theater>{}

export interface ITheaterRepository extends Repository<CreateTheaterDto, UpdateTheaterDto, Theater>{}

export interface ITheaterService {
  createTheater(movie: CreateTheaterDto): Promise<TheaterWithSeats>
  findTheaters(): Promise<TheaterWithSeats[]>
  findTheaterById(id: number): Promise<TheaterWithSeats | null>
  updateTheater(id: number, data: UpdateTheaterDto): Promise<TheaterWithSeats>
  deleteTheater(id: number): Promise<boolean>
}
