const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
require('dotenv').config


if (process.env.NODE_ENV === "production")
{
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });

  //check connection (optional)
  sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;

}
else{
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {}, //removed ssl
  });

  //check connection (optional)
  sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
}
