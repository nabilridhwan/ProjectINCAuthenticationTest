class User {
    constructor(
        userID,
        username,
        name,
        email,
        password,
        age,
        registered = false
    ) {
        this.userID = userID;
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
        this.role = null;
        this.registered = registered;
    }

    // Get safe object basically removes the password from the object
    getSafeObject() {
        return {
            userID: this.userID,
            name: this.name,
            email: this.email,
            role: this.role,
        };
    }
}

module.exports = User;
