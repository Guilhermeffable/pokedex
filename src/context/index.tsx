import React, { useContext, useReducer } from 'react';

import { AppState } from './types';
import { reducer } from 'reducer';
import { Actions } from 'reducer/types';

const initialState: AppState = {
  listedPokemons: [],
  selectedPokemon: undefined,
  currentPage: 1
};

const Context = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null
});

const useAppContext = () => {
  const appContext = useContext(Context);
  if (appContext === undefined) {
    throw new Error('useAppContext must be used within a context provider!');
  }
  return appContext;
};

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { initialState, useAppContext, AppContextProvider };
