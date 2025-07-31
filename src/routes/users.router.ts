import express from 'express';
import { IUserRepository, IUserService, UserWithoutSensitive } from '../types/users';
import UserPrismaRepository from '../repositories/prisma/user.repository';
import UserService from '../services/user.services';

const userRouter = express.Router();
const repository: IUserRepository = new UserPrismaRepository();
const service: IUserService = new UserService(repository);

userRouter.get('/',
  async (req, res, next) => {
    try {
      const users: UserWithoutSensitive[] = await service.findUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error)
    }
  }
);

userRouter.get('/:id',
  async (req, res, next) => {
    try {
      const user: UserWithoutSensitive | null = await service.findUserById(+req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error)
    }
  }
);

export default userRouter;
