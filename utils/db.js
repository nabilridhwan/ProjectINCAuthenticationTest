const { Pool } = require("pg");
const CONFIG = require("./config");

const pool = new Pool({
    connectionString: CONFIG.DB_CONNECTION,
});

const CONSTRAINTS = {
    UNIQUE_VALUE: "23505",
};

module.exports = { pool, CONSTRAINTS };
