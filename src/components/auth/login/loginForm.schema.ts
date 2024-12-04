import * as yup from 'yup';

import { emailSchema, passwordSchema } from '../auth-fields.schema';

export const schema = yup
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .required();

export type LoginFormData = yup.InferType<typeof schema>;
