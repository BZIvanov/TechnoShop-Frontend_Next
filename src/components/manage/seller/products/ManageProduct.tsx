import { FC } from "react";
import { useNavigate, useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useDispatch } from "@/providers/store/hooks";
import { useForm } from "@/components/form/hooks/useForm";
import ProductForm from "./ProductForm";
import { schema, ProductFormData } from "./productForm.schema";
import {
  useGetCategoriesQuery,
  useGetCategorySubcategoriesQuery,
} from "@/providers/store/services/categories";

const defaultValues = {
  title: "",
  description: "",
  price: 0,
  discount: 0,
  shipping: "Yes",
  quantity: 0,
  color: "",
  brand: "",
  category: "",
  subcategories: [],
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

  const selectedCategoryId = form.watch("category");

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  const { data: categorySubcategoriesData, isLoading: isLoadingSubcategories } =
    useGetCategorySubcategoriesQuery(selectedCategoryId, {
      skip: !selectedCategoryId,
    });

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant="h5">Manage Product</Typography>

      <ProductForm
        form={form}
        categories={categoriesData?.categories || []}
        categorySubcategories={categorySubcategoriesData?.subcategories || []}
        buttonLabel={productId ? "Update Product" : "Create Product"}
        isSubmitting={isLoadingCategories || isLoadingSubcategories}
      />
    </Box>
  );
};

export default ManageProduct;
