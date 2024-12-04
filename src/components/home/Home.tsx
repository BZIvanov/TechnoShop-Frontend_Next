import { FC } from 'react';

import TypeWriterText from '@/components/common/texts/TypeWriterText';
import ProductsSection from './ProductsSection';
import CategoriesSection from './CategoriesSection';
import SubcategoriesSection from './SubcategoriesSection';
import { TYPEWRITER_TEXTS } from './constants';

const Home: FC = () => {
  return (
    <>
      <TypeWriterText texts={TYPEWRITER_TEXTS} />

      <ProductsSection header={TYPEWRITER_TEXTS[0]} sortColumn='createdAt' />

      <ProductsSection header={TYPEWRITER_TEXTS[1]} sortColumn='sold' />

      <CategoriesSection />

      <SubcategoriesSection />
    </>
  );
};

export default Home;
