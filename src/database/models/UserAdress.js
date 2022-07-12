const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const User = require("./User");
const Adress = require("./Adress");

const UserAdress = sequelize.define(
  "user_adress",
  {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    idAdress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "user_adress"
  }
);

//create table if not exists...
/*const init = async () => {
  await UserAdress.sync();
};

init();*/

module.exports = UserAdress;
