const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");
const Neighborhoods = require("./Neighborhoods");
const DiscoveryAddres = require("./DiscoveryAddres");

const Region = sequelize.define(
  "region",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    neighborhood_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Neighborhoods,
        key: "id",
      },
    },
    discovery_address_id: {
      type: DataTypes.INTEGER,
      references: {
        model: DiscoveryAddres,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    tableName: "region",
  }
);

//create table if not exists...
/*const init = async () => {
  await Region.sync();
};

init();*/

module.exports = Region;
