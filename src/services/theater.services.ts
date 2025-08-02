import { EXPERIENCE_SEAT_POLICIES } from '../constants/theater';
import {
  Seat,
  Theater,
  TheaterWithSeats,
  CreateTheaterDto,
  UpdateTheaterDto,
  ITheaterService,
  ITheaterRepository,
  TheaterExperience
} from '../types/theaters';

export default class TheaterService implements ITheaterService {
  constructor(
    private readonly repository: ITheaterRepository
  ) { }

  async createTheater(theater: CreateTheaterDto): Promise<TheaterWithSeats> {
    try {
      if (theater.seats) {
        this.ensureSeatsDataConsistency(theater);
      }

      return await this.repository.create(theater);
    } catch (error) {
      throw error;
    }
  }

  async findTheaters(): Promise<TheaterWithSeats[]>{
    return await this.repository.findAll();
  }

  async findTheaterById(id: number): Promise<TheaterWithSeats | null> {
    return await this.repository.findById(id);
  }

  async updateTheater(id: number, data: UpdateTheaterDto): Promise<TheaterWithSeats> {
    const theater = await this.findTheaterById(id);
    if (!theater) {
      throw new Error("Theater not found");
    }

    return await this.repository.update(id, data);
  }

  async deleteTheater(id: number): Promise<boolean> {
    const theater = await this.findTheaterById(id);
    if (!theater) {
      throw new Error("Theater not found");
    }

    await this.repository.delete(id);
    return true;
  }

  private ensureSeatsDataConsistency(
    data: CreateTheaterDto
  ): void {
    const { seats, ...theater } = data;
    const columnsLimit = theater.columns || 0;
    const theaterExperience = theater.experience as TheaterExperience

    this.ensureSeatsAreUnique(seats);
    this.ensureSeatsHaveSimilarType(seats)
    this.ensureSeatsRespectColumnLimit(seats, columnsLimit)
    this.ensureSeatsMatchTheaterExperience(seats, theaterExperience)
  }

  private ensureSeatsRespectColumnLimit(
    seats: Seat[] | undefined,
    columns: number | undefined
  ): void {
    if (seats && columns) {
      const invalidSeats = seats
        .filter(seat => seat.number > columns)
        .map(seat => `${seat.label}${seat.number}`)
        .join(', ');

      if (invalidSeats.length != 0) {
        throw new Error(
          `Seat numbers cannot exceed ${columns} columns. Invalid seats: ${invalidSeats}`
        );
      }
    }
  }

  private ensureSeatsHaveSimilarType(
    seats: Seat[] | undefined
  ): void {
    if (seats) {
      const types = [
        ...new Set(seats.map(seat => seat.type))
      ];

      if (types.length > 1) {
        throw new Error(
          `All seats must be of the same type. Found types: ${types.join(', ')}`
        );
      }
    }
  }

  private ensureSeatsAreUnique(
    seats: Seat[] | undefined
  ): void {
    if (seats) {
      const seen = new Set<string>();
      for (const seat of seats) {
        const key = `${seat.label}${seat.number}`;
        if (seen.has(key)) {
          throw new Error(`Duplicate seat detected: ${seat.label}${seat.number}`);
        }

        seen.add(key);
      }
    }
  }

  private ensureSeatsMatchTheaterExperience(
    seats: Seat[] | undefined,
    experience: TheaterExperience
  ): void {
    if (seats) {
      const expected = EXPERIENCE_SEAT_POLICIES[experience]
      const seatsType = [
        ...new Set(seats.map(seat => seat.type))
      ].toString();

      if (seatsType != expected) {
        throw new Error(
          `${experience} theaters can only have ${expected} seats.`
        );
      }
    }
  }
}
