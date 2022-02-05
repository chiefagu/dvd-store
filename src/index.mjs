import config from "config";

import { buildApp } from "./app.mjs";

const app = buildApp();
const port = config.get("port");

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
