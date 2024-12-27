import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectDefault from '../../../molecules/select/default';
import TextFieldPrefixNumber from '../../../molecules/text-field/prefix-for-number';

interface FacilitiesFormProps {
  name: string; // Parent name for the array
}

const facilityOptions = [
  { label: 'Trade Finance Line', value: 'Trade Finance Line' },
  { label: 'Money Market Line', value: 'Money Market Line' },
  { label: 'Repo Line', value: 'Repo Line' },
  { label: 'Forex Line', value: 'Forex Line' },
  { label: 'Security Line', value: 'Security Line' },
  { label: 'Nostro Line', value: 'Nostro Line' },
  { label: 'Trade Finance Non Revolving', value: 'Trade Finance Non Revolving' },
  { label: 'Bank Loan', value: 'Bank Loan' },
];

const FacilitiesForm: React.FC<FacilitiesFormProps> = ({ name }) => {
  const { control, formState: { errors }, watch } = useFormContext(); // Fixed 'formState'
  const currencyKurs = watch('currency_kurs'); // Watch the parent `currency_kurs` field

  // Safely check if errors.facility_loan is an array
  const facilityFormErrors = Array.isArray(errors.facility_loan)
    ? errors.facility_loan
    : [];

  const { fields, append, remove } = useFieldArray({
    control,
    name, // Pass the parent name
  });

  // Generate currency options from currency_kurs
  const currencies = currencyKurs?.map((item: { currency: string }) => ({
    label: item.currency,
    value: item.currency,
  })) || [];

  const addNewFacility = () => {
    append({ facility_type: '', currency: '', limit: 0, exposure: 0, final_exposure: 0 });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow className="w-full">
            <TableCell className="w-2/12">
              <p className="font-sans text-center">Facility Type</p>
            </TableCell>
            <TableCell className="w-2/12">
              <p className="font-sans text-center">Currency</p>
            </TableCell>
            <TableCell className="w-2/12">
              <p className="font-sans text-center">Limit</p>
            </TableCell>
            <TableCell className="w-2/12">
              <p className="font-sans text-center">Exposure</p>
            </TableCell>
            <TableCell className="w-2/12">
              <p className="font-sans text-center">Final Exposure</p>
            </TableCell>
            <TableCell className="w-2/12">
              <p className="font-sans text-center">Action</p>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              {/* Facility Type */}
              <TableCell>
                <SelectDefault 
                  name={`${name}.${index}.facility_type`} 
                  options={facilityOptions}
                  errors={facilityFormErrors?.[index]?.facility_type?.message}
                />
              </TableCell>

              {/* Currency */}
              <TableCell>
                <SelectDefault 
                  name={`${name}.${index}.currency`} 
                  options={currencies} 
                  errors={facilityFormErrors?.[index]?.currency?.message}
                />
              </TableCell>

              {/* Limit */}
              <TableCell>
                <TextFieldPrefixNumber
                  name={`${name}.${index}.limit`}
                  textAlign="right"
                  className="mt-6"
                  errors={facilityFormErrors?.[index]?.limit?.message}
                />
              </TableCell>

              {/* Exposure */}
              <TableCell>
                <TextFieldPrefixNumber
                  name={`${name}.${index}.exposure`}
                  textAlign="right"
                  className="mt-6"
                  errors={facilityFormErrors?.[index]?.exposure?.message}
                />
              </TableCell>
              {/* Limit */}
              <TableCell>
                <TextFieldPrefixNumber
                  name={`${name}.${index}.final_exposure`}
                  textAlign="right"
                  className="mt-6"
                  errors={facilityFormErrors?.[index]?.final_exposure?.message}
                />
              </TableCell>

              {/* Aksi */}
              <TableCell>
                <div className="flex justify-center items-center">
                  <IconButton onClick={() => remove(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add New Official Button */}
      <div className="p-4 flex justify-end">
        <Button variant="contained" color="primary" onClick={addNewFacility} startIcon={<span>+</span>}>
          Add Facility
        </Button>
      </div>
    </TableContainer>
  );
};

export default FacilitiesForm;
