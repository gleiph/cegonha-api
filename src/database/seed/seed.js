require("dotenv").config();

const bcrypt = require("bcrypt");

const User = require("../models/User");

User.create({
  username: "admin",
  password: bcrypt.hashSync("123", 10),
  name: "admin", 
  cpf: "11111111111",
  id_addres: 1
});

User.findAll().then((result) => {
  console.log(result);
});