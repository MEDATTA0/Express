import { Todo } from "../models/todosModels.js"

export async function getAllTodos(req, res) {
  //To verify the accessibility level of the user (To do it soon)
  //const isAdmin = req.params.userId;
  //request to verify whether user is admin or not
  try {
    const rows = await Todo.findAll();
    //Response depends whether row is empty or not
    if (rows == 0) {
      res.status(200).json({
        status: "success",
        message: "todo empty !"
      });
    } else {
      res.status(200).json({
        status: "success",
        data: { rows }
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Error while fetching database !"
    });
    console.error("Error : ", err);
  }
}

export async function getTodos(req, res) {
  const userId = req.params.userId || 1;
  try {
    const rows = await Todo.findAll({ where: { userId: userId } });
    console.log(rows);
    //Response depends whether row is empty or not
    if (rows == 0) {
      res.status(200).json({
        status: "success",
        message: "Todo empty !"
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Todos found",
        data: { rows }
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "Error while fetching database !"
    });
    console.error("Error : ", err);
  }
}

export async function getTodo(req, res) {
  const userId = req.params.userId || 1;
  const todoId = req.params.todoId;
  try {
    const row = await Todo.findOne({ where: { id: todoId, userId: userId } })
    if (row == null) {
      res.status(404).json({
        status: "failed",
        message: "todo not found",
      })
    }
    else {
      res.status(200).json(
        {
          status: "success",
          message: "Todo found",
          data: { row }
        })
      console.log(row);
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Error while getting todo"
    });
    console.error("error: ", error);
  }
}

export async function createTodo(req, res) {
  const userId = req.params.userId || 1;
  let { title, ...args } = req.body;

  let newTodo;
  try {
    newTodo = await Todo.create(
      {
        userId,
        title,
        ...args,
      });
    res.status(201).json({
      message: "Todo added successfully",
      data: { newTodo }
    });
    console.log("Todo added successfully !\n", newTodo.toJSON());
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "Error inserting todo in database"
    });
    console.error("Error inserting data : ", err);
  }
}

export async function updateTodo(req, res) {
  const userId = req.params.userId || 1;
  const todoId = req.params.todoId;
  const { ...args } = req.body
  try {
    //To ensure if it exists
    const row = await Todo.findOne({ where: { id: todoId, userId: userId } })
    if (row == null) {
      res.status(404).json({
        status: "failure",
        message: "Todo not found",
        todoId: todoId,
      })
      console.log("Todo not found")
    }
    else {
      await Todo.update(
        { ...args },
        { where: { id: todoId, userId: userId } }, //To obtain updated records
      );
      const updatedTodo = await Todo.findByPk(todoId)
      res.status(200).json({
        status: "success",
        message: "Todo updated successfully !",
        data: updatedTodo,
      });
      console.log("Todo updated successfully !\n", row);
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Error while updating todo in database",
    });
    console.error("error: ", error);
  }
}

export async function deleteTodo(req, res) {
  const userId = req.params.userId || 1;
  const todoId = req.params.todoId;
  try {
    const row = await Todo.destroy({ where: { id: todoId, userId: userId } })
    if (row == 0) {
      res.status(200).json({
        status: "success",
        message: `Todo not found !`,
        id: todoId,
      })
    }
    else {
      res.status(200).json({
        status: "success",
        message: "Todo deleted successfully !",
        id: todoId,
      })
    }
    console.log("Todo deleted successfully !\n", row);
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Error while deleting todo in database"
    });
    console.error("error: ", error);
  }
}