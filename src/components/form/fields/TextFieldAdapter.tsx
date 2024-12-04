import { ReactNode, CSSProperties } from 'react';
import {
  Controller,
  FieldError,
  Control,
  FieldValues,
  Path,
} from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

interface TextFieldAdapterProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  type?: string;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
  icon?: ReactNode;
  styles?: CSSProperties;
  disabled?: boolean;
}

const TextFieldAdapter = <T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  multiline = false,
  minRows,
  maxRows,
  placeholder,
  icon,
  styles = {},
  disabled = false,
}: TextFieldAdapterProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { error, isTouched } = fieldState as {
          error?: FieldError;
          isTouched?: boolean;
        };

        return (
          <FormControl sx={{ width: '100%', marginBlock: 1, ...styles }}>
            <TextField
              slotProps={{
                htmlInput: { ...field, type },
                input: icon
                  ? {
                      endAdornment: (
                        <InputAdornment position='end' sx={{ padding: '8px' }}>
                          {icon}
                        </InputAdornment>
                      ),
                    }
                  : {},
              }}
              variant='standard'
              label={label}
              error={isTouched && Boolean(error)}
              helperText={isTouched && error?.message}
              multiline={multiline} // textarea type
              minRows={multiline && minRows ? minRows : undefined}
              maxRows={multiline && maxRows ? maxRows : undefined}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormControl>
        );
      }}
    />
  );
};

export default TextFieldAdapter;
