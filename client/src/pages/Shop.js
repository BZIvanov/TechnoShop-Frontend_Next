import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons';
import ProductCard from '../components/cards/ProductCard';
import Star from '../components/common/Star';
import {
  getProductsAction,
  getAllCategoriesAction,
  getAllSubcategoriesAction,
  searchAction,
} from '../store/action-creators';
import { BRANDS_LIST, COLORS_LIST, SHIPPING_OPTIONS } from '../constants';

const { SubMenu } = Menu;

const Shop = () => {
  const {
    text,
    price,
    categories: searchedCategories,
    stars,
    subcategory,
    brands: searchedBrands,
    colors: searchedColors,
    shipping: searchedShipping,
  } = useSelector((state) => state.search);
  const { products } = useSelector((state) => state.product.allProducts);
  const { categories } = useSelector((state) => state.category);
  const { subcategories } = useSelector((state) => state.subcategory);
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAction());
    dispatch(getAllCategoriesAction());
    dispatch(getAllSubcategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    const queryPrice = !!price[1] ? price.join() : ''; // if max price is not set use empty string to ignore the price on the backend

    const throttle = setTimeout(() => {
      dispatch(
        getProductsAction({
          text,
          price: queryPrice,
          categories: searchedCategories.join(),
          stars: stars > 0 ? stars : '',
          subcategory,
          brands: searchedBrands.join(),
          colors: searchedColors.join(),
          shipping: searchedShipping,
        })
      );
    }, 1000);

    return () => clearTimeout(throttle);
  }, [
    dispatch,
    text,
    price,
    searchedCategories,
    stars,
    subcategory,
    searchedBrands,
    searchedColors,
    searchedShipping,
  ]);

  const handlePriceSlider = (values) => {
    dispatch(searchAction({ price: values }));
  };

  const handleCategoryCheck = (e) => {
    if (searchedCategories.indexOf(e.target.value) > -1) {
      const filteredCategories = searchedCategories.filter(
        (categoryId) => categoryId !== e.target.value
      );
      dispatch(searchAction({ categories: filteredCategories }));
    } else {
      dispatch(
        searchAction({ categories: [...searchedCategories, e.target.value] })
      );
    }
  };

  const handleStarClick = (n) => {
    dispatch(searchAction({ stars: n }));
  };

  const handleSubcategory = (id) => {
    dispatch(searchAction({ subcategory: id }));
  };

  const handleBrandChange = (e) => {
    if (searchedBrands.indexOf(e.target.value) > -1) {
      const filteredBrands = searchedBrands.filter(
        (brand) => brand !== e.target.value
      );
      dispatch(searchAction({ brands: filteredBrands }));
    } else {
      dispatch(searchAction({ brands: [...searchedBrands, e.target.value] }));
    }
  };

  const handleColorChange = (e) => {
    if (searchedColors.indexOf(e.target.value) > -1) {
      const filteredColors = searchedColors.filter(
        (color) => color !== e.target.value
      );
      dispatch(searchAction({ colors: filteredColors }));
    } else {
      dispatch(searchAction({ colors: [...searchedColors, e.target.value] }));
    }
  };

  const handleShippingChange = (e) => {
    dispatch(searchAction({ shipping: e.target.value }));
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Search/Filter</h4>
          <hr />

          <Menu defaultOpenKeys={['1', '2', '3', '4']} mode='inline'>
            <SubMenu
              key='1'
              title={
                <span className='h6'>
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className='ml-4 mr-4'
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handlePriceSlider}
                  max='4999'
                />
              </div>
            </SubMenu>

            <SubMenu
              key='2'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ maringTop: '-10px' }}>
                {categories.map(({ _id, name }) => (
                  <div key={_id}>
                    <Checkbox
                      name='category'
                      value={_id}
                      onChange={handleCategoryCheck}
                      className='pb-2 pl-4 pr-4'
                      checked={searchedCategories.includes(_id)}
                    >
                      {name}
                    </Checkbox>
                    <br />
                  </div>
                ))}
              </div>
            </SubMenu>

            <SubMenu
              key='3'
              title={
                <span className='h6'>
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ maringTop: '-10px' }}>
                {
                  <div className='pr-4 pl-4 pb-2'>
                    {new Array(5)
                      .fill(undefined)
                      .map((_, idx) => idx + 1)
                      .reverse()
                      .map((el) => (
                        <Star
                          key={el}
                          starClick={handleStarClick}
                          numberOfStars={el}
                        />
                      ))}
                  </div>
                }
              </div>
            </SubMenu>

            <SubMenu
              key='4'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div style={{ maringTop: '-10px' }} className='pl-4 pr-4'>
                {subcategories.map(({ _id, name }) => (
                  <div
                    key={_id}
                    onClick={() => handleSubcategory(_id)}
                    className={`p-1 m-1 badge ${
                      subcategory === _id ? 'badge-primary' : 'badge-secondary'
                    }`}
                    style={{ cursor: 'pointer' }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </SubMenu>

            <SubMenu
              key='5'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ maringTop: '-10px' }}>
                {BRANDS_LIST.map((brand) => (
                  <div key={brand}>
                    <Checkbox
                      name='brand'
                      value={brand}
                      onChange={handleBrandChange}
                      className='pb-2 pl-4 pr-4'
                      checked={searchedBrands.includes(brand)}
                    >
                      {brand}
                    </Checkbox>
                    <br />
                  </div>
                ))}
              </div>
            </SubMenu>

            <SubMenu
              key='6'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div style={{ maringTop: '-10px' }}>
                {COLORS_LIST.map((color) => (
                  <div key={color}>
                    <Checkbox
                      name='color'
                      value={color}
                      onChange={handleColorChange}
                      className='pb-2 pl-4 pr-4'
                      checked={searchedColors.includes(color)}
                    >
                      {color}
                    </Checkbox>
                    <br />
                  </div>
                ))}
              </div>
            </SubMenu>

            <SubMenu
              key='7'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div style={{ maringTop: '-10px' }} className='pr-5'>
                {Object.values(SHIPPING_OPTIONS).map((ship) => (
                  <Radio
                    key={ship}
                    value={ship}
                    name={ship}
                    checked={ship === searchedShipping}
                    onChange={handleShippingChange}
                    className='pb-1 pl-4 pr-4'
                  >
                    {ship}
                  </Radio>
                ))}
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className='col-md-9'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4 className='text-danger'>Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className='row pb-5'>
            {products.map((product) => (
              <div key={product._id} className='col-md-4 mt-3'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
