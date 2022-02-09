import { makeAddGenre } from "./add-genre.mjs";
import { makeListGenres } from "./list-genres.mjs";
import { makeEditGenre } from "./edit-genre.mjs";
import { genreDb } from "../data-access/index.mjs";
import { Id } from "../../utils/Id.mjs";

export const addGenre = makeAddGenre({ genreDb });
export const listGenres = makeListGenres({ genreDb });
export const editGenre = makeEditGenre({ Id, genreDb });
