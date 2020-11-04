const users = require('../data/users')
const saveData = require("../utils/saveData");
const bcrypt = require('bcrypt')

module.exports = {
  create(req, res, next) {
    res.render('create-user');
  },

  save(req, res, next) {
    let id = users.length + 1
    let user = { id, ...req.body }

    const password = user.password
    const encryptedPassword = bcrypt.hashSync(password, 10)

    user.password = encryptedPassword

    users.push(user)

    saveData(users, "users.js");

    res.render('create-user', { added: true });
  },

  login(req, res, next) {
    res.render('login');
  },
}