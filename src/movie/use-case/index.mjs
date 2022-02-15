import { makeAddMovie } from "./add-movie.mjs";
import { makeListMovies } from "./list-movies.mjs";

import { Id } from "../../utils/index.mjs";
import { genreDb } from "../../genre/data-access/index.mjs";
import { movieDb } from "../data-access/index.mjs";

export const addMovie = makeAddMovie({ Id, genreDb, movieDb });
export const listMovies = makeListMovies({ movieDb });
