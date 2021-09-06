import ProductListItem from './ProductListItem';
import LinkTo from '../common/LinkTo';
import { NAV_LINKS } from '../../constants';

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subcategories,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;

  return (
    <ul className='list-group'>
      <ProductListItem label='Price' text={`$ ${price}`} />

      {category && (
        <li className='list-group-item'>
          Category
          <LinkTo
            linkTo={`${NAV_LINKS.CATEGORY.ROUTE}/${category.slug}`}
            text={category.name}
          />
        </li>
      )}

      {subcategories.length > 0 && (
        <li className='list-group-item'>
          Sub Categories
          {subcategories.map(({ _id, slug, name }) => (
            <LinkTo
              key={_id}
              linkTo={`${NAV_LINKS.SUBCATEGORY.ROUTE}/${slug}`}
              text={name}
            />
          ))}
        </li>
      )}

      <ProductListItem label='Shipping' text={shipping} />
      <ProductListItem label='Color' text={color} />
      <ProductListItem label='Brand' text={brand} />
      <ProductListItem label='Available' text={quantity} />
      <ProductListItem label='Sold' text={sold} />
    </ul>
  );
};

export default ProductListItems;
