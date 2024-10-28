import express from "express";
import userRoutes from "./routes/usersRoutes.js";
import apiDocsRoutes from "./routes/api-docs.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/api-docs", apiDocsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Express");
});

app.listen(port, (error) => {
  if (error) {
    console.log("Error when launching server !\n", error);
  }
  console.log("Server listening on port ", port);
});

export default app;
