import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/providers/store/services/products";
import TablePagination from "@/components/manage/common/tables/TablePagination";
import ProductsTable from "./ProductsTable";

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

const ManageProducts: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    ROWS_PER_PAGE_OPTIONS[0]
  );

  const { data } = useGetProductsQuery({ page, perPage: rowsPerPage });
  const products = data?.products || [];

  const [deleteProduct] = useDeleteProductMutation();

  const handleProductDelete = (productId: string) => {
    deleteProduct(productId);
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant="h5">Your products</Typography>

      <Divider sx={{ marginBlock: 2 }} />

      <Paper>
        <ProductsTable
          products={products}
          deleteProduct={handleProductDelete}
        />

        <TablePagination
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          count={data?.totalCount || 0}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ManageProducts;
