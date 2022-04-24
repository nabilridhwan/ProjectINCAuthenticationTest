const { pool } = require("../utils/db");

const TABLE_NAME = "public.user";
const ACCESS_LEVEL_TABLE_NAME = "public.access_level";

const User = {
    insertUser: async (username, email, password, registered, activated) => {
        return pool.query(
            `INSERT INTO ${TABLE_NAME}(username, email, password, registered, activated) VALUES($1, $2, $3, $4, $5) RETURNING userid, username`,
            [username, email, password, registered, activated]
        );
    },

    findUserByUserID: async (userID) => {
        return pool
            .query(
                `SELECT * FROM ${TABLE_NAME} INNER JOIN ${ACCESS_LEVEL_TABLE_NAME} ON ${TABLE_NAME}.accessid = ${ACCESS_LEVEL_TABLE_NAME}.accessid WHERE userid = $1`,
                [userID]
            )
            .then((res) => {
                return res.rows;
            });
    },

    findUserByEmail: async (email) => {
        return pool
            .query(
                `SELECT * FROM ${TABLE_NAME} INNER JOIN ${ACCESS_LEVEL_TABLE_NAME} ON ${TABLE_NAME}.accessid = ${ACCESS_LEVEL_TABLE_NAME}.accessid WHERE email = $1`,
                [email]
            )
            .then((res) => {
                return res.rows;
            });
    },

    updateUserByEmail: async (
        username,
        email,
        password,
        registered,
        activated
    ) => {
        return pool.query(
            `UPDATE ${TABLE_NAME} SET username = $1, email = $2, password = $3, registered = $4, activated = $5 WHERE email = $6`,
            [username, email, password, registered, activated, email]
        );
    },
};

module.exports = User;
