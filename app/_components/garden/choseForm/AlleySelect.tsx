'use client';
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';
import { AlleySelectProps } from './types';

const MenuProps = {
  PaperProps: {
    style: {
      padding: '0.625rem 1.25rem',
      maxHeight: '450px',
    },
  },
};

export default function AlleySelect({
    AlleyData,
    formData,
    setFormData,
    submitted,
    errors,
    handleAlleyChange,
  }: AlleySelectProps) {

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, alley: value }));
    handleAlleyChange(value);
  };

  return (
    <FormControl
      sx={{ width: '100%', marginBottom: '1rem' }}
      error={Boolean(errors.alley && submitted)}
    >
      <Select
        value={formData.alley || ''}
        onChange={handleChange}
        displayEmpty
        input={<OutlinedInput />}
        inputProps={{ 'aria-label': '' }}
        MenuProps={MenuProps}
      >
        <MenuItem value="" disabled>
          Оберіть алею
        </MenuItem>

        {AlleyData.map((alley) => (
          <MenuItem
            key={alley.slug}
            value={alley.title}
            sx={{
              padding: '0.625rem 1.25rem',
              fontFamily: 'Montserrat',
              fontSize: '1.375rem',
              lineHeight: '3rem',
              minHeight: '0px',
            }}
          >
            {alley.title}
          </MenuItem>
        ))}
      </Select>

      {errors.alley && submitted && (
        <Box sx={{ color: '#e53935', fontSize: '0.875rem', mt: '0.25rem' }}>
          {errors.alley}
        </Box>
      )}
    </FormControl>
  );
}
