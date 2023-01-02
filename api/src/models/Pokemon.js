const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    hp:{
      type: DataTypes.INTEGER
    },
    strength:{
      type:DataTypes.INTEGER
    },
    weight:{
      type:DataTypes.INTEGER
    },
    height:{
      type:DataTypes.INTEGER
    },
    speed:{
      type:DataTypes.INTEGER
    },
    defense:{
      type:DataTypes.INTEGER
    },
    attack:{
      type:DataTypes.INTEGER
    },
    img:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }


  });
};


/*ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
Nombre/ *
Vida
Fuerza
Defensa
Velocidad
Altura//
Peso//
*/