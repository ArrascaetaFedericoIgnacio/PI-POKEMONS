import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterPoke,
  getPokemons,
  orderByAttack,
  orderByName,
  orderByType,
  resetDetail,
  searchPoke,
  orderByWeight,
  orderByHeight,
  orderByHp,
  setPage,
} from "../../Actions";
import Pokemon from "../PokemonCard/Pokemon";

import Paginado from "./Paginado";
import snorlax from "../images/SNORLAXSLEEP.jpg";
import { NavLink } from "react-router-dom";
import { Footer } from "../CreatePokemon/Footer/Footer.jsx";

//Styles
import Style from "./Home.module.css";
import title from "../images/pokemontitle.png";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemonCopy);

  const [input, setInput] = useState("");
  const [, setReloadUsers] = useState(false);

  // //PAGINADO

  // state para la pagina actual y lo seteo en 1
  const pagePaginado = useSelector((state) => state.pages);

  const pokePages = 12;
  const lastIndex = pagePaginado * pokePages;
  const firstIndex = lastIndex - pokePages;
  const showPokemons = allPokemons.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(allPokemons?.length / pokePages);
  console.log(firstIndex, lastIndex, showPokemons, totalPages);

  // useEffect para traer los pokemones
  useEffect(() => {
    dispatch(getPokemons());
    //dispatch para resetear el detalle
    dispatch(resetDetail());
  }, []);

  console.log(allPokemons);

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getPokemons());
    dispatch(setPage(1));
  };

  const urlPoke = "https://fedepipoke.netlify.app/home";
  function refreshPage(urlPoke) {
    window.location.reload(urlPoke);
  }

  //HANDLES
  // funcion para manejar el input
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // funcion para manejar el submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchPoke(input));
    setInput("");
    dispatch(setPage(1));

    setReloadUsers((prevState) => !prevState);
  };
  // funcion para manejar el filtro por creacion
  // este handle despaha la accion de filtrar por creacion y usa el setReloadUsers para recargar la pagina
  //luego despacha la accion de setPage para setear la pagina en 1
  const handleFilterByCreation = (e) => {
    e.preventDefault();
    dispatch(filterPoke(e.target.value));
    setReloadUsers((prevState) => !prevState);

    dispatch(setPage(1));
  };
  // funcion para manejar el filtro por tipo
  const handleFilterByType = (e) => {
    e.preventDefault();
    dispatch(orderByType(e.target.value));
    setReloadUsers((prevState) => !prevState);
    dispatch(setPage(1));
  };

  // funcion para manejar el ordenamiento por ataque
  const handleOrderByAttack = (e) => {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setReloadUsers((prevState) => !prevState);
    dispatch(setPage(1));
  };
  // funcion para manejar el ordenamiento por nombre
  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setReloadUsers((prevState) => !prevState);
    dispatch(setPage(1));
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setReloadUsers((prevState) => !prevState);
    dispatch(setPage(1));
  };
  const handleOrderByHeight = (e) => {
    e.preventDefault();
    dispatch(orderByHeight(e.target.value));
    setReloadUsers((prevState) => !prevState);
    dispatch(setPage(1));
  };
  const handleOrderByHp = (e) => {
    e.preventDefault();
    dispatch(orderByHp(e.target.value));
    setReloadUsers((prevState) => !prevState);
    dispatch(setPage(1));
  };

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(getPokemons());
    setReloadUsers((prevState) => !prevState);
    dispatch(setPage(1));
  };

  return (
    <div className={Style.background}>
      <div className={Style.textStyle}>
        <img src={title} alt="pokemon" className={Style.title} />

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={Style.containerCv}>
            <input
              type="text"
              placeholder="Search pokemons"
              onChange={(e) => handleChange(e)}
              value={input}
              className={Style.input1}
            />
            <input type="submit" value="Search" className={Style.botonSearch} />
          </div>
        </form>
        <>
          <NavLink to="" className={Style.lists}>
            Landing Page
          </NavLink>
        </>
        <>
          <NavLink to="/createPokemon" className={Style.lists}>
            Create Pokemon
          </NavLink>
        </>
      </div>
      <div className={Style.filterContainer}>
        <div class={Style.titleFilter}>FILTERS</div>
        <div className={Style.filters}>
          <p>
            <select onChange={(e) => handleFilterByCreation(e)}>
              <option value="all">By origin</option>
              <option value="weCreate">We Create</option>
              <option value="apiCreate">Api Create</option>
            </select>
          </p>

          <p>
            <select onChange={(e) => handleFilterByType(e)}>
              <option value="all">By types</option>
              <option value="normal">Normal</option>
              <option value="flying">Flying</option>
              <option value="poison">Poison</option>
              <option value="ground">Ground</option>
              <option value="bug">Bug</option>
              <option value="ghost">Ghost</option>
              <option value="steel">Steel</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="grass">Grass</option>
              <option value="fighting">Fighting</option>
              <option value="electric">Electric</option>
              <option value="psychic">Psychic</option>
              <option value="ice">Ice</option>
              <option value="rock">Rock</option>
              <option value="dragon">Dragon</option>
              <option value="dark">Dark</option>
              <option value="fairy">Fairy</option>
              <option value="unknown">Unknown</option>
              <option value="shadow">Shadow</option>
              <option value="all">All Pokemons</option>
            </select>
          </p>

          <p>
            <select onChange={(e) => handleOrderByAttack(e)}>
              <option value="all">By attack</option>
              <option value="attackAscending">By highest attack</option>
              <option value="attackDescending">By lowest attack</option>
            </select>
          </p>
          <p>
            <select onChange={(e) => handleOrderByHp(e)}>
              <option value="all">By hp</option>
              <option value="hpAscending">By highest hp</option>
              <option value="hpDescending">By lowest hp</option>
            </select>
          </p>
          <p>
            <select onChange={(e) => handleOrderByWeight(e)}>
              <option value="all">By weight</option>
              <option value="weightAscending">By lowest weight</option>
              <option value="weightDescending">By highest weight</option>
            </select>
          </p>
          <p>
            <select onChange={(e) => handleOrderByHeight(e)}>
              <option value="all">By height</option>
              <option value="heightAscending">By lowest height</option>
              <option value="heightDescending">By highest height</option>
            </select>
          </p>

          <p>
            <select onChange={(e) => handleOrderByName(e)}>
              <option>By name</option>
              <option value="alphabet">A - Z</option>
              <option value="notAlphabet">Z - A</option>
            </select>
          </p>
        </div>
        <div className={Style.botonReset}>
          <button onClick={(e) => refreshPage(urlPoke)} className={Style.btn}>
            Reset
          </button>
        </div>
      </div>
      <div className={Style.paginadoOne}>
        {totalPages >= 2 && Array.isArray(showPokemons) && (
          <Paginado totalPages={totalPages} />
        )}
      </div>
      <div className={Style.orderP}>
        {showPokemons.length ? (
          typeof showPokemons[0] === "object" ? (
            showPokemons.map((p) => {
              return (
                <Pokemon
                  key={p.id}
                  name={p.name}
                  id={p.id}
                  types={p.types}
                  img={p.img}
                  createdInDb={p.createdInDb}
                />
              );
            })
          ) : (
            <img src={snorlax} alt="snorlax" />
          )
        ) : (
          <div class="pokemon"></div>
        )}
      </div>
      <div className={Style.paginadoTwo}>
        {totalPages >= 2 && Array.isArray(showPokemons) && (
          <Paginado totalPages={totalPages} />
        )}
      </div>
      <Footer />
    </div>
  );
}
