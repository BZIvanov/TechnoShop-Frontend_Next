import { Controller, Control, FieldValues, Path } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

interface Option {
  _id: string | number;
  name: string;
}

type SelectDropdownAdapterProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  isDisabled?: boolean;
  options: (Option | string)[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extendedOnChange?: (event: SelectChangeEvent<any>) => void;
};

const SelectDropdownAdapter = <T extends FieldValues>({
  control,
  name,
  label,
  isDisabled,
  options,
  extendedOnChange,
}: SelectDropdownAdapterProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { onChange, ...rest } = field;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleOnChange = (event: SelectChangeEvent<any>) => {
          onChange(event.target.value);
          extendedOnChange?.(event);
        };

        return (
          <FormControl
            sx={{ width: "100%", marginBlock: 1 }}
            variant="standard"
            error={Boolean(fieldState.error)}
            disabled={isDisabled}
          >
            <InputLabel>{label}</InputLabel>

            <Select data-testid={name} {...rest} onChange={handleOnChange}>
              {options.map((option) => {
                if (typeof option === "string") {
                  return (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  );
                }

                return (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                );
              })}
            </Select>

            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default SelectDropdownAdapter;
