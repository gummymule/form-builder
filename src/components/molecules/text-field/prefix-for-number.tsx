import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { TextLabel } from '../../atoms/typographies/label';

interface TextFieldPrefixNumberProps {
  name: string; // Name for React Hook Form
  className?: string;
  label?: string; // Label for the input
  prefix?: string; // Prefix to display (e.g., "$")
  prefixPosition?: 'start' | 'end'; // Position of the prefix
  textAlign?: 'left' | 'right'; // Text alignment
  errors?: string; // Error message for validation
  decimalScale?: number; // Number of decimal places
  allowNegative?: boolean; // Allow negative values
  thousandSeparator?: boolean; // Add thousand separator
  disabled?: boolean; // Disable the input
}

const TextFieldPrefixNumber: React.FC<TextFieldPrefixNumberProps> = ({
  name,
  className,
  label,
  prefix,
  prefixPosition = 'start',
  textAlign = 'right',
  errors,
  decimalScale = 2,
  allowNegative = false,
  thousandSeparator = true,
  disabled = false,
}) => {
  const { control } = useFormContext();

  return (
    <div className={`${className}`}>
      <TextLabel>{label}</TextLabel>
      <Controller
        name={name}
        control={control}
        defaultValue="" // Ensure the field is always controlled
        render={({ field }) => (
          <NumericFormat
            {...field}
            customInput={TextField}
            value={field.value || ''} // Ensure controlled value
            fullWidth
            variant="outlined"
            error={!!errors}
            helperText={errors}
            decimalScale={decimalScale}
            allowNegative={allowNegative}
            thousandSeparator={thousandSeparator}
            disabled={disabled}
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
