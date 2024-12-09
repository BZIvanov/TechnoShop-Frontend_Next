import * as yup from "yup";

export const schema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().min(0.01).required(),
    discount: yup.number().min(0.01).max(99.9).required(),
    shipping: yup.string().required("Shipping is required"),
    quantity: yup.number().min(1).required(),
    color: yup.string().required("Color is required"),
    brand: yup.string().required("Brand is required"),
    category: yup.string().required("Category is required"),
    subcategories: yup
      .array()
      .of(yup.string())
      .min(1)
      .required("At least one subcategory is required"),
  })
  .required();

export type ProductFormData = yup.InferType<typeof schema>;
