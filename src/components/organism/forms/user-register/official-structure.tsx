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
import TextFieldDefault from '../../../molecules/text-field/default';
import SelectDefault from '../../../molecules/select/default';
import CheckboxDefault from '../../../molecules/checkbox/default';

interface OfficialStructureProps {
  name: string; // Parent name for the array
}

const positions = [
  { label: 'Manager', value: 'Manager' },
  { label: 'Supervisor', value: 'Supervisor' },
  { label: 'Staff', value: 'Staff' },
];

const roles = [
  { label: 'Senior Software Developer', value: 'Senior Software Developer' },
  { label: 'Junior Software Developer', value: 'Junior Software Developer' },
];

const OfficialStructureTable: React.FC<OfficialStructureProps> = ({ name }) => {
  const { control, formState: { errors } } = useFormContext(); // Fixed 'formState'

  // Safely check if errors.official_structure is an array
  const officialStructureErrors = Array.isArray(errors.official_structure)
    ? errors.official_structure
    : [];

  const { fields, append, remove } = useFieldArray({
    control,
    name, // Pass the parent name
  });

  const addNewOfficial = () => {
    append({ name: '', position: '', role: '', attached_appendix: false });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow className="w-full">
            <TableCell className="w-3/12">
              <p className="font-sans">Name</p>
            </TableCell>
            <TableCell className="w-3/12">
              <p className="font-sans">Position</p>
            </TableCell>
            <TableCell className="w-3/12">
              <p className="font-sans">Role</p>
            </TableCell>
            <TableCell className="w-2/12">
              <p className="font-sans">Attached Appendix</p>
            </TableCell>
            <TableCell className="w-2/12">
              <p className="font-sans">Action</p>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              {/* Nama Pejabat */}
              <TableCell>
              <TextFieldDefault 
                name={`${name}.${index}.name`}
                className="mt-6"
                errors={officialStructureErrors?.[index]?.name?.message}
              />
              </TableCell>

              {/* Jabatan */}
              <TableCell>
              <SelectDefault 
                name={`${name}.${index}.position`} 
                options={positions}
                errors={officialStructureErrors?.[index]?.position?.message}
              />
              </TableCell>

              {/* Keterangan Pejabat */}
              <TableCell>
              <SelectDefault 
                name={`${name}.${index}.role`} 
                options={roles} 
                errors={officialStructureErrors?.[index]?.role?.message}
              />
              </TableCell>

              {/* Riwayat Pekerjaan */}
              <TableCell>
                <div className="flex justify-center items-center">
                  <CheckboxDefault 
                    name={`${name}.${index}.attached_appendix`} 
                  />
                </div>
              </TableCell>

              {/* Aksi */}
              <TableCell>
                <IconButton onClick={() => remove(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add New Official Button */}
      <div className="p-4 flex justify-end">
        <Button variant="contained" color="primary" onClick={addNewOfficial} startIcon={<span>+</span>}>
          Add Structure
        </Button>
      </div>
    </TableContainer>
  );
};

export default OfficialStructureTable;
