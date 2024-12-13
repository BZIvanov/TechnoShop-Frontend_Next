import { FC } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

import { useDispatch, useSelector } from "@/providers/store/hooks";
import {
  changeFilter,
  selectFilterByKey,
} from "@/providers/store/features/productsFilters/productsFiltersSlice";
import FilterListItem from "./FilterListItem";
import { MAX_RATING_VALUE } from "@/components/products/constants";

const RatingFilter: FC = () => {
  const dispatch = useDispatch();

  const rating = useSelector(selectFilterByKey("rating"));

  return (
    <FilterListItem title="Rating" icon={<StarIcon fontSize="small" />}>
      <Box sx={{ padding: "0 20px" }}>
        <Rating
          value={rating}
          onChange={(_, newValue) => {
            dispatch(changeFilter({ rating: newValue }));
          }}
          precision={1}
          size="large"
          max={MAX_RATING_VALUE}
        />
      </Box>
    </FilterListItem>
  );
};

export default RatingFilter;
