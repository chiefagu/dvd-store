import mongoose from "mongoose";

import { makeMovieDb } from "./movie-db.mjs";
import { genreSchema } from "../../genre/data-access/index.mjs";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

export const movieModel = mongoose.model("Movie", movieSchema);

export const movieDb = makeMovieDb(movieModel);
