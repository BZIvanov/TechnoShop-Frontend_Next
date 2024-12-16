import { type FC } from "react";
import Box from "@mui/material/Box";

import CartDrawer from "@/components/cart/CartDrawer";
import Header from "./header/Header";

const ShopLayout: FC = () => {
  return (
    <Box>
      <Header />

      <CartDrawer />
    </Box>
  );
};

export default ShopLayout;
