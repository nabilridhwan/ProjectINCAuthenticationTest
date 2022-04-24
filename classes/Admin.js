const User = require("./User");

class Admin extends User {
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
        this.role = "admin";
    }
}
module.exports = Admin;
