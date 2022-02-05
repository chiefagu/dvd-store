import { logger } from "../logger/index.mjs";
import { makeErrorHandler } from "./error.middleware.mjs";
import { makeNotFoundHandler } from "./not-found.middleware.mjs";

export const errorHandler = makeErrorHandler(logger);
export const notFoundHandler = makeNotFoundHandler(logger);
