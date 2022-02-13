import { logger } from "../logger/index.mjs";
import { makeDeserializeUser } from "./deserialize-user.mjs";
import { makeErrorHandler } from "./error.middleware.mjs";
import { makeNotFoundHandler } from "./not-found.middleware.mjs";
import { makeIsAdmin } from "./is-admin.mjs";

import { verifyJwt, reIssueAcessToken } from "../utils/index.mjs";

export const errorHandler = makeErrorHandler(logger);
export const notFoundHandler = makeNotFoundHandler(logger);
export const deserializeUser = makeDeserializeUser({
  verifyJwt,
  reIssueAcessToken,
  logger,
});
export const isAdmin = makeIsAdmin();
