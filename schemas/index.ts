import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password should have at least 8 characters' }),
});
