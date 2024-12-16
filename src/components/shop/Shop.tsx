import { type ChangeEvent, type FC, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import { useSelector } from "@/providers/store/hooks";
import { selectFilters } from "@/providers/store/features/productsFilters/productsFiltersSlice";
import { useGetProductsQuery } from "@/providers/store/services/products";
import { ProductsParams } from "@/providers/store/services/types/products";
import ProductsList from "@/components/products/ProductsList";
import PriceFilter from "./filters/PriceFilter";
import CategoryFilter from "./filters/CategoryFilter";
import SubcategoryFilter from "./filters/SubcategoryFilter";
import RatingFilter from "./filters/RatingFilter";
import ShippingFilter from "./filters/ShippingFilter";
import BrandsFilter from "./filters/BrandsFilter";

const PRODUCTS_PER_PAGE = 12;

const Shop: FC = () => {
  const [page, setPage] = useState<number>(1);

  const { text, price, categories, subcategories, rating, shipping, brands } =
    useSelector(selectFilters);

  // reset page in case we were on some bigger page number and filtered to something with fewer pages
  useEffect(() => {
    setPage(1);
  }, [text, price, categories, subcategories, rating, shipping, brands]);

  const params: ProductsParams = useMemo(() => {
    return {
      page: page - 1,
      perPage: PRODUCTS_PER_PAGE,
      text,
      price: price.join(","),
      categories: categories.join(","),
      subcategories: subcategories.join(","),
      rating: rating ? rating.toString() : "",
      shipping,
      brands: brands.join(","),
    };
  }, [page, text, price, categories, subcategories, rating, shipping, brands]);

  // set initial query params for products load query
  const [queryParams, setQueryParams] = useState<ProductsParams>(() => {
    return params;
  });

  // update query params not more often than half a second to query the products with the latest params
  useEffect(() => {
    const throttle = setTimeout(() => {
      setQueryParams(params);
    }, 500);

    return () => clearTimeout(throttle);
  }, [params]);

  const { data } = useGetProductsQuery(queryParams);

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <List
        dense={true}
        sx={{ minWidth: "300px", width: "300px", bgcolor: "background.paper" }}
      >
        <PriceFilter />
        <CategoryFilter />
        <SubcategoryFilter />
        <RatingFilter />
        <ShippingFilter />
        <BrandsFilter />
      </List>

      <Box sx={{ flexGrow: 1 }}>
        <ProductsList
          products={data?.products || []}
          paginationComponent={
            <Stack sx={{ margin: 2, display: "flex", alignItems: "center" }}>
              <Pagination
                page={page}
                onChange={handlePageChange}
                count={Math.ceil((data?.totalCount || 0) / PRODUCTS_PER_PAGE)}
                boundaryCount={2}
                showFirstButton={true}
                showLastButton={true}
              />
            </Stack>
          }
        />
      </Box>
    </Box>
  );
};

export default Shop;
