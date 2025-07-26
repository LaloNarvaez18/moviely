import express from 'express';
import UserService from '../services/users.services';
import { handleSchema } from '../middlewares/validation.handler';
import { SignUpSchema } from '../schemas/user.schema';

const authRouter = express.Router();
const service = new UserService();

authRouter.post('/signup',
  handleSchema(SignUpSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await service.signUp(data);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

export default authRouter;
