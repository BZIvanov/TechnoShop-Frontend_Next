import { useState, type ChangeEvent } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ModalImage from "react-modal-image";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "@/providers/store/hooks";
import {
  addToCart,
  removeFromCart,
} from "@/providers/store/features/cart/cartSlice";
import { Product } from "@/providers/store/services/types/products";
import { currencyFormatter } from "@/utils/formatting";

interface CartProductRowProps {
  product: Product;
  count: number;
}

const CartProductRow = ({ product, count }: CartProductRowProps) => {
  const dispatch = useDispatch();

  const [tempCount, setTempCount] = useState<number>(count);

  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTempCount(value);
  };

  const handleBlur = () => {
    const finalCount = Number(tempCount);

    if (finalCount > 0 && finalCount <= product.quantity) {
      dispatch(addToCart({ product, count: finalCount }));
    } else {
      // set the count to the original count if no value or invalid value was provided
      setTempCount(count);
    }
  };

  return (
    <TableRow>
      <TableCell
        align="center"
        sx={{ "& > div > img": { height: "30px" } }} // only apply small height to the small image
      >
        {product.images.length > 0 ? (
          <ModalImage
            small={product.images[0].imageUrl}
            large={product.images[0].imageUrl}
            alt={product.title}
          />
        ) : (
          <ModalImage
            small="/images/product.png"
            large="/images/product.png"
            alt="Default preview"
          />
        )}
      </TableCell>
      <TableCell align="center">{product.title}</TableCell>
      <TableCell align="center">{currencyFormatter(product.price)}</TableCell>
      <TableCell align="center">{product.brand}</TableCell>
      <TableCell align="center">{product.color}</TableCell>
      <TableCell align="center">
        <TextField
          slotProps={{
            htmlInput: {
              min: 1,
              max: product.quantity,
            },
          }}
          sx={{ maxWidth: 50 }}
          type="number"
          variant="standard"
          value={tempCount}
          onChange={handleCountChange}
          onBlur={handleBlur}
        />
      </TableCell>
      <TableCell align="center">
        {product.shipping === "Yes" ? (
          <CheckIcon color="success" />
        ) : (
          <ClearIcon color="warning" />
        )}
      </TableCell>
      <TableCell align="center">
        {currencyFormatter(count * product.price)}
      </TableCell>
      <TableCell align="center">
        <IconButton
          size="small"
          onClick={() => dispatch(removeFromCart(product._id))}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartProductRow;
