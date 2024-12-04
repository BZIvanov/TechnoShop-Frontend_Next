import { FC } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCartOutlined';

import { useSelector } from '@/providers/store/hooks';
import { selectCartProductById } from '@/providers/store/features/cart/cartSlice';

interface AddToCartProps {
  productId: string;
  onAddToCart: () => void;
  productQuantity: number;
}

const AddToCart: FC<AddToCartProps> = ({
  productId,
  onAddToCart,
  productQuantity,
}) => {
  const cartProduct = useSelector(selectCartProductById(productId));

  const isProductInCart = cartProduct !== undefined;
  const isOutOfStock = productQuantity === 0;

  return (
    <Button
      onClick={() => {
        if (!isProductInCart && !isOutOfStock) {
          onAddToCart();
        }
      }}
      sx={{ display: 'flex', flexDirection: 'column' }}
      disabled={isProductInCart || isOutOfStock}
    >
      <AddShoppingCartIcon />
      <Typography variant='caption'>
        {isOutOfStock
          ? 'Out of stock'
          : isProductInCart
          ? 'Already in the cart'
          : 'Add to cart'}
      </Typography>
    </Button>
  );
};

export default AddToCart;
