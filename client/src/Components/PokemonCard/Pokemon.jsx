import React from "react";
import { Link } from "react-router-dom";

//Styles
import Style from "./Pokemon.module.css";
//funcion que renderiza los pokemones
export default function Pokemon({ name, id, types, img, createdInDb }) {
  // const newName= name.toUpperCase();
  // si el pokemon tiene mas de un tipo, se renderiza un div con los dos tipos
  if (createdInDb) {
    return (
      <div className={Style.div}>
        <div className={Style.firstDiv}>
          <h2 className={Style.name}>{name}</h2>
        </div>
        {/* div que contiene la imagen del pokemon */}
        <div>
          <Link to={"/pokemons/" + id}>
            <img className={Style.photto} src={img} alt="img not found" />
          </Link>
        </div>
        <div className={Style.forthDiv}>
          {/* <h3>{types[0]} {types[1]}</h3> */}
          {types.map((tps) => " " + tps.name + " ")}
        </div>
      </div>
    );
  }
  // si el pokemon tiene un solo tipo, se renderiza un div con ese tipo
  else {
    return (
      <div className={Style.div}>
        <div className={Style.firstDiv}>
          {/* <h3 className={Style.idStyle}>{id}</h3> */}
          <h2 className={Style.name}>{name}</h2>
        </div>
        <div className={Style.photto}>
          <Link to={"/pokemons/" + id}>
            <img src={img} alt="img not found" />
          </Link>
        </div>
        <div className={Style.thirdDiv}>
          {/* <h2>Types</h2> */}
          <h3 className={Style.forthDiv}>
            {types[0]} {types[1]}
          </h3>
        </div>
      </div>
    );
  }
}
