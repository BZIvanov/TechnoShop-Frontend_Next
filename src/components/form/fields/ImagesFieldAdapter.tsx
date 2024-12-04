import Dropzone, { FileRejection, Accept } from 'react-dropzone';
import {
  Controller,
  FieldValues,
  Control,
  UseFormSetError,
  UseFormClearErrors,
  Path,
} from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface ImagesFieldAdapterProps<
  TFieldValues extends FieldValues = FieldValues
> {
  control: Control<TFieldValues>;
  setError: UseFormSetError<TFieldValues>;
  clearErrors: UseFormClearErrors<TFieldValues>;
  name: Path<TFieldValues>;
  maxFiles?: number;
  keepPreviousUploads?: boolean;
}

const ImagesFieldAdapter = <TFieldValues extends FieldValues = FieldValues>({
  control,
  setError,
  clearErrors,
  name,
  maxFiles = 0,
  keepPreviousUploads = false,
}: ImagesFieldAdapterProps<TFieldValues>) => {
  const imageAccept: Accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'],
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState }) => {
        const onChangeDroppedImages = (files: File[]) => {
          clearErrors(name);

          if (keepPreviousUploads) {
            const valueArray = Array.isArray(value) ? value : [value];
            onChange([...valueArray, ...files]);
          } else {
            onChange(files);
          }
        };

        const onErrorDroppedImages = (rejectedFiles: FileRejection[]) => {
          if (rejectedFiles.length > 0) {
            const errorMessage =
              rejectedFiles[0]?.errors[0]?.message || 'File upload error';
            setError(name, { type: 'custom', message: errorMessage });
          }
        };

        return (
          <FormControl sx={{ width: '100%' }}>
            <Dropzone
              onDrop={onChangeDroppedImages}
              onDropRejected={onErrorDroppedImages}
              maxFiles={maxFiles}
              accept={imageAccept}
            >
              {({ getRootProps, getInputProps }) => (
                <Paper
                  variant='outlined'
                  sx={{
                    backgroundColor: (theme) => theme.palette.grey[200],
                    textAlign: 'center',
                    cursor: 'pointer',
                    color: (theme) => theme.palette.text.secondary,
                    padding: (theme) => theme.spacing(1),
                  }}
                  {...getRootProps()}
                >
                  <CloudUploadIcon
                    sx={{ color: (theme) => theme.palette.text.secondary }}
                    fontSize='large'
                  />
                  <input
                    data-testid='input-file'
                    {...getInputProps()}
                    name={name}
                    onBlur={onBlur}
                  />
                  <Typography variant='body2'>
                    Drag and drop images here, or click to select
                  </Typography>
                </Paper>
              )}
            </Dropzone>

            {fieldState.error && (
              <FormHelperText
                sx={{ margin: 0 }}
                error={Boolean(fieldState.error)}
              >
                {fieldState.error.message}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default ImagesFieldAdapter;
