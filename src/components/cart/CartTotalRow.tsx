import { type FC } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { useSelector } from "@/providers/store/hooks";
import { selectCart } from "@/providers/store/features/cart/cartSlice";

const CartTotalRow: FC = () => {
  const cart = useSelector(selectCart);
  const cartIds = Object.keys(cart);

  return (
    <TableRow>
      <TableCell colSpan={5} />
      <TableCell colSpan={2} align="center">
        <strong>Total</strong>
      </TableCell>
      <TableCell align="center">
        <strong>
          ${" "}
          {cartIds
            .map((cartProductId) => {
              const {
                product: { price },
                count,
              } = cart[cartProductId];

              return price * count;
            })
            .reduce((a, b) => a + b, 0)
            .toFixed(2)}
        </strong>
      </TableCell>
      <TableCell colSpan={1} />
    </TableRow>
  );
};

export default CartTotalRow;
