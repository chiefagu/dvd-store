import config from "config";
import { createLogger, transports, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { colorize, combine, printf, errors, timestamp, json } = format;

const logConfig = {
  file: {
    level: "warn",
    filename: "logs/Rental-%DATE%.log",
    format: combine(timestamp(), errors({ stack: true }), json()),
    datePattern: "YYYY-MMM-DD-HH",
    maxFiles: "14d",
    maxSize: "20m",
  },
  exceptions: {
    level: "warn",
    filename: "logs/Rental-Exceptions-%DATE%.log",
    datePattern: "YYYY-MMM-DD-HH",
    maxFiles: "14d",
    maxSize: "20m",
    handleExceptions: true,
    handleRejections: true,
  },
  console: {
    dev: {
      level: "info",
      format: combine(
        colorize(),
        errors({ stack: true }),
        timestamp({ format: "DD-MMM-YYYY HH:MM:ss" }),
        printf(({ level, timestamp, message, stack }) => {
          return `${level} ${timestamp}: ${stack || message}`;
        })
      ),
      handleRejections: true,
      handleExceptions: true,
    },
    prod: {
      format: combine(errors({ stack: true }), timestamp()),
      handleExceptions: true,
      handleRejections: true,
    },
  },
};

function devLogger() {
  const { file, exceptions, console } = logConfig;
  return createLogger({
    transports: [
      new DailyRotateFile(file),
      new DailyRotateFile(exceptions),
      new transports.Console(console.dev),
    ],
  });
}

function prodLogger() {
  const { file, exceptions, console } = logConfig;
  return createLogger({
    transports: [
      new DailyRotateFile(file),
      new DailyRotateFile(exceptions),
      new transports.Console(console.prod),
    ],
  });
}

export const logger =
  config.get("environment") !== "production" ? devLogger() : prodLogger();
