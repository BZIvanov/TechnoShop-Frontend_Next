import { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import TextFieldAdapter from "@/components/form/fields/TextFieldAdapter";
import { ProductFormData } from "./productForm.schema";

interface ProductFormProps {
  form: UseFormReturn<ProductFormData>;
}

const ProductForm: FC<ProductFormProps> = ({ form }) => {
  const onSubmit: SubmitHandler<ProductFormData> = async (values) => {
    const formData = new FormData();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <TextFieldAdapter control={form.control} name="title" label="Title" />
    </form>
  );
};

export default ProductForm;
