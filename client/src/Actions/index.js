import axios from "axios";
import { apiUrl } from "../config";
import {
  SEARCH_POKE,
  GET_ALLPOKES,
  FILTER_POKE,
  ORDER_BY_TYPE,
  ORDER_BY_ATTACK,
  ORDER_BY_NAME,
  ORDER_BY_HEIGHT,
  ORDER_BY_HP,
  ORDER_BY_WEIGHT,
  FILTER_BY_ID,
  CREATE_POKE,
  DELETE_POKE,
  RESET_DETAIL,
  ALL_PTYPES,
  UPDATE_POKE,
  SET_PAGES,
} from "./actionTypes";

// action para traer todos los pokemons
export const getPokemons = () => {
  return async function (dispatch) {
    const pokes = await axios.get(`${apiUrl}/pokemons`, {});
    return dispatch({
      type: GET_ALLPOKES,
      payload: pokes.data,
    });
  };
};

// action para buscar un pokemon
export const searchPoke = (payload) => {
  console.log(payload);
  return {
    type: SEARCH_POKE,
    payload,
  };
};

// action para filtrar por tipo
export const filterPoke = (payload) => {
  return {
    type: FILTER_POKE,
    payload,
  };
};

// action para ordenar por tipo
export const orderByType = (payload) => {
  return {
    type: ORDER_BY_TYPE,
    payload,
  };
};
// action para ordenar por ataque
export const orderByAttack = (payload) => {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
};

export const orderByHeight = (payload) => {
  return {
    type: ORDER_BY_HEIGHT,
    payload,
  };
};
export const orderByWeight = (payload) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
};
// action para ordenar por nombre
export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};
export const orderByHp = (payload) => {
  return {
    type: ORDER_BY_HP,
    payload,
  };
};
// action para filtrar por id
export const getPokeByID = (id) => {
  return async function (dispatch) {
    const myPoke = await axios.get(`${apiUrl}/pokemons/` + id);
    console.log(myPoke);
    return dispatch({
      type: FILTER_BY_ID,
      payload: myPoke.data,
    });
  };
};

//ACTION Para setear pagina
export const setPage = (payload) => {
  return {
    type: SET_PAGES,
    payload,
  };
};

export const resetDetail = () => {
  return {
    type: RESET_DETAIL,
  };
};

// action para traer todos los tipos
export const allTypes = () => {
  return async function (dispatch) {
    const allMyTypes = await axios.get(`${apiUrl}/types`);
    return dispatch({
      type: ALL_PTYPES,
      payload: allMyTypes.data,
    });
  };
};

// CREATE POKEMON
export const createPoke = (payload) => {
  return async function (dispatch) {
    const newPoke = await axios.post(`${apiUrl}/pokemons`, payload);
    return dispatch({
      type: CREATE_POKE,
      payload: newPoke,
    });
  };
};

// DELETE POKEMON
export const deletePoke = (id) => {
  return async function (dispatch) {
    const selectPoke = await axios.delete(`${apiUrl}/pokemons/` + id);
    return dispatch({
      type: DELETE_POKE,
      payload: selectPoke,
    });
  };
};

//UPDATE POKEMON
export const updatePoke = (id, payload) => {
  return async function (dispatch) {
    await axios.put(`${apiUrl}/pokemons/` + id, payload);
    return dispatch({
      type: UPDATE_POKE,
    });
  };
};
