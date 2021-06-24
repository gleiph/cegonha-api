const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");
const MedicalCenter = require('./MedicalCenter')

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
  id_addres_parto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_addres_pre_natal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});

CoverAddress.associate = function(models) {
  CoverAddress.belongsTo(models.MedicalCenter, {foreignKey: 'id_addres_parto', as: 'medical-center-parto'})
};

MedicalCenter.associate = function(models) {
  MedicalCenter.belongsTo(models.MedicalCenter, {foreignKey: 'id_addres_pre_natal', as: 'medical-center'})
};
//create table if not exists...
const init = async () => {
  await CoverAddress.sync();
};

init();

module.exports = CoverAddress;