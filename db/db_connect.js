const mariadb = require("mariadb");
/*
Initialisation du pool une seule fois lors du démarrage de l'application,
et il est accessible partout où une connexion DB est nécessaire
*/
const pool = mariadb.createPool({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "todos",
  connectionLimit: 5,
});

module.exports = pool;
