import { useState, CSSProperties } from "react";
import {
  Controller,
  FieldError,
  Control,
  FieldValues,
  Path,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface PasswordTextFieldAdapterProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  styles?: CSSProperties;
}

const PasswordTextFieldAdapter = <T extends FieldValues>({
  control,
  name,
  label,
  styles,
}: PasswordTextFieldAdapterProps<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

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
          <FormControl sx={{ width: "100%", marginBlock: 1, ...styles }}>
            <TextField
              slotProps={{
                htmlInput: { ...field },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              type={showPassword ? "text" : "password"}
              label={label}
              variant="standard"
              error={isTouched && Boolean(error)}
              helperText={isTouched && error?.message}
            />
          </FormControl>
        );
      }}
    />
  );
};

export default PasswordTextFieldAdapter;
