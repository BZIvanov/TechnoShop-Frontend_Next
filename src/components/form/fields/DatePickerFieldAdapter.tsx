import { Controller, Control, FieldValues, Path } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

type DatePickerFieldAdapterProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disablePast?: boolean;
};

const DatePickerFieldAdapter = <T extends FieldValues>({
  control,
  name,
  label,
  disablePast,
}: DatePickerFieldAdapterProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...restField }, fieldState }) => {
        return (
          <FormControl sx={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={label}
                value={value || null}
                onChange={(newValue) => {
                  onChange(newValue);
                }}
                slotProps={{
                  textField: {
                    variant: "standard",
                    // the error will appear after the form is submitted, this is because react-hook-form date adapter, which will delay the validation
                    error: Boolean(fieldState.error),
                    helperText: fieldState.error?.message,
                  },
                }}
                disablePast={disablePast}
                {...restField}
              />
            </LocalizationProvider>
          </FormControl>
        );
      }}
    />
  );
};

export default DatePickerFieldAdapter;
