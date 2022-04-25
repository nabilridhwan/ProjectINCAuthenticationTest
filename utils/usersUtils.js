const users = require("./usersSimulation");

module.exports.checkIfExists = (user) => {
    console.table(users);

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

module.exports.findUserByEmail = (email) => {
    return users.filter((u) => u.email === email);
};

module.exports.editUserDetails = (user) => {
    // Find the index of the user by email
    const index = users.findIndex((u) => u.email === user.email);
    users[index] = user;
};
