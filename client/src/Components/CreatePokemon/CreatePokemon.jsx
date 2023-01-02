import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTypes, createPoke, getPokeByID, updatePoke } from "../../Actions";
import { useHistory, useParams } from "react-router-dom";
import { resetDetail } from "../../Actions";
//Styles
import Style from "./CreatePokemon.module.css";

export default function CreatePokemon() {
  //DISPATCH
  const dispatch = useDispatch();
  //HISTORY
  const history = useHistory();
  //me traigo todos los pokemons
  const allPokemons = useSelector((state) => state.pokemonCopy);
  const { id } = useParams();
  //estados
  const myTypes = useSelector((state) => state.pokeTypes);
  const [typs, setTyps] = useState([]);

  //UPDATE
  const [updated, setUpdated] = useState(false);
  const pokeToUpdate = useSelector((state) => state.pokeDetailCopy);
  useEffect(() => {
    dispatch(allTypes());
    id && dispatch(getPokeByID(id));
  }, [dispatch, id]);
  //seteo de estados
  const [input, setInput] = useState({
    name: "",
    hp: "",
    weight: "",
    height: "",
    speed: "",
    defense: "",
    attack: "",
    img: "",
    types: [],
  });
  //SET STATE ERROR
  const [error, setError] = useState({
    name: "",
    hp: "",
    weight: "",
    height: "",
    speed: "",
    defense: "",
    attack: "",
    img: "",
  });

  //SET STATE UPDATE

  var count = 1;
  // FUNCTION VALIDATE

  function validate(state) {
    //creo un objeto de errores
    const errors = {};
    //si el nombre ya existe
    // if (allPokemons.find((p) => p.name === state.name)) {
    //   errors.name = "This name already exists";
    // }

    if (!state.name) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z]{3,10}$/.test(state.name)) {
      errors.name =
        "The name must have from 3 to 10 characters. And they can only be letters";
    }
    if (!state.hp) {
      errors.hp = "Hp is required";
    } else if (!/^[0-9]{1,2}$/.test(state.hp)) {
      errors.hp =
        "The hp can only contain values from 0 to 99. And only numbers are allowed";
    }
    if (!state.weight) {
      errors.weight = "Weight is required";
    } else if (!/^[0-9]{1,2}$/.test(state.weight)) {
      errors.weight =
        "The weight can only contain values from 0 to 99. And only numbers are allowed";
    }
    if (!state.height) {
      errors.height = "Height is required";
    } else if (!/^[0-9]{1,2}$/.test(state.height)) {
      errors.height =
        "The height can only contain values from 0 to 99. And only numbers are allowed";
    }
    if (!state.speed) {
      errors.speed = "Speed is required";
    } else if (!/^[0-9]{1,2}$/.test(state.speed)) {
      errors.speed =
        "The speed can only contain values from 0 to 99. And only numbers are allowed";
    }
    if (!state.defense) {
      errors.defense = "Defense is required";
    } else if (!/^[0-9]{1,2}$/.test(state.defense)) {
      errors.defense =
        "The defense can only contain values from 0 to 99. And only numbers are allowed";
    }
    if (!state.attack) {
      errors.attack = "Attack is required";
    } else if (!/^[0-9]{1,2}$/.test(state.attack)) {
      errors.attack =
        "The attack can only contain values from 0 to 99. And only numbers are allowed";
    }
    if (!state.img) {
      errors.img = "Image is required";
    } else if (
      !/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?.*(png|jpg|jpeg|gif)$/.test(
        state.img
      )
    ) {
      errors.img = "The image must be a valid url";
    }

    return errors;
  }

  const handleDltType = (e) => {
    e.preventDefault();
    if (typs.length > 0) {
      typs.pop();
    }
    setInput({
      ...input,
      types: typs,
    });
  };
  //funciones de handle
  //

  const handleBack = () => {
    dispatch(resetDetail());
    history.push("/home");
  };

  const handleChange2 = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setInput((prevState) => {
      const newState = {
        ...prevState,
        [e.target.name]: e.target.value,
      };
      setError(validate(newState));

      return newState;
    });
  };

  //funciones de handle
  const handleTypes = (e) => {
    e.preventDefault();
    if (typs.length === 2) {
      alert("Your poke can only have 2 types as max");
    } else if (typs.length < 2) {
      typs.push(e.target.value);
    }
    setInput({
      ...input,
      types: typs,
    });
  };
  //funcion de handle
  const handleUpdate = (e) => {
    e.preventDefault();

    setError(validate(input));
    // si no hay errores y el input tiene tipos
    if (Object.keys(error).length === 0 && input.types.length !== 0) {
      // despacho la accion de update
      dispatch(updatePoke(id, input));
      setInput({
        name: "",
        hp: "",
        weight: "",
        height: "",
        speed: "",
        defense: "",
        attack: "",
        img: "",
        types: [],
      });
      alert("poke updateado");
      dispatch(resetDetail());
      history.push("/home");
    } else if (input.types.length === 0) {
      // si no tiene tipos muestro un alert
      alert("Your pokemon need at least one type");
      return;
    } else {
      return;
    }
  };
  //funcion de handle
  const handleSubmit2 = (e) => {
    // evito el comportamiento por defecto
    e.preventDefault();
    // valido el input
    setError(validate(input));

    //valido que el nombre no exista

    if (allPokemons.find((p) => p.name === input.name)) {
      alert("This name already exists");
      return;
    }

    // si no hay errores y el input tiene tipos
    if (Object.keys(error).length === 0 && input.types.length !== 0) {
      // despacho la accion de create
      dispatch(createPoke(input));
      setInput({
        name: "",
        hp: "",
        weight: "",
        height: "",
        speed: "",
        defense: "",
        attack: "",
        img: "",
        types: [],
      });
      // muestro un alert y redirijo a home
      alert("Pokemon succesfully created");
      history.push("/home");
      // si no tiene tipos muestro un alert
    } else if (input.types.length === 0) {
      alert("Your pokemon need at least one type");
      return;
    } else {
      return;
    }
  };
  //si el id existe y el pokeToUpdate tiene algo y no esta actualizado
  if (id && pokeToUpdate.length && !updated) {
    //creo un array vacio
    let oldArray = [];
    //le pusheo el primer tipo
    oldArray.push(pokeToUpdate[0].types[0].name);
    // si el pokeToUpdate tiene 2 tipos pusheo el segundo
    if (pokeToUpdate[0].types.length === 2) {
      oldArray.push(pokeToUpdate[0].types[1].name);
    }
    // seteo el array con los tipos
    setTyps(oldArray);

    console.log(oldArray);

    setInput({
      ...input,
      name: pokeToUpdate[0].name,
      hp: parseInt(pokeToUpdate[0].hp),
      weight: parseInt(pokeToUpdate[0].weight),
      height: parseInt(pokeToUpdate[0].height),
      speed: parseInt(pokeToUpdate[0].speed),
      defense: parseInt(pokeToUpdate[0].defense),
      attack: parseInt(pokeToUpdate[0].attack),
      img: pokeToUpdate[0].img,
      types: oldArray,
    });
    // seteo updated en true para que no se ejecute mas de una vez
    setUpdated(true);
  }

  return (
    //retorno el formulario
    <div className={Style.backimg}>
      <div className={Style.title}>Create your Pokemon</div>

      <form className={Style.forms}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter pokemon name"
          name={"name"}
          onChange={(e) => handleChange2(e)}
          value={input.name}
          className={Style.inputs}
        />
        {/* // si hay un error en el name lo muestro */}
        {error.name ? <p className={Style.danger}>{error.name}</p> : <p></p>}
        <label>HP</label>
        <input
          type="text"
          placeholder="Enter pokemon hp"
          name={"hp"}
          onChange={(e) => handleChange2(e)}
          value={input.hp}
          className={Style.inputs}
        />
        {error.hp ? <p className={Style.danger}>{error.hp}</p> : <p> </p>}
        <label>Weight</label>
        <input
          type="text"
          placeholder="Enter pokemon weight"
          name={"weight"}
          onChange={(e) => handleChange2(e)}
          value={input.weight}
          className={Style.inputs}
        />
        {error.weight ? (
          <p className={Style.danger}>{error.weight}</p>
        ) : (
          <p></p>
        )}
        <label>Height</label>
        <input
          type="text"
          placeholder="Enter pokemon height"
          name={"height"}
          onChange={(e) => handleChange2(e)}
          value={input.height}
          className={Style.inputs}
        />
        {error.height ? (
          <p className={Style.danger}>{error.height}</p>
        ) : (
          <p></p>
        )}
        <label>Speed</label>
        <input
          type="text"
          placeholder="Enter pokemon speed"
          name={"speed"}
          onChange={(e) => handleChange2(e)}
          value={input.speed}
          className={Style.inputs}
        />
        {error.speed ? <p className={Style.danger}>{error.speed}</p> : <p> </p>}
        <label>Defense</label>
        <input
          type="text"
          placeholder="Enter pokemon defense"
          name={"defense"}
          onChange={(e) => handleChange2(e)}
          value={input.defense}
          className={Style.inputs}
        />
        {error.defense ? (
          <p className={Style.danger}>{error.defense}</p>
        ) : (
          <p> </p>
        )}
        <label>Attack</label>
        <input
          type="text"
          placeholder="Enter pokemon attack"
          name={"attack"}
          onChange={(e) => handleChange2(e)}
          value={input.attack}
          className={Style.inputs}
        />
        {error.attack ? (
          <p className={Style.danger}>{error.attack}</p>
        ) : (
          <p> </p>
        )}
        <label>Image</label>
        <input
          type="text"
          placeholder="URL of the image"
          name={"img"}
          onChange={(e) => handleChange2(e)}
          value={input.img}
          className={Style.inputs}
        />
        {error.img ? <p className={Style.danger}>{error.img}</p> : <p> </p>}
        <label>Types</label>

        {/* {//SELECT PARA ELEGIR LOS TIPOS} */}
        <select onChange={(e) => handleTypes(e)}>
          {/* //si no hay tipos muestro un mensaje */}

          <option>Chose the types</option>
          {/* los muestro */}
          {myTypes &&
            myTypes.map((type) => {
              return (
                <option value={type.name} key={type.id}>
                  {type.name}
                </option>
              );
            })}
        </select>

        <ul>
          {/* // muestro los tipos */}
          {input.types?.map((tps) => {
            count = 1 + count;
            return (
              <p key={tps + count} className={Style.typetext}>
                {tps}
              </p>
            );
          })}
        </ul>
        <button onClick={(e) => handleDltType(e)} className={Style.buttom}>
          Delete types
        </button>

        {id && id.length > 3 ? (
          <input
            type="submit"
            placeholder="Update Pokemon"
            onClick={(e) => handleUpdate(e)}
            value="Update Poke"
            className={Style.buttom}
          />
        ) : (
          <input
            type="submit"
            placeholder="Create Pokemon"
            onClick={(e) => handleSubmit2(e)}
            value="Create Poke"
            className={Style.buttom1}
          />
        )}
      </form>
      <button onClick={() => handleBack()} className={Style.buttom2}>
        HOME
      </button>
    </div>
  );
}
