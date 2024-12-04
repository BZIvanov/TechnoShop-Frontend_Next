import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldError,
} from 'react-hook-form';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';

interface RatingFieldAdapterProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  precision?: number;
  size?: 'small' | 'medium' | 'large';
}

const RatingFieldAdapter = <T extends FieldValues>({
  control,
  name,
  label,
  precision = 1,
  size = 'large',
}: RatingFieldAdapterProps<T>): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const error = fieldState.error as FieldError | undefined;

        return (
          <>
            {label && (
              <Typography
                component='legend'
                variant='caption'
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {label}
              </Typography>
            )}
            <Rating
              name={field.name}
              value={field.value || 0}
              onChange={(_, newValue) => {
                field.onChange(newValue);
              }}
              precision={precision}
              size={size}
            />

            {error && (
              <FormHelperText error={Boolean(error)}>
                {error.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
};

export default RatingFieldAdapter;
