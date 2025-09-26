'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import type { FormData, Errors } from './types';
import { X } from 'lucide-react';

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
  submitted,
  errors,
}: Props) {
  const searchParams = useSearchParams();
  const queriedNames = searchParams.get('names')?.split(',') || [];

  useEffect(() => {
    if ((!formData.chosenPersons || formData.chosenPersons.length === 0) && queriedNames.length) {
      setFormData((prev) => ({ ...prev, chosenPersons: queriedNames }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Всі доступні до вибору (ще не обрані)
  const availableToAdd = personsList
    .map(person => person.name)
    .filter(name => !(formData.chosenPersons || []).includes(name));

  // Зміна обраних (додає тільки нові)
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    const selected = typeof value === 'string' ? value.split(',') : value;
    // Додаємо тільки ті, котрих ще не було
    setFormData((prev) => ({
      ...prev,
      chosenPersons: [
        ...(prev.chosenPersons || []),
        ...selected.filter(name => !(prev.chosenPersons || []).includes(name))
      ]
    }));
  };

  // Видалення одного чіпа
  const handleDelete = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      chosenPersons: (prev.chosenPersons || []).filter(n => n !== name),
    }));
  };

  return (
    <FormControl sx={{ m: 1, width: '100%', position: 'relative' }}>
      {(formData.chosenPersons?.length ?? 0) > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1, mb: 2 }}>
          {formData.chosenPersons.map((value) => (
            <Chip
              key={value}
              label={value}
              onDelete={() => handleDelete(value)}
              deleteIcon={
                <X
                  size={16}
                  style={{ color: "#888" }}
                  aria-label={`Видалити ${value}`}
                />
              }
              sx={{ marginRight: "4px" }}
            />
          ))}
        </Box>
      )}
      <Select
        id="multiple-chip"
        multiple
        displayEmpty
        value={[]}
        onChange={handleChange}
        disabled={availableToAdd.length === 0}
        input={<OutlinedInput sx={{ padding: '.625rem 1.25rem' }} />}
        renderValue={() =>
          (formData.chosenPersons?.length ?? 0) === 0
            ? <span style={{ color: "#999" }}>Оберіть діячів</span>
            : <span style={{ color: "#999" }}>Додати ще діячів</span>
        }
        MenuProps={MenuProps}
      >
        {availableToAdd.map((name) => (
          <MenuItem
            key={name}
            value={name}
            sx={{
              padding: '0.625rem 1.25rem',
              fontFamily: 'Montserrat',
              fontSize: '1.375rem',
              lineHeight: '3rem',
              minHeight: '0px',
            }}
          >
            {name}
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