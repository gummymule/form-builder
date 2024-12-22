import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface TextFieldPrefixNumberProps {
  name: string; // Name for React Hook Form
  className?: string;
  label?: string; // Label for the input
  prefix?: string; // Prefix to display (e.g., "$")
  prefixPosition?: 'start' | 'end'; // Position of the prefix
  textAlign?: 'left' | 'right'; // Text alignment
  errors?: string; // Error message for validation
}

const TextFieldPrefixNumber: React.FC<TextFieldPrefixNumberProps> = ({
  name,
  className,
  label,
  prefix,
  prefixPosition = 'start',
  textAlign = 'right',
  errors,
}) => {
  const { control } = useFormContext();

  return (
    <div className={`${className}`}>
      <Controller
        name={name}
        control={control}
        defaultValue="" // Ensure the field is always controlled
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''} // Ensure controlled value
            label={label}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors}
            helperText={errors}
            InputProps={{
              inputProps: {
                style: { textAlign }, // Custom text alignment
              },
              startAdornment:
                prefix && prefixPosition === 'start' ? (
                  <InputAdornment position="start">{prefix}</InputAdornment>
                ) : undefined,
              endAdornment:
                prefix && prefixPosition === 'end' ? (
                  <InputAdornment position="end">{prefix}</InputAdornment>
                ) : undefined,
            }}
          />
        )}
      />
    </div>
  );
};

export default TextFieldPrefixNumber;
