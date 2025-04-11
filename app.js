import express from "express";
import dotenv from "dotenv";
import v1Routes from "./routes/v1/index.js";
import v2Routes from "./routes/v2/index.js";
import apiDocsRoutes from "./routes/api-docs.routes.js";
import serverLogger from "./utilities/serverLogger.js";

const app = express();
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1Routes);
app.use("/api/v2", v2Routes);
app.use("/api-docs", apiDocsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Express");
});

app.listen(PORT, (error) => {
  if (error) {
    serverLogger.error(`Error when launching server !\n Error: ${error}`);
  }
  serverLogger.info(`Server listening on port ${PORT}`);
});

export default app;
