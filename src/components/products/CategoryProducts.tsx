import { useState, ChangeEvent } from "react";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import { useGetCategoryQuery } from "@/providers/store/services/categories";
import { useGetProductsQuery } from "@/providers/store/services/products";
import ProductsList from "./ProductsList";

const PRODUCTS_PER_PAGE = 12;

const CategoryProducts = () => {
  const [page, setPage] = useState(1);

  const { categoryId } = useParams();

  const { data: categoryData } = useGetCategoryQuery(categoryId || "", {
    skip: !categoryId,
  });
  const category = categoryData?.category;

  const { data: categoryProductsData } = useGetProductsQuery({
    categories: categoryId,
    page: page - 1,
  });
  const categoryProducts = categoryProductsData?.products || [];
  const categoryProductsTotalCount = categoryProductsData?.totalCount || 0;
  const shouldShowPagination = categoryProductsTotalCount > PRODUCTS_PER_PAGE;

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: { xs: 2, sm: 4 },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          width: "100%",
          textAlign: "center",
          backgroundColor: (theme) => theme.palette.grey[300],
          p: 2,
          borderRadius: 1,
        }}
      >
        {category?.name} category
      </Typography>

      {category && categoryProductsData && (
        <ProductsList
          products={categoryProducts}
          paginationComponent={
            shouldShowPagination ? (
              <Stack sx={{ margin: 2, display: "flex", alignItems: "center" }}>
                <Pagination
                  page={page}
                  onChange={handlePageChange}
                  count={Math.ceil(
                    categoryProductsTotalCount / PRODUCTS_PER_PAGE
                  )}
                  boundaryCount={2}
                  showFirstButton={true}
                  showLastButton={true}
                />
              </Stack>
            ) : null
          }
        />
      )}
    </Box>
  );
};

export default CategoryProducts;
