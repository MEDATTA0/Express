import {
  db_getAllTodos,
  db_getTodos,
  db_createTodo,
  db_getTodo,
  db_updateTodo,
  db_deleteTodo,
} from "../models/todosModels.js";

export async function getAllTodos(req, res) {
  //To verify the accessibility level of the user (To do it soon)
  //const isAdmin = req.params.userId;
  //request to verify whether user is admin or not
  let rows;
  try {
    //getTodos from todosModels
    rows = await db_getAllTodos();
    //Response depends whether row is empty or not
    if (rows == 0) {
      res.status(204).json({ response: "todo empty !" });
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
      res.status(204).json({ response: "Todo empty !" });
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    res.status(500).json({ error: "Error while fetching server !" });
    console.log("Error : ", err);
  }
}

export async function getTodo(req, res) {
  const userId = req.params.userId;
  const todoId = req.params.todoId;
  let response;
  try {
    response = await db_getTodo(userId, todoId);
    res.status(200).json(response)
    console.log(response);
  } catch (error) {
    res.status(500).json({
      error: "Error while getting todo"
    });
    console.log("error: ", error);
  }

}

export async function createTodo(req, res) {
  const userId = req.params.userId;
  const { title, todo_description, isCompleted } = req.body;

  let response;
  try {
    response = await db_createTodo(
      userId,
      title,
      todo_description,
      isCompleted
    );
    res.status(201).json({
      message: "Todo added successfully",
      data: {
        todoId: result.todo_id,
      },
    });
    console.log("Todo added successfully !\n", response);
  } catch (err) {
    res.status(500).json({ error: "Server while adding todo" });
    console.log("Error : ", err);
  }
}

export async function updateTodo(req, res) {
  const userId = req.params.userId;
  const todoId = req.params.todoId;
  const isCompleted = req.body;
  let response;
  try {
    response = await db_updateTodo(userId, todoId, isCompleted);
    res.status(204).json({
      message: "Todo updated successfully !"
    })
    console.log("Todo updated successfully !\n", response);
  } catch (error) {
    res.status(500).json({
      error: "Error while updating todo"
    });
    console.log("error: ", error);
  }
}

export async function deleteTodo(req, res) {
  const userId = req.params.userId;
  const todoId = req.params.todoId;
  let response;
  try {
    response = await db_deleteTodo(userId, todoId);
    res.status(204).json({
      message: "Todo deleted successfully !"
    })
    console.log("Todo deleted successfully !\n", response);
  } catch (error) {
    res.status(500).json({
      error: "Error while deleting todo"
    });
    console.log("error: ", error);
  }

}