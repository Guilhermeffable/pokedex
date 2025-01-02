import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import DeleteDialog from './DeleteDialog';

describe('DeleteDialog', () => {
  const mockSetShowRemoveDialog = jest.fn();
  const mockOnRemoveClick = jest.fn();

  const defaultProps = {
    showRemoveDialog: true,
    setShowRemoveDialog: mockSetShowRemoveDialog,
    onRemoveClick: mockOnRemoveClick
  };

  it('renders dialog with correct title and content', async () => {
    const { findByText } = render(<DeleteDialog {...defaultProps} />);

    const title = await findByText(/Do you want to proceed with the deletion of these Pokemon?/i);

    const description = await findByText(
      /You will have to catch them again if you proceed with the deletion! Are you sure?/i
    );

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('calls setShowRemoveDialog with false when clicking No button', () => {
    render(<DeleteDialog {...defaultProps} />);

    fireEvent.click(screen.getByText('No'));
    expect(mockSetShowRemoveDialog).toHaveBeenCalledWith(false);
  });

  it('calls onRemoveClick when clicking Yes button', () => {
    render(<DeleteDialog {...defaultProps} />);

    fireEvent.click(screen.getByText('Yes'));
    expect(mockOnRemoveClick).toHaveBeenCalled();
  });

  it('calls setShowRemoveDialog with false when dialog is closed', async () => {
    const { findAllByRole } = render(<DeleteDialog {...defaultProps} />);

    const dialog = await findAllByRole('presentation');

    fireEvent.click(dialog[0]);

    await waitFor(() => {
      expect(mockSetShowRemoveDialog).toHaveBeenCalledWith(false);
    });
  });

  it('renders dialog when showRemoveDialog is true', () => {
    render(<DeleteDialog {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render dialog when showRemoveDialog is false', () => {
    render(<DeleteDialog {...defaultProps} showRemoveDialog={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
