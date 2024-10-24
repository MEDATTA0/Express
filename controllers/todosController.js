const todosModels = require("../models/todosModels");

exports.getAllTodos = async (req, res) => {
  //Pour vérifier le niveau d'accessibilité de l'utilisateur (A faire plus tard)
  // const userId = req.params.userId;

  let rows;
  try {
    rows = await todosModels.getTodos();
    //Si rows est vide
    if (rows == 0) {
      res.json({ response: "Task empty !" });
    } else res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error while fetching server !" });
    console.log("Error : ", err);
  }
};

exports.getTodos = async (req, res) => {
  const userId = req.params.userId;
  let rows;
  try {
    rows = await todosModels.getTodos(userId);
    console.log(rows);
    //Si rows est vide
    if (rows == 0) {
      res.json({ response: "Task empty !" });
    } else {
      res.json(rows);
    }
  } catch (err) {
    res.status(500).json({ error: "Error while fetching server !" });
    console.log("Error : ", err);
  }
};

exports.createTodo = async (req, res) => {
  const userId = req.params.userId;
  const { title, task_description, isCompleted } = req.body;
  // Checking if variables are falsy or null
  if (!title || !task_description || typeof isCompleted === "undefined") {
    return "Please fill fields";
  }
  let response;
  try {
    response = await todosModels.createTodo(
      userId,
      title,
      task_description,
      isCompleted
    );
    res.json({
      message: "Task added successfully",
      taskId: result.task_id,
    });
    console.log("Task added successfully");
  } catch (err) {
    res.status(500).json({ error: "Server while adding task" });
    console.log("Error : ", err);
  }
};
