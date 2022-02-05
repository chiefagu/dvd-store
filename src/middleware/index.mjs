import { logger } from "../logger/index.mjs";
import { makeErrorHandler } from "./error.middleware.mjs";

export const errorHandler = makeErrorHandler(logger);
