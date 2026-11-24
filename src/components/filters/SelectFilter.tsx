
import { useId } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import type {
  FilterOption,
} from '../../types/DashboardTypes';

interface SelectFilterProps<T extends string | number> {
  label: string;
  value: T;
  options: FilterOption<T>[];
  onChange: (value: T) => void;
}

export default function SelectFilter<
  T extends string | number
>({
  label,
  value,
  options,
  onChange,
}: SelectFilterProps<T>) {

  const id = useId();

  return (
    <FormControl fullWidth size="small">

      <InputLabel id={`${id}-label`}>
        {label}
      </InputLabel>

      <Select
        labelId={`${id}-label`}
        id={id}
        label={label}
        value={String(value)}
        onChange={(event) => {

          const selectedOption = options.find(
            (option) =>
              String(option.value) === event.target.value
          );

          if (selectedOption) {
            onChange(selectedOption.value);
          }
        }}
        sx={{
          fontSize: '0.8rem',
          bgcolor: 'background.paper',
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={String(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>

    </FormControl>
  );
}
