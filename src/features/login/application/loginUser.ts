import { credentialsSchema, User, UserCredentials } from '@login/domain/User';

export type LoginUserPort = (credentials: UserCredentials) => Promise<User>;

export const loginUser =
  (login: LoginUserPort) => async (credentials: UserCredentials) => {
    credentialsSchema.parse(credentials);

    return await login(credentials);
  };
