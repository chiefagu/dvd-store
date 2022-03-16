import mongoose from "mongoose";
import { makeCustomerDb } from "./customer-db.mjs";

export const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

export const customerModel = mongoose.model("Customer", customerSchema);
export const customerDb = makeCustomerDb({ customerModel });
