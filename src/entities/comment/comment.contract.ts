import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.number(),
  user: z.object({
    firstName: z.string(),
    lastName:z.string(),
    photo: z.string().url(),
  }),
  text: z.string(),
  createdAt: z.string().datetime(),
  place: z.number(),
  rating: z.number()
});

export const CreateCommentSchema = z.object({
  text: z.string(),
  place: z.number(),
  rating: z.number().min(1).max(5),
});
