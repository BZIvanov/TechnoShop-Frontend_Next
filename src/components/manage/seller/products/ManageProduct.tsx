import { type FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useDispatch } from "@/providers/store/hooks";
import {
  useGetCategoriesQuery,
  useGetCategorySubcategoriesQuery,
} from "@/providers/store/services/categories";
import {
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/providers/store/services/products";
import { showNotification } from "@/providers/store/features/notification/notificationSlice";
import { useForm } from "@/components/form/hooks/useForm";
import ProductForm from "./ProductForm";
import { schema, ProductFormData } from "./productForm.schema";

const defaultValues = {
  title: "",
  description: "",
  price: "",
  discount: "",
  shipping: "Yes",
  quantity: "",
  color: "",
  brand: "",
  category: "",
  subcategories: [],
  images: [],
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

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  const { data: categorySubcategoriesData, isLoading: isLoadingSubcategories } =
    useGetCategorySubcategoriesQuery(selectedCategoryId, {
      skip: !selectedCategoryId,
    });
  const { data: productData, isLoading: isLoadingProduct } = useGetProductQuery(
    productId || "",
    {
      skip: !productId,
    }
  );

  useEffect(() => {
    const product = productData?.product;

    if (productId && product) {
      form.reset({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        discount: product.discount.toString(),
        shipping: product.shipping,
        quantity: product.quantity.toString(),
        color: product.color,
        brand: product.brand,
        category: product.category._id,
        subcategories: product.subcategories.map(
          (subcategory) => subcategory._id
        ),
        images: product.images,
      });
    }
  }, [form, productId, productData]);

  const handleUpsertProduct = async (formData: FormData): Promise<void> => {
    let result;
    if (productId) {
      result = await updateProduct({ id: productId, formData });
    } else {
      result = await createProduct(formData);
    }

    if (!("error" in result)) {
      dispatch(
        showNotification({
          type: "success",
          message: `Product ${productId ? "updated" : "created"} successfully`,
        })
      );

      form.reset();
      navigate("/seller/products");
    }
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h5">Manage Product</Typography>
        <Button
          onClick={() => navigate("/seller/products")}
          variant="contained"
        >
          All Products
        </Button>
      </Box>

      <ProductForm
        form={form}
        categories={categoriesData?.categories || []}
        categorySubcategories={categorySubcategoriesData?.subcategories || []}
        buttonLabel={productId ? "Update Product" : "Create Product"}
        isSubmitting={
          isLoadingCategories ||
          isLoadingSubcategories ||
          isCreating ||
          isUpdating ||
          isLoadingProduct
        }
        upsertProduct={handleUpsertProduct}
      />
    </Box>
  );
};

export default ManageProduct;
