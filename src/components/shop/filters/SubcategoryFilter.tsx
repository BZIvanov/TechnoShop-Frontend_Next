import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";

import { useDispatch, useSelector } from "@/providers/store/hooks";
import { useGetSubcategoriesQuery } from "@/providers/store/services/subcategories";
import {
  changeFilter,
  selectFilterByKey,
} from "@/providers/store/features/productsFilters/productsFiltersSlice";
import FilterListItem from "./FilterListItem";

const SubcategoryFilter = () => {
  const dispatch = useDispatch();

  const selectedSubcategoryIds = useSelector(
    selectFilterByKey("subcategories")
  );

  const { data: subcategoriesData } = useGetSubcategoriesQuery();
  const subcategories = subcategoriesData?.subcategories || [];

  const selectedSubcategories = subcategories.filter((subcategory) =>
    selectedSubcategoryIds.includes(subcategory._id)
  );

  return (
    <FilterListItem
      title="Subcategory"
      icon={<AutoAwesomeMosaicIcon fontSize="small" />}
    >
      <Box sx={{ padding: "0 20px" }}>
        <Autocomplete
          multiple={true}
          options={subcategories}
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
          value={selectedSubcategories}
          onChange={(_, values) => {
            dispatch(changeFilter({ subcategories: values.map((v) => v._id) }));
          }}
        />
      </Box>
    </FilterListItem>
  );
};

export default SubcategoryFilter;
