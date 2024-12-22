import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormHelperText, FormGroup } from '@mui/material';

interface CheckboxProps {
  name: string;
  label?: string;
  errors?: string;
}

const CheckboxDefault: React.FC<CheckboxProps> = ({ name, label, errors }) => {
  const { control } = useFormContext();

  return (
    <FormGroup>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!value}
                  onChange={(e) => onChange(e.target.checked)}
                />
              }
              label={label}
            />
            {errors && <FormHelperText error>{errors}</FormHelperText>}
          </>
        )}
      />
    </FormGroup>
  );
};

export default CheckboxDefault;
