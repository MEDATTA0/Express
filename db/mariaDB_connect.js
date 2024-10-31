// import { createPool } from "mariadb";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const sequelize = new Sequelize(
  process.env.MARIADB_NAME,
  process.env.MARIADB_USER,
  process.env.MARIADB_PASSWORD,
  {
    host: process.env.MARIADB_HOST,
    dialect: "mariadb",
    port: process.env.MARIADB_PORT,
  }
);

export { sequelize };

//To ensure table is created and synchronised and force:true means that table will be reset on every boot

// const User = sequelize.define("users", {
//   id: {
//     type: DataTypes.INTEGER(11),
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//   },

//   username: {
//     type: DataTypes.STRING(255),
//     allowNull: true,
//     unique: true,
//   },

//   email: {
//     type: DataTypes.STRING(255),
//     allowNull: true,
//   },

//   password: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },

//   phone_number: {
//     type: DataTypes.INTEGER(15),
//     allowNull: false,
//   },

//   last_name: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },

//   first_name: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
// });

// //This means that a user can have multiple posts (1-N relationship).
// User.hasMany(Todos, {
//   foreignKey: "userId",
//   onDelete: "CASCADE",
// });

// //A post belongs to a single user. This creates a foreign key userId in the Todos table.
// Todos.belongsTo(User, {
//   foreignKey: "userId",
// });

/*
Initialisation du pool une seule fois lors du démarrage de l'application,
et il est accessible partout où une connexion DB est nécessaire
*/
// const pool = createPool({
//   host: "localhost",
//   user: "admin",
//   password: "admin",
//   database: "todos",
//   connectionLimit: 5,
// });

// module.exports = pool;
