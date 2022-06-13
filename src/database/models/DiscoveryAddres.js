const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");
const Region = require("./Region");
const MedicalCenter = require('./MedicalCenter')

const DiscoveyAddress = sequelize.define("discovey-address", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Region,
      key: "id",
    },
  },
  id_addres_parto: {
    type: DataTypes.INTEGER,
    references: {
      model: MedicalCenter,
      key: "id",
    },
  },
  id_addres_pre_natal: {
    type: DataTypes.INTEGER,
    references: {
      model: MedicalCenter,
      key: "id",
    },
  },
});

//create table if not exists...
const init = async () => {
  await DiscoveyAddress.sync();
};

init();

module.exports = DiscoveyAddress;
