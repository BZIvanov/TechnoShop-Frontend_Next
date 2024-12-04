import { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

import { Category } from '@/providers/store/services/types/categories';
import TextFieldAdapter from '@/components/form/fields/TextFieldAdapter';
import SelectDropdownAdapter from '@/components/form/fields/SelectDropdownAdapter';
import { SubcategoryFormData } from './subcategoryForm.schema';

interface SubcategoryFormProps {
  form: UseFormReturn<SubcategoryFormData>;
  resetForm: () => void;
  categories: Category[];
  upsertSubcategory: (formData: SubcategoryFormData) => void;
  isSubmitting?: boolean;
  buttonLabel: string;
}

const SubcategoryForm: FC<SubcategoryFormProps> = ({
  form,
  resetForm,
  categories = [],
  upsertSubcategory,
  isSubmitting,
  buttonLabel,
}) => {
  const onSubmit: SubmitHandler<SubcategoryFormData> = (values) => {
    upsertSubcategory(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Box my={1}>
        <SelectDropdownAdapter
          control={form.control}
          name='categoryId'
          label='Category'
          options={categories}
        />
      </Box>

      <Box my={1}>
        <TextFieldAdapter
          control={form.control}
          name='subcategoryName'
          label='Subcategory name'
        />
      </Box>

      <Box mt={2} ml={1}>
        <Button
          variant='contained'
          color='secondary'
          type='button'
          onClick={resetForm}
          disabled={isSubmitting}
        >
          Reset
        </Button>
        <Button
          sx={{ marginLeft: '5px' }}
          variant='contained'
          type='submit'
          disabled={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </Box>
    </form>
  );
};

export default SubcategoryForm;
