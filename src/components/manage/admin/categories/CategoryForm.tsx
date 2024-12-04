import { FC } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import TextFieldAdapter from '@/components/form/fields/TextFieldAdapter';
import ImagesFieldAdapter from '@/components/form/fields/ImagesFieldAdapter';
import PreviewImageAvatar from '@/components/common/images/PreviewImageAvatar';
import { resizeImage } from '@/utils/resizeImage';
import { CategoryFormData } from './categoryForm.schema';

interface CategoryFormProps {
  form: UseFormReturn<CategoryFormData>;
  resetForm: () => void;
  upsertCategory: (formData: FormData) => void;
  isSubmitting?: boolean;
  buttonLabel: string;
}

const CategoryForm: FC<CategoryFormProps> = ({
  form,
  resetForm,
  upsertCategory,
  isSubmitting,
  buttonLabel,
}) => {
  const onSubmit: SubmitHandler<CategoryFormData> = async (values) => {
    if (!values.categoryImage || values.categoryImage.length === 0) {
      throw new Error('No image provided');
    }

    const formData = new FormData();
    formData.append('categoryName', values.categoryName);

    const file = values.categoryImage[0];
    if (file instanceof File) {
      console.log('isFile');
      const resizedImage = await resizeImage(file, {
        maxWidth: 300,
        maxHeight: 300,
        compressFormat: 'png',
        outputType: 'file',
      });

      formData.append('categoryImage', resizedImage);
    }

    upsertCategory(formData);
  };

  const removeImage = () => {
    form.setValue('categoryImage', []);
  };

  const selectedFormImage = form.watch('categoryImage');

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Box my={1}>
        <TextFieldAdapter
          control={form.control}
          name='categoryName'
          label='Category Name'
        />

        <ImagesFieldAdapter
          control={form.control}
          setError={form.setError}
          clearErrors={form.clearErrors}
          name='categoryImage'
          maxFiles={1}
        />

        <Stack
          sx={{ marginTop: 3 }}
          spacing={2}
          direction='row'
          justifyContent='center'
        >
          {selectedFormImage.map((formImage, index) => {
            if (!formImage) {
              return null;
            }

            const imageKey =
              'imageUrl' in formImage ? formImage.imageUrl : `file-${index}`;

            return (
              <PreviewImageAvatar
                key={imageKey as string}
                image={formImage}
                removeImage={removeImage}
              />
            );
          })}
        </Stack>
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

export default CategoryForm;
