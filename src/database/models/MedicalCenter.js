const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const CoverAddress = require('./CoverAddress')

const MedicalCenter = sequelize.define("medical-center", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },  
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  latitude: {
    type: DataTypes.DOUBLE,
  },
  longitude: {
    type: DataTypes.DOUBLE,
  },
  image: {
    type: DataTypes.STRING,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
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
  await MedicalCenter.sync();
};

init();

module.exports = MedicalCenter;

