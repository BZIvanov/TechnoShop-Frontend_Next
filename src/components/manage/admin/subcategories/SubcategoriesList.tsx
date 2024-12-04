import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import { GroupedSubcategoriesResponse } from '@/providers/store/services/types/subcategories';
import { useConfirmDialog } from '@/providers/custom-providers/confirm-dialog/useConfirmDialog';
import SubcategorySearch from './SubcategorySearch';
import { SelectedSubcategory } from './ManageSubcategory';

interface SubcategoriesListProps {
  groupedSubcategories: GroupedSubcategoriesResponse['subcategories'];
  handleSelectSubcategory: (selectedValue: SelectedSubcategory) => void;
  deleteSubcategory: (subcategoryId: string) => void;
}

const SubcategoriesList: FC<SubcategoriesListProps> = ({
  groupedSubcategories = [],
  handleSelectSubcategory,
  deleteSubcategory,
}) => {
  const [filterCategoryText, setFilterCategoryText] = useState<string>('');
  const handleFilterCategoryText = (filterValue: string) => {
    setFilterCategoryText(filterValue);
  };

  const [filterSubcategoryText, setFilterSubcategoryText] =
    useState<string>('');
  const handleFilterSubcategoryText = (filterValue: string) => {
    setFilterSubcategoryText(filterValue);
  };

  const { openDialog, closeDialog } = useConfirmDialog();

  const handleSubcategoryDelete = (subcategoryId: string) => () => {
    closeDialog();

    deleteSubcategory(subcategoryId);
  };

  return (
    <Box>
      <Typography variant='h5'>Subcategories List</Typography>

      <SubcategorySearch
        filterCategoryText={filterCategoryText}
        handleFilterCategoryText={handleFilterCategoryText}
        filterSubcategoryText={filterSubcategoryText}
        handleFilterSubcategoryText={handleFilterSubcategoryText}
      />

      {groupedSubcategories.length > 0 ? (
        groupedSubcategories
          .filter(({ categoryName }) =>
            categoryName
              .toLowerCase()
              .includes(filterCategoryText.toLowerCase())
          )
          .map((categoryGroup) => {
            const {
              _id: groupCategoryId,
              categoryName,
              subcategories,
            } = categoryGroup;

            return (
              <Paper key={groupCategoryId} sx={{ margin: 0.5, padding: 1 }}>
                <Typography variant='body1'>{categoryName}</Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: 1 }}>
                  {subcategories
                    .filter(({ name }) =>
                      name
                        .toLowerCase()
                        .includes(filterSubcategoryText.toLowerCase())
                    )
                    .map(({ _id: subcategoryId, name, categoryId }) => {
                      return (
                        <Chip
                          key={subcategoryId}
                          label={name}
                          sx={{ margin: '4px' }}
                          onClick={() => {
                            handleSelectSubcategory({
                              _id: subcategoryId,
                              name,
                              categoryId: categoryId as string, // cast as string, because here we will have mongoose not populated data
                            });
                          }}
                          onDelete={() =>
                            openDialog({
                              text: 'Are you sure you want to delete this subcategory?',
                              onConfirm: handleSubcategoryDelete(subcategoryId),
                            })
                          }
                        />
                      );
                    })}
                </Box>
              </Paper>
            );
          })
      ) : (
        <Typography variant='subtitle2'>
          No subcategories. Use the form above to create some.
        </Typography>
      )}
    </Box>
  );
};

export default SubcategoriesList;
