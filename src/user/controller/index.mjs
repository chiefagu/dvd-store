import { makePostUser } from "./post-user.mjs";
import { addUser } from "../use-case/index.mjs";

export const postUser = makePostUser({ addUser });
