import { atom } from "jotai";
import { User } from "./domain/user";

export const authenticatedUserAtom = atom<User>({
  name: "",
  email: "",
});
