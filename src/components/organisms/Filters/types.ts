import { ChangeEvent } from 'react';

import { SelectChangeEvent } from '@mui/material';

export interface FiltersProps {
  selectedType: string;
  onSelectType: (e: SelectChangeEvent) => void;
  types: string[];
  onSearch: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  search: string;
  clearFilters: () => void;
}
