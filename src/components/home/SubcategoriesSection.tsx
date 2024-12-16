import { type FC } from "react";

import { useGetSubcategoriesQuery } from "@/providers/store/services/subcategories";
import ChipsList from "@/components/common/lists/ChipsList";

const SubcategoriesSection: FC = () => {
  const { data } = useGetSubcategoriesQuery();

  return (
    <ChipsList
      title="Subcategories"
      parameter="subcategory"
      chipsList={data?.subcategories || []}
    />
  );
};

export default SubcategoriesSection;
