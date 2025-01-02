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
    default: {
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
    }
  }
};
