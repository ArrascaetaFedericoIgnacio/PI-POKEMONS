const {DataTypes} = require('sequelize');
//defino el modelo types
module.exports = (sequelize)=>{
    sequelize.define('types',{
        name:{
            type:DataTypes.STRING
        }
    })
}