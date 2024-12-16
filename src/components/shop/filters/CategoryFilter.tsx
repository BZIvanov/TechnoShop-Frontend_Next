import { type FC } from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CategoryIcon from "@mui/icons-material/Category";

import { useDispatch, useSelector } from "@/providers/store/hooks";
import { useGetCategoriesQuery } from "@/providers/store/services/categories";
import {
  changeFilter,
  selectFilterByKey,
} from "@/providers/store/features/productsFilters/productsFiltersSlice";
import FilterListItem from "./FilterListItem";

const CategoryFilter: FC = () => {
  const dispatch = useDispatch();

  const selectedCategoryIds = useSelector(selectFilterByKey("categories"));

  const { data } = useGetCategoriesQuery();
  const categories = data?.categories || [];

  const selectedCategories = categories.filter((category) =>
    selectedCategoryIds.includes(category._id)
  );

  return (
    <FilterListItem title="Category" icon={<CategoryIcon fontSize="small" />}>
      <Box sx={{ padding: "0 20px" }}>
        <Autocomplete
          multiple={true}
          options={categories}
          disableCloseOnSelect={true}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => {
            const { key, ...rest } = props;
            return (
              <li key={key} {...rest}>
                <Checkbox checked={selected} />
                {option.name}
              </li>
            );
          }}
          renderInput={(params) => {
            return <TextField {...params} variant="standard" />;
          }}
          limitTags={3}
          isOptionEqualToValue={(v, a) => {
            return v._id === a._id;
          }}
          value={selectedCategories}
          onChange={(_, values) => {
            dispatch(changeFilter({ categories: values.map((v) => v._id) }));
          }}
        />
      </Box>
    </FilterListItem>
  );
};

export default CategoryFilter;
