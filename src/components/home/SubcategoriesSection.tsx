import { useGetSubcategoriesQuery } from "@/providers/store/services/subcategories";
import ChipsList from "@/components/common/lists/ChipsList";

const SubcategoriesSection = () => {
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
