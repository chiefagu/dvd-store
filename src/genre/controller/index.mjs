import { makePostGenre } from "./post-genre.mjs";
import { makeGetGenres } from "./get-genres.mjs";
import { makePutGenre } from "./put-genre.mjs";

import { logger } from "../../logger/index.mjs";
import { addGenre } from "../use-case/index.mjs";
import { listGenres } from "../use-case/index.mjs";
import { editGenre } from "../use-case/index.mjs";

export const postGenre = makePostGenre({ addGenre, logger });
export const getGenres = makeGetGenres({ listGenres, logger });
export const putGenre = makePutGenre({ editGenre, logger });
