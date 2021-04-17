const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

const Address = require('./Address');

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
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  id_addres: {
    type: DataTypes.INTEGER,
    references: {
      model: Address,
      key: 'id',
    }
  },

});

//create table if not exists...
const init = async () => {
  await User.sync();
};

init();

module.exports = User;