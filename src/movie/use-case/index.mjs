import { makeAddMovie } from "./add-movie.mjs";
import { makeListMovies } from "./list-movies.mjs";
import { makeEditMovie } from "./edit-movie.mjs";
import { makeRemoveMovie } from "./remove-movie.mjs";

import { Id } from "../../utils/index.mjs";
import { genreDb } from "../../genre/data-access/index.mjs";
import { movieDb } from "../data-access/index.mjs";

export const addMovie = makeAddMovie({ Id, genreDb, movieDb });
export const listMovies = makeListMovies({ movieDb });
export const editMovie = makeEditMovie({ movieDb, genreDb, Id });
export const removeMovie = makeRemoveMovie({ movieDb, Id });
