import config from "config";

import { userDb } from "../data-access/index.mjs";
import { makeAddUser } from "./add-user.mjs";
import { getHash, signJwt } from "../../utils/index.mjs";

export const addUser = makeAddUser({ userDb, getHash, signJwt, config });
