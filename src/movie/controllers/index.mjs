import { makePostMovie } from "./post-movie.mjs";
import { makeGetMovies } from "./get-movies.mjs";
import { makePutMovie } from "./put-movie.mjs";
import { makeDeleteMovie } from "./delete-movie.mjs";

import { logger } from "../../logger/index.mjs";
import {
  addMovie,
  listMovies,
  editMovie,
  removeMovie,
} from "../use-case/index.mjs";

export const postMovie = makePostMovie({ addMovie, logger });
export const getMovies = makeGetMovies({ listMovies, logger });
export const putMovie = makePutMovie({ editMovie, logger });
export const deleteMovie = makeDeleteMovie({ removeMovie, logger });
