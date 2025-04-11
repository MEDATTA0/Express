import mongoDB from "../../db/mongoDB_connect.js";

const todoSchema = mongoDB.Schema({
  id: { type: Number },
  userId: { type: Number },
  title: { type: String, required: true },
  todo_description: { type: String },
  due_date: { type: Date },
  is_completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
});

const Todo = await mongoDB.model("todos", todoSchema);

export default Todo;
