import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { AppContextProvider } from 'context';
import { BrowserRouter } from 'react-router-dom';

import PokemonCard from './PokemonCard';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    // add your noops here
    useParams: jest.fn(),
    useHistory: jest.fn(),
    useNavigate: () => mockedUsedNavigate
  };
});

describe('PokemonCard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn()
      }
    });
  });

  it('renders pokemon name and image', () => {
    render(
      <AppContextProvider>
        <PokemonCard pokemon={global.mockPokemon} />
      </AppContextProvider>
    );

    expect(screen.getByText('BULBASAUR')).toBeInTheDocument();
    expect(screen.getByAltText('bulbasaur')).toHaveAttribute('src', 'test-image.jpg');
  });

  it('shows checkbox when in edit mode', () => {
    render(
      <BrowserRouter>
        <AppContextProvider>
          <PokemonCard pokemon={global.mockPokemon} isEditMode />
        </AppContextProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('navigates to details page when clicking more details', () => {
    render(
      <BrowserRouter>
        <AppContextProvider>
          <PokemonCard pokemon={global.mockPokemon} />
        </AppContextProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('More details...'));
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/details');
  });

  it('copies share link to clipboard', async () => {
    render(
      <BrowserRouter>
        <AppContextProvider>
          <PokemonCard pokemon={global.mockPokemon} />
        </AppContextProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Share'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('/details?pokemon=bulbasaur'));
    expect(await screen.findByText('Link was copied to your clipboard!')).toBeInTheDocument();
  });

  it('handles text note in edit mode', () => {
    const mockSaveNote = jest.fn();
    render(
      <BrowserRouter>
        <AppContextProvider>
          <PokemonCard pokemon={global.mockPokemon} isEditMode onSaveTextNote={mockSaveNote} />
        </AppContextProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Add text note'));
    fireEvent.change(screen.getByLabelText('Note'), { target: { value: 'Test note' } });
    fireEvent.click(screen.getByText('Save'));

    expect(mockSaveNote).toHaveBeenCalledWith('Test note');
  });
});
