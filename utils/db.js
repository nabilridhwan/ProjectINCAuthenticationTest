const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.PG_CONNECTION_STRING,
});

const CONSTRAINTS = {
    UNIQUE_VALUE: "23505",
};

module.exports = { pool, CONSTRAINTS };
