// import { createPool } from "mariadb";
const { Sequelize, DataTypes } = await import("sequelize");

const sequelize = new Sequelize("todos", "admin", "admin", {
  host: "localhost",
  dialect: "mariadb",
});

const Todo = sequelize.define(
  "tasks",
  {
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },

  {
    timestamps: true,
  }
);

//To ensure table is created and synchronised and force:true means that table will be reset on every boot
Todo.sync({ force: true })
  .then((res) => {
    console.log(res, " model was synchronized successfully.");
  })
  .catch((error) => {
    console.log("Error while synchronizing model : ", error);
  });

export { Todo };

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
