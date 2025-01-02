import { SelectChangeEvent } from '@mui/material';
import { SortingOptions } from 'pages/MyPokedex/types';

export interface SortDropdownProps {
  onSort: (e: SelectChangeEvent) => void;
  sortingOption?: SortingOptions;
}
