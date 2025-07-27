import prisma from '../libs/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserService from './user.services';
import { SignUpProps, SignInProps } from '../schemas/schema.types';

export default class AuthService {
  constructor(
    private userService = new UserService()
  ){}

  async signUp(data: SignUpProps) {
    try {
      const newUser = await prisma.user.create({
        data: {
          ...data,
          birthdate: new Date(data.birthdate),
          password: bcrypt.hashSync(data.password, 10)
        },
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async signIn(data: SignInProps) {
    try {
      const user = await this.userService.findByEmail(data.email);
      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = bcrypt.compareSync(data.password, user.password);
      if (!isMatch) {
        throw new Error('Invalid password');
      }

      const payload = this.signToken({
        sub: user.id,
        scope: user.role
      });

      return payload;
    } catch (error) {
      throw error;
    }
  }

  private signToken(payload: {
    sub: number;
    scope: string | null;
  }) {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return {
      user: {
        id: payload.sub,
        role: payload.scope,
      },
      token
    };
  }
}
