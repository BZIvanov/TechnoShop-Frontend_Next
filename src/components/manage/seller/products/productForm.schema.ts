import * as yup from "yup";

export const schema = yup
  .object({
    title: yup.string().required("Title is required"),
  })
  .required();

export type ProductFormData = yup.InferType<typeof schema>;
