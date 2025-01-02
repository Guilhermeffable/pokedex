import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Filters from './Filters';

describe('Filters component', () => {
  const mockProps = {
    selectedType: '',
    onSelectType: jest.fn(),
    types: ['Fire', 'Water', 'Grass'],
    onSearch: jest.fn(),
    search: '',
    clearFilters: jest.fn()
  };

  it('renders correctly', () => {
    render(<Filters {...mockProps} />);
    expect(screen.getByText('Filters:')).toBeInTheDocument();
    expect(screen.getByText('Type:')).toBeInTheDocument();
    expect(screen.getByText('Search by name:')).toBeInTheDocument();
  });

  it('renders all type options', () => {
    render(<Filters {...mockProps} />);
    fireEvent.mouseDown(screen.getByLabelText('Type'));
    mockProps.types.forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  it('calls onSelectType when type is selected', () => {
    render(<Filters {...mockProps} />);
    fireEvent.mouseDown(screen.getByLabelText('Type'));
    fireEvent.click(screen.getByText('Fire'));
    expect(mockProps.onSelectType).toHaveBeenCalled();
  });

  it('calls onSearch when search input changes', () => {
    render(<Filters {...mockProps} />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Pikachu' } });
    expect(mockProps.onSearch).toHaveBeenCalled();
  });

  it('disables clear filters button when no filters are active', () => {
    render(<Filters {...mockProps} />);
    expect(screen.getByText('Clear filters')).toBeDisabled();
  });

  it('enables clear filters button when filters are active', () => {
    render(<Filters {...mockProps} search='Pikachu' selectedType='Fire' />);
    expect(screen.getByText('Clear filters')).toBeEnabled();
  });

  it('calls clearFilters when clear button is clicked', () => {
    render(<Filters {...mockProps} search='Pikachu' selectedType='Fire' />);
    fireEvent.click(screen.getByText('Clear filters'));
    expect(mockProps.clearFilters).toHaveBeenCalled();
  });
});
