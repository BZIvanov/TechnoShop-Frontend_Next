import { useState, type ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import { useGetProductsQuery } from "@/providers/store/services/products";
import ProductsList from "@/components/products/ProductsList";
import { PRODUCTS_PER_PAGE } from "./constants";

interface ProductsSectionProps {
  header: string;
  sortColumn?: string;
}

const ProductsSection = ({ header, sortColumn }: ProductsSectionProps) => {
  const [page, setPage] = useState(1);

  const { data } = useGetProductsQuery({
    page: page - 1,
    perPage: PRODUCTS_PER_PAGE,
    sortColumn,
  });

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const products = data?.products || [];
  const totalProductsCount = data?.totalCount || 0;
  const shouldShowPagination = totalProductsCount > PRODUCTS_PER_PAGE;

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
        {header} ({totalProductsCount} total products)
      </Typography>

      <ProductsList
        products={products}
        paginationComponent={
          shouldShowPagination ? (
            <Stack sx={{ margin: 2, display: "flex", alignItems: "center" }}>
              <Pagination
                page={page}
                onChange={handlePageChange}
                count={Math.ceil(totalProductsCount / PRODUCTS_PER_PAGE)}
                boundaryCount={2}
                showFirstButton={true}
                showLastButton={true}
              />
            </Stack>
          ) : null
        }
      />
    </Box>
  );
};

export default ProductsSection;
