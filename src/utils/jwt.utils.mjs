import jwt from "jsonwebtoken";
import { logger } from "../logger/index.mjs";

export function signJwt({ payload, secret, options }) {
  return jwt.sign(payload, secret, options);
}

export function verifyJwt({ token, secret }) {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      valid: true,
      decoded,
      expired: false,
    };
  } catch (err) {
    logger.warn("verifyJwt", err);
    return {
      valid: false,
      decoded: null,
      expired: err.message.includes("jwt expired"),
    };
  }
}
