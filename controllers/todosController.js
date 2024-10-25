import {
  db_getAllTodos,
  db_getTodos,
  db_createTodo,
} from "../models/todosModels.js";

export async function getAllTodos(req, res) {
  //To verify the accessibility level of the user (To do it soon)
  // const userId = req.params.userId;

  let rows;
  try {
    //getTodos from todosModels
    rows = await db_getAllyTodos();
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
}

export async function getTodos(req, res) {
  const userId = req.params.userId;
  let rows;
  try {
    rows = await db_getTodos(userId);
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
}

export async function createTodo(req, res) {
  const userId = req.params.userId;
  const { title, task_description, isCompleted } = req.body;
  // Checking if variables are falsy or null
  if (!title || !task_description || typeof isCompleted === "undefined") {
    res.status(400).json({ error: "Please fill fields" });
  }
  let response;
  try {
    response = await db_createTodo(
      userId,
      title,
      task_description,
      isCompleted
    );
    res.status(201).json({
      message: "Task added successfully",
      data: {
        taskId: result.task_id,
      },
    });
    console.log("Task added successfully");
  } catch (err) {
    res.status(500).json({ error: "Server while adding task" });
    console.log("Error : ", err);
  }
}
