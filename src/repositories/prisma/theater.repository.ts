import prisma from '../../libs/prisma';
import {
  CreateTheaterDto,
  ITheaterRepository,
  Theater,
  TheaterWithSeats,
  UpdateTheaterDto
} from '../../types/theaters';


export default class TheaterPrismaRepository implements ITheaterRepository {
  async create(theater: CreateTheaterDto): Promise<TheaterWithSeats> {
    return await prisma.theater.create({
      data: {
        ...theater,
        seats: {
          create: theater.seats
        }
      },
      include: {
        seats: {
          select: {
            id: true,
            label: true,
            number: true,
            type: true
          }
        }
      }
    });
  }

  async findAll(): Promise<Theater[]> {
    return await prisma.theater.findMany();
  }

  async findById(id: number): Promise<Theater | null> {
    return await prisma.theater.findUnique({
      where: { id }
    });
  }

  async update(id: number, movie: UpdateTheaterDto): Promise<Theater> {
    return await prisma.theater.update({
      where: { id },
      data: {
        ...movie
      }
    });
  }

  async delete(id: number): Promise<Theater> {
    return await prisma.theater.delete({
      where: { id }
    });
  }
}
