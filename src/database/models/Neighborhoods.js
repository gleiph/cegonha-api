const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Region = require("./Region");
const DiscoveryAddres = require("./DiscoveryAddres");

const Neighborhoods = sequelize.define("neighborhoods", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  discovery_address_id: {
    type: DataTypes.INTEGER,
    references: {
      model: DiscoveryAddres,
      key: "id",
    },
  },
  /*region_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Region,
      key: "id",
    },
  },*/
},
  {
    freezeTableName: true,
    tableName: "neighborhoods"
  });
/*Neighborhoods.associate = (models) => {
  Neighborhoods.belongsTo(models.region_id, { 
    foreignKey: "id", as: "Region" });
};*/

//create table if not exists...
/*const init = async () => {
  await Neighborhoods.sync();
};

init();*/

module.exports = Neighborhoods;