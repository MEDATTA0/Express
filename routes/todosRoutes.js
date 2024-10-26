import express from "express";
import { checkCreateParams, checkUpdateParams, wrongtodoId } from "../middlewares/todosMiddlewares.js";
import {
  getAllTodos,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
} from "../controllers/todosController.js";

const todoRoutes = express.Router();
todoRoutes.use(express.json());
todoRoutes.use(express.urlencoded({ extended: true }));

//Getting all todos
//allTodos va différencier les todos d'un utilisateur des todos de tous utilisateurs qui est réservé aux administrateurs
todoRoutes.get("/allTodos", getAllTodos);

//Getting user's todos
todoRoutes.get("/", getTodos);

todoRoutes.get("/:todoId", wrongtodoId, getTodo)

//Creating new todo
todoRoutes.post("/", checkCreateParams, createTodo);

//Updating todo
todoRoutes.patch("/:todoId", checkUpdateParams, updateTodo);

//Deleting todo
todoRoutes.delete("/:todoId", wrongtodoId, deleteTodo);

export default todoRoutes;
