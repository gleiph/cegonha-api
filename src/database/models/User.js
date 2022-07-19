const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Adress = require("./Adress");
const UserAdress = require("./UserAdress");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    tableName: "user",
  }
);

User.belongsToMany(Adress, {
  through: {
    model: UserAdress,
  },
  foreignKey: "idUser",
  constranit: true,
});
Adress.belongsToMany(User, {
  through: {
    model: UserAdress,
  },
  foreignKey: "idAdress",
  constranit: true,
});

User.hasMany(UserAdress, { foreignKey: "idUser" });
UserAdress.belongsTo(User, { foreignKey: "idUser" });
Adress.hasMany(UserAdress, { foreignKey: "idAdress" });
UserAdress.belongsTo(Adress, { foreignKey: "idAdress" });

//create table if not exists...
/*const init = async () => {
  await User.sync();
};

init();*/

module.exports = User;
