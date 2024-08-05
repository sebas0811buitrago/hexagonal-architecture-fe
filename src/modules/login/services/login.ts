import { LoginUserPort } from "@login/application/login-user-use-case";

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
  return {
    email: "sebas@gmail.com",
    name: "sebas",
  };
  // return await api
  //   .post("/login-user", {
  //     json: credentials,
  //   })
  //   .json<LoginServiceResponse>();
};

const login: LoginUserPort = async ({ password, username }) => {
  const { email, name } = await loginService({
    user: username,
    password,
  });

  return {
    email,
    name,
  };
};

export default login;
