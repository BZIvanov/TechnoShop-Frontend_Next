import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { fetchProductsByFilter } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import Star from '../components/forms/Star';
import {
  getProductsAction,
  getAllCategoriesAction,
  getAllSubcategoriesAction,
  searchAction,
} from '../store/action-creators';

const { SubMenu } = Menu;

const brands = ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'];
const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];

const Shop = () => {
  const {
    text,
    price,
    categories: searchedCategories,
    stars,
  } = useSelector((state) => state.search);
  const { products } = useSelector((state) => state.product.allProducts);
  const { categories } = useSelector((state) => state.category);
  const { subcategories } = useSelector((state) => state.subcategory);
  const { loading } = useSelector((state) => state.apiCall);

  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [shipping, setShipping] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAction({ text }));
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
        })
      );
    }, 1000);

    return () => clearTimeout(throttle);
  }, [text, price, searchedCategories, stars]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      // setProducts(res.data);
    });
  };

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

  const showSubs = () =>
    subcategories.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className='p-1 m-1 badge badge-secondary'
        style={{ cursor: 'pointer' }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setBrand('');
    setColor('');
    setShipping('');

    fetchProducts({ sub });
  };

  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className='pb-1 pl-4 pr-4'
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setBrand(e.target.value);
    setColor('');
    setShipping('');
    fetchProducts({ brand: e.target.value });
  };

  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className='pb-1 pl-4 pr-4'
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setBrand('');
    setColor(e.target.value);
    setShipping('');
    fetchProducts({ color: e.target.value });
  };

  const showShipping = () => (
    <>
      <Checkbox
        className='pb-2 pl-4 pr-4'
        onChange={handleShippingchange}
        value='Yes'
        checked={shipping === 'Yes'}
      >
        Yes
      </Checkbox>

      <Checkbox
        className='pb-2 pl-4 pr-4'
        onChange={handleShippingchange}
        value='No'
        checked={shipping === 'No'}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setBrand('');
    setColor('');
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
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
                {showSubs()}
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
              <div style={{ maringTop: '-10px' }} className='pr-5'>
                {showBrands()}
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
              <div style={{ maringTop: '-10px' }} className='pr-5'>
                {showColors()}
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
                {showShipping()}
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
