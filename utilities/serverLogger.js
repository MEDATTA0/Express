import winston from "winston";

const serverLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] : ${message}`;
    })
  ),
  transports: [
    //here the default path is / (root that is express)
    new winston.transports.File({ filename: "./logs/server.log" }),
    new winston.transports.Console(),
  ],
});

export default serverLogger;
