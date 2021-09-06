import Jumbotron from '../components/cards/Jumbotron';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryList from '../components/category/CategoryList';
import SubcategoriesList from '../components/sub-categories/SubcategoriesList';
import { JUMBOTRON_TEXTS, PRODUCT_TYPES_FETCH } from '../constants';

const Home = () => {
  return (
    <>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron texts={JUMBOTRON_TEXTS} />
      </div>

      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
        New Arrivals
      </h4>
      <FeaturedProducts type={PRODUCT_TYPES_FETCH.NEWEST} />

      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
        Best Sellers
      </h4>
      <FeaturedProducts type={PRODUCT_TYPES_FETCH.BESTSELLING} />

      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
        Categories
      </h4>
      <CategoryList />

      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
        Sub Categories
      </h4>
      <SubcategoriesList />
    </>
  );
};

export default Home;
