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
    emailUser: "sebas@gmail.com",
    nameUser: "sebas",
  };
  // return await api
  //   .post("/login-user", {
  //     json: credentials,
  //   })
  //   .json<LoginServiceResponse>();
};

const login: LoginUserPort = async ({ password, username }) => {
  const { emailUser, nameUser } = await loginService({
    user: username,
    password,
  });

  return {
    email: emailUser,
    name: nameUser,
  };
};

export default login;
