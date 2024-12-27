import React, { useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectDefault from '../../../molecules/select/default';
import TextFieldPrefixNumber from '../../../molecules/text-field/prefix-for-number';
import { TextLabel } from '../../../atoms/typographies/label';

const currencies = [
  { label: 'IDR', value: 'IDR' },
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'JPY', value: 'JPY' },
  { label: 'GBP', value: 'GBP' },
];

const titleCurrencyKurs = [
  { label: 'Currency' },
  { label: 'Kurs' },
  { label: 'Action' },
];

interface CurrencyKursProps {
  name: string; // Parent name for the array
}

const CurrencyKursSection: React.FC<CurrencyKursProps> = ({ name }) => {
  const { control, setValue, formState: { errors } } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name, // Pass the parent name
  });

  const watchedCurrencies = useWatch({
    control,
    name, // Watch the entire array
  });

  const currencyKursErrors = Array.isArray(errors.currency_kurs)
    ? errors.currency_kurs
    : [];

  const addNewCurrency = () => {
    append({ currency: '', kurs: '' });
  };

  useEffect(() => {
    if (watchedCurrencies) {
      watchedCurrencies.forEach((currencyItem: { currency: string; kurs: number }, index: number) => {
        if (currencyItem?.currency === 'IDR' && currencyItem?.kurs !== 1) {
          setValue(`${name}.${index}.kurs`, 1);
        }
      });
    }
  }, [watchedCurrencies, name, setValue]);

  return (
    <div className="w-full px-3">
      <div className="flex items-center justify-between gap-4">
        {titleCurrencyKurs.map((title, index) => (
          <div
            className={`col-span-1 ${
              title.label === 'Action' ? 'w-2/12 text-center' : 'w-5/12'
            }`}
            key={index}
          >
            <TextLabel>{title.label}</TextLabel>
          </div>
        ))}
      </div>
      {fields.map((field, index) => (
        <div className="flex gap-4" key={field.id}>
          {/* Currency Selection */}
          <div className="col-span-1 w-5/12">
            <SelectDefault
              name={`${name}.${index}.currency`}
              options={currencies}
              errors={currencyKursErrors?.[index]?.currency?.message}
            />
          </div>
          {/* Kurs Field */}
          <div className="col-span-1 w-5/12">
            <TextFieldPrefixNumber
              name={`${name}.${index}.kurs`}
              prefix="Rp"
              prefixPosition="start"
              textAlign="left"
              className="py-6"
              errors={currencyKursErrors?.[index]?.kurs?.message}
              disabled={watchedCurrencies?.[index]?.currency === 'IDR'}
            />
          </div>
          {/* Action */}
          <div className="col-span-1 w-2/12 py-3 my-auto items-center flex justify-center">
            <div className="flex flex-col items-center">
              <IconButton
                onClick={() => remove(index)}
                color="error"
                disabled={index === 0}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </div>
      ))}

      {/* Add New Currency Button */}
      <div className="p-4 flex justify-end">
        <Button
          variant="contained"
          color="primary"
          onClick={addNewCurrency}
          startIcon={<span>+</span>}
        >
          Add Currency
        </Button>
      </div>
    </div>
  );
};

export default CurrencyKursSection;
