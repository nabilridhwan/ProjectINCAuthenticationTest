const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgresql://postgres:root@localhost:5432/playground",
});

pool.query(
    "INSERT INTO public.user(username, email, password, registered, activated) VALUES($1, $2, $3, $4, $5)",
    ["test", "test_user@test.com", "password", true, true],
    (err, res) => {
        console.log(err);
        pool.end();
    }
);

const CONSTRAINTS = {
    UNIQUE_VALUE: "23505",
};

module.exports = { pool, CONSTRAINTS };
