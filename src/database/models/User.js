const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },  
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  street: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.INTEGER,
  },
  district: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  uf: {
    type: DataTypes.STRING,
  },
 cep: {
    type: DataTypes.STRING,
  },

});

//create table if not exists...
const init = async () => {
  await User.sync();
};

init();

module.exports = User;