import * as yup from 'yup';

export const schema = yup
  .object({
    avatarImage: yup
      .array()
      .of(yup.mixed())
      .min(1, 'An image is required')
      .max(1, 'Only one image can be uploaded')
      .defined(),
  })
  .required();

export type AvatarUpdateFormData = yup.InferType<typeof schema>;
