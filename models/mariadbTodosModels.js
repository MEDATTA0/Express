import { sequelize } from "../db/db_connect.js";
import { DataTypes } from "sequelize";

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

Todo.sync()
  .then((res) => {
    console.log(res, " model was synchronized successfully.");
  })
  .catch((error) => {
    console.log("Error while synchronizing model : ", error);
  });

export { Todo };
