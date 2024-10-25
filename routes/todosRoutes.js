import express from "express";
import {
  getAllTodos,
  getTodos,
  createTodo,
} from "../controllers/todosController.js";

const todoRoutes = express.Router();
todoRoutes.use(express.json());
todoRoutes.use(express.urlencoded({ extended: true }));

//Getting all tasks
//allTodos va différencier les todos d'un utilisateur des todos de tous utilisateurs qui est réservé aux administrateurs
todoRoutes.get("/allTodos", getAllTodos);

//Getting user's todos
todoRoutes.get("/", getTodos);

//Creating new task
todoRoutes.post("/", createTodo);

//Updating task
todoRoutes.patch("/:taskId", async (req, res) => {});

//Deleting task
todoRoutes.delete("/:taskId", async (req, res) => {});

export default todoRoutes;
