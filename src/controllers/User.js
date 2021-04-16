const User = require("../database/models/User");
const bcrypt = require("bcrypt");
module.exports = {
 all(req, res, next) {
    User.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },


  create(req, res, next) {
    const { username, password } = req.body;

    User.create({
      username,
      password,
    })
    
      .then((result) => {
        bcrypt.hashSync(password, 10),
        res.status(201).json(result); //return with ID -> 201 (CREATED)
      })
      .catch(next);
  },
};