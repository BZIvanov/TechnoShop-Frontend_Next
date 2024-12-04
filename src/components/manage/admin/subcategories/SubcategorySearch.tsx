import { FC } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

interface SubcategorySearchProps {
  filterCategoryText: string;
  handleFilterCategoryText: (text: string) => void;
  filterSubcategoryText: string;
  handleFilterSubcategoryText: (text: string) => void;
}

const SubcategorySearch: FC<SubcategorySearchProps> = ({
  filterCategoryText,
  handleFilterCategoryText,
  filterSubcategoryText,
  handleFilterSubcategoryText,
}) => {
  return (
    <Box
      sx={{
        marginBottom: 2,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <FormControl sx={{ flexGrow: 1 }}>
        <TextField
          label='Search for category'
          variant='standard'
          value={filterCategoryText}
          onChange={(event) => handleFilterCategoryText(event.target.value)}
        />
      </FormControl>
      <FormControl sx={{ flexGrow: 1 }}>
        <TextField
          label='Search for subcategory'
          variant='standard'
          value={filterSubcategoryText}
          onChange={(event) => handleFilterSubcategoryText(event.target.value)}
        />
      </FormControl>
    </Box>
  );
};

export default SubcategorySearch;
