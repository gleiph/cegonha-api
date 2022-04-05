const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const User = require('./User')
const Adress = require('./Adress')

const UserAdress = sequelize.define("user_adress", {
  /*id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  
  },*/
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  
  },
  idAdress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  
  }
  
});

//create table if not exists...
const init = async () => {
  await UserAdress.sync();
};

init();

module.exports = UserAdress;