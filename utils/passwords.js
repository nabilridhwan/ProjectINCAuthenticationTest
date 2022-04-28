const bcrypt = require("bcrypt");

const Passwords = {
    hashPassword: async (password) => bcrypt.hash(password, 10),
    comparePassword: async (password, hash) => bcrypt.compare(password, hash),
};

module.exports = Passwords;
