import { z } from "zod";

export interface User {
  name: string;
  email: string;
}

export const credentialsSchema = z.object({
  username: z.string().min(3, "User name must be at least 3 characters long"),
  password: z.string().min(1, "Pasword  must be at least 3 characters long"),
});

export type UserCredentials = z.infer<typeof credentialsSchema>;

export const LOGIN_EVENT = "User log in";
