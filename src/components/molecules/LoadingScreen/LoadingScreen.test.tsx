import React from 'react';

import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import LoadingScreen from './LoadingScreen';

describe('LoadingScreen component', () => {
  it('renders correctly when open is true', async () => {
    const { findByText } = render(<LoadingScreen open />);
    const title = await findByText(/Your file is being generated!/i);

    expect(title).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    const { container } = render(<LoadingScreen />);

    const loadingContainer = container.firstElementChild;

    expect(loadingContainer).toHaveStyle('visibility: hidden');
  });
});
