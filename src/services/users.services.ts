import { SignUpProps } from '../schemas/schema.types';
import { hashSync } from 'bcrypt';
import prisma from '../libs/prisma';

export default class UserService {
  constructor() { }

  async signUp({ ...data }: SignUpProps) {
    try {
      const newUser = await prisma.user.create({
        data: {
          ...data,
          birthdate: new Date(data.birthdate),
          password: hashSync(data.password, 10)
        },
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
