import express from 'express';
import validateRequestSchema from '../middlewares/validation.handler';
import { SignUpSchema, SignInSchema } from '../schemas/auth.schema';
import * as auth from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/signup',
  validateRequestSchema(SignUpSchema, 'body'),
  auth.signUp
);

authRouter.post('/signin',
  validateRequestSchema(SignInSchema, 'body'),
  auth.signIn
);

export default authRouter;
