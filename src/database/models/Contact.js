const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Contact = sequelize.define("contact", {
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
  phone2: {
    type: DataTypes.STRING,
  },
  address : {
    type: DataTypes.STRING,
  },
  email : {
    type: DataTypes.STRING,
  },
  email2 : {
    type: DataTypes.STRING,
  }
  
},
{
  freezeTableName: true,
  tableName: "contact"
});
//create table if not exists...
/*const init = async () => {
  await Contact.sync();
};

init();*/

module.exports = Contact;

