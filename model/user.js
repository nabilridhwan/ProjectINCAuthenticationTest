const { pool } = require("./utils/db");

const User = {
    insertUser: async (username, email, password, registered, activated) => {
        return pool.query(
            "INSERT INTO public.user(username, email, password, registered, activated) VALUES($1, $2, $3, $4, $5) RETURNING userid",
            [username, email, password, registered, activated]
        );
    },

    findUserByEmail: async (email) => {
        return pool.query("SELECT * FROM public.user WHERE email = $1", [
            email,
        ]);
    },

    updateUserByEmail: async (
        username,
        email,
        password,
        registered,
        activated
    ) => {
        return pool.query(
            "UPDATE public.user SET username = $1, email = $2, password = $3, registered = $4, activated = $5 WHERE email = $6",
            [username, email, password, registered, activated, email]
        );
    },
};

module.exports = User;
