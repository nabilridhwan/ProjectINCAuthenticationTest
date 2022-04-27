const bcrypt = require("bcrypt");

const Passwords = {
    hashPassword: async (password) => {
        return bcrypt.hash(password, 10);
    },
    comparePassword: async (password, hash) => {
        return bcrypt.compare(password, hash);
    },
};

module.exports = Passwords;
