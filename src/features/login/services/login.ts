import { LoginUserPort } from '@login/application/loginUser';
import api from 'src/shared/services/api';

interface Login {
  user: string;
  password: string;
}

interface LoginServiceResponse {
  message: string;
  token: string;
  user: {
    name: string;
    email: string;
  };
}

const loginService = async (credentials: Login) => {
  return await api
    .post('/login', {
      json: credentials
    })
    .json<LoginServiceResponse>();
};

const login: LoginUserPort = async ({ password, username }) => {
  const { user } = await loginService({
    user: username,
    password
  });

  return user;
};

export default login;
