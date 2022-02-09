import { makePostGenre } from "./post-genre.mjs";

import { logger } from "../../logger/index.mjs";
import { addGenre } from "../use-case/index.mjs";

export const postGenre = makePostGenre({ addGenre, logger });
