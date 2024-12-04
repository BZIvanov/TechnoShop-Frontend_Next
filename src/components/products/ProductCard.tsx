import { FC } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import { useDispatch } from '@/providers/store/hooks';
import { Product } from '@/providers/store/services/types/products';
import {
  addToCart,
  setDrawerOpen,
} from '@/providers/store/features/cart/cartSlice';
import { currencyFormatter } from '@/utils/formatting';
import ProductRating from './ProductRating';
import ViewProductDetails from './actions/ViewProductDetails';
import AddToCart from './actions/AddToCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, count: 1 }));
    dispatch(setDrawerOpen(true));
  };

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/products/${product._id}`)}>
        <CardMedia
          component='img'
          height='140'
          image={product.images[0]?.imageUrl || '/images/product.png'}
          alt={product.title}
        />
        <CardContent sx={{ paddingBlock: '8px' }}>
          <ProductRating
            rating={product.averageRating}
            reviews={product.reviewCount}
            size='small'
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography gutterBottom={true} variant='body1' noWrap={true}>
              {product.title}
            </Typography>
            <Typography gutterBottom={true} variant='body1'>
              <strong>{currencyFormatter(product.price)}</strong>
            </Typography>
          </Box>

          <Typography variant='body2' color='text.secondary'>
            {product.description.length > 80
              ? product.description.substring(0, 80) + '...'
              : product.description}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <ViewProductDetails productId={product._id} />
        <AddToCart
          productId={product._id}
          productQuantity={product.quantity}
          onAddToCart={handleAddToCart}
        />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
