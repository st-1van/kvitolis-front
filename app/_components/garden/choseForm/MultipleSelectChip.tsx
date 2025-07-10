'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import type { FormData, Errors } from './types';

type Person = {
  name: string;
};

type Props = {
  personsList: Person[];
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  submitted: boolean;
  errors: Errors;
};

const MenuProps = {
  PaperProps: {
    style: {
      padding: '0.625rem 1.25rem',
      maxHeight: '450px',
    },
  },
};

export default function MultipleSelectChip({
  personsList,
  formData,
  setFormData,
  // submitted,
  // errors,
}: Props) {
  const [personName, setPersonName] = useState<string[]>(formData.personList || []);

  useEffect(() => {
    setPersonName(formData.personList || []);
  }, [formData.personList]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    const newValue = typeof value === 'string' ? value.split(',') : value;
    setPersonName(newValue);
    setFormData((prev) => ({ ...prev, personList: newValue }));
  };

  return (
    <FormControl sx={{ m: 1, width: '100%', position: 'relative' }}>
      <Select
        id="demo-multiple-chip"
        multiple
        displayEmpty
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput sx={{ padding: '.625rem 1.25rem' }} />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span style={{ color: '#999' }}>Оберіть діячів</span>;
          }

          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          );
        }}
        MenuProps={MenuProps}
      >
        {personsList.map((person) => (
          <MenuItem
            key={person.name}
            value={person.name}
            sx={{
              padding: '0.625rem 1.25rem',
              fontFamily: 'Montserrat',
              fontSize: '1.375rem',
              lineHeight: '3rem',
              minHeight: '0px',
            }}
          >
            {person.name}
          </MenuItem>
        ))}
      </Select>

      {personName.length > 0 && (
        <button
          type="button"
          onClick={() => {
            setPersonName([]);
            setFormData((prev) => ({ ...prev, personList: [] }));
          }}
          style={{
            position: 'absolute',
            right: '25px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            color: '#999',
          }}
          aria-label="Очистити вибране"
        >
          очистити
        </button>
      )}
    </FormControl>
  );
}
