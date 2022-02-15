import { makePostMovie } from "./post-movie.mjs";
import { makeGetMovies } from "./get-movies.mjs";

import { logger } from "../../logger/index.mjs";
import { addMovie, listMovies } from "../use-case/index.mjs";

export const postMovie = makePostMovie({ addMovie, logger });
export const getMovies = makeGetMovies({ listMovies, logger });
