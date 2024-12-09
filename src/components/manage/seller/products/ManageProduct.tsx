import { FC } from "react";
import { useNavigate, useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useDispatch } from "@/providers/store/hooks";
import { useForm } from "@/components/form/hooks/useForm";
import ProductForm from "./ProductForm";
import { schema, ProductFormData } from "./productForm.schema";

const defaultValues = {
  title: "",
};

const ManageProduct: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // if product id is found in the url, we are editing a product
  const { productId } = useParams();

  const form = useForm<ProductFormData>({
    schema,
    defaultValues,
  });

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant="h5">Manage Product</Typography>

      <ProductForm form={form} />
    </Box>
  );
};

export default ManageProduct;
