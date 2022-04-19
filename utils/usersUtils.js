const User = require("../classes/User");
const users = require("./usersSimulation");

module.exports.checkIfExists = (user) => {
    if (user instanceof User) {
        const filteredUsers = users.some(
            (u) => u.email === user.email || u.username === user.username
        );

        // console.log(filteredUsers);

        return filteredUsers;
    } else {
        throw new Error("Provide a user object please!");
    }
};

module.exports.addUser = (user) => {
    users.push(user);
};
