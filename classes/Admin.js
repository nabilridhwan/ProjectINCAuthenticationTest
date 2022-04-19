const User = require("./User");

class Admin extends User {
    constructor(userID, username, name, email, password, age) {
        super(userID, username, name, email, password, age);
        this.role = "admin";
    }
}
module.exports = Admin;
