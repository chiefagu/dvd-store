import { makePostGenre } from "./post-genre.mjs";
import { makeGetGenres } from "./get-genres.mjs";
import { makePutGenre } from "./put-genre.mjs";
import { makeDeleteGenre } from "./delete-genre.mjs";

import { logger } from "../../logger/index.mjs";
import {
  addGenre,
  listGenres,
  editGenre,
  removeGenre,
} from "../use-case/index.mjs";

export const postGenre = makePostGenre({ addGenre, logger });
export const getGenres = makeGetGenres({ listGenres, logger });
export const putGenre = makePutGenre({ editGenre, logger });
export const deleteGenre = makeDeleteGenre({ removeGenre, logger });
