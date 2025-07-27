import prisma from '../libs/prisma';

export default class UserService {
  constructor() { }

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
