import * as yup from 'yup';

export const schema = yup
  .object({
    categoryId: yup.string().required('Category is required'),
    subcategoryName: yup
      .string()
      .min(2)
      .max(32)
      .required('Subcategory name is required'),
  })
  .required();

export type SubcategoryFormData = yup.InferType<typeof schema>;
