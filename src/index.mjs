import config from "config";

import { buildApp } from "./app.mjs";
import { connectDb } from "./db/connect.mjs";
import { logger } from "./logger/index.mjs";

connectDb();
const app = buildApp();
const port = config.get("port");

app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
