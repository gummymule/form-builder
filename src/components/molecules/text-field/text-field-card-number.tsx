import React from 'react';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { TextLabel } from '../../atoms/typographies/label';

interface TextFieldCardNumberProps {
  name: string; // Name for React Hook Form
  className?: string;
  label?: string; // Label for the input
  errors?: string; // Error message for validation
  disabled?: boolean; // Disable the input
  [key: string]: string | number | boolean | undefined; // Other props, excluding 'rules'
}

const TextFieldCardNumber: React.FC<TextFieldCardNumberProps> = ({
  name,
  className,
  label,
  errors,
  disabled = false,
  ...props
}) => {
  // Access React Hook Form context
  const { control } = useFormContext();

  return (
    <div className={`${className}`}>
      {label && <TextLabel>{label}</TextLabel>}
      <Controller
        name={name}
        control={control}
        defaultValue="" // Ensure the field is always controlled
        render={({ field }) => (
          <PatternFormat
            {...field}
            customInput={TextField}
            fullWidth
            variant="outlined"
            error={!!errors}
            helperText={errors}
            format="####-####-####-####" // Adds the "-" suffix for every 4 numbers
            disabled={disabled}
            inputMode="numeric"
            value={field.value || ''} // Ensure controlled value
            onValueChange={(values) => field.onChange(values.value)} // Update RHF value
            {...props}
          />
        )}
      />
    </div>
  );
};

export default TextFieldCardNumber;
