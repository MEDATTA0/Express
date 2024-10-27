import TodoLogger from "../utilities/logger.js";

export async function checkId(req, res, next) {
  const todoId = req.params.todoId;
  if (typeof todoId === "number") {
    TodoLogger.warn(`Bad todo id : ${todoId}`);
    res.status(400).json({
      status: "failed",
      message: "BAD Todo ID",
      todoId,
    });
  } else {
    next();
  }
}

export async function checkCreateParams(req, res, next) {
  let { title, ...args } = req.body;
  let { todo_description, is_completed } = args;
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
    res.status(400).json({
      status: "failure",
      message: "Fields not allowed !",
      notAllowedFields,
    });
    return;
  }

  if (is_completed) {
    try {
      is_completed = Boolean(is_completed);
    } catch (error) {
      TodoLogger.warn("field is_completed must be a boolean");
      res.status(400).json({
        status: "failure",
        message: "Please completed must be boolean",
      });
      console.error("error : ", error);
      return;
    }
  }
  // Checking if variables are falsy or null
  if (!title || title === "") {
    TodoLogger.warn("Title is required");
    res.status(400).json({
      status: "failure",
      message: "Please enter the title",
    });
  } else {
    next();
  }
}

export async function checkUpdateParams(req, res, next) {
  const todoId = req.params.todoId;
  let { ...args } = req.body;
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
    res.status(400).json({
      status: "failure",
      message: "Fields not allowed !",
      notAllowedFields,
    });
    return;
  }

  if (req.body.title === "") {
    TodoLogger.warn("Title is required");
    res.status(400).json({
      status: "failure",
      message: "Please enter the title",
    });
    return;
  }

  if (args.is_completed) {
    try {
      args.is_completed = Boolean(args.is_completed);
    } catch (error) {
      TodoLogger.warn("field is_completed must be boolean");
      res.status(400).json({
        status: "failure",
        message: "Please is_completed must be boolean",
      });
      return;
    }
  }

  if (typeof todoId === "number") {
    TodoLogger.warn(`Bad todo id: ${todoId}`);
    res.status(400).json({
      status: "failure",
      message: "BAD TODO ID",
    });
  } else {
    next();
  }
}
