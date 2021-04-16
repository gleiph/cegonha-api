const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

const DiscoveyAddress = sequelize.define("discovey-address", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },  
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
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
  await DiscoveyAddress.sync();
};

init();

module.exports = DiscoveyAddress;