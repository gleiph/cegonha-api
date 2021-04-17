const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

const CoverAddress = sequelize.define("cover-address", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },  
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number_start: {
    type: DataTypes.INTEGER,
  },
  number_end: {
    type: DataTypes.INTEGER,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

//create table if not exists...
const init = async () => {
  await CoverAddress.sync();
};

init();

module.exports = CoverAddress;