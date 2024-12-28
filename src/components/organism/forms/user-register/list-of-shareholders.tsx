import React from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
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
import TextFieldDefault from '../../../molecules/text-field/default';
import TextFieldPrefixNumber from '../../../molecules/text-field/prefix-postfix-number';

interface ListOfShareholdersProps {
  name: string; // Parent name for the array
}

const ListOfShareholdersTable: React.FC<ListOfShareholdersProps> = ({ name }) => {
  const { control, formState: { errors } } = useFormContext(); // Fixed 'formState'

  const { fields, append, remove } = useFieldArray({
    control,
    name, // Pass the parent name
  });

  const listShareholdersErrors = Array.isArray(errors.list_shareholders)
    ? errors.list_shareholders
    : [];

  // Watch the shareholding values to calculate the total
  const shareholdings = useWatch({
    control,
    name, // Watch the array
  });

  const totalShareholding = shareholdings?.reduce(
    (total: number, item: { shareholding: string; }) => total + (parseFloat(item.shareholding) || 0),
    0
  );

  const addNewShareholders = () => {
    append({ name: '', shareholding: '' });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell>
              <p className="font-sans">Name</p>
            </TableCell>
            <TableCell>
              <p className="font-sans">Shareholding (%)</p>
            </TableCell>
            <TableCell>
              <p className="font-sans">Action</p>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              {/* Name */}
              <TableCell>
                <TextFieldDefault 
                  name={`${name}.${index}.name`}
                  className="mt-5"
                  errors={listShareholdersErrors?.[index]?.name?.message}
                />
              </TableCell>
              {/* Shareholding */}
              <TableCell>
                <TextFieldPrefixNumber
                  name={`${name}.${index}.shareholding`}
                  className="mt-3.5"
                  prefix="%"
                  prefixPosition="end"
                  textAlign="right"
                  errors={listShareholdersErrors?.[index]?.shareholding?.message}
                />
              </TableCell>
              {/* Action */}
              <TableCell>
                <IconButton onClick={() => remove(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {/* Total Row */}
          <TableRow>
            <TableCell colSpan={1}>
              <p className="font-sans">Total</p>
            </TableCell>
            <TableCell align="right" sx={{  paddingRight: '32px', fontSize: '16px' }}>
              {totalShareholding.toFixed(2)} %
            </TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>

      {/* Add New Shareholders Button */}
      <div className="p-4 flex justify-end">
        <Button
          variant="contained"
          color="primary"
          onClick={addNewShareholders}
          startIcon={<span>+</span>}
        >
          Add Shareholding
        </Button>
      </div>
    </TableContainer>
  );
};

export default ListOfShareholdersTable;
