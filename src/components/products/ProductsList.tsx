import { type ReactNode } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

import { Product } from "@/providers/store/services/types/products";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  products: Product[];
  paginationComponent?: ReactNode;
}

const ProductsList = ({ products, paginationComponent }: ProductsListProps) => {
  return (
    <Paper elevation={2} sx={{ width: "100%", p: 2, mt: 2 }}>
      {products.length > 0 ? (
        <Grid container={true} spacing={3} columns={12}>
          {products.map((product) => (
            <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography textAlign="center" variant="subtitle2" sx={{ my: 1 }}>
          No products found.
        </Typography>
      )}

      {paginationComponent}
    </Paper>
  );
};

export default ProductsList;
