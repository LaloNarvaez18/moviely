import { z } from 'zod';

const envoirement = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  DATABASE_URL: z.url(),
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_SECRET: z.string()
});

envoirement.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envoirement> {}
  }

  namespace Express {
    interface Request {
      file?: Multer.File;
    }
  }
}
