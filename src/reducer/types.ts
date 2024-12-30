import { Pokemon } from 'pokenode-ts';

export enum ActionTypes {
  SET_LISTED_POKEMONS = 'SET_LISTED_POKEMONS',
  SET_SELECTED_POKEMON = 'SET_SELECTED_POKEMON',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
}

export type Payloads = {
  [ActionTypes.SET_LISTED_POKEMONS]: Pokemon[];
  [ActionTypes.SET_SELECTED_POKEMON]: Pokemon;
  [ActionTypes.SET_CURRENT_PAGE]: number;
};

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type Actions = ActionMap<Payloads>[keyof ActionMap<Payloads>];
