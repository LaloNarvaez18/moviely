import express from 'express';
import AuthService from '../services/auth.services';
import { handleSchema } from '../middlewares/validation.handler';
import { SignUpSchema, SignInSchema } from '../schemas/user.schema';

const authRouter = express.Router();
const service = new AuthService();

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

authRouter.post('/signin',
  handleSchema(SignInSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const payload = await service.signIn(data);
      res.status(200).json(payload);
    } catch (error) {
      next(error);
    }
  }
);

export default authRouter;
