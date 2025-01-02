import { SelectChangeEvent } from '@mui/material';
import { SortingOptions } from 'pages/MyPokedex/types';

export type Option = { value: SortingOptions; label: string };

export interface SortDropdownProps {
  onSort: (e: SelectChangeEvent) => void;
  sortingOption?: SortingOptions;
  options: Option[];
}
