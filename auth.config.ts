import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

// https://authjs.dev/guides/upgrade-to-v5?authentication-method=middleware#edge-compatibility
// this is needed, because Prisma does not work on Edge

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateedFields = LoginSchema.safeParse(credentials);
        if (validateedFields.success) {
          const { email, password } = validateedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
