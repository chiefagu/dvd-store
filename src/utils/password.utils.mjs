import config from "config";
import crypto from "crypto";

const salt = config.get("salt");
const iterations = config.get("environment") === "production" ? 1000 : 1;
const keylen = 512;
const digest = "sha512";

export function getHash(password) {
  return crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString("hex");
}

export function shouldMatchPassword(password, hash) {
  return (
    hash ===
    crypto
      .pbkdf2Sync(password, salt, iterations, keylen, digest)
      .toString("hex")
  );
}
