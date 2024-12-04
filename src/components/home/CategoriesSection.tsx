import { FC } from 'react';

import { useGetCategoriesQuery } from '@/providers/store/services/categories';
import ChipsList from '@/components/common/lists/ChipsList';

const CategoriesSection: FC = () => {
  const { data } = useGetCategoriesQuery();

  return (
    <ChipsList
      title='Categories'
      parameter='category'
      chipsList={data?.categories || []}
    />
  );
};

export default CategoriesSection;
