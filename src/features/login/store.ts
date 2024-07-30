import { atom } from "jotai";
import { User } from "./domain/User";

export const authenticatedUserAtom = atom<User>({
  name: "",
  email: "",
});
