const User = require("./User");

class Staff extends User {
    constructor(userID, username, name, email, password, age) {
        super(userID, username, name, email, password, age);
        this.role = "staff";
    }
}

module.exports = Staff;
