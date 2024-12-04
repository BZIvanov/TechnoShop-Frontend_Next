import * as yup from 'yup';

import { emailSchema } from '../auth-fields.schema';

export const schema = yup.object({ email: emailSchema }).required();

export type ForgotPasswordFormData = yup.InferType<typeof schema>;
