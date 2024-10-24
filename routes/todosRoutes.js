const express = require("express");
const bodyParser = require("body-parser");
const todosController = require("../controllers/todosController");

const router = express.Router();
router.use(bodyParser.json());

//Getting all tasks
//allTodos va différencier les todos d'un utilisateur des todos de tous utilisateurs qui est réservé aux administrateurs
router.get("/allTodos", todosController.getAllTodos);

router.get("/", todosController.getTodos);

//Creating new task
router.post("/", todosController.createTodo);

//Updating task
router.patch("/:taskId", async (req, res) => {});

//Deleting task
router.delete("/:taskId", async (req, res) => {});

module.exports = router;
