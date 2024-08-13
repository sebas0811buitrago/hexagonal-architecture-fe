import {
  credentialsSchema,
  LOGIN_EVENT,
  User,
  UserCredentials,
} from "@login/domain/user";
import { Analytics } from "@shared/application/analytics-port";
import { Monitoring } from "@shared/application/monitoring-port";

export type LoginUserPort = (credentials: UserCredentials) => Promise<User>;

interface LoginUserUseCase {
  login: LoginUserPort;
}

export const loginUserUseCase =
  ({
    login,
    trackEvent,
    monitoring,
  }: LoginUserUseCase & Monitoring & Analytics) =>
  async (credentials: UserCredentials) => {
    try {
      credentialsSchema.parse(credentials);

      const response = await login(credentials);

      trackEvent &&
        trackEvent({
          title: LOGIN_EVENT,
        });
      return response;
    } catch (error) {
      monitoring &&
        monitoring({
          error,
        });

      throw error;
    }
  };
