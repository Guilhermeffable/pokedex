import { AppState } from 'context/types';

import { Actions, ActionTypes } from './types';

export const reducer = (state: AppState, action: Actions): AppState => {
  switch (action.type) {
    case ActionTypes.SET_LISTED_POKEMONS: {
      return {
        ...state,
        listedPokemons: action.payload
      };
    }

    case ActionTypes.SET_SELECTED_POKEMON: {
      return {
        ...state,
        selectedPokemon: action.payload
      };
    }
    case ActionTypes.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload
      };
    }

    case ActionTypes.SET_CAUGHT_POKEMONS: {
      return {
        ...state,
        caughtPokemons: action.payload
      };
    }

    case ActionTypes.ADD_CAUGHT_POKEMON: {
      return {
        ...state,
        caughtPokemons: [...state.caughtPokemons, action.payload]
      };
    }

    case ActionTypes.ADD_TEXT_NOTE_TO_CAUGHT_POKEMON: {
      const updatedCaughtPokemons = state.caughtPokemons.map((pokemon) =>
        pokemon.id === action.payload.pokemonId ? { ...pokemon, textNote: action.payload.textNote } : pokemon
      );
      return {
        ...state,
        caughtPokemons: updatedCaughtPokemons
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
    }
  }
};
