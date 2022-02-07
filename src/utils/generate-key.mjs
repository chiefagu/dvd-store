import { randomBytes } from "crypto";

const key = randomBytes(16).toString("hex");
console.log({ key });
