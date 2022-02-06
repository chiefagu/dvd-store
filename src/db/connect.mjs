import mongoose from "mongoose";
import config from "config";

import { logger } from "../logger/index.mjs";

export function connectDb() {
  const uri = config.get("dbUri");
  mongoose.connect(uri).then(() => logger.info(`connected to ${uri}`));
}
