import React from 'react';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TextLabel } from '../../atoms/typographies/label';

type HookFormTextFieldProps = {
  name: string;
  label?: string;
  variant?: "outlined" | "filled" | "standard";
  rows?: number;
  defaultValue?: string;
  className?: string;
  errors?: string; // Add errors as an optional prop
};

const TextFieldDefault: React.FC<HookFormTextFieldProps> = ({
  name,
  label,
  variant = "outlined",
  rows = 1,
  defaultValue = '',
  className,
  errors,
}) => {
  const { control } = useFormContext();

  return (
    <div className={`${className}`}>
      <TextLabel>{label}</TextLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextField
            {...field}
            variant={variant}
            multiline={rows > 1}
            rows={rows}
            error={!!errors}
            helperText={errors || ''}
            fullWidth
          />
        )}
      />
    </div>
  );
};


export default TextFieldDefault;
