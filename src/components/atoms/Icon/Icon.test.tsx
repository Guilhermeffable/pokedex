import React from 'react';

import '@testing-library/jest-dom';

import { render, fireEvent } from '@testing-library/react';

import Icon from './Icon';
import { getTypeIcon } from './Icon.utils';

jest.mock('utils/generic', () => ({
  capitalizeFirstLetter: jest.fn((str: string) => str.charAt(0).toUpperCase() + str.slice(1))
}));

jest.mock('./Icon.utils', () => ({
  getTypeIcon: jest.fn((type) => <svg data-testid='icon-svg'>{type}</svg>)
}));

describe('Icon component', () => {
  it('renders correctly', () => {
    const { container } = render(<Icon type='bug' />);
    const icon = container.querySelector('.icon');

    expect(icon).toBeInTheDocument();
  });

  it('displays tooltip on hover', async () => {
    const { getByTestId, findByText } = render(<Icon type='bug' />);
    const iconElement = getByTestId('icon-svg');

    fireEvent.mouseOver(iconElement);

    const tooltip = await findByText('Bug');
    expect(tooltip).toBeInTheDocument();
  });
  it('has the correct class name', () => {
    const { container } = render(<Icon type='bug' />);
    const spanElement = container.querySelector('span');
    expect(spanElement).toHaveClass('icon icon--bug');
  });

  it('calls getTypeIcon with the correct type', () => {
    render(<Icon type='bug' />);
    expect(getTypeIcon).toHaveBeenCalledWith('bug');
  });
});
