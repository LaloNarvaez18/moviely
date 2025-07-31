import { Request, Response, NextFunction } from 'express';
import { IUserRepository, AuthenticatedUser } from '../types/users';
import UserPrismaRepository from '../repositories/prisma/user.repository';
import AuthService from '../services/auth.services';

const repository: IUserRepository = new UserPrismaRepository();
const service: AuthService = new AuthService(repository);

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const newUser: AuthenticatedUser = await service.signUpUser(data);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const user: AuthenticatedUser = await service.signInUser(data.email, data.password);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
