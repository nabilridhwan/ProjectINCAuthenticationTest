const User = require("./User");

class Staff extends User {
    constructor(
        userID,
        username,
        name,
        email,
        password,
        age,
        registered = false
    ) {
        super(userID, username, name, email, password, age, registered);
        this.role = "staff";
    }
}

module.exports = Staff;
