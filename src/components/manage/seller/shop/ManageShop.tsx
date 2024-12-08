import { FC } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import ShopSubscription from "./ShopSubscription";
import ShopInfo from "./ShopInfo";

const ManageShop: FC = () => {
  return (
    <Box>
      <ShopSubscription />

      <Divider style={{ margin: "20px 0" }} />

      <ShopInfo />
    </Box>
  );
};

export default ManageShop;
