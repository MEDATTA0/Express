const todosModels = require("../models/todosModels");

exports.getAllTodos = async (req, res) => {
  //To verify the accessibility level of the user (To do it soon)
  // const userId = req.params.userId;

  let rows;
  try {
    rows = await todosModels.getTodos();
    //Response depends whether row is empty or not
    if (rows == 0) {
      res.status(204).json({ response: "Task empty !" });
    } else {
      res.status(200).json(rows);
    }
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
    //Response depends whether row is empty or not
    if (rows == 0) {
      res.status(204).json({ response: "Task empty !" });
    } else {
      res.status(200).json(rows);
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
    res.status(400).json({ error: "Please fill fields" });
  }
  let response;
  try {
    response = await todosModels.createTodo(
      userId,
      title,
      task_description,
      isCompleted
    );
    res.status(201).json({
      message: "Task added successfully",
      taskId: result.task_id,
    });
    console.log("Task added successfully");
  } catch (err) {
    res.status(500).json({ error: "Server while adding task" });
    console.log("Error : ", err);
  }
};
