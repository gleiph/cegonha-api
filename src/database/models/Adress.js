const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Adress = sequelize.define("adress", {
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
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

},
{
  freezeTableName: true,
  tableName: "adress"
});

//create table if not exists...
/*const init = async () => {
  await Adress.sync();
};

init();*/

module.exports = Adress;