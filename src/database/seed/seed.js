require("dotenv").config();

const bcrypt = require("bcrypt");

const User = require("../models/User");

User.create({
  username: "admin",
  password: bcrypt.hashSync("123", 10),
  name: "admin", 
  cpf: "11111111111",
  street: "Marechal Deodoro",
  number: "1",
  district: "centro",
  city: "Juiz de Fora",
  uf: "MG",
  cep: "03635126",
  email:"admin@email"
});

User.findAll().then((result) => {
  console.log(result);
});
