const todosModels = require("../models/todosModels");

exports.getAllTodos = async () => {
  return await todosModels.getAllTodos();
};

exports.getTodos = async (userId) => {
  if (!userId) {
    return "Please enter the user ID";
  }
  return await todosModels.getTodos(userId);
};

exports.createTodo = async (userId, title, task_description, isCompleted) => {
  // Checking if variables are falsy or null
  if (!title || !task_description || typeof isCompleted === "undefined") {
    return "Please fill fields";
  }
  return await todosModels.createTodo(
    userId,
    title,
    task_description,
    isCompleted
  );
};
