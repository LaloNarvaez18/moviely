import { z } from 'zod';
import { SignUpSchema, SignInSchema } from './user.schema';

export type SignUpProps = z.infer<typeof SignUpSchema>;
export type SignInProps = z.infer<typeof SignInSchema>;
