import mongoose from "mongoose";
import dotenv from "dotenv";
import TodoLogger from "../utilities/v2/todosLogger.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
let mongoDB;
try {
  mongoDB = await mongoose.connect(process.env.MONGO_URL);
  TodoLogger.info(`Connection to mongoDB is established`);
} catch (error) {
  TodoLogger.error(`Unable to connect to mongoDB. Error: ${error.message}`);
}

export default mongoDB;
