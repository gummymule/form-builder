import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
} from '@mui/material';
import { TextLabel } from '../../atoms/typographies/label';

interface SelectDefaultProps {
  name: string;
  label?: string;
  options: { label: string; value: string | number }[];
  errors?: string;
}

const SelectDefault: React.FC<SelectDefaultProps> = ({
  name,
  label,
  options,
  errors,
}) => {
  const { control } = useFormContext();

  return (
    <FormControl fullWidth error={!!errors} margin="normal">
      <TextLabel>{label}</TextLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select {...field} value={field.value !== undefined ? field.value : ""}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default SelectDefault;
