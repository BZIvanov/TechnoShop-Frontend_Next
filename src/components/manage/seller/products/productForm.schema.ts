import * as yup from "yup";

export const schema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    price: yup
      .string()
      .test("is-valid-price", "Price must be 0.01 or higher", (value) => {
        if (value === "") {
          return true;
        }

        const parsedValue = parseFloat(value || "");
        return !isNaN(parsedValue) && parsedValue >= 0.01;
      })
      .required("Price is required"),
    discount: yup
      .string()
      .transform((value) => {
        return value === "0" ? "" : value;
      })
      .test(
        "is-valid-discount",
        "Discount must be a valid number between 0.01 and 99.9",
        (value) => {
          if (value === "") {
            return true;
          }

          const parsedValue = parseFloat(value || "");
          return (
            !isNaN(parsedValue) && parsedValue >= 0.01 && parsedValue <= 99.9
          );
        }
      )
      .notRequired(),
    shipping: yup.string().required("Shipping is required"),
    quantity: yup
      .string()
      .test("is-valid-quantity", "Quantity must be 1 or higher", (value) => {
        if (value === "") {
          return true;
        }

        const parsedValue = parseInt(value || "");
        return !isNaN(parsedValue) && parsedValue >= 1;
      })
      .required(),
    color: yup.string().required("Color is required"),
    brand: yup.string().required("Brand is required"),
    category: yup.string().required("Category is required"),
    subcategories: yup
      .array()
      .of(yup.string())
      .min(1)
      .required("At least one subcategory is required"),
    images: yup
      .array()
      .of(
        yup
          .mixed()
          .test(
            "is-file-or-image",
            "Each item must be a File or an Image",
            (value) => {
              if (value instanceof File) {
                return true;
              }

              if (
                value &&
                typeof value === "object" &&
                "publicId" in value &&
                "imageUrl" in value &&
                typeof value.publicId === "string" &&
                typeof value.imageUrl === "string"
              ) {
                return true;
              }

              return false;
            }
          )
      )
      .transform((value) => (value === undefined ? [] : value))
      .min(1, "An image is required")
      .max(10, "Maximum 10 images can be uploaded")
      .defined(),
  })
  .required();

export type ProductFormData = yup.InferType<typeof schema>;
