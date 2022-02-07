import mongoose from "mongoose";
import { makeUserDb } from "./user-db.mjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
    minlength: 3,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 200,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);
export const userDb = makeUserDb({ userModel });
