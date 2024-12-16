import { type CSSProperties } from "react";
import {
  Controller,
  Control,
  FieldValues,
  FieldError,
  Path,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";

interface CheckboxAdapterProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  styles?: CSSProperties;
}

const CheckboxAdapter = <T extends FieldValues>({
  control,
  name,
  label,
  styles = {},
}: CheckboxAdapterProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { error } = fieldState as { error?: FieldError };

        return (
          <FormControl
            sx={{ width: "100%", marginBlock: 1, ...styles }}
            error={Boolean(error)}
          >
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value || false} />}
              label={label}
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: (theme) => theme.typography.caption,
                },
              }}
            />

            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
};

export default CheckboxAdapter;
