import { DataTypes } from "sequelize";
import { sequelize } from "../../db/mariaDB_connect.js";
import TodoLogger from "../../utilities/v1/todosLogger.js";

const Todo = sequelize.define(
  "todos",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    todo_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },

  {
    timestamps: true,
  }
);

try {
  await Todo.sync();
  TodoLogger.info(`Todos model from mariaDB was sychronized successfully`);
} catch (error) {
  TodoLogger.error(`Error while synchronizing model. Error: ${error}`);
}

// Todo.sync()
//   .then((data) => {
//     console.log(data, " model was synchronized successfully.");
//   })
//   .catch((error) => {
//     console.log("Error while synchronizing model : ", error);
//   });

export { Todo };
