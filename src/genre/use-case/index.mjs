import { makeAddGenre } from "./add-genre.mjs";
import { makeListGenres } from "./list-genres.mjs";
import { genreDb } from "../data-access/index.mjs";

export const addGenre = makeAddGenre({ genreDb });
export const listGenres = makeListGenres({ genreDb });
