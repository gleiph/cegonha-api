const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

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
  },
});

//create table if not exists...
const init = async () => {
  await Neighborhoods.sync();
};

init();

module.exports = Neighborhoods;
