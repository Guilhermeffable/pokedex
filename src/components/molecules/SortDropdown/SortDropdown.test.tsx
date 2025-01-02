import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { dropdownOptions } from 'pages/MyPokedex/MyPodekex.utils';
import { SortingOptions } from 'pages/MyPokedex/types';

import SortDropdown from './SortDropdown';
import { SortDropdownProps } from './types';

const mockOptions = dropdownOptions;

const renderComponent = (props: Partial<SortDropdownProps> = {}) => {
  const defaultProps: SortDropdownProps = {
    onSort: jest.fn(),
    sortingOption: SortingOptions.NAME_ASC,
    options: mockOptions,
    ...props
  };

  return render(<SortDropdown {...defaultProps} />);
};

test('renders SortDropdown component', () => {
  renderComponent();
  expect(screen.getByText('Sort:')).toBeInTheDocument();
  expect(screen.getByLabelText('Sort by')).toBeInTheDocument();
});

test('renders all options', () => {
  const { getByRole } = renderComponent();
  fireEvent.mouseDown(screen.getByLabelText('Sort by'));

  expect(getByRole('listbox').childNodes.length).toBe(mockOptions.length);
});

test('calls onSort when an option is selected', () => {
  const onSortMock = jest.fn();
  renderComponent({ onSort: onSortMock });

  fireEvent.mouseDown(screen.getByLabelText('Sort by'));
  screen.getAllByRole('option')[1].click();

  expect(onSortMock).toHaveBeenCalledTimes(1);
});
