import { SortDropdownProps } from 'components/molecules/SortDropdown/types';

import { FiltersProps } from '../Filters/types';

export interface PokedexViewMobileProps {
  isTableView: boolean;
  setIsTableView: (value: boolean) => void;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
  filterProps: FiltersProps;
  sortProps: SortDropdownProps;
}

export type PokedexViewDesktopProps = Omit<PokedexViewMobileProps, 'filterProps' | 'showDrawer' | 'setShowDrawer'>;
