import { z } from 'zod';

const TheaterExperience = z.enum(['normal', 'premier', '4DX']);
const SeatType = z.enum(['standard', 'premium', 'D-BOX']);

const id = z.number().positive();
const name = z.string().max(30);
const rows = z.number().positive().max(20);
const columns = z.number().positive().max(20);
const price = z.number().positive();
const active = z.boolean();

const SeatSchema = z.object({
  label: z.string().max(2),
  number: z.number().positive().min(1).max(20),
  type: SeatType.nonoptional()
});

export const TheaterCreateSchema = z.object({
  name: name.nonempty(),
  rows: rows.optional().default(0),
  columns: columns.optional().default(0),
  experience: TheaterExperience.nonoptional(),
  price: price.optional().default(0),
  active: active.optional().default(true),
  seats: z.array(SeatSchema).optional()
});

export const TheaterUpdateSchema = TheaterCreateSchema.partial();

export const TheaterIdSchema = z.object({ id });
