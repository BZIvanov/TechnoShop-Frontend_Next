import { type FC } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { useDispatch, useSelector } from "@/providers/store/hooks";
import {
  changeFilter,
  selectFilterByKey,
} from "@/providers/store/features/productsFilters/productsFiltersSlice";
import FilterListItem from "./FilterListItem";

const ShippingFilter: FC = () => {
  const dispatch = useDispatch();

  const shipping = useSelector(selectFilterByKey("shipping"));

  return (
    <FilterListItem
      title="Shipping"
      icon={<LocalShippingIcon fontSize="small" />}
    >
      <Box sx={{ padding: "0 20px" }}>
        <FormControl sx={{ width: "100%" }}>
          <Select
            variant="standard"
            value={shipping}
            onChange={(event) => {
              dispatch(changeFilter({ shipping: event.target.value }));
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </FilterListItem>
  );
};

export default ShippingFilter;
