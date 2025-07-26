import { z } from 'zod';
import { SignUpSchema } from './user.schema';

export type SignUpProps = z.infer<typeof SignUpSchema>;
