import { useState, ChangeEvent } from "react";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import { useGetSubcategoryQuery } from "@/providers/store/services/subcategories";
import { useGetProductsQuery } from "@/providers/store/services/products";
import ProductsList from "./ProductsList";

const PRODUCTS_PER_PAGE = 12;

const SubcategoryProducts = () => {
  const [page, setPage] = useState(1);

  const { subcategoryId } = useParams();

  const { data: subcategoryData } = useGetSubcategoryQuery(
    subcategoryId || "",
    {
      skip: !subcategoryId,
    }
  );
  const subcategory = subcategoryData?.subcategory;

  const { data: subcategoryProductsData } = useGetProductsQuery({
    subcategories: subcategoryId,
    page: page - 1,
  });
  const subcategoryProducts = subcategoryProductsData?.products || [];
  const subcategoryProductsTotalCount =
    subcategoryProductsData?.totalCount || 0;
  const shouldShowPagination =
    subcategoryProductsTotalCount > PRODUCTS_PER_PAGE;

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
        {subcategory?.name} subcategory
      </Typography>

      {subcategory && subcategoryProductsData && (
        <ProductsList
          products={subcategoryProducts}
          paginationComponent={
            shouldShowPagination ? (
              <Stack sx={{ margin: 2, display: "flex", alignItems: "center" }}>
                <Pagination
                  page={page}
                  onChange={handlePageChange}
                  count={Math.ceil(
                    subcategoryProductsTotalCount / PRODUCTS_PER_PAGE
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

export default SubcategoryProducts;
