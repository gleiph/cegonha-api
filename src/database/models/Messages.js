const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Messages = sequelize.define("messages", {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  
},
{
  freezeTableName: true,
  tableName: "messages"
});
//create table if not exists...
/*const init = async () => {
  await Messages.sync();
};

init();*/

module.exports = Messages;