import winston from "winston";
import chalk from "chalk";

const TodoLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      //   let colorizedLevel;
      //   switch (level) {
      //     case "info":
      //       colorizedLevel = chalk.green(level);
      //       break;
      //     case "warn":
      //       colorizedLevel = chalk.yellow(level);
      //       break;
      //     case "error":
      //       colorizedLevel = chalk.red(level);
      //       break;
      //     default:
      //       //Let's suppose grey is the default color
      //       colorizedLevel = chalk.grey(level);
      //       break;
      //   }
      return `${timestamp} [${level}] : ${message}`;
    })
  ),
  transports: [
    //here the default path is / (root that is express)
    new winston.transports.File({ filename: "./logs/v2/todos.log" }),
    new winston.transports.Console(),
  ],
});

export default TodoLogger;
