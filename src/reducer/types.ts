import { Pokemon } from 'pokenode-ts';
import { CaughtPokemon } from 'utils/localStorage';

export enum ActionTypes {
  SET_LISTED_POKEMONS = 'SET_LISTED_POKEMONS',
  SET_SELECTED_POKEMON = 'SET_SELECTED_POKEMON',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_CAUGHT_POKEMONS = 'SET_CAUGHT_POKEMONS',
  ADD_CAUGHT_POKEMON = 'ADD_CAUGHT_POKEMON',
  ADD_TEXT_NOTE_TO_CAUGHT_POKEMON = 'ADD_TEXT_NOTE_TO_CAUGHT_POKEMON'
}

export type Payloads = {
  [ActionTypes.SET_LISTED_POKEMONS]: Pokemon[];
  [ActionTypes.SET_SELECTED_POKEMON]: Pokemon;
  [ActionTypes.SET_CURRENT_PAGE]: number;
  [ActionTypes.SET_CAUGHT_POKEMONS]: CaughtPokemon[];
  [ActionTypes.ADD_CAUGHT_POKEMON]: CaughtPokemon;
  [ActionTypes.ADD_TEXT_NOTE_TO_CAUGHT_POKEMON]: { pokemonId: number; textNote: string };
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
