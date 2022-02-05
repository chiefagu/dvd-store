import config from "config";

import { buildApp } from "./app.mjs";
import { logger } from "./logger/index.mjs";

const app = buildApp();
const port = config.get("port");

app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
