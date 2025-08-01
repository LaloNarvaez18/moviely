import { z } from 'zod';

const id = z.number().positive();
const title = z.string();
const description = z.string();
const duration = z.number().positive();
const releaseDate = z.iso.date('Invalid date format').transform((val) => new Date(val));
const rate = z.enum(['G', 'PG', 'PG-13', 'R', 'X', 'NC-17']);
const director = z.string().max(30);
const cast = z.string();
const trailer = z.url();
const active = z.boolean()
const genreIds = z.number().positive().array()
const genreRemovedIds = z.number().positive().array()

export const MovieCreateSchema = z.object({
  title: title,
  description: description,
  duration: duration,
  releaseDate: releaseDate,
  rate: rate,
  director: director.optional(),
  cast: cast.optional(),
  trailer: trailer.optional(),
  active: active.optional(),
  genreIds: genreIds.optional()
});

export const MovieUpdateSchema = z.object({
  title: title.optional(),
  description: description.optional(),
  duration: duration.optional(),
  release_date: releaseDate.optional(),
  rate: rate.optional(),
  director: director.optional(),
  cast: cast.optional(),
  trailer: trailer.optional(),
  active: active.optional(),
  genreIds: genreIds.optional(),
  genreRemovedIds: genreRemovedIds.optional(),
});

export const MovieIdSchema = z.object({
  id: id
});
