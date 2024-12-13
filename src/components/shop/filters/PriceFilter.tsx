import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { useDispatch, useSelector } from "@/providers/store/hooks";
import {
  changeFilter,
  selectFilterByKey,
} from "@/providers/store/features/productsFilters/productsFiltersSlice";
import FilterListItem from "./FilterListItem";

const PriceFilter: FC = () => {
  const dispatch = useDispatch();

  const price = useSelector(selectFilterByKey("price"));

  const [localPrice, setLocalPrice] = useState(price);

  return (
    <FilterListItem
      title={`Price (${price[0]}-${price[1]})`}
      icon={<AttachMoneyIcon fontSize="small" />}
    >
      <Box sx={{ padding: "0 32px" }}>
        <Slider
          value={localPrice}
          onChange={(_, newValue) => {
            if (Array.isArray(newValue)) {
              // change the local price, when the user is sliding
              setLocalPrice(newValue);
            }
          }}
          onChangeCommitted={(_, newValue) => {
            if (Array.isArray(newValue)) {
              // change the global price in the store, when the user is done sliding, which will then trigger api call with the updated store price value
              dispatch(changeFilter({ price: newValue }));
            }
          }}
          valueLabelDisplay="auto"
          disableSwap={true}
          step={100}
          max={4999}
          valueLabelFormat={(value) => `$ ${value}`}
          size="small"
        />
      </Box>
    </FilterListItem>
  );
};

export default PriceFilter;
