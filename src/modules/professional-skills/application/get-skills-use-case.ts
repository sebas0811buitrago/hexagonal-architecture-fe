import {
  credentialsSchema,
  LOGIN_EVENT,
  User,
  UserCredentials,
} from "@login/domain/user";
import { Analytics } from "@shared/application/analytics-port";
import { Monitoring } from "@shared/application/monitoring-port";

export type LoginUserPort = (credentials: UserCredentials) => Promise<User>;

interface LoginUserDependencies {
  login: LoginUserPort;
}

export const loginUser =
  ({
    login,
    trackEvent,
    monitoring,
  }: LoginUserDependencies & Monitoring & Analytics) =>
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
