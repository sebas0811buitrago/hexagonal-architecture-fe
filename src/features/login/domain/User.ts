import { z } from 'zod';

export interface User {
  name: string;
  email: string;
}

export const credentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

export type UserCredentials = z.infer<typeof credentialsSchema>;
