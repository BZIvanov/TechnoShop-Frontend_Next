import { useState, useEffect } from 'react';
import { getProductsByCount } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import Jumbotron from '../components/cards/Jumbotron';
import LoadingCard from '../components/cards/LoadingCard';

const PAGE_PRODUCTS_COUNT = 3;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(PAGE_PRODUCTS_COUNT)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
      </div>

      <div className='container'>
        {loading ? (
          <LoadingCard count={PAGE_PRODUCTS_COUNT} />
        ) : (
          <div className='row'>
            {products.map((product) => (
              <div key={product._id} className='col-md-4'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
