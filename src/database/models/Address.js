const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

const Address = sequelize.define("address", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },  
  street: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.STRING,
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
  await Address.sync();
};

init();

module.exports = Address;