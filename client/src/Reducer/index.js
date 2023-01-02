/* eslint-disable no-fallthrough */
/* eslint-disable no-duplicate-case */
import {
  ALL_PTYPES,
  CREATE_POKE,
  DELETE_POKE,
  FILTER_BY_ID,
  FILTER_POKE,
  GET_ALLPOKES,
  ORDER_BY_ATTACK,
  ORDER_BY_NAME,
  ORDER_BY_HEIGHT,
  ORDER_BY_WEIGHT,
  ORDER_BY_HP,
  ORDER_BY_TYPE,
  RESET_DETAIL,
  SEARCH_POKE,
  UPDATE_POKE,
  SET_PAGES,
} from "../Actions/actionTypes";

const initialState = {
  pokemons: [], // estado
  pokeDetail: [], // para todos los stats de los pokes
  pokemonCopy: [], // estado que se modifica con el useSelector
  filteredPoke: [], // estado que no se modifica
  pokeDetailCopy: [], // estado para los stats de los pokes
  pokeTypes: [], //estado para los tipos de pokemons
  pages: 1,
  // estado local para resetear los filtros
  filteredByType: [],
  filteredByAttack: [],
};
// funcion que recibe el estado y la accion
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    // todos los pokemons
    case GET_ALLPOKES:
      return {
        ...state,
        pokemons: action.paylod,
        pokemonCopy: action.payload,
        filteredPoke: action.payload,
        filteredByType: action.payload,
        filteredByAttack: action.payload,
      };
    // todos los tipos de pokemons
    case SEARCH_POKE:
      console.log(action.payload);
      let alotPokes = state.filteredPoke;
      if (alotPokes) {
        console.log("funciona");
      }
      // si el nombre del pokemon es igual al payload, lo guardo en un array
      let onePoke = alotPokes.filter(
        (p) => p.name === action.payload.toLowerCase()
      );

      // si no hay pokemons con ese nombre, muestro todos los pokemons
      let dontPoke = alotPokes;
      if (action.payload === "") {
        alert("Please write a name to search a poke");
      } else if (onePoke.length === 0) {
        alert("No pokes with that name, let me show you all the pokemons");
      }
      if (onePoke.length > 0) {
        console.log("Existe!!!!");
      }
      return {
        ...state,
        // retorno el array con el pokemon que coincida con el payload, o todos los pokemons si no hay coincidencias
        pokemonCopy: onePoke.length > 0 ? onePoke : dontPoke,
      };

    case SET_PAGES: {
      return {
        ...state,
        pages: action.payload,
      };
    }

    // caso para filtrar por tipo
    case FILTER_POKE:
      //creo un array con todos los pokemons
      let allPokes = state.pokemonCopy;

      // creo un array vacio para guardar los pokemons filtrados
      let createdFilter = [];
      console.log(allPokes);
      // si el payload es igual a "weCreate", guardo en el array creadoFilter los pokemons que fueron creados en la base de datos
      if (action.payload === "weCreate") {
        createdFilter = allPokes.filter((p) => p.createdInDb);
      }

      // si el payload es igual a "apiCreate", guardo en el array creadoFilter los pokemons que fueron creados en la api
      console.log(allPokes);
      if (action.payload === "apiCreate") {
        createdFilter = allPokes.filter((p) => !p.createdInDb);
      }
      function refreshPage1() {
        window.location.reload();
      }
      if (!createdFilter.length) {
        alert("No pokemons created with that type. TRY AGAIN!!!");

        refreshPage1();
      }
      // si el payload es igual a "all", guardo en el array creadoFilter todos los pokemons
      return {
        ...state,
        // retorno el array con los pokemons filtrados, o todos los pokemons si el payload es igual a "all"
        pokemonCopy: action.payload === "all" ? allPokes : createdFilter,
      };

    case ORDER_BY_TYPE:
      // caso para filtrar por tipo
      // creo un array con todos los pokemons
      let allPokes2 = state.pokemonCopy;
      console.log(allPokes2);

      // creo un array vacio para guardar los pokemons filtrados
      let createdFilter2 = [];
      let createdFilter3 = [];
      let createdFilter4 = [];
      // let createdFilter4 = [];
      // filtro para guardar en el array creadoFilter2 los pokemons que tengan el tipo que se selecciono en el payload
      createdFilter2 = allPokes2.filter((p) => p.types[0] === action.payload);
      //Con este filtro los creados .
      createdFilter4 = allPokes2.filter(
        (p) => p.types[0].name === action.payload
      );
      // createdFilter4 = allPokes2.filter((p) => p.types[0].name === action.payload);

      // filtro para guardar en el array creadoFilter3 los pokemons que tengan el tipo que se selecciono en el payload
      createdFilter3 = createdFilter2.concat(
        createdFilter4,
        allPokes2.filter((p) => p.types[1] === action.payload)
      );
      if (action.payload === "all") {
        createdFilter3 = allPokes2;
      }
      function refreshPage() {
        window.location.reload();
      }

      if (!createdFilter3) {
        alert("No pokemons created with that type. TRY AGAIN!!!");
        refreshPage();
      }

      return {
        // si el array creadoFilter3 tiene mas de 0 pokemons, los guardo en el estado pokemonCopy, sino, guardo en el estado pokemonCopy todos los pokemons
        ...state,
        // retorno el array con los pokemons filtrados, o todos los pokemons si el payload es igual a "all"
        pokemonCopy:
          createdFilter3.length > 0
            ? createdFilter3
            : allPokes2
                .concat(alert("NO POKES WITH THAT TYPE"))
                .concat(refreshPage()),
      };

    case SET_PAGES: {
      return {
        ...state,
        page: action.payload,
      };
    }

    // caso para filtrar por ataque
    case ORDER_BY_ATTACK:
      // creo un array con todos los pokemons
      let allPokes3 = state.pokemonCopy;

      // creo un array vacio para guardar los pokemons filtrados
      let orderedPokemons = [];

      // filtro para guardar en el array orderedPokemons los pokemons ordenados por ataque de forma descendente
      if (action.payload === "attackDescending") {
        orderedPokemons = allPokes3.sort((a, b) => {
          // sort para ordenar los pokemons por ataque de forma descendente
          if (a.attack > b.attack) return 1;
          // si el ataque del pokemon a es mayor al ataque del pokemon b, lo guardo en el array orderedPokemons
          if (a.attack < b.attack) return -1;
          // si el ataque del pokemon a es menor al ataque del pokemon b, lo guardo en el array orderedPokemons
          return 0;
        });
      }
      if (action.payload === "attackAscending") {
        // filtro para guardar en el array orderedPokemons los pokemons ordenados por ataque de forma ascendente
        orderedPokemons = allPokes3.sort((b, a) => {
          // sort para ordenar los pokemons por ataque de forma ascendente
          if (a.attack > b.attack) return 1;
          // si el ataque del pokemon a es mayor al ataque del pokemon b, lo guardo en el array orderedPokemons
          if (a.attack < b.attack) return -1;
          // si el ataque del pokemon a es menor al ataque del pokemon b, lo guardo en el array orderedPokemons
          return 0;
        });
      }
      if (action.payload === "all") {
        orderedPokemons = allPokes3;
      }

      console.log("aca toy");
      console.log(orderedPokemons);
      return {
        // si el array orderedPokemons tiene mas de 0 pokemons, los guardo en el estado pokemonCopy, sino, guardo en el estado pokemonCopy todos los pokemons
        ...state,
        pokemonCopy:
          orderedPokemons.length > 0
            ? orderedPokemons
            : allPokes3.concat(alert("HUBO UN PROBLEMAXD")),
      };

    case ORDER_BY_HP:
      // creo un array con todos los pokemons
      let allPokes8 = state.pokemonCopy;

      // creo un array vacio para guardar los pokemons filtrados
      let orderedPokemon5 = [];

      // filtro para guardar en el array orderedPokemon5 los pokemons ordenados por ataque de forma descendente
      if (action.payload === "hpDescending") {
        orderedPokemon5 = allPokes8.sort((a, b) => {
          // sort para ordenar los pokemons por ataque de forma descendente
          if (a.hp > b.hp) return 1;
          // si el ataque del pokemon a es mayor al ataque del pokemon b, lo guardo en el array orderedPokemon5
          if (a.hp < b.hp) return -1;
          // si el ataque del pokemon a es menor al ataque del pokemon b, lo guardo en el array orderedPokemon5
          return 0;
        });
      }
      if (action.payload === "hpAscending") {
        // filtro para guardar en el array orderedPokemon5 los pokemons ordenados por ataque de forma ascendente
        orderedPokemon5 = allPokes8.sort((b, a) => {
          // sort para ordenar los pokemons por ataque de forma ascendente
          if (a.hp > b.hp) return 1;
          // si el ataque del pokemon a es mayor al ataque del pokemon b, lo guardo en el array orderedPokemon5
          if (a.hp < b.hp) return -1;
          // si el ataque del pokemon a es menor al ataque del pokemon b, lo guardo en el array orderedPokemon5
          return 0;
        });
      }
      if (action.payload === "all") {
        orderedPokemon5 = allPokes8;
      }

      console.log("aca toy");
      console.log(orderedPokemon5);
      return {
        // si el array orderedPokemon5 tiene mas de 0 pokemons, los guardo en el estado pokemonCopy, sino, guardo en el estado pokemonCopy todos los pokemons
        ...state,
        pokemonCopy:
          orderedPokemon5.length > 0
            ? orderedPokemon5
            : allPokes8.concat(alert("HUBO UN PROBLEMAXD")),
      };

    case ORDER_BY_NAME:
      // caso para ordenar por nombre
      let allPokes4 = state.pokemonCopy;
      // creo un array vacio para guardar los pokemons ordenados
      let orderPokemons2 = [];
      // filtro para guardar en el array orderPokemons2 los pokemons ordenados por nombre de forma ascendente
      if (action.payload === "alphabet") {
        orderPokemons2 = allPokes4.sort((a, b) => {
          // sort para ordenar los pokemons por nombre de forma ascendente
          if (a.name > b.name) return 1;
          // sort
          if (a.name < b.name) return -1;
          // soert para ordenar los pokemons por nombre de forma descendente
          return 0;
        });
      }
      if (action.payload === "notAlphabet") {
        // filtro para guardar en el array orderPokemons2 los pokemons ordenados por nombre de forma descendente
        orderPokemons2 = allPokes4.sort((b, a) => {
          // sort para ordenar los pokemons por nombre de forma descendente
          if (a.name > b.name) return 1;
          // sort
          if (a.name < b.name) return -1;
          return 0;
        });
      }
      if (action.payload === "all") {
        orderPokemons2 = allPokes4;
      }

      console.log(orderPokemons2);
      return {
        ...state,
        pokemonCopy: orderPokemons2.length > 0 ? orderPokemons2 : allPokes4,
      };
    case ORDER_BY_WEIGHT:
      // caso para ordenar por peso
      let allPokes5 = state.pokemonCopy;
      // creo un array vacio para guardar los pokemons ordenados
      let orderPokemons3 = [];
      // filtro para guardar en el array orderPokemons3 los pokemons ordenados por peso de forma ascendente
      if (action.payload === "weightAscending") {
        orderPokemons3 = allPokes5.sort((a, b) => {
          // sort para ordenar los pokemons por peso de forma ascendente
          if (a.weight > b.weight) return 1;
          // sort
          if (a.weight < b.weight) return -1;
          // soert para ordenar los pokemons por peso de forma descendente
          return 0;
        });
      }
      if (action.payload === "weightDescending") {
        // filtro para guardar en el array orderPokemons3 los pokemons ordenados por peso de forma descendente
        orderPokemons3 = allPokes5.sort((b, a) => {
          // sort para ordenar los pokemons por peso de forma descendente
          if (a.weight > b.weight) return 1;
          // sort
          if (a.weight < b.weight) return -1;
          return 0;
        });
      }
      if (action.payload === "all") {
        orderPokemons3 = allPokes5;
      }

      console.log(orderPokemons3);
      return {
        ...state,
        pokemonCopy: orderPokemons3.length > 0 ? orderPokemons3 : allPokes5,
      };
    case ORDER_BY_HEIGHT:
      // caso para ordenar por altura
      let allPokes6 = state.pokemonCopy;
      // creo un array vacio para guardar los pokemons ordenados
      let orderPokemons4 = [];
      // filtro para guardar en el array orderPokemons4 los pokemons ordenados por altura de forma ascendente
      if (action.payload === "heightAscending") {
        orderPokemons4 = allPokes6.sort((a, b) => {
          // sort para ordenar los pokemons por altura de forma ascendente
          if (a.height > b.height) return 1;
          // sort
          if (a.height < b.height) return -1;
          // soert para ordenar los pokemons por altura de forma descendente
          return 0;
        });
      }
      if (action.payload === "heightDescending") {
        // filtro para guardar en el array orderPokemons4 los pokemons ordenados por altura de forma descendente
        orderPokemons4 = allPokes6.sort((b, a) => {
          // sort para ordenar los pokemons por altura de forma descendente
          if (a.height > b.height) return 1;
          // sort
          if (a.height < b.height) return -1;
          return 0;
        });
      }
      if (action.payload === "all") {
        orderPokemons4 = allPokes6;
      }

      console.log(orderPokemons4);

      return {
        ...state,
        pokemonCopy: orderPokemons4.length > 0 ? orderPokemons4 : allPokes6,
      };

    case FILTER_BY_ID:
      console.log(action.payload);
      return {
        ...state,
        pokeDetail: action.payload,
        pokeDetailCopy: action.payload,
      };
    case CREATE_POKE:
      return {
        ...state,
        pokemonCopy: state.pokemonCopy.concat(action.payload),
      };
    case DELETE_POKE:
      return {
        ...state,
        pokemonCopy: state.pokemonCopy.filter((p) => p !== action.payload),
      };
    case UPDATE_POKE: //COMPLETAR ACA
      const allMyPokes2 = state.pokemonCopy;
      const pokeToUpdate = allMyPokes2.find((p) => p.id === action.payload.id);
      pokeToUpdate.name = action.payload.name;
      pokeToUpdate.hp = action.payload.hp;
      pokeToUpdate.attack = action.payload.attack;
      pokeToUpdate.defense = action.payload.defense;
      pokeToUpdate.speed = action.payload.speed;
      pokeToUpdate.height = action.payload.height;
      pokeToUpdate.weight = action.payload.weight;
      pokeToUpdate.types = action.payload.types;
      pokeToUpdate.img = action.payload.img;

      return {
        ...state,
        pokemonCopy: allMyPokes2,
        pokeDetailCopy: [pokeToUpdate],
      };
    case RESET_DETAIL:
      const allMyPokes = state.pokemonCopy;
      return {
        ...state,
        pokeDetailCopy: [],
        pokemonCopy: allMyPokes,
      };
    case ALL_PTYPES:
      return {
        ...state,
        pokeTypes: action.payload,
      };
    default:
      return state;
  }
}
