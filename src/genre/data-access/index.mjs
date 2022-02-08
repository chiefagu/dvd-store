import mongoose from "mongoose";

import { makeGenreDb } from "./genre-db.mjs";

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
});

export const genreModel = mongoose.model("Genre", genreSchema);

export const genreDb = makeGenreDb({ genreModel });
