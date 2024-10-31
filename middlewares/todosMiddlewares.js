import TodoLogger from "../utilities/v1/todosLogger.js";

export async function checkId(req, res, next) {
  const userId = req.params.userId || 1;
  const todoId = req.params.todoId;
  if (!Number.parseInt(todoId)) {
    TodoLogger.warn(`bad todo id : ${todoId} from user ${userId}`);
    return res.status(400).json({
      status: "failure",
      message: "bad todo id",
      id: todoId,
    });
  } else {
    next();
  }
}

export async function checkCreateParams(req, res, next) {
  const userId = req.params.userId || 1;
  const { title, ...args } = req.body;

  // Checking if the body is empty
  if (Object.keys(req.body).length === 0) {
    //To tack which user is kidding us
    TodoLogger.error(`Error, No field in the body request from user ${userId}`);
    return res.status(400).json({
      status: "failure",
      message: "no field entered",
    });
  } else if (title === "") {
    TodoLogger.warn(
      `Error creating todo from user ${userId}. Error: Title is required`
    );
    return res.status(400).json({
      status: "failure",
      message: "please enter a title",
    });
  } else if (Object.keys(args).length !== 0) {
    let fields = Object.keys(args);
    const allowedFields = ["todo_description", "is_completed"];
    let notAllowedFields = [];
    for (let i = 0; i < fields.length; i++) {
      // console.log(fields[i])
      if (!allowedFields.includes(fields[i])) {
        notAllowedFields.push(fields[i]);
      }
    }
    if (notAllowedFields != 0) {
      TodoLogger.warn(`Fields not allowed : ${notAllowedFields}`);
      return res.status(400).json({
        status: "failure",
        message: "fields not allowed !",
        notAllowedFields,
      });
    }
    if (
      args.is_completed !== undefined &&
      args.is_completed !== "true" &&
      args.is_completed !== "false"
    ) {
      //   args.is_completed = true;
      // } else if (args.is_completed === "false" || args.is_completed === false) {
      //   args.is_completed = false;
      // } else {
      TodoLogger.warn("field is_completed must be boolean");
      return res.status(400).json({
        status: "failure",
        message: "is_completed must be boolean",
      });
    }
  }
  next();
}

export async function checkUpdateParams(req, res, next) {
  const userId = req.params.userId || 1;
  const todoId = req.params.todoId;
  let { ...args } = req.body;

  if (Object.keys(req.body).length === 0) {
    //To track which user is kidding us
    TodoLogger.error(`Error, No field in the body request from user ${userId}`);
    return res.status(400).json({
      status: "failure",
      message: "no field entered",
    });
  } else {
    let fields = Object.keys(args);
    const allowedFields = ["title", "todo_description", "is_completed"];
    let notAllowedFields = [];
    for (let i = 0; i < fields.length; i++) {
      if (!allowedFields.includes(fields[i])) {
        notAllowedFields.push(fields[i]);
      }
    }
    if (notAllowedFields != 0) {
      TodoLogger.warn(`Fields not allowed : ${notAllowedFields}`);
      return res.status(400).json({
        status: "failure",
        message: "fields not allowed",
        notAllowedFields,
      });
    } else if (args.title === "") {
      TodoLogger.warn("Title is required");
      return res.status(400).json({
        status: "failure",
        message: "please enter a title",
      });
    } else {
      if (
        args.is_completed !== undefined &&
        args.is_completed !== "true" &&
        args.is_completed !== "false"
      ) {
        TodoLogger.warn("field is_completed must be boolean");
        return res.status(400).json({
          status: "failure",
          message: "is_completed must be boolean",
        });
      }
    }
    next();
  }
}
