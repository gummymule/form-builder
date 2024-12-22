import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Checkbox,
  ListItemText,
  FormHelperText,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface MultiSelectWithChipsProps {
  name: string;
  label: string;
  options: { label: string; value: string | number }[];
  errors?: string;
}

const MultiSelectWithChips: React.FC<MultiSelectWithChipsProps> = ({
  name,
  label,
  options,
  errors,
}) => {
  const { control } = useFormContext();

  return (
    <FormControl fullWidth error={!!errors} margin="normal">
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            multiple
            renderValue={(selected) => (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {selected.map((value: string | number) => (
                  <Chip
                    key={value}
                    label={options.find((option) => option.value === value)?.label}
                  />
                ))}
              </div>
            )}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={field.value?.includes(option.value)} />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default MultiSelectWithChips;
