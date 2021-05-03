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
    type: DataTypes.STRING,
  },
  number_end: {
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
  id_addres_parto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MedicalCenter,
      key: 'id',
    }
  },
  id_addres_pre_natal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MedicalCenter,
      key: 'id',
    }
  },

});

//create table if not exists...
const init = async () => {
  await CoverAddress.sync();
};

init();

module.exports = CoverAddress;