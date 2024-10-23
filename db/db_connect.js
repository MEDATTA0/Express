const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "todos",
  connectionLimit: 5,
});

module.exports = pool;
