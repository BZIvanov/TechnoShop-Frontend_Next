import * as yup from 'yup';

export const schema = yup
  .object({
    categoryName: yup
      .string()
      .min(2)
      .max(32)
      .required('Category name is required'),
    categoryImage: yup
      .array()
      .of(yup.mixed())
      .min(1, 'An image is required')
      .max(1, 'Only one image can be uploaded')
      .defined(),
  })
  .required();

export type CategoryFormData = yup.InferType<typeof schema>;
