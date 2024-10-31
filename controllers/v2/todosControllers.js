import Todo from "../../models/v2/mongodbTodosModels.js";
import TodoLogger from "../../utilities/v2/todosLogger.js";

////////////////////////////////////////////////////////        Get All todos       ////////////////////////////////////////////////
export async function getAllTodos(req, res) {
  try {
    const rows = await Todo.find().lean();
    if (rows == 0) {
      TodoLogger.info("No Todos");
      res.status(200).json({
        status: "success",
        message: "No Todos",
      });
    } else {
      TodoLogger.info(`Todos found : ${rows}`);
      res.status(200).json({
        status: "success",
        message: "Todos found",
        data: rows,
      });
    }
  } catch (error) {
    TodoLogger.error(
      `Error getting todos: ${error.message}. Error: ${error.message}`
    );
    res.status(500).json({
      status: "failure",
      message: "Error while getting todos",
    });
  }
}

//////////////////////////////////////////////////      Get todos         //////////////////////////////////////////////////
export async function getTodos(req, res) {
  const userId = req.params.userId || 1;
  try {
    const documents = await Todo.find({ userId }).lean();
    if (documents == 0) {
      TodoLogger.info(`No todo from user ${userId}`);
      res.status(404).json({
        status: "success",
        message: "No Todo found",
      });
    } else {
      TodoLogger.info(`Todos found from user ${userId}`);
      res.status(200).json({
        status: "success",
        message: "Todos found",
        data: documents,
      });
    }
  } catch (error) {
    TodoLogger.error(
      `Error getting todos from user ${userId}. Error: ${error.message}`
    );
    res.status(500).json({
      status: "failure",
      message: "Error while getting todos",
    });
  }
}

//////////////////////////////////////////      Get todo      /////////////////////////////////////////////////////////////////
export async function getTodo(req, res) {
  const userId = req.params.userId || 1;
  const todoId = req.params.todoId;
  try {
    const document = await Todo.find({ id: todoId }).lean();
    if (document == 0) {
      TodoLogger.info(`No todo from user ${userId}`);
      res.status(404).json({
        status: "success",
        message: "No Todo found",
      });
    } else {
      TodoLogger.info(`Todo ${todoId} found from user ${userId}`);
      res.status(200).json({
        status: "success",
        message: "Todos found",
        data: document,
      });
    }
  } catch (error) {
    TodoLogger.error(
      `Error getting todos from user ${userId}. Error: ${error.message}`
    );
    res.status(500).json({
      status: "failure",
      message: "Error while getting todos",
    });
  }
}

////////////////////////////////////////    Create    ////////////////////////////////////////////////////////////////////////////
export async function createTodo(req, res) {
  const userId = req.params.userId || 1;
  const { title, ...args } = req.body;
  const id = Math.floor(Math.random() * 20000);
  try {
    const document = new Todo({
      id,
      userId,
      title,
      ...args,
    });
    // Insert document in database
    document.save();

    TodoLogger.info(`Todo ${id} created successfully from user ${userId}`);
    res.status(201).json({
      status: "success",
      message: "Todo created successfully",
      data: document,
    });
  } catch (error) {
    TodoLogger.error(
      `Error creating todo from user ${userId}. Error: ${error.message}`
    );
    res.status(500).json({
      status: "failure",
      message: "Error while creating todo",
    });
  }
}

/**
 *
 * @param {Express.Request} req Express request object
 * @param {Express.Response} res Express response object
 */
export async function updateTodo(req, res) {
  const userId = req.params.userId || 1;
  const todoId = req.params.todoId;
  const args = req.body;
  // console.log(args);

  try {
    // {new: true} // allows to return the updated document
    const document = await Todo.findOneAndUpdate({ id: todoId }, args, {
      new: true,
    });
    if (!document) {
      TodoLogger.warn(`Todo ${todoId} from user ${userId} not found`);
      res.status(404).json({
        status: "failure",
        message: "Todo not found",
        id: todoId,
      });
    } else {
      TodoLogger.info(
        `Todo ${todoId} from user ${userId} updated successfully`
      );
      res.status(200).json({
        status: "success",
        message: "Todo updated successfully",
        data: document,
      });
    }
  } catch (error) {
    TodoLogger.error(
      `Error updating todo ${todoId} from user ${userId}. Error: ${error.message}`
    );
    res.status(500).json({
      status: "failure",
      message: "Error while updating todo",
    });
  }
}

///////////////////////////////////////////Delete////////////////////////////////////////////////////////////////////////////////
/**
 * The function returns object status code and object {"status":, "message":, "todoid":} :
 * 200: if found and id of deleted todo
 * 404: if not found and id of the researched todo
 * 500: if error occured during process and no object is returned
 * @param {Express.Request} req Express Resquest object
 * @param {Express.Response} res Express Response object
 */
export async function deleteTodo(req, res) {
  const userId = req.params.userId || 1;
  const todoId = req.params.todoId;
  try {
    const document = Todo.findOneAndDelete({ todoId, userId });
    if (document == 0) {
      TodoLogger.warn(`Todo ${todoId} from user ${userId} not found`);
      res.status(404).json({
        status: "failure",
        message: "Todo Not Found",
        id: todoId,
      });
    } else {
      TodoLogger.info(
        `Todo ${todoId} from user ${userId} deleted successfully`
      );
      res.status(200).json({
        status: "success",
        message: "Todo deleted successfully",
        id: todoId,
      });
    }
  } catch (error) {
    TodoLogger.error(
      `Error deleting todo ${todoId} from user ${userId}. Error: ${error.message}`
    );
    res.status(500).json({
      status: "failure",
      message: "Error while deleting todo",
    });
  }
}
