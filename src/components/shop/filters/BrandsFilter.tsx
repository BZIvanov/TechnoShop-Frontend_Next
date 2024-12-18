import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import TokenIcon from "@mui/icons-material/Token";

import { useDispatch, useSelector } from "@/providers/store/hooks";
import { useGetProductsBrandsQuery } from "@/providers/store/services/products";
import {
  changeFilter,
  selectFilterByKey,
} from "@/providers/store/features/productsFilters/productsFiltersSlice";
import FilterListItem from "./FilterListItem";

const BrandsFilter = () => {
  const dispatch = useDispatch();

  const selectedBrands = useSelector(selectFilterByKey("brands"));

  const { data } = useGetProductsBrandsQuery();
  const { brands = [] } = data || {};

  return (
    <FilterListItem title="Brands" icon={<TokenIcon fontSize="small" />}>
      <Box sx={{ padding: "0 20px" }}>
        <Autocomplete
          multiple={true}
          options={brands}
          disableCloseOnSelect={true}
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => {
            const { key, ...rest } = props;
            return (
              <li key={key} {...rest}>
                <Checkbox checked={selected} />
                {option}
              </li>
            );
          }}
          renderInput={(params) => {
            return <TextField {...params} variant="standard" />;
          }}
          limitTags={3}
          value={selectedBrands}
          onChange={(_, values) => {
            dispatch(changeFilter({ brands: values }));
          }}
        />
      </Box>
    </FilterListItem>
  );
};

export default BrandsFilter;
