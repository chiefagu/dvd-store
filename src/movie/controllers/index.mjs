import { makePostMovie } from "./post-movie.mjs";

import { logger } from "../../logger/index.mjs";
import { addMovie } from "../use-case/index.mjs";

export const postMovie = makePostMovie({ addMovie, logger });
