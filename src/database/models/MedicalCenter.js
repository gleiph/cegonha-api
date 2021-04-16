const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

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
    type: DataTypes.REAL,
  },
  longitude: {
    type: DataTypes.REAL,
  },
  
});

//create table if not exists...
const init = async () => {
  await MedicalCenter.sync();
};

init();

module.exports = MedicalCenter;