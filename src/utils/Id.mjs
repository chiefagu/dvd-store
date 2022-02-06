import mongoose from "mongoose";

export const Id = Object.freeze({
  validate: (id) => mongoose.isValidObjectId(id),
  makeId: () => new mongoose.Types.ObjectId().toString(),
});
