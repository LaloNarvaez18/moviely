import prisma from '../../libs/prisma';
import {
  User,
  IUserRepository,
  CreateUserDto,
  UpdateUserDto,
} from '../../types/users';

export default class UserPrismaRepository implements IUserRepository {
  async create(data: CreateUserDto): Promise<User> {
    return await prisma.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data
    });
  }

  async delete(id: number): Promise<User> {
    const deleted = await prisma.user.delete({
      where: { id }
    });

    return deleted;
  }
}
