require("dotenv").config();
const sequelize = require('./src/database/sequelize')


const app = require('./src/app');

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  await sequelize.sync()
  console.log('Aplicação executando na porta ', port);
});