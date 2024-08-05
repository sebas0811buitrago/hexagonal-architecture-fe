import { Login, login } from "@login/.";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();

  return (
    <Login
      onSuccesfulLogin={() => {
        router.push("/professional-skills");
      }}
      login={login}
    />
  );
};

export default LoginPage;
