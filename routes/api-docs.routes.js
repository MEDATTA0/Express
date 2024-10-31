import express from "express";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";

const router = express.Router();
const todosDocs = YAML.load("./docs/todos.yaml");
// const usersDocs = YAML.load("../docs/users.yaml")

router.use("/todos", swaggerUI.serve, swaggerUI.setup(todosDocs));
// router.use("/users", swaggerUI.serve, swaggerUI.setup(usersDocs))

export default router;
