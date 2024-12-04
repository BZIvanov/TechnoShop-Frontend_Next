import { FC } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

interface CategorySearchProps {
  filterCategoryText: string;
  handleFilterCategoryText: (value: string) => void;
}

const CategorySearch: FC<CategorySearchProps> = ({
  filterCategoryText,
  handleFilterCategoryText,
}) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <FormControl sx={{ width: '100%' }}>
        <TextField
          label='Search for a category'
          variant='standard'
          value={filterCategoryText}
          onChange={(event) => handleFilterCategoryText(event.target.value)}
        />
      </FormControl>
    </Box>
  );
};

export default CategorySearch;
