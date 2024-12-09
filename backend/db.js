const { Pool } = require("pg");

const pool = new Pool({
  user: "gonza",
  password: "vs",
  host: "localhost",
  port: 5432,
  database: "pern_project_db",
});

module.exports = pool;
