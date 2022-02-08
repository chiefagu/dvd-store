import { makeAddGenre } from "./add-genre.mjs";
import { genreDb } from "../data-access/index.mjs";

export const addGenre = makeAddGenre({ genreDb });
