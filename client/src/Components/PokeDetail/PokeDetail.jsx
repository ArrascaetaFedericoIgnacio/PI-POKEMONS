import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deletePoke,
  getPokeByID,
  getPokemons,
  resetDetail,
  setPage,
} from "../../Actions";

// Photos

//Styles
import Style from "./PokeDetail.module.css";

export default function PokeDetail(props) {
  // importar estado de pages de redux

  const dispatch = useDispatch();
  const history = useHistory();

  const myChosenPoke = useSelector((state) => state.pokeDetailCopy);
  useEffect(() => {
    dispatch(getPokeByID(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  console.log(props.match.params.id);

  console.log(myChosenPoke);

  const handleDelete = () => {
    dispatch(deletePoke(props.match.params.id));
    console.log("llegue hsta aca");
    //llamar nuevamente a todos los pokes
    dispatch(getPokemons());
    history.push("/home");
    dispatch(setPage(1));
  };
  const handleUpdate = () => {
    console.log("hola");
    dispatch(setPage(1));
    history.push(`/createPokemon/${props.match.params.id}`);
  };

  const handleBack = () => {
    dispatch(resetDetail());
    dispatch(setPage(1));
    history.push("/home");
  };
  return (
    <div className={Style.fondo}>
      <div className={Style.title}>POKEMON STATS</div>
      <div className={Style.buttoms}>
        {props.match.params.id.length > 3 && (
          <div>
            <button onClick={() => handleDelete()} className={Style.buttom1}>
              DELETE
            </button>
            <button onClick={() => handleUpdate()} className={Style.buttom1}>
              UPDATE
            </button>
          </div>
        )}
        <button onClick={() => handleBack()} className={Style.buttom1}>
          GO HOME
        </button>
      </div>
      {myChosenPoke.length > 0 ? (
        <div className={Style.statss}>
          <div className={Style.statcenter}>
            <h3>ID: {myChosenPoke[0].id}</h3>
            <h3>HP: {myChosenPoke[0].hp}</h3>
            <h3>ATTACK: {myChosenPoke[0].attack}</h3>
            <h3>DEFENSE: {myChosenPoke[0].defense}</h3>
            <h3>SPEED: {myChosenPoke[0].speed}</h3>
            <h3>HEIGHT: {myChosenPoke[0].height}</h3>
            <h3>WEIGHT: {myChosenPoke[0].weight}</h3>
            {/*renderizado condicional */}
            <h3>TYPES:</h3>
            {props.match.params.id.length > 3 ? (
              myChosenPoke[0].types?.map((tps) => " " + tps.name + " ")
            ) : (
              <h3>
                {myChosenPoke[0].types[0]} {myChosenPoke[0].types[1]}
              </h3>
            )}
          </div>
          <div>
            <h3 className={Style.name}>{myChosenPoke[0].name}</h3>
            <img
              src={myChosenPoke[0].img}
              alt="img not found"
              className={Style.statph}
            />
          </div>
        </div>
      ) : (
        <div>
          <div>LOADING...</div>
        </div>
      )}
    </div>
  );
}
