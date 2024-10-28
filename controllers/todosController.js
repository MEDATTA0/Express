import { Todo } from "../models/mariadbTodosModels.js";
import TodoLogger from "../utilities/logger.js";

export async function getAllTodos(req, res) {
  //To verify the accessibility level of the user (To do it soon)
  //const isAdmin = req.params.userId;
  //request to verify whether user is admin or not
  try {
    const rows = await Todo.findAll();
    //Response depends whether row is empty or not
    if (rows == 0) {
      TodoLogger.info(`No todo`);
      res.status(200).json({
        status: "success",
        message: "todo empty !",
      });
    } else {
      TodoLogger.info(`Todos found : ${rows}`);
      res.status(200).json({
        status: "success",
        data: rows,
      });
    }
  } catch (error) {
    TodoLogger.error(`Error getting todo: ${error.message}`);
    res.status(500).json({
      status: "failure",
      message: "Error while fetching database !",
    });
  }
}

export async function getTodos(req, res) {
  const userId = req.params.userId || 1;
  try {
    const rows = await Todo.findAll({ where: { userId: userId } });
    console.log(rows);
    //Response depends whether row is empty or not
    if (rows == 0) {
      TodoLogger.info(`No todo for user ${userId}`);
      res.status(200).json({
        status: "success",
        message: "Todo empty !",
      });
    } else {
      TodoLogger.info(`Todos for user ${userId} found  : ${rows}`);
      res.status(200).json({
        status: "success",
        message: "Todos found",
        data: rows,
      });
    }
  } catch (error) {
    TodoLogger.error(`Error getting todos : ${error.message}`);
    res.status(500).json({
      status: "failure",
      message: "Error while getting todo !",
    });
  }
}

export async function getTodo(req, res) {
  const userId = req.params.userId || 1;
  const todoId = req.params.todoId;
  try {
    const row = await Todo.findOne({ where: { id: todoId, userId: userId } });
    if (row == null) {
      TodoLogger.warn(`Todo with id ${todoId} not found`);
      res.status(404).json({
        status: "failure",
        message: "todo not found",
      });
    } else {
      TodoLogger.info(
        `Todo with id ${todoId} for user ${userId} found : ${row}`
      );
      res.status(200).json({
        status: "success",
        message: "Todo found",
        data: row,
      });
    }
  } catch (error) {
    TodoLogger.error(`Error getting todo: ${error.message}`);
    res.status(500).json({
      status: "failure",
      message: "Error while getting todo",
    });
  }
}

export async function createTodo(req, res) {
  const userId = req.params.userId || 1;
  let { title, ...args } = req.body;

  let newTodo;
  try {
    newTodo = await Todo.create({
      userId,
      title,
      ...args,
    });
    TodoLogger.info(
      `Todo for user ${userId} created successfully: ${newTodo.id}`
    );
    res.status(201).json({
      status: "success",
      message: "Todo added successfully",
      data: newTodo,
    });
    console.log("Todo added successfully !\n", newTodo.toJSON());
  } catch (error) {
    TodoLogger.error(`Error creating todo: ${error.message}`);
    res.status(500).json({
      status: "failure",
      message: "Error creating todo",
    });
  }
}

export async function updateTodo(req, res) {
  const userId = req.params.userId || 1;
  const todoId = req.params.todoId;
  const { ...args } = req.body;
  try {
    //To ensure if it exists
    const row = await Todo.findOne({ where: { id: todoId, userId: userId } });
    if (row == null) {
      TodoLogger.warn(`Todo with id ${todoId} not found`);
      res.status(404).json({
        status: "failure",
        message: "Todo not found",
        todoId: todoId,
      });
    } else {
      await Todo.update(
        { ...args },
        { where: { id: todoId, userId: userId } } //To obtain updated records
      );
      const updatedTodo = await Todo.findByPk(todoId);
      TodoLogger.info(
        `Todo with id ${todoId} for ${userId} found and updated successfully`
      );
      res.status(200).json({
        status: "success",
        message: "Todo updated successfully !",
        data: updatedTodo,
      });
    }
  } catch (error) {
    TodoLogger.error(`Error updating todo: ${error.message}`);
    res.status(500).json({
      status: "failure",
      message: "Error while updating todo in database",
    });
  }
}

export async function deleteTodo(req, res) {
  const userId = req.params.userId || 1;
  const todoId = req.params.todoId;
  try {
    const row = await Todo.destroy({ where: { id: todoId, userId: userId } });
    if (row == 0) {
      TodoLogger.warn(`Todo with id ${todoId} not found`);
      res.status(404).json({
        status: "failure",
        message: `Todo not found !`,
        id: todoId,
      });
    } else {
      TodoLogger.info(
        `Todo with id ${todoId} for ${userId} deleted successfully`
      );
      res.status(200).json({
        status: "success",
        message: "Todo deleted successfully !",
        id: todoId,
      });
    }
  } catch (error) {
    TodoLogger.error(`Error deleting todo: ${error.message}`);
    res.status(500).json({
      status: "failure",
      message: "Error while deleting todo",
    });
  }
}
